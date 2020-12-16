import { useEffect } from 'react';

function TransactionError(props) {
  // useEffect(() => {
  //   setTimeout(() => props.setErrorMessage(''), 5000);
  // }, []);
  return (
    <div
      class='bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6'
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-headline'
    >
      <div>
        <div class='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100'>
          <svg
            class='h-6 w-6 text-red-600'
            stroke='currentColor'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            />
          </svg>
        </div>
        <div class='mt-3 text-center sm:mt-5'>
          <h3
            class='text-lg leading-6 font-medium text-gray-900'
            id='modal-headline'
          >
            Transaction rejected
          </h3>
          <div class='mt-2'>
            <p class='text-sm leading-5 text-gray-500'>
              {props.errorMessage.message}
            </p>
          </div>
        </div>
      </div>
      <div class='mt-5 sm:mt-6'>
        <span class='flex w-full rounded-md shadow-sm sm:col-start-2'>
          <button
            onClick={() => props.setActiveModal('main')}
            type='button'
            class='inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5'
          >
            Dismiss
          </button>
        </span>
      </div>
    </div>
  );
}

export default TransactionError;
