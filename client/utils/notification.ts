import { INotification } from '../interfaces/contexts';
import { BigNumberish } from 'ethers/utils';

interface IAPINotification {
  type: string;
  proposalID?: BigNumberish;
  slateID?: BigNumberish;
  epochNumber?: BigNumberish;
}

enum NotificationTypes {
  WITHDRAW_VOTING_RIGHTS = 'WITHDRAW_VOTING_RIGHTS',
  WITHDRAW_STAKE = 'WITHDRAW_STAKE',
  WITHDRAW_GRANT = 'WITHDRAW_GRANT',
  PROPOSAL_REJECTED = 'PROPOSAL_REJECTED',
  PROPOSAL_INCLUDED_IN_SLATE = 'PROPOSAL_INCLUDED_IN_SLATE',
  SLATE_ACCEPTED = 'SLATE_ACCEPTED',
  SLATE_REJECTED = 'SLATE_REJECTED',
  BALLOT_OPEN = 'BALLOT_OPEN',
  BALLOT_CLOSED = 'BALLOT_CLOSED',
}

export function normalizeNotifications(notifications: IAPINotification[]): INotification[] {
  return notifications.map((noti: IAPINotification) => {
    switch (noti.type) {
      case NotificationTypes.WITHDRAW_VOTING_RIGHTS: {
        return {
          action: 'Withdraw Voting Rights',
          text: `The ballot has concluded. The tokens you previously deposited are now available to be withdrawn`,
          href: `/Withdraw`,
          asPath: `/withdraw`,
        };
      }
      case NotificationTypes.WITHDRAW_STAKE: {
        return {
          action: 'Withdraw Stake',
          text: `Congratulations! The slate (name) you previously supported has been accepted. Please withdraw your tokens.`,
          href: `/Withdraw`,
          asPath: `/withdraw/${noti.slateID}`,
        };
      }
      case NotificationTypes.WITHDRAW_GRANT: {
        return {
          action: 'Withdraw Grant',
          text: `The tokens you previously deposited are now available to be withdrawn.`,
          href: `/Withdraw`,
          asPath: `/withdraw/${noti.proposalID}`,
        };
      }
      case NotificationTypes.PROPOSAL_REJECTED: {
        return {
          action: 'Proposal Included in Slate',
          text: `Unfortunately, your grant proposal (name) was not included in the winning slate. While no further action is required, please feel free to refine your proposal and resubmit it for future ballots.`,
        };
      }
      case NotificationTypes.PROPOSAL_INCLUDED_IN_SLATE: {
        return {
          action: 'Proposal Included in Slate',
          text: `The grant proposal you created has been included in slate (name)`,
          href: `/slates/slate?id=${noti.slateID}`,
          asPath: `/slates/${noti.slateID}`,
        };
      }
      case NotificationTypes.SLATE_ACCEPTED: {
        return {
          action: 'Slate Accepted',
          text: `Congratulations! The slate (name) you recommended has been adopted successfully. Feel free to contact grant recipients and congratulate them.`,
          href: `/slates/slate?id=${noti.slateID}`,
          asPath: `/slates/${noti.slateID}`,
        };
      }
      case NotificationTypes.SLATE_REJECTED: {
        return {
          action: 'Slate Rejected',
          text: `Unfortunately, the slate (name) you supported was not the winning slate. Your tokens have been contributed to Panvala’s donation smart contract to fund future work to build the Ethereum ecosystem.`,
          href: `/slates/slate?id=${noti.slateID}`,
          asPath: `/slates/${noti.slateID}`,
        };
      }
      case NotificationTypes.BALLOT_OPEN: {
        return {
          action: 'Ballot Open',
          text: `Voting has opened. Vote with your tokens and ensure that your voice is heard.`,
          href: `/ballots?id=${noti.epochNumber}`,
          asPath: `/ballots/${noti.epochNumber}`,
        };
      }
      case NotificationTypes.BALLOT_CLOSED: {
        return {
          action: 'Ballot Closed',
          text: `Voting has concluded. Be sure to check the results and learn more about the outcome of Panvala’s most recent ballot.`,
          href: `/ballots?id=${noti.epochNumber}`,
          asPath: `/ballots/${noti.epochNumber}`,
        };
      }
      default:
        return {
          action: 'unknown notification',
          text: 'sub text',
        };
    }
  });
}
