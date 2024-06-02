import { useWallet } from 'use-wallet';
import walletInfo from '../utils/wallet.info.json';
import WalletButton from './wallet-button';

function Error({ error }) {
  const wallet = useWallet();
  const activate = (connector) => wallet.connect(connector);
  return (
    <div className='px-4 py-5 bg-red-50'>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <svg
            className='h-5 w-5 text-red-400'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
              clipRule='evenodd'
            />
          </svg>
        </div>
        <div className='ml-3 mx-auto'>
          <h3 className='text-sm leading-5 font-medium text-red-800 text-center'>
            {error === null
              ? 'ERROR: Please switch your network to main network'
              : error.name === 'ChainUnsupportedError'
              ? 'ERROR: Connect to the Main Network'
              : 'ERROR: Something Went Worong'}
          </h3>
        </div>
      </div>
      <p className='uppercase text-md font-bold text-black py-2 text-center underline pt-5'>
        TRY AGAIN
      </p>
      {walletInfo.map((wallet) => (
        <WalletButton key={wallet.name} {...wallet} />
      ))}
    </div>
  );
}

export default Error;
