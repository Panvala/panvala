import Web3 from 'web3';

if (typeof window !== 'undefined' && window.ethereum) {
  var web3 = new Web3(window.ethereum);
} else {
  var web3 = new Web3(
    `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`
  );
}

// 'https://cloudflare-eth.com'

export default web3;
