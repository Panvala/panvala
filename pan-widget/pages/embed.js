import { UseWalletProvider } from 'use-wallet';
import App from '../components/app';

function Embed(props) {
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
      <App />
    </UseWalletProvider>
  );
}

export default Embed;
