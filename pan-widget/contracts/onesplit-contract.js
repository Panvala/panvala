import web3 from './web3';
import onesplitABI from './onesplit.abi.json';

const onesplitAddress =
  '0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E';

const contract = new web3.eth.Contract(
  onesplitABI,
  onesplitAddress
);

export default contract;
