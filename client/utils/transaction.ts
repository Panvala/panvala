import { TransactionReceipt, TransactionResponse, Web3Provider } from 'ethers/providers';
import { LogDescription } from 'ethers/utils';
import { Contract } from 'ethers';

export interface IMinedTransaction {
  receipt: TransactionReceipt;
  decodedLogs?: LogDescription[];
}

/**
 * Send a Tx to a Contract
 * Wait for Tx to get mined
 * Return Tx receipt and decoded logs (optionally filtered for specified event name)
 */
export async function sendAndWaitForTransaction(
  provider: Web3Provider,
  contract: Contract,
  method: string,
  inputs: any[],
  eventName: string = ''
): Promise<IMinedTransaction | void> {
  // send the tx
  return contract.functions[method](...inputs)
    .then((response: TransactionResponse) => {
      // wait for tx to get mined
      return provider.waitForTransaction((response as any).hash);
    })
    .then((receipt: TransactionReceipt) => {
      let decodedLogs: LogDescription[] | undefined;
      if (receipt.logs) {
        // Get the logs from the receipt
        decodedLogs = receipt.logs
          .map(log => {
            // decode the logs
            return contract.interface.parseLog(log);
          })
          .filter(d => d !== null);
        if (eventName) {
          // filter for the specified event name
          decodedLogs = decodedLogs.filter(d => d.name == eventName);
        }
      }
      return {
        decodedLogs,
        receipt,
      };
    })
    .catch((error: any) => {
      console.log('send tx error:', error);
    });
}
