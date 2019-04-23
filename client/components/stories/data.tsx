import Router from 'next/router';
import { ballotDates, statuses } from '../../utils/status';
import { ISlate, IProposal } from '../../interfaces';

// https://github.com/zeit/next.js/issues/1827#issuecomment-323314141
export const mockedRouter = {
  push: () => {},
  prefetch: () => {},
  route: '/DetailedView?id=0',
  query: '?slateID=0',
  asPath: '/slates/0',
};
(Router as any).router = mockedRouter;

export const epochStartDate = 1549040401;
export const currentBallot = ballotDates(15499990);

export const unstakedSlate: ISlate = {
  id: 0,
  category: 'GRANT',
  status: statuses.PENDING_TOKENS,
  deadline: currentBallot.votingOpenDate,
  title: 'Some slate',
  owner: 'John Doe',
  ownerAddress: '0xd115bffabbdd893a6f7cea402e7338643ced44a6',
  organization: 'Team Recommender',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu nibh molestie, auctor ligula a, faucibus ante. Morbi dapibus enim in vulputate congue. Mauris feugiat gravida nibh, sed pellentesque eros pellentesque eu. Sed rutrum vitae magna sed aliquet. Suspendisse facilisis vulputate lobortis. Vestibulum sed dolor eu mi molestie pharetra. Duis ut diam aliquam, molestie erat non, scelerisque ligula. Curabitur accumsan ipsum pellentesque posuere ornare. Sed vulputate cursus accumsan. Morbi efficitur dictum magna, a imperdiet mauris aliquet vitae.',
  proposals: [],
  requiredStake: '300000000000000000000',
  verifiedRecommender: false,
};

export const proposals: IProposal[] = [
  {
    id: 0,
    firstName: 'Amanda',
    lastName: 'Crypto',
    email: 'amanda.crypto@example.com',
    title: 'A great project',
    tokensRequested: '5000000000',
    summary: 'All sorts of amazing things',
    awardAddress: '0xd115bffabbdd893a6f7cea402e7338643ced44a6',
    projectTimeline: 'timeline',
    teamBackgrounds: 'backgrounds',
  },
];
