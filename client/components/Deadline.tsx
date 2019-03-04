import React, { Children } from 'react';
import styled from 'styled-components';
import { ITag } from '../interfaces';
import { COLORS } from '../styles';
import Tag from './Tag';
import { statuses } from '../utils/data';

const StyledDeadline = styled(Tag)`
  background-color: ${({ status }: any) =>
    status === statuses.PENDING_TOKENS || status === statuses.PROPOSAL_DEADLINE
      ? COLORS.grey5
      : status === statuses.PENDING_VOTE
      ? COLORS.yellow1
      : 'rgba(89, 182, 230, 0.2)'};
  color: ${COLORS.text};
  letter-spacing: 0;
  height: 2rem;
`;

const Deadline: React.FunctionComponent<ITag> = props => {
  return (
    <Wrapper>
      <StyledDeadline {...props}>{`${
        props.status === statuses.PENDING_TOKENS
          ? 'SLATE STAKING DEADLINE'
          : props.status === statuses.PROPOSAL_DEADLINE
          ? 'PROPOSAL DEADLINE'
          : 'VOTE UNTIL'
      } ${Children.toArray(props.children)} EST`}</StyledDeadline>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default Deadline;
