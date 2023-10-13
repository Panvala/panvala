import { BalancesUpdated, Donation, ProposalCreated, TokensWithdrawn } from '../generated/schema';

import {
  BalancesUpdated as BalancesUpdatedEvent,
  ProposalCreated as ProposalCreatedEvent,
  Donation as DonationEvent,
  TokensWithdrawn as TokensWithdrawnEvent,
} from '../generated/TokenCapacitor/TokenCapacitor';

export function handleBalancesUpdated(event: BalancesUpdatedEvent): void {
         let balances = new BalancesUpdated(
           event.transaction.hash.toHex() + '-' + event.logIndex.toString()
         );

         balances.unlockedBalance = event.params.unlockedBalance;
         balances.lastLockedBalance = event.params.lastLockedBalance;
         balances.lastLockedTime = event.params.lastLockedTime;
         balances.totalBalance = event.params.totalBalance;
         balances.save();
       }

export function handleProposalCreated(event: ProposalCreatedEvent): void {
         let proposal = new ProposalCreated(
           event.transaction.hash.toHex() + '-' + event.logIndex.toString()
         );
        

         proposal.proposalID = event.params.proposalID;
         proposal.proposer = event.params.proposer;
         proposal.requestID = event.params.requestID;
         proposal.recipient = event.params.recipient;
         proposal.tokens = event.params.tokens;
         proposal.metadataHash = event.params.metadataHash;
         proposal.save();
       }

export function handleTokensWithdrawn(event: TokensWithdrawnEvent): void {
         let tokens = new TokensWithdrawn(
           event.transaction.hash.toHex() + '-' + event.logIndex.toString()
         );

         tokens.proposalID = event.params.proposalID;
         tokens.to = event.params.to
         tokens.numTokens = event.params.numTokens; 
         tokens.save();
       }

export function handleDonation(event: DonationEvent): void {
         let donation = new Donation(
           event.transaction.hash.toHex() + '-' + event.logIndex.toString()
         );

         donation.payer = event.params.payer;
         donation.donor = event.params.donor;
         donation.numTokens = event.params.numTokens;
         donation.metadataHash = event.params.metadataHash;
         donation.save();
       }