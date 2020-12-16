import ReactDOM from 'react-dom';

// import App from './App';

// const title = 'My Minimal React Webpack Babel Setup';

import { UseWalletProvider } from 'use-wallet';
import App from './components/app';
import './styles/index.css';

function Widget({ config }) {
  return (
    <UseWalletProvider
      chainId={1}
      connectors={{
        fortmatic: { apiKey: '' },
        portis: { dAppId: '' },
        walletconnect: {
          rpcUrl:
            'https://mainnet.infura.io/v3/d5229d333091492d97e4791ca44c2596',
        },
        walletlink: {
          url:
            'https://mainnet.infura.io/v3/d5229d333091492d97e4791ca44c2596',
        },
      }}
    >
      <App config={config} />
    </UseWalletProvider>
  );
}

// ReactDOM.render(
//   <Widget
//     config={{
//       defaultAmount: 600,
//       recieverAddress: '0x6A928643E35E254fcc6927c689694897712d3827',
//     }}
//   />,
//   document.getElementById('app')
// );

export const init = (config) => {
  ReactDOM.render(
    <Widget config={config} />,
    document.getElementById('widget')
  );
};
