// import getTokenPrice from '../utils/getTokenPrice';

import { useContext, useState } from 'react';
import PaymentInfoContext from '../utils/PaymentInfoContext';
import DonateButton from './donate-button';
import ERC20Contract from '../contracts/erc20-contract';
import { getBigNumber } from '../utils/bn';
import web3 from '../contracts/web3';
import TransactionError from './tx-error';

export default function OrderDetails(props) {
  const {
    defaultAmount,
    activePaymentMethod,
    receiverAddress,
    activeAddress,
    paymentOptions,
  } = useContext(PaymentInfoContext);

  async function handleDonate() {
    if (activePaymentMethod.symbol === 'PAN') {
      try {
        let res = await ERC20Contract(
          activePaymentMethod.contractAddr
        )
          .methods.transfer(
            receiverAddress,
            getBigNumber(
              defaultAmount /
                activePaymentMethod.currentPrice
            )
          )
          .send({ from: activeAddress });
        setShowSuccess(true);
      } catch (error) {
        props.setActiveModal('error');
        props.setErrorMessage(error);
      }
    } else {
      let panContractAddr = paymentOptions[1].contractAddr;
      let url = `https://api.1inch.exchange/v2.0/swap?fromTokenAddress=${
        activePaymentMethod.contractAddr
      }&toTokenAddress=${panContractAddr}&amount=${getBigNumber(
        defaultAmount / activePaymentMethod.currentPrice
      )}&fromAddress=${activeAddress}&slippage=1`;
      let { tx, errors } = await fetch(url).then((res) =>
        res.json()
      );
      if (errors) {
        console.error(errors.msg);
      } else {
        let { from, to, data, value } = tx;
        let signedTx = await web3.eth.sendTransaction({
          from,
          to,
          data,
          value,
        });
        console.log({
          from,
          to,
          data,
          value,
          signedTx,
        });
      }
    }
  }

  return (
    <>
      <div className='pt-2'>
        <div className='flex justify-between items-center mt-4 border-b-2 pb-2 border-gray-300 border-dotted'>
          <span className='text-black text-sm uppercase tracking-wider font-bold'>
            ORDER DETAILS
          </span>
          <span className='font-bold'>ETH / USD</span>
        </div>
        <div className='flex justify-between items-center mt-4 border-b-2 pb-2 border-gray-300 border-dotted'>
          <span className='text-black text-sm tracking-wider'>
            I will use{' '}
            <span className='font-semibold'>
              {Number(
                defaultAmount /
                  activePaymentMethod.currentPrice
              ).toFixed(4)}{' '}
            </span>
            <span class='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-indigo-100 text-indigo-800'>
              {activePaymentMethod.symbol}
            </span>
          </span>
          <span>{defaultAmount}$</span>
        </div>
      </div>

      <DonateButton
        onClick={handleDonate}
        isDisabled={
          props.availableTokenBalance <
          defaultAmount / activePaymentMethod.currentPrice
        }
      />
    </>
  );
}
