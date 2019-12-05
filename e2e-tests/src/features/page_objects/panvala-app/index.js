import { BasePanvalaApp } from './BasePanvalaApp'
import { Ballots } from './ballots/Ballots';
import { Parameters } from './parameters/Parameters';
import { CreateProposals } from './proposals/CreateProposals';
import { Proposal } from './proposals/Proposal';
import { Proposals } from './proposals/Proposals';
import { CreateGovernance } from './slates/CreateGovernance';
import { CreateGrant } from './slates/CreateGrant';
import { CreateSlates } from './slates/CreateSlates';
import { Slate } from './slates/Slate';
import { Slates } from './slates/Slates';
import { Wallet } from './wallet/Wallet';

export default {
    BasePanvalaApp: BasePanvalaApp,
    Ballots: Ballots,
    Parameters: Parameters,
    CreateProposals: CreateProposals,
    Proposal: Proposal,
    Proposals: Proposals,
    CreateGovernance: CreateGovernance,
    CreateGrant: CreateGrant,
    CreateSlates: CreateSlates,
    Slate: Slate,
    Slates: Slates,
    Wallet: Wallet
};
