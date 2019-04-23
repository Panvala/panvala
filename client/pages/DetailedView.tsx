import * as React from 'react';
import styled from 'styled-components';
import { withRouter } from 'next/router';
import { COLORS } from '../styles';
import { AppContext } from '../components/Layout';
import Button from '../components/Button';
import RouteTitle from '../components/RouteTitle';
import SectionLabel from '../components/SectionLabel';
import Tag from '../components/Tag';
import Card, { CardAddress } from '../components/Card';
import Deadline from '../components/Deadline';
import { IProposal, ISlate, IAppContext, StatelessPage, IBallotDates } from '../interfaces';
import { splitAddressHumanReadable, formatPanvalaUnits } from '../utils/format';
import { isPendingTokens, statuses } from '../utils/status';
import RouterLink from '../components/RouterLink';

const Incumbent = styled.div`
  color: ${COLORS.primary};
  font-weight: bold;
  font-size: 0.8rem;
  margin-top: 1rem;
`;
const Separator = styled.div`
  border: 1px solid ${COLORS.grey5};
`;

const Container = styled.div`
  display: flex;
  border: 2px solid ${COLORS.grey5};
`;
const MetaColumn = styled.div`
  width: 30%;
  padding: 1.5rem 0;
  border-right: 2px solid ${COLORS.grey5};
`;
const TokensBorder = styled.div`
  margin: 0 1em;
  border: 2px solid ${COLORS.grey5};
`;
const TokensSection = styled.div`
  padding: 0 1.25rem 1rem;
  color: ${COLORS.grey3};
  margin-top: 1em;
`;
const StakingRequirement = styled.div`
  font-size: 1.6rem;
  color: ${COLORS.grey1};
`;
const DarkText = styled.div`
  color: ${COLORS.grey1};
`;

const MainColumn = styled.div`
  width: 70%;
  padding: 1.2rem;
`;
const SlateProposals = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

interface IStakeSidebarProps {
  slate: ISlate;
}

interface IStakeHeaderProps {
  slate: ISlate;
  currentBallot: IBallotDates;
  router: any;
}

interface IStakeDetailProps {
  slate: ISlate;
  currentBallot: IBallotDates;
  router: any;
}

export const SlateSidebar = ({ slate }: IStakeSidebarProps): any => {
  // button: 'Stake Tokens' or 'View Ballot' or null
  const button =
    slate.status === statuses.PENDING_TOKENS ? (
      <RouterLink href={`/slates/stake?slateID=${slate.id}`} as="/slates/stake">
        <Button large type="default">
          {'Stake Tokens'}
        </Button>
      </RouterLink>
    ) : slate.status === statuses.PENDING_VOTE ? (
      <RouterLink href="/ballots" as="/ballots">
        <Button large type="default">
          {'View Ballot'}
        </Button>
      </RouterLink>
    ) : null;

  const instructions =
    slate.status === statuses.PENDING_TOKENS ? (
      <>
        <SectionLabel>{'STAKING REQUIREMENT'}</SectionLabel>
        <StakingRequirement>{formatPanvalaUnits(slate.requiredStake)}</StakingRequirement>
      </>
    ) : null;

  const isStaked =
    slate.status === statuses.PENDING_VOTE ||
    slate.status === statuses.SLATE_ACCEPTED ||
    slate.status === statuses.SLATE_REJECTED;

  return (
    <>
      {button}
      <TokensBorder>
        <TokensSection>
          <div>{instructions}</div>
          <div className="f6 lh-copy">
            If you want the Panvala Awards Committee to keep making recommendations and approve of
            the work they have done, you should stake tokens on this slate.
          </div>
        </TokensSection>

        <Separator />

        <TokensSection>
          <SectionLabel lessMargin>{'CREATED BY'}</SectionLabel>
          <DarkText>{slate.owner}</DarkText>
          <CardAddress>{splitAddressHumanReadable(slate.ownerAddress)}</CardAddress>

          {slate.verifiedRecommender ? (
            <>
              <SectionLabel lessMargin>{'ORGANIZATION'}</SectionLabel>
              <DarkText>{slate.organization}</DarkText>
            </>
          ) : null}
        </TokensSection>

        {isStaked && slate.staker && (
          <>
            <Separator />
            <TokensSection>
              <SectionLabel lessMargin>{'STAKED BY'}</SectionLabel>
              <CardAddress>{splitAddressHumanReadable(slate.staker)}</CardAddress>
            </TokensSection>
          </>
        )}
      </TokensBorder>
    </>
  );
};

export const SlateHeader = ({ slate, currentBallot, router }: IStakeHeaderProps) => {
  return (
    <>
      <div className="flex">
        <Tag status={''}>{slate.category.toUpperCase()}</Tag>
        <Tag status={slate.status}>{slate.status}</Tag>
      </div>
      {slate.deadline && <Deadline ballot={currentBallot} route={router.asPath} />}
    </>
  );
};

export const SlateDetail = ({ slate, currentBallot, router }: IStakeDetailProps): any => {
  return (
    <div className="flex flex-column">
      <div className="flex justify-between">
        <SlateHeader slate={slate} router={router} currentBallot={currentBallot} />
      </div>

      {slate.incumbent && <Incumbent>INCUMBENT</Incumbent>}

      <RouteTitle>{slate.title}</RouteTitle>

      <Container>
        <MetaColumn>
          <SlateSidebar slate={slate} />
        </MetaColumn>
        <MainColumn>
          <SectionLabel>DESCRIPTION</SectionLabel>
          <DarkText>{slate.description}</DarkText>
          {slate.proposals.length ? (
            <>
              <SectionLabel>{'GRANTS'}</SectionLabel>
              <SlateProposals>
                {slate.proposals.map((proposal: IProposal, index: number) => (
                  <div key={proposal.id}>
                    <RouterLink
                      href={`/DetailedView?id=${proposal.id}`}
                      as={`/proposals/${proposal.id}`}
                    >
                      <Card
                        key={proposal.title + index}
                        title={proposal.title}
                        subtitle={proposal.tokensRequested + ' Tokens Requested'}
                        description={proposal.summary}
                        category={'GRANT PROPOSAL'}
                      />
                    </RouterLink>
                  </div>
                ))}
              </SlateProposals>
            </>
          ) : null}
        </MainColumn>
      </Container>
    </div>
  );
};

interface IProposalSidebarProps {
  proposal: IProposal;
  includedInSlates: ISlate[];
}

interface IProposalHeaderProps {
  proposal: IProposal;
  includedInSlates: ISlate[];
  currentBallot: IBallotDates;
  router: any;
}

interface IProposalDetailProps {
  proposal: IProposal;
  includedInSlates: ISlate[];
  currentBallot: IBallotDates;
  router: any;
}

export const ProposalHeader = ({
  proposal,
  includedInSlates,
  currentBallot,
  router,
}: IProposalHeaderProps): any => {
  if (includedInSlates.length === 1) {
    const slate = includedInSlates[0];

    {
      /* this should be proposal.status */
    }
    const accepted = slate.status === statuses.SLATE_ACCEPTED;

    return (
      <>
        <div className="flex">
          <Tag status={''}>{slate.category.toUpperCase() + ' PROPOSAL'}</Tag>
          {accepted && <Tag status={slate.status}>{slate.status}</Tag>}
        </div>
        {slate.deadline && (
          <Deadline
            ballot={currentBallot}
            route={router.asPath}
            // deadline={slate.deadline}
            // status={slate.status}
          />
        )}
      </>
    );
  } else {
    return (
      <>
        <div className="flex">
          <Tag status={''}>{'GRANT PROPOSAL'}</Tag>
        </div>
      </>
    );
  }
};

export const ProposalSidebar = ({ proposal, includedInSlates }: IProposalSidebarProps): any => {
  const button = isPendingTokens('1') ? (
    <RouterLink href="/ballots" as="/ballots">
      <Button large type="default">
        {'View Ballot'}
      </Button>
    </RouterLink>
  ) : (
    <RouterLink href={`/slates/create?selectedProposal=${proposal.id}`} as={`/slates/create`}>
      <Button large type="default">
        {'Add to a New Slate'}
      </Button>
    </RouterLink>
  );

  const slates =
    includedInSlates.length > 0
      ? includedInSlates.map(includedInSlate => (
          <RouterLink
            href={`/DetailedView?id=${includedInSlate.id}`}
            as={`/slates/${includedInSlate.id}`}
            key={includedInSlate.id}
          >
            <DarkText>{includedInSlate.title}</DarkText>
          </RouterLink>
        ))
      : 'None';

  return (
    <>
      {button}
      <TokensBorder>
        <TokensSection>
          <SectionLabel lessMargin>{'TOKENS REQUESTED'}</SectionLabel>
          <DarkText>{proposal.tokensRequested}</DarkText>
        </TokensSection>

        <Separator />

        <TokensSection>
          <SectionLabel lessMargin>{'CREATED BY'}</SectionLabel>
          <DarkText>{proposal.firstName + ' ' + proposal.lastName}</DarkText>
          <SectionLabel lessMargin>{'EMAIL ADDRESS'}</SectionLabel>
          <DarkText>{proposal.email}</DarkText>

          <SectionLabel lessMargin>{'INCLUDED IN SLATES'}</SectionLabel>
          {slates}
        </TokensSection>
      </TokensBorder>
    </>
  );
};

export const ProposalDetail = ({
  proposal,
  includedInSlates,
  router,
  currentBallot,
}: IProposalDetailProps): any => {
  return (
    <div className="flex flex-column">
      <div className="flex justify-between">
        <ProposalHeader
          proposal={proposal}
          router={router}
          includedInSlates={includedInSlates}
          currentBallot={currentBallot}
        />
      </div>

      <RouteTitle>{proposal.title}</RouteTitle>

      <Container>
        <MetaColumn>
          <ProposalSidebar proposal={proposal} includedInSlates={includedInSlates} />
        </MetaColumn>
        <MainColumn>
          <SectionLabel>PROJECT SUMMARY</SectionLabel>
          <DarkText>{proposal.summary}</DarkText>
          <SectionLabel>{'PROJECT TIMELINE'}</SectionLabel>
          <DarkText>{proposal.projectTimeline}</DarkText>
          <SectionLabel>{'PROJECT TEAM'}</SectionLabel>
          <DarkText>{proposal.teamBackgrounds}</DarkText>
        </MainColumn>
      </Container>
    </div>
  );
};

const DetailedView: StatelessPage<any> = ({ router }) => {
  const { slates, proposals, currentBallot }: IAppContext = React.useContext(AppContext);

  const currentContext: string = router.asPath.startsWith('/slates') ? 'slates' : 'proposals';
  const identifier: number = parseInt(router.query.id);

  let slate: ISlate | undefined;
  let proposal: IProposal | undefined;
  let includedInSlates: ISlate[] = [];

  // TODO: read from contract
  const requiredStake = '500000000000000000000';

  // Find the matching slate
  if (currentContext === 'slates') {
    slate = (slates as ISlate[]).find((slate: ISlate) => slate.id === identifier);
    if (typeof slate !== 'undefined') {
      slate.requiredStake = requiredStake;
    }
  } else if (currentContext === 'proposals') {
    // Or, find the matching proposal
    proposal = (proposals as IProposal[]).find((proposal: IProposal) => proposal.id === identifier);

    // Get the slates that it is included in
    if (proposal && slates) {
      includedInSlates = slates.filter(
        slate => slate.proposals.filter(p => p.id === proposal.id).length > 0
      );
      console.log('includedInSlates:', includedInSlates);
    }
  }

  // Set the target object
  const slateOrProposal: any = slate || proposal;
  console.log('slateOrProposal:', slateOrProposal);
  console.log('slate status:', slateOrProposal);

  if (!slateOrProposal) {
    return <div>Loading...</div>;
  }

  if (currentContext === 'slates') {
    return <SlateDetail slate={slate} currentBallot={currentBallot} router={router} />;
  } else {
    return (
      <ProposalDetail
        proposal={proposal}
        includedInSlates={includedInSlates}
        currentBallot={currentBallot}
        router={router}
      />
    );
  }
};

export default withRouter(DetailedView);
