import BigNumber from 'bignumber.js';
import { createContext, useEffect, useRef, useState } from 'react';
import { useWallet } from 'use-wallet';
import contract from '../contracts/erc20-contract';
import getTokenPrice from '../utils/getTokenPrice';
import approveToken from '../utils/swap1inch';
import Connect from './connect';
import Modal from './modal';
import PaymentInfo from './payment-info';
import payOptions from '../utils/payment-methods';
import useAddCurrentPrice from '../utils/useAddCurrentPrice';
import Error from './error';
import Options from './options';
import PaymentInfoContext, {
  PaymentInfoContextProvider,
} from '../utils/PaymentInfoContext';
import DonateButton from './donate-button';

function switchView(status, errorMsg, activePaymentMethod) {
  switch (status) {
    case 'connecting':
      return <h1>Connecting</h1>;
    case 'connected':
      return (
        <PaymentInfo activePaymentMethod={activePaymentMethod} />
      );
    case 'disconnected':
      return <Connect />;
    case 'error':
      return <Error error={errorMsg} />;
    default:
      return <h1>404 Error</h1>;
  }
}

function App({ config }) {
  const paymentOptions = useAddCurrentPrice(payOptions);
  const wallet = useWallet();
  const [defaultAmount, setDefaultAmount] = useState(
    config.defaultAmount || 50
  );
  const receiverAddress = useRef(config.receiverAddress);

  const [activePaymentMethod, setActivePaymentMethod] = useState(
    paymentOptions[1]
  );
  // const [paymentMethods];
  const res = getTokenPrice(
    activePaymentMethod.symbol,
    defaultAmount
  );

  useEffect(() => {
    setActivePaymentMethod(paymentOptions[1]);
  }, [paymentOptions]);

  function handleActivePayment({ target }) {
    let selectedPayment = paymentOptions.find(
      (p) => p.name === target.value
    );
    setActivePaymentMethod(selectedPayment);
  }

  function handleAmountChange({ target }) {
    let regExpr = new RegExp('^[0-9]+$'); // check for number
    if (!regExpr.test(target.value)) {
      setDefaultAmount('');
    } else {
      setDefaultAmount(target.value);
    }
  }
  return (
    <Modal>
      <PaymentInfoContextProvider
        value={{
          defaultAmount,
          receiverAddress,
          paymentOptions,
          activePaymentMethod,
          activeAddress: wallet.account,
        }}
      >
        <div className="relative z-10 max-w-screen-xl mx-auto lg:px-8">
          <div className="w-96 max-w-md mx-auto lg:max-w-5xl">
            <div className="rounded-lg shadow-lg overflow-hidden">
              <div className="px-4 py-5 bg-gray-800 sm:p-4 sm:pb-6">
                <div className="text-white uppercase tracking-wider inline-flex justify-center items-center text-sm">
                  I would like to donate
                </div>
                <div className="pt-6 flex items-center">
                  <div class="relative rounded-md shadow-sm items-baseline justify-between">
                    <input
                      id="price"
                      class="form-input block w-full pl-3 pr-12 sm:text-sm sm:leading-5 rounded h-11"
                      placeholder="0.00"
                      placeholder={defaultAmount}
                      value={defaultAmount}
                      onChange={handleAmountChange}
                    />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span class="text-gray-500 sm:text-sm sm:leading-5">
                        USD
                      </span>
                    </div>
                  </div>
                  <p className="text-white uppercase tracking-wider inline-flex justify-center items-center text-sm px-3">
                    Using
                  </p>
                  <select
                    className="h-11 rounded form-select block pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                    value={activePaymentMethod.name}
                    onChange={handleActivePayment}
                  >
                    {paymentOptions &&
                      paymentOptions.map(
                        ({ name, symbol, currentPrice }) => (
                          <option
                            value={name}
                            key={name}
                          >{`${symbol}- ${currentPrice}$`}</option>
                        )
                      )}
                  </select>
                </div>
              </div>

              {switchView(
                wallet.status,
                wallet.error,
                activePaymentMethod
              )}
            </div>
          </div>
        </div>
      </PaymentInfoContextProvider>
    </Modal>
  );
}

export default App;
