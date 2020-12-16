import { useEffect, useState } from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';

function Home() {
  const [htmlText, setHtmlText] = useState(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Document</title>
  </head>
  <body>
    
  </body>
  </html>`);
  const [defaultAmount, setDefaultAmount] = useState(50);
  const [recieversAddress, setRecieversAddress] = useState(
    ''
  );
  const [recieversName, setRecieversName] = useState('');

  function handleAmountChange({ target }) {
    let regExpr = new RegExp('^[0-9]+$'); // check for number
    if (!regExpr.test(target.value)) {
      setDefaultAmount('');
    } else {
      setDefaultAmount(target.value);
    }
  }

  function updateHtmlText(amount, address, name) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <title>Panvala Pan Donation Widget!</title>
    </head>
    <body>
      ${amount} - ${address} -${name}
    </body>
    </html>`;
  }

  useEffect(() => {
    setHtmlText(
      updateHtmlText(
        defaultAmount,
        recieversAddress,
        recieversName
      )
    );
  }, [defaultAmount, recieversAddress, recieversName]);
  return (
    <div class='bg-gray-900 overflow-hidden h-screen'>
      <h1 class='text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl text-center py-8'>
        <span>Create Widget For </span>
        <span class='text-blue-200 xl:inline'>
          PAN Donation
        </span>
      </h1>
      <div class='px-4 py-5 sm:p-6 flex justify-between'>
        <div className='w-3/12'>
          <div class='rounded-md shadow-sm items-baseline justify-between'>
            <h3 className='mt-2 text-lg tracking-tight text-white mb-2'>
              Default amount for donation (in USD)
            </h3>
            <div className='relative inline-flex'>
              <input
                class='form-input block pl-3 pr-12 sm:text-sm sm:leading-5 rounded h-14 text-3xl'
                placeholder='10.00'
                value={defaultAmount}
                onChange={handleAmountChange}
              />
              <div class='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                <span class='text-gray-500 sm:text-2xl sm:leading-5'>
                  USD
                </span>
              </div>
            </div>
          </div>
          <div class='rounded-md shadow-sm items-baseline justify-between mt-4'>
            <h3 className='mt-2 text-lg tracking-tight text-white mb-2'>
              ETH Address For Donation (required)
            </h3>
            <input
              placeholder='0x6A92864...'
              class='w-full form-input block pl-3 sm:text-sm sm:leading-5 rounded h-14 text-3xl'
              value={recieversAddress}
              onChange={({ target }) => {
                setRecieversAddress(target.value);
              }}
            />
          </div>
          <div class='rounded-md shadow-sm items-baseline justify-between mt-4'>
            <h3 className='mt-2 text-lg tracking-tight text-white mb-2'>
              Name of the organisation (optional)
            </h3>
            <input
              placeholder='DAppNode'
              class='w-full form-input block pl-3 pr-12 sm:text-sm sm:leading-5 rounded h-14 text-3xl'
              value={recieversName}
              onChange={({ target }) =>
                setRecieversName(target.value)
              }
            />
          </div>
        </div>
        <div className='w-8/12 h-full'>
          <CopyBlock
            text={htmlText}
            language='jsx'
            showLineNumbers={true}
            wrapLines
            theme={dracula}
            className='h-screen'
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
