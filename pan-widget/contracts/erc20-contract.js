import web3 from './web3';
import ERC20ABI from './ERC20.abi.json';

const contract = (addr) =>
  new web3.eth.Contract(ERC20ABI, addr);

console.log(web3, 'web3');

export default contract;
