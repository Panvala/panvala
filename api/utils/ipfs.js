const IPFS = require('ipfs-http-client');

const ipfsHost = process.env.IPFS_HOST || 'ipfs.infura.io';
const ipfsPort = process.env.IPFS_PORT || 5001;

const ipfs = new IPFS({ host: ipfsHost, port: ipfsPort, protocol: 'https' });

/**
 * Get a file from IPFS
 * Options:
 *   {Boolean} json Whether to parse as JSON
 * @param {String} multihash
 * @param {Object} options
 */
async function get(multihash, options) {
  const json = options.json || false;

  return new Promise((resolve, reject) => {
    ipfs.cat(multihash, (err, result) => {
      if (err) reject(new Error(err));
      if (!result) reject(new Error('nothing came back!'))
      const data = json ? JSON.parse(result) : result;
      resolve(data);
    });
  });
}

module.exports = {
  get,
};
