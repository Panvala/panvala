import React, { useEffect, useState } from 'react';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

import FieldText from '../components/FieldText';
import Label from '../components/Label';
import Layout from '../components/Layout';
import Nav from '../components/Nav';
import SEO from '../components/seo';

import leftArrowIcon from '../img/left-arrow.svg';
import gitcoinIcon from '../img/gitcoin.png';
import givethIcon from '../img/giveth.png';
import {
  categories,
  DonationMethodEnums,
  ICommunityData,
  NetworkEnums,
  networks,
  TokenEnums,
  tokens,
} from '../data';
import { MatchingMultiplierInfo } from '../components/Community/InfoCards';
import { loadImage } from '../utils/images';
import { getMatchingMultiplier } from '../utils/calculations';
import { BigNumber, Contract, providers } from 'ethers';
import {
  getAPIEndpoint,
  getExplorerUrl,
  getSwapUrl,
  mapDonationMethodToEnum,
  mapLayer2ToNetworkEnum,
  shortenString,
  toKebabCase,
} from '../utils/format';
import { loadCommunityStakingContracts } from '../utils/env';
import { formatUnits } from '@ethersproject/units';
import Spinner from '../components/Spinner';

export interface ICommunityStakingFormFields {
  firstName: string;
  lastName: string;
  email: string;
  isPublicDonor?: boolean;
  joinCaucus?: boolean;
}

const CommunityStakingFormSchema: yup.ObjectSchema<ICommunityStakingFormFields> = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .trim()
      .required('Please enter your first name.'),
    lastName: yup
      .string()
      .trim()
      .required('Please enter your last name.'),
    email: yup
      .string()
      .trim()
      .email('Please enter a valid email address.')
      .required('Please enter an email address.'),
    isPublicDonor: yup.bool(),
    joinCaucus: yup.bool(),
  });

interface IAllocation {
  categoryID: number;
  points: number;
}

interface CommunityStakingProps {
  pageContext: {
    campaignName: string;
    communityName: string;
    ethereumAddress?: string;
    layer2Preference?: string;
    layer2Address?: string;
    primaryDonationMethod?: string;
    donationURL?: string;
    scoreboard: any;
    scoreboardTotals: any;
  };
  [key: string]: any;
}

const CommunityStaking = (props: CommunityStakingProps) => {
  const {
    communityName,
    ethereumAddress,
    layer2Address,
    layer2Preference,
    primaryDonationMethod,
    donationURL,
    scoreboard,
    scoreboardTotals,
  } = props.pageContext;

  const initialValues: ICommunityStakingFormFields = {
    firstName: '',
    lastName: '',
    email: '',
    isPublicDonor: false,
    joinCaucus: false,
  };

  let categoryID: number;
  const EMPTY_PERCENTAGES = {};
  categories.forEach(x => {
    EMPTY_PERCENTAGES[x.categoryID] = x.title === communityName ? '100' : '';
    // if (x.title === communityName) categoryID = x.categoryID;
  });

  const communityImage = loadImage(communityName);

  const community: ICommunityData = {
    name: communityName,
    addresses: {},
  };

  if (ethereumAddress) community.addresses[NetworkEnums.MAINNET] = ethereumAddress;

  if (layer2Preference && layer2Address) {
    const chainId = mapLayer2ToNetworkEnum(layer2Preference);
    if (chainId !== '') community.addresses[chainId] = layer2Address;
  }

  let donationMethod = '';

  if (primaryDonationMethod && donationURL)
    donationMethod = mapDonationMethodToEnum(primaryDonationMethod);

  const stakingNetwork: string = NetworkEnums.XDAI;
  // const moarPANUrl = getSwapUrl(tokens[TokenEnums.PAN].addresses[stakingNetwork]);
  const pollID = '6';

  // MetaMask
  const [provider, setProvider] = useState<providers.Web3Provider>();
  const [activeAccount, setActiveAccount] = useState<string>('');
  const [metaMaskNetwork, setMetaMaskNetwork] = useState<string>('');
  const [metaMaskNetworkChangeHandler, setMetaMaskNetworkChangeHandler] = useState();

  // Contracts
  const [inputToken, setInputToken] = useState<Contract>();

  // Staking
  const [matchingMultiplier, setMatchingMultiplier] = useState<number>(0);
  const [inputTokenBalance, setInputTokenBalance] = useState<number>();
  const [percentages, setPercentages] = useState(EMPTY_PERCENTAGES);
  const [allocations, setAllocations] = useState<IAllocation[]>([]);
  const [moarPANUrl, setMoarPANUrl] = useState<string>('');

  // Status
  const [step, setStep] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!moarPANUrl) {
      const url = getSwapUrl(stakingNetwork, tokens[TokenEnums.PAN].addresses[stakingNetwork]);
      setMoarPANUrl(url);
    }
  }, [moarPANUrl]);

  useEffect(() => {
    if (inputToken && activeAccount) {
      (async () => {
        const balance: BigNumber = await inputToken.balanceOf(activeAccount);
        setInputTokenBalance(parseFloat(formatUnits(balance, 18)));
      })();
    }
  }, [inputToken, activeAccount]);

  useEffect(() => {
    if (typeof inputTokenBalance !== 'undefined') {
      console.log('PAN balance: ', inputTokenBalance);
    }
  }, [inputTokenBalance]);

  useEffect(() => {
    if (scoreboard && scoreboardTotals) {
      setMatchingMultiplier(getMatchingMultiplier(scoreboard, scoreboardTotals));
    }
  }, [scoreboard]);

  /**
   * Connect MetaMask account
   */
  useEffect(() => {
    if (provider) {
      (async () => {
        let userAccount = (await provider.listAccounts())[0];
        // user not enabled for this app
        if (!userAccount) {
          try {
            userAccount = (await window.ethereum.enable())[0];
          } catch (error) {
            if (error.stack.includes('User denied account authorization')) {
              const msg =
                'MetaMask not enabled. In order to donate PAN, you must authorize this app.';
              handleError(msg);
            }
          }
        } else if (userAccount === activeAccount) {
          console.log('MetaMask user account is already initialized: ', userAccount);
          return;
        }
        setActiveAccount(userAccount);
        console.log('Initialized MetaMask user account: ', userAccount);

        // Init MetaMask network change handler
        if (!metaMaskNetworkChangeHandler) {
          setMetaMaskNetworkChangeHandler(
            window.ethereum.on('chainChanged', async (network: string) => {
              setMetaMaskNetwork(parseInt(network, 16).toString());
            })
          );
          console.log('Initialized MetaMask network change handler');
        }
        const metaMaskChainId = (await provider.getNetwork()).chainId;
        setMetaMaskNetwork(metaMaskChainId.toString());
      })();
    }
  }, [provider]);

  /**
   * Listen for selected network changes
   */
  useEffect(() => {
    if (provider) {
      if (metaMaskNetwork !== stakingNetwork) {
        const errMsg = `Please connect MetaMask to the ${networks[stakingNetwork].name} network.`;
        handleError(errMsg);
      } else {
        clearError();
        // if (provider) {
        (async () => {
          const contracts = await loadCommunityStakingContracts(provider);
          setInputToken(contracts.paymentToken);
          console.log('Initialized contracts');
        })();
        // }
      }
    }
  }, [metaMaskNetwork]);

  function connectWallet() {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      if (!provider) {
        setProvider(new providers.Web3Provider(window.ethereum));
        console.log('Initialized MetaMask provider');
      }
    }
  }

  function connectDifferentWallet() {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      if (!provider) {
        setProvider(new providers.Web3Provider(window.ethereum));
        console.log('Initialized MetaMask provider');
      }
    }
  }

  async function handleFormSubmit(values: ICommunityStakingFormFields, actions: any) {
    try {
      if (!provider) return;

      // transform the allocations for submission
      // Format allocations
      const chosenAllocations: IAllocation[] = categories.map(c => {
        const cid = c.categoryID;
        let points = percentages[cid];
        if (points === '') {
          points = 0;
        }
        return {
          categoryID: cid,
          points: parseInt(points),
        };
      });

      console.log('chosen allocations:', chosenAllocations);

      // Update allocations for display after voting
      setAllocations(chosenAllocations);

      // post to API
      await sendStakingData();

      // post to Formspree
      const stakerInfo = {
        community: props.pageContext.communityName,
        allocation: {
          categoryID,
          points: 100
        },
        pollID,
        ...values,
      };

      console.log('Staker info: ', stakerInfo);

      // send staker info to formspree
      const saveRequest = fetch('https://formspree.io/f/xnqlaobz', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: JSON.stringify(stakerInfo),
      });
      const saveResponse = await saveRequest;
      console.log('Sent staker info to Formspree! Response: ', saveResponse?.json());

      actions.setSubmitting(false);
      actions.resetForm();
    } catch (err) {
      handleError(err);
    }
  }

  async function sendStakingData() {
    if (provider && activeAccount && allocations.length > 0) {
      const message = `Response from ${activeAccount} for poll ID ${pollID}`;

      const signer = provider.getSigner();
      let signature: string;

      try {
        signature = await signer.signMessage(message);
      } catch (error) {
        setError('Message signature rejected. Staking information was not submitted.');
        return;
      }

      const data = {
        response: {
          account: activeAccount,
          allocations,
        },
        signature,
      };

      console.log('staking data:', data);

      const apiHost = 'https://api.panvala.com';

      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': apiHost,
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type',
      };

      const endpoint = `${apiHost}/api/polls/${pollID}`;

      const res = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers,
      }).catch(err => {
        if (err.message.includes('Failed to fetch')) {
          setError(
            'Uh oh! Failed to submit the poll. Please verify each field and try again, or contact the Panvala team at info@panvala.com'
          );
        }
      });

      console.log('Res: ', res);

      // Response errors
      if (res && res.status !== 200) {
        console.log('res:', res);
        const json = await res.json();
        console.log('json:', json);
        if (json.hasOwnProperty('errors') && json.errors.length > 0) {
          console.log('ERROR:', json.errors);
        }
        if (json.hasOwnProperty('msg')) {
          if (json.msg.includes('Invalid poll response request data')) {
            setError(
              'Poll form validation failed. Please verify each field and try again, or contact the Panvala team @ info@panvala.com'
            );
          }
          if (json.msg.includes('Signature does not match account')) {
            setError(
              'Message signature did not match the signing account. Vote was not submitted to poll.'
            );
          }
          if (json.msg.includes('Validation error')) {
            if (json.errors[1].message === 'account must be unique') {
              setError('Each account may only vote once per poll. Vote was not submitted to poll.');
            }
          }
        }
      } else {
        setPercentages(EMPTY_PERCENTAGES);
        setMessage('Success! Your staking information has been submitted.');
        console.log('Success! Your staking information has been submitted.');
      }
    }
  }

  // Clear error
  function clearError() {
    setError('');
  }

  function clearState() {
    setStep(null);
    setMessage('');
  }

  // Pass the error up to the caller and cancel everything
  function handleError(msg: string) {
    setError(msg);
    clearState();
    console.error(msg);
  }

  // Cancel the donation flow
  function handleCancel() {
    clearState();
  }

  const Spacer = ({ width }) => (
    <div className={`w-${width}-l w-${width}-m w-${width} pv5-ns pv3 dn-m`} />
  );

  const ExternalDonationLink = ({ image }) => (
    <a className="blue link mv4 dt" href={donationURL} target="_blank" rel="noreferrer">
      <img className="w2 dtc v-mid" src={image} alt={donationMethod} />
      <div className="f5 pl3 ml3 dtc v-mid">Donate on {donationMethod}</div>
    </a>
  );

  return (
    <Layout>
      <SEO title="Stake" />

      <section className="bg-gradient pb6">
        <Nav />
        <div className="bg-white pb2 flex flex-wrap flex-nowrap-ns">
          <Spacer width="10" />

          {/* Content Column */}
          <div className="w-40-l w-50-m w-100 pa4 pv5-l ph0-ns flex-column">
            <div className="w-90-l w-80-m w-100 center">
              <a href={`/${toKebabCase(communityName)}`} className="dt mb4 teal link pointer">
                <img className="dtc v-mid" src={leftArrowIcon} />
                <span className="dtc pl1 v-mid">Back to Community</span>
              </a>

              <div className="w-90-l w-80-m w-100 f2-ns f3 b ma0 pb3">Become an Owner</div>

              <p className="w-80 f5 pb4 tj tl-l lh-copy">
                Donation matching is earned from community members who are <strong>owners</strong>{' '}
                of Panvala. The more PAN we own, the more matching we earn!
              </p>

              {!!!error && (
                <>
                  {!!activeAccount && !!!inputTokenBalance && (
                    <div className="flex items-center">
                      <Spinner width="1.5rem" height="1.5rem" />
                      <div className="w-90 ml3 f4">Loading PAN balance...</div>
                    </div>
                  )}
                  {!!activeAccount && !!inputTokenBalance && (
                    <>
                      {/* Show PAN balance */}
                      {inputTokenBalance > 0 && (
                        <div className="w-100 pb2 flex-column">
                          <div className="fw1">Available PAN to stake for this community</div>
                          <div className="flex items-center">
                            <div className="w-50 f2 b mv3">{inputTokenBalance.toFixed(2)} PAN</div>
                            <a
                              href={moarPANUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="w-50 f4 teal link"
                            >
                              Get MOAR PAN
                            </a>
                          </div>
                        </div>
                      )}

                      {/* No PAN in wallet */}
                      {inputTokenBalance === 0 && (
                        <div className="w-100 pb2 flex-column">
                          <div className="f4 mb3">You don't own any PAN tokens in this wallet:</div>
                          <div className="f4 mb4">
                            <a
                              className="link teal"
                              href={getExplorerUrl(TokenEnums.PAN, activeAccount)}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {shortenString(activeAccount)}
                            </a>
                          </div>
                          <div className="mb3 teal pointer" onClick={connectDifferentWallet}>
                            Connect different wallet
                          </div>
                          <a
                            href={moarPANUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="w-70 dim dib pv3 ph4 tc br-pill mid-gray b--mid-gray ba bw1 f5 fw7 link pointer"
                          >
                            Get PAN tokens
                          </a>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              {/* Wrong network alert */}
              {!!error && !!error.toLowerCase && /please connect metamask to the/g.test(error.toLowerCase()) && (
                <p className="red lh-copy">{error}</p>
              )}

              {/* Connect Wallet prompt */}
              {!!!activeAccount && (
                <p className="f5">
                  <span className="teal pointer" onClick={connectWallet}>
                    Connect wallet
                  </span>{' '}
                  to proceed. If you don't have a wallet,{' '}
                  <a className="teal link" href="">
                    install MetaMask
                  </a>{' '}
                  or select the credit card payment method.
                </p>
              )}

              <div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={CommunityStakingFormSchema}
                  onSubmit={handleFormSubmit}
                >
                  {({
                    values,
                    handleSubmit,
                    handleChange,
                    isSubmitting,
                  }) => {
                    const disableSubmit = (): boolean =>
                      !activeAccount || isSubmitting || inputTokenBalance === 0;

                    return (
                      <form
                        data-testid="community-staking-form"
                        onSubmit={handleSubmit}
                        name="community-staking"
                      >
                        <Label className="f5 b">Your Information</Label>
                        <FieldText
                          type="text"
                          name="firstName"
                          id="staking-first-name"
                          placeholder="First Name"
                          value={values.firstName}
                          onChange={handleChange}
                          className="f6 input-reset b--black-10 pv3 ph2 db center w-100 br3 mt2"
                        />

                        <FieldText
                          type="text"
                          name="lastName"
                          id="staking-last-name"
                          placeholder="Last Name"
                          value={values.lastName}
                          onChange={handleChange}
                          className="f6 input-reset b--black-10 pv3 ph2 db center w-100 br3 mt2"
                        />

                        <FieldText
                          type="text"
                          name="email"
                          id="staking-email"
                          placeholder="Email address"
                          value={values.email}
                          onChange={handleChange}
                          className="f6 input-reset b--black-10 pv3 ph2 db center w-100 br3 mt2"
                        />

                        <div className="mt3 mb4">
                          <label className="flex items-center pv2">
                            <Field
                              type="checkbox"
                              name="isPublicDonor"
                              id="staking-is-public-donor"
                              className=""
                              style={{ width: '1.25rem', height: '1.25rem' }}
                            />
                            <div className="w-90 f5 ml3 fw1">
                              Display my name publicly as a donor
                            </div>
                          </label>

                          <label className="flex items-center pv2">
                            <Field
                              type="checkbox"
                              name="joinCaucus"
                              id="staking-join-caucus"
                              className=""
                              style={{ width: '1.25rem', height: '1.25rem' }}
                            />
                            <div className="w-90 f5 ml3 fw1">
                              Apply to join the{' '}
                              <a
                                href="https://panvala.com/join"
                                target="_blank"
                                rel="noreferrer"
                                className="teal link"
                              >
                                Panvala Owner's Caucus
                              </a>
                            </div>
                          </label>
                        </div>

                        <input
                          type="submit"
                          name="submit"
                          onClick={handleSubmit as any}
                          className={`${
                            disableSubmit() ? 'o-50' : 'link pointer dim'
                          } bw1 bn br-pill pv3 ph4 white bg-teal fw7 mt0-l mt4-m mt2 w-70`}
                          disabled={disableSubmit()}
                          value="Stake PAN for this Community"
                        />
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>

          {/* Matching Multiplier Info */}
          <div className="w-100 w-50-l w-60-m pv5-ns mt3 flex-column flex-column-reverse fixed static-ns left-0 right-0 bottom-0 z-999">
            <MatchingMultiplierInfo
              image={communityImage}
              title={communityName}
              multiplier={matchingMultiplier}
            />
            {!!donationMethod && !!donationURL && (
              <div className="w-60-l w-80-m w-100 bg-white ml5-l center-m mt4 flex-column dn db-ns">
                <div className="f4 b">Other ways to support with PAN</div>
                {donationMethod === DonationMethodEnums.GITCOIN && (
                  <ExternalDonationLink image={gitcoinIcon} />
                )}
                {donationMethod === DonationMethodEnums.GIVETH && (
                  <ExternalDonationLink image={givethIcon} />
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CommunityStaking;
