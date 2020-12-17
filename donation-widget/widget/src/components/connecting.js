function Connecting() {
  return (
    <div
      class='bg-white px-4 py-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6'
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-headline'
    >
      <div className='flex justify-center items-center flex-col pt-2'>
        <svg
          class='animate-spin -ml-1 mr-3 h-10 w-10 text-blue-900'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            class='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            class='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
        <p className='text-lg py-6 font-bold'>
          Connecting To Wallet...
        </p>
      </div>
    </div>
  );
}

export default Connecting;
