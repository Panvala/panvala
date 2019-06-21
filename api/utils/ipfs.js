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
function get(multihash, options) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('ipfs request timed out'));
    }, 7000);

    ipfs.cat(multihash).then(response => {
      clearTimeout(timer);

      if (options.json) {
        try {
          const data = JSON.parse(response);
          resolve(data);
        } catch (error) {
          console.log(`ERROR: while JSON.parse result: ${error.message}`);
          throw error;
        }
      }
    });
  });
}

module.exports = {
  get,
};
