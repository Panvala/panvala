import * as React from 'react';
import styled from 'styled-components';
import { AppContext } from '../../components/Layout';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Deadline from '../../components/Deadline';
import RouterLink from '../../components/RouterLink';
import RouteTitle from '../../components/RouteTitle';
import { IAppContext } from '../../interfaces';

const CardsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const Proposals: React.SFC<any> = () => {
  const { proposals, currentBallot }: IAppContext = React.useContext(AppContext);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex">
          {/* TODO: componentize */}
          <RouteTitle className="mr3">{'Proposals'}</RouteTitle>
          <RouterLink
            href="/proposals/create"
            as="/proposals/create"
            classNames="flex items-center"
          >
            <Button type="default">{'Add Proposal'}</Button>
          </RouterLink>
        </div>
        {currentBallot.votingOpenDate && <Deadline ballot={currentBallot} route="proposals" />}
      </div>

      <CardsWrapper>
        {proposals && proposals.length
          ? proposals.map((proposal: any) => (
              <div key={proposal.id}>
                <RouterLink
                  href={`/DetailedView?id=${proposal.id}`}
                  as={`/proposals/${proposal.id}`}
                >
                  <Card
                    title={proposal.title}
                    subtitle={proposal.tokensRequested + ' Tokens Requested'}
                    description={proposal.summary}
                    category={'GRANT PROPOSAL'}
                  />
                </RouterLink>
              </div>
            ))
          : null}
      </CardsWrapper>
    </div>
  );
};

export default Proposals;
