import * as React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles';
import Button from '../../components/Button';
import { MainContext } from '../../components/MainProvider';
import RouterLink from '../../components/RouterLink';
import { convertEVMSlateStatus, isPendingTokens } from '../../utils/status';
import { StatelessPage, IMainContext, ISlate, IBallotDates, IProposal } from '../../interfaces';
import SectionLabel from '../../components/SectionLabel';
import Tag from '../../components/Tag';
import Deadline from '../../components/Deadline';
import RouteTitle from '../../components/RouteTitle';

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
const DarkText = styled.div`
  color: ${COLORS.grey1};
`;

const MainColumn = styled.div`
  width: 70%;
  padding: 1.2rem;
`;

interface IProposalSidebarProps {
  proposal: IProposal;
  includedInSlates: ISlate[];
}

interface IProposalHeaderProps {
  proposal: IProposal;
  includedInSlates: ISlate[];
  currentBallot: IBallotDates;
}

export const ProposalHeader = ({
  proposal,
  includedInSlates,
  currentBallot,
}: IProposalHeaderProps): any => {
  if (includedInSlates.length === 1) {
    const slate = includedInSlates[0];

    {
      /* this should be proposal.status */
    }
    const accepted = slate.status === 3;

    return (
      <>
        <div className="flex">
          <Tag status={''}>{slate.category.toUpperCase() + ' PROPOSAL'}</Tag>
          {accepted && (
            <Tag status={convertEVMSlateStatus(slate.status)}>
              {convertEVMSlateStatus(slate.status)}
            </Tag>
          )}
        </div>
        {slate.deadline && <Deadline ballot={currentBallot} route="/proposals" />}
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
            href={`/slates/slate?id=${includedInSlate.id}`}
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

interface IProps {
  query: {
    id: string;
  };
}

const Proposal: StatelessPage<IProps> = ({ query: { id } }) => {
  const { proposals, slates, currentBallot }: IMainContext = React.useContext(MainContext);

  const proposalID: number = parseInt(id);

  let proposal: IProposal | undefined = (proposals as IProposal[]).find(
    (proposal: IProposal) => proposal.id === proposalID
  );

  if (!proposal) {
    return <div>Loading...</div>;
  }

  let includedInSlates: ISlate[] = [];
  if (slates) {
    includedInSlates = slates.filter(
      slate => slate.proposals.filter(p => p.id === proposal.id).length > 0
    );
  }
  return (
    <div className="flex flex-column">
      <div className="flex justify-between">
        <ProposalHeader
          proposal={proposal}
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

Proposal.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

export default Proposal;
