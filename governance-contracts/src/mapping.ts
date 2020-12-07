
import { Approval as ApprovalEvent, Transfer as TransferEvent } from "../generated/BasicToken/BasicToken";

import { 
  Approval,
  Transfer,
} from '../generated/schema'; 


export function handleApproval(event: ApprovalEvent): void {
  let approval = new Approval(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  approval.owner = event.params.owner;
  approval.spender = event.params.spender;
  approval.value = event.params.value;
  approval.save();
}

export function handleTransfer(event: TransferEvent): void {
  let transfer = new Transfer(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.value = event.params.value;
  transfer.save();
}

   

export function handleBalancesUpdated(event: BalancesUpdatedEvent): void {
        let id = event.transaction.hash.toHex() + '-' + event.logIndex.toString();
        let vote = new BalancesUpdated(id);

        vote.voter = event.params.voter;
        vote.numTokens = event.params.numTokens;
        vote.save();
       }   


