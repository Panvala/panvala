import TokenAmount from 'token-amount';
import {
  ConnectionRejectedError,
  useWallet,
} from 'use-wallet';
import SwapInfo from './swap-info';

function Swap(props) {
  const wallet = useWallet();
  const activate = (connector) => wallet.connect(connector);
  console.log({ wallet });

  console.log(wallet.status);
  return (
    <div className='bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-sm sm:w-full sm:p-6'>
      <div>
        <SwapInfo />
      </div>
      <div className='mt-5 sm:mt-6'>
        {wallet.status === 'connected' ? (
          <>
            <div className='bg-white shadow sm:rounded-full'>
              <a className='cursor-pointer group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-900 rounded-full bg-green-400 hover:text-gray-900 focus:outline-none focus:bg-gray-300 transition ease-in-out duration-150'>
                <span className='truncate'>
                  {wallet.balance === '-1'
                    ? '…'
                    : TokenAmount.format(
                        wallet.balance,
                        18,
                        { symbol: 'ETH' }
                      )}
                </span>
                <span className='ml-auto inline-block py-2 px-3 text-xs leading-4 rounded-full bg-gray-50 group-focus:bg-gray-100 transition ease-in-out duration-150'>
                  {`${wallet?.account.slice(
                    0,
                    6
                  )}...${wallet?.account.slice(-4)}`}
                </span>
              </a>
            </div>
          </>
        ) : (
          <span className='flex w-full rounded-md shadow-sm'>
            <button
              type='button'
              className='w-full items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-50 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200 transition ease-in-out duration-150'
              onClick={() => activate('injected')}
            >
              Connect Wallet
            </button>
          </span>
        )}
      </div>
    </div>
  );
}

export default Swap;
