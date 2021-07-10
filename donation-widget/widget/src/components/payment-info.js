import DropdownInfo from './download-info';
import OrderDetails from './order-details';
import { useContext, useEffect, useState } from 'react';
import PaymentInfoContext from '../utils/PaymentInfoContext';
import erc20Contract from '../contracts/erc20-contract';
import { getSmallNumber } from '../utils/bn';
import { useWallet } from 'use-wallet';
import TransactionSuccess from './tx-success';
import TransactionError from './tx-error';

function PaymentInfo(props) {
  const [errorMessage, setErrorMessage] = useState();
  const [successData, setSuccessData] = useState();
  const [activeModal, setActiveModal] = useState('');
  const [
    availableTokenBalance,
    setAvailableTokenBalance,
  ] = useState();
  const wallet = useWallet();
  const {
    activeAddress,
    activePaymentMethod: { symbol, contractAddr },
  } = useContext(PaymentInfoContext);

  useEffect(() => {
    (async function () {
      if (symbol === 'PAN' || symbol === 'DAI') {
        const tokenBalance = await erc20Contract(
          contractAddr
        )
          .methods.balanceOf(activeAddress)
          .call();
        setAvailableTokenBalance(
          getSmallNumber(tokenBalance)
        );
      } else {
        setAvailableTokenBalance(
          getSmallNumber(wallet.balance)
        );
      }
    })();
  }, [symbol]);

  if (activeModal === 'success') {
    return (
      <TransactionSuccess
        setActiveModal={setActiveModal}
        successData={successData}
      />
    );
  }
  if (activeModal === 'error') {
    return (
      <TransactionError
        setActiveModal={setActiveModal}
        errorMessage={errorMessage}
      />
    );
  }
  return (
    <div className='px-4 py-5 bg-gray-50 sm:p-4 sm:pb-6'>
      <p className='text-black text-sm uppercase tracking-wider font-bold pt-1'>
        COMING FROM
      </p>

      <DropdownInfo
        activePaymentMethod={props.activePaymentMethod}
        availableTokenBalance={availableTokenBalance}
      />
      <OrderDetails
        availableTokenBalance={availableTokenBalance}
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
        successData={successData}
        setSuccessData={setSuccessData}
        setActiveModal={setActiveModal}
        close={props.close}
      />
    </div>
  );
}

export default PaymentInfo;
