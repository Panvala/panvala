import * as React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { AppContext } from '../../components/Layout';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Deadline from '../../components/Deadline';
import RouteTitle from '../../components/RouteTitle';
import RouterLink from '../../components/RouterLink';
import { ISlate, IAppContext } from '../../interfaces';
import { convertEVMSlateStatus } from '../../utils/status';

const VisibilityFilterContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;
const CardsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

type Props = {
  errors?: string;
  account?: string;
  provider?: any;
  userAgent?: any;
};

const Slates: React.FunctionComponent<Props> = () => {
  const [visibilityFilter] = React.useState('all');
  const { slates, currentBallot }: IAppContext = React.useContext(AppContext);

  let slateData: ISlate[] = [];
  // convert statuses: number -> string (via enum)
  if (Array.isArray(slates)) {
    slateData = slates.map((s: any) => {
      // convert from number to string
      s.status = convertEVMSlateStatus(s.status);
      return s;
    });
  }

  function handleSelectVisibilityFilter(type: string) {
    (toast as any)[type](`Demo: ${type}`);
  }

  return (
    <div>
      <div className="flex justify-between">
        {/* TODO: componentize */}
        <div className="flex">
          <RouteTitle className="mr3">{'Slates'}</RouteTitle>
          <RouterLink href="/slates/create" as="/slates/create" classNames="flex items-center">
            <Button type="default">{'Add Slate'}</Button>
          </RouterLink>
        </div>
        <Deadline ballot={currentBallot} route="slates" />
      </div>

      <VisibilityFilterContainer>
        <Button active={visibilityFilter === 'all'}>{'All'}</Button>
        <Button
          onClick={() => handleSelectVisibilityFilter('info')}
          active={visibilityFilter === 'current'}
        >
          {'Current'}
        </Button>
        <Button
          onClick={() => handleSelectVisibilityFilter('error')}
          active={visibilityFilter === 'past'}
        >
          {'Past'}
        </Button>
      </VisibilityFilterContainer>

      <CardsWrapper>
        {slateData && slateData.length
          ? slateData.map((slate: ISlate) => (
              <div key={slate.id}>
                <RouterLink href={`/DetailedView?id=${slate.id}`} as={`/slates/${slate.id}`}>
                  <Card
                    key={slate.id}
                    title={slate.title}
                    subtitle={slate.proposals.length + ' Grants Included'}
                    description={slate.description}
                    category={slate.category}
                    status={slate.status}
                    address={slate.ownerAddress}
                    recommender={slate.owner}
                    verifiedRecommender={slate.verifiedRecommender}
                  />
                </RouterLink>
              </div>
            ))
          : null}
      </CardsWrapper>
    </div>
  );
};

export default Slates;
