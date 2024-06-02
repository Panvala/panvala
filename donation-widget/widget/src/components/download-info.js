import BigNumber from 'bignumber.js';
import { useContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import contract from '../contracts/erc20-contract';
import erc20Contract from '../contracts/erc20-contract';
import useCopyToClipboard from '../utils/clipboard';
import PaymentInfoContext from '../utils/PaymentInfoContext';

function DropdownInfo(props) {
  const [dropdown, setDropdown] = useState(false);
  const paymentInfo = useContext(PaymentInfoContext);
  const wallet = useWallet();
  const [copied, copy] = useCopyToClipboard(wallet.account);

  let { icon } = props.activePaymentMethod;

  function close() {
    setDropdown(false);
  }
  function isBalanceLow(availableAmount) {
    const {
      activePaymentMethod,
      defaultAmount,
    } = paymentInfo;
    return (
      +availableAmount <
      defaultAmount / activePaymentMethod.currentPrice
    );
  }

  return (
    <div>
      <div className='mt-2 relative'>
        <button
          type='button'
          aria-haspopup='listbox'
          aria-expanded='true'
          aria-labelledby='listbox-label'
          onClick={() => setDropdown((s) => !s)}
          className={`relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ring-2 ring-${
            isBalanceLow(props.availableTokenBalance)
              ? 'red'
              : 'green'
          }-600`}
        >
          <span className='flex items-center'>
            <img
              src={icon}
              alt=''
              className='flex-shrink-0 h-6 w-6 rounded-full'
            />
            <span className='ml-3 block truncate'>
              <span className='truncate'>
                {props.availableTokenBalance
                  ? Number(
                      props.availableTokenBalance
                    ).toFixed(2)
                  : '0.00'}
              </span>
            </span>
            <span className='ml-auto inline-block py-2 px-3 text-xs leading-4 rounded-full bg-gray-50 group-focus:bg-gray-100 transition ease-in-out duration-150'>
              {`${wallet?.account.slice(
                0,
                6
              )}...${wallet?.account.slice(-4)}`}
            </span>
          </span>
          <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
            <svg
              className='h-5 w-5 text-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </span>
        </button>

        {dropdown && (
          <div className='absolute mt-1 w-full rounded-md bg-white shadow-lg'>
            <ul
              tabindex='-1'
              role='listbox'
              aria-labelledby='listbox-label'
              aria-activedescendant='listbox-item-3'
              className='divide-y-2 divide-gray-200 max-h-56 rounded-md text-lg ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
            >
              <li
                onClick={close}
                id='listbox-item-0'
                role='option'
                className='text-gray-900 select-none relative py-3 pl-3 pr-9 flex justify-between cursor-pointer hover:bg-gray-200'
              >
                <a
                  href={`https://etherscan.io/address/${wallet.account}`}
                  target='_blank'
                >
                  View in Etherscan
                </a>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                  />
                </svg>
              </li>
              <li
                onClick={() => {
                  copy(wallet.account);
                  close();
                }}
                id='listbox-item-0'
                role='option'
                className='text-gray-900 cursor-pointer select-none relative py-3 pl-3 pr-9 flex justify-between hover:bg-gray-200'
              >
                {copied
                  ? 'Copied'
                  : 'Copy address to clipboard'}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='w-4 h-4'
                >
                  <path d='M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z' />
                  <path d='M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z' />
                </svg>
              </li>
              <li
                onClick={() => {
                  wallet.reset();
                  close();
                }}
                id='listbox-item-0'
                role='option'
                className='text-gray-900 cursor-pointer select-none relative py-3 pl-3 pr-9 flex justify-between hover:bg-gray-200'
              >
                Disconnect
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='text-red-500 w-4 h-4'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                    clipRule='evenodd'
                  />
                </svg>
              </li>
            </ul>
          </div>
        )}
        {isBalanceLow(props.availableTokenBalance) ? (
          <p className='mt-2 text-sm text-red-600 text-center'>
            Insufficient Funds
          </p>
        ) : (
          <p className='mt-2 text-sm text-green-600 text-center'>
            Funds Available
          </p>
        )}
      </div>
    </div>
  );
}

export default DropdownInfo;
