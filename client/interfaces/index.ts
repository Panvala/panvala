export default interface IDataObject {
  id: number;
  name: string;
}

export interface IButton {
  href?: string;
  onClick?: any;
  disabled?: boolean;
  primary?: boolean;
  large?: boolean;
  type?:
    | 'submit'
    | 'default'
    | 'primary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'link'
    | 'firstChoice'
    | 'secondChoice';
  active?: boolean;
}

export interface ITag {
  href?: string;
  disabled?: boolean;
  primary?: boolean;
  large?: boolean;
  type?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'link';
  status?: string;
}

export interface IProposal {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  summary: string;
  tokensRequested: number;
  github?: string;
  referral?: string;
  category?: string;
  createdAt?: any;
  id?: number;
  website?: string;
  organization?: string;
  recommendation?: string;
  projectPlan?: string;
  projectTimeline?: string;
  teamBackgrounds?: string;
  totalBudget?: string;
  otherFunding?: string;
}

export interface ISlate {
  id: string;
  category: string;
  status: string;
  deadline: number | false;
  title: string;
  owner: string;
  ownerAddress: string;
  organization?: string;
  description: string;
  incumbent?: boolean;
  proposals: IProposal[];
  requiredStake: string;
}
