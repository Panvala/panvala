import {
  ParameterSet as ParameterSetEvent,
  ProposalAccepted as ProposalAcceptedEvent,
  ProposalCreated as ParameterProposalCreatedEvent,
} from '../generated/ParameterStore/ParameterStore';

import { ParameterSet, ProposalAccepted, ParameterProposalCreated } from '../generated/schema';

export function handleParameterSet(event: ParameterSetEvent): void {
         let id = event.transaction.hash.toHex() + '-' + event.logIndex.toString();
         let parameter = new ParameterSet(id);

         parameter.name = event.params.name;
         parameter.key = event.params.key;
         parameter.value = event.params.value;
         parameter.save();
       }

export function handleProposalAccepted(event: ProposalAcceptedEvent): void {
         let id = event.transaction.hash.toHex() + '-' + event.logIndex.toString();
         let proposal = new ProposalAccepted(id);

         proposal.proposalID = event.params.proposalID;
         proposal.key = event.params.key;
         proposal.value = event.params.value;
         proposal.save();
       }

export function handleParameterProposalCreated(event: ParameterProposalCreatedEvent): void {
         let id = event.transaction.hash.toHex() + '-' + event.logIndex.toString();
         let proposal = new ParameterProposalCreated(id);

         proposal.proposalID = event.params.proposalID;
         proposal.proposer = event.params.proposer;
         proposal.requestID = event.params.requestID;
         proposal.key = event.params.key;
         proposal.value = event.params.value;
         proposal.metadataHash = event.params.metadataHash;
         proposal.save();
       }