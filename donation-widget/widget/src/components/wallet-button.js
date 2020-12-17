import { useWallet } from 'use-wallet';

function WalletButton(props) {
  const wallet = useWallet();
  const activate = (connector) => wallet.connect(connector);

  return (
    <button
      type='button'
      onClick={() => activate(props.connecter || '')}
      className='mt-3 inline-flex w-full justify-between items-center px-4 py-3 rounded-md border border-transparent text-base text-gray-800 border-gray-400 hover:bg-gray-100 focus:outline-none focus:shadow-outline-blue active:bg-blue-700 tracking-wide'
    >
      <div className='flex justify-center items-center'>
        <img src={props.icon} className='w-8 h-6' alt='' />
        <p className='ml-4'>{props.name}</p>
      </div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        className='text-gray-400 w-6 h-8'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 5l7 7-7 7'
        />
      </svg>
    </button>
  );
}

export default WalletButton;
