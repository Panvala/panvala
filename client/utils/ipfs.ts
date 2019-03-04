const IPFS = require('ipfs-mini');
const isIPFS = require('is-ipfs')

const ipfs: any = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export function ipfsCheckMultihash(multihash: string): boolean | Error {
  if (isIPFS.multihash(multihash)) {
    return true;
  }
  throw new Error('invalid multihash');
}

export async function ipfsGetData(multihash: string) {
  if (ipfsCheckMultihash(multihash)) {
    return new Promise((resolve, reject) => {
      ipfs.catJSON(multihash, (err: any, result: string) => {
        if (err) reject(new Error(err));
        resolve(result);
      });
    });
  }
}

export async function ipfsAddObject(obj: any): Promise<string> {
  const CID: string = await new Promise((resolve, reject) => {
    ipfs.addJSON(obj, (err: any, result: string) => {
      if (err) reject(new Error(err));
      resolve(result);
    });
  });
  console.log('CID:', CID);
  return CID;
}
