import WalletButton from './wallet-button';
import walletInfo from '../utils/wallet.info.json';

function Connect(props) {
  return (
    <div className='px-4 py-5 bg-gray-50 sm:p-4 sm:pb-6'>
      <p className='text-black text-sm uppercase tracking-wider'>
        Connect Your Wallet
      </p>

      {walletInfo.map((wallet) => (
        <WalletButton key={wallet.name} {...wallet} />
      ))}
      <p className='mt-2 text-sm text-blue-600 text-center pt-3 flex justify-center items-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          className='w-4 h-4 stroke-current mr-2'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        Use wallet connect to connect to any wallet
      </p>
    </div>
  );
}

export default Connect;
