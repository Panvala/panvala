import { useRef, useState } from 'react';
import useOnClickOutside from '../utils/useClickOutside';

function CoinOptions() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => {
    setIsVisible(false);
  });

  return (
    <div className='pt-4'>
      <div className='mt-1 relative'>
        <button
          type='button'
          onClick={() =>
            setIsVisible((s) => {
              return !s;
            })
          }
          aria-haspopup='listbox'
          aria-expanded='true'
          aria-labelledby='listbox-label'
          className='relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        >
          <span className='flex items-center'>
            <img
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              alt=''
              className='flex-shrink-0 h-6 w-6 rounded-full'
            />
            <span className='ml-3 block truncate'>
              Tom Cook
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

        {isVisible && (
          <div className='absolute mt-1 w-full rounded-md bg-white shadow-lg'>
            <ul
              ref={ref}
              tabindex='-1'
              role='listbox'
              aria-labelledby='listbox-label'
              aria-activedescendant='listbox-item-3'
              className='max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
            >
              <li
                id='listbox-item-0'
                role='option'
                className='text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9'
              >
                <div className='flex items-center'>
                  <img
                    src='https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80'
                    alt=''
                    className='flex-shrink-0 h-6 w-6 rounded-full'
                  />
                  <span className='ml-3 block font-normal truncate'>
                    Wade Cooper
                  </span>
                </div>

                <span className='absolute inset-y-0 right-0 flex items-center pr-4'>
                  <svg
                    className='h-5 w-5'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoinOptions;
