import * as React from 'react';
import { format } from 'date-fns';
import { AxiosResponse } from 'axios';

import { IProposal, ISlate, IMainContext } from '../interfaces';
import { getAllProposals, getAllSlates } from '../utils/api';
import { baseToConvertedUnits } from '../utils/format';

export const MainContext: React.Context<IMainContext> = React.createContext<IMainContext>({
  slates: [],
  proposals: [],
  currentBallot: {
    startDate: 0,
    votingOpenDate: 0,
    votingCloseDate: 0,
    finalityDate: 0,
  },
});

export default class MainProvider extends React.PureComponent {
  readonly state: IMainContext = {
    slates: [],
    proposals: [],
    currentBallot: {
      startDate: 0,
      votingOpenDate: 0,
      votingCloseDate: 0,
      finalityDate: 0,
    },
  };

  async componentDidMount() {
    const [slates, proposals]: [ISlate[], IProposal[]] = await Promise.all([
      this.handleGetAllSlates(),
      this.handleGetAllProposals(),
    ]);

    let proposalData: IProposal[] = [];
    // sort proposals by createdAt
    if (Array.isArray(proposals)) {
      const sortedProposals: IProposal[] = proposals.sort((a: IProposal, b: IProposal) => {
        const timestampA = format(a.createdAt, 'x');
        const timestampB = format(b.createdAt, 'x');
        return parseInt(timestampA) - parseInt(timestampB);
      });
      proposalData = sortedProposals;
    }

    const oneWeekSeconds: number = 604800;
    // Epoch 3
    // beginning of week 1 (2/1)
    const epochStartDate: number = 1549040400; // gatekeeper.functions.currentBatchStart()
    // end of week 11 (4/19)
    const week11EndDate: number = epochStartDate + oneWeekSeconds * 11; // 1555689601
    // end of week 12 (4/26)
    const week12EndDate: number = week11EndDate + oneWeekSeconds;
    // end of week 13 (5/3)
    const week13EndDate: number = week12EndDate + oneWeekSeconds;

    // prettier-ignore
    this.setState({
      slates,
      proposals: proposalData,
      currentBallot: {
        startDate: epochStartDate,
        votingOpenDate: week11EndDate,
        votingCloseDate: week12EndDate,
        finalityDate: week13EndDate,
      },
    });
  }

  async handleGetAllProposals() {
    // TODO: get or sort proposals by category
    let proposals: IProposal[] | AxiosResponse = await getAllProposals();

    // convert tokensRequested: base -> human
    if (Array.isArray(proposals)) {
      proposals = proposals.map((p: any) => {
        p.tokensRequested = baseToConvertedUnits(p.tokensRequested, 18);
        p.category = 'GRANT';
        return p;
      });
    } else {
      throw new Error('invalid proposals type -- AxiosResponse');
    }

    return proposals;
  }

  async handleGetAllSlates() {
    const slates: ISlate[] | AxiosResponse = await getAllSlates();
    if (Array.isArray(slates)) {
      return slates;
    }

    return [];
  }

  handleRefreshProposals = async () => {
    const proposals: IProposal[] = await this.handleGetAllProposals();
    return this.setState({ proposals });
  };
  handleRefreshSlates = async () => {
    const slates: ISlate[] = await this.handleGetAllSlates();
    return this.setState({ slates });
  };

  render() {
    const { children } = this.props;
    return (
      <MainContext.Provider
        value={{
          ...this.state,
          onRefreshProposals: this.handleRefreshProposals,
          onRefreshSlates: this.handleRefreshSlates,
        }}
      >
        {children}
      </MainContext.Provider>
    );
  }
}
