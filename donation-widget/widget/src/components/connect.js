import { ConnectionRejectedError, useWallet } from 'use-wallet';
import WalletButton from './wallet-button';
import walletInfo from '../utils/wallet.info.json';

function Connect(props) {
  return (
    <div className="px-4 py-5 bg-gray-50 sm:p-4 sm:pb-6">
      <p className="text-black text-sm uppercase tracking-wider">
        Connect Your Wallet
      </p>

      {walletInfo.map((wallet) => (
        <WalletButton key={wallet.name} {...wallet} />
      ))}
    </div>
  );
}

export default Connect;
