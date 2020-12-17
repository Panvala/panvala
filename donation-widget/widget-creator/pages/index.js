import { useEffect, useState } from 'react';
import Head from 'next/head';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import useCopyToClipboard from '../utils/useCopyToClipBoard';

let sampleHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <script src="https://panvala.vercel.app/widget.js"></script>
  </head>
  <body>
  <div id="panWidget"></div>
</body>
</html>`;

function Home() {
  const [htmlText, setHtmlText] = useState(sampleHTML);
  const [defaultAmount, setDefaultAmount] = useState(50);
  const [recieversAddress, setRecieversAddress] = useState(
    ''
  );

  const [copied, copy] = useCopyToClipboard(htmlText);
  function handleAmountChange({ target }) {
    let regExpr = new RegExp('^[0-9]+$'); // check for number
    if (!regExpr.test(target.value)) {
      setDefaultAmount('');
    } else {
      setDefaultAmount(target.value);
    }
  }

  useEffect(() => {
    Prism.highlightAll();
  }, [htmlText]);

  function updateHtmlText(amount = 50, address = '') {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <script src="https://panvala.vercel.app/widget.js"></script>
    </head>
    <body>
      <div id="panWidget"></div>
      <script >
        panWidget.init(${JSON.stringify({
          defaultAmpunt: amount,
          toAddress: address,
        })})
      </script>
    </body>
    </html>`;
  }

  useEffect(() => {
    setHtmlText(
      updateHtmlText(defaultAmount, recieversAddress)
    );
  }, [defaultAmount, recieversAddress]);
  return (
    <div className=''>
      <Head>
        <title>PAN Donation Widget</title>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
        />
      </Head>
      <div className='overflow-hidden max-w-6xl mx-auto'>
        <h1 className='text-4xl inline-block tracking-tight font-bold text-center leading-3 text-white sm:text-5xl md:text-6xl py-12 w-full'>
          <span>Create Your Custom Widget For </span>
          <span className='text-black block pt-4'>
            PAN Donations
          </span>
        </h1>
        <div className='px-4 py-5 sm:p-6 flex justify-between'>
          <div className='w-3/12'>
            <div className='rounded-md shadow-sm items-baseline justify-between'>
              <h3 className='mt-2 text-lg tracking-tight text-white mb-2'>
                Default amount for donations (in USD)
              </h3>
              <div className='relative w-full'>
                <input
                  className='form-input block pl-3 pr-12 sm:text-sm sm:leading-5 rounded h-14 text-3xl w-full'
                  placeholder='10.00'
                  value={defaultAmount}
                  onChange={handleAmountChange}
                />
                <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                  <span className='text-gray-500 sm:text-2xl sm:leading-5'>
                    USD
                  </span>
                </div>
              </div>
            </div>
            <div className='rounded-md shadow-sm items-baseline justify-between mt-4'>
              <h3 className='mt-2 text-lg tracking-tight text-white mb-2'>
                Ethereum(ETH) address to recieve donations
                (required)
              </h3>
              <input
                placeholder='0x6A92864...'
                className='w-full form-input block pl-3 sm:text-sm sm:leading-5 rounded h-14 text-3xl'
                value={recieversAddress}
                onChange={({ target }) => {
                  setRecieversAddress(target.value);
                }}
              />
            </div>
          </div>
          <div className='w-8/12 h-full'>
            <div className='Code relative whitespace-pre'>
              <pre>
                <code className={`language-html`}>
                  {htmlText}
                </code>
              </pre>
              <button
                onClick={() => copy(htmlText)}
                className='absolute top-0 right-0 bg-blue-200 p-2 shadow-lg'
              >
                {copied ? 'Copied' : 'Copy to clipboard'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
