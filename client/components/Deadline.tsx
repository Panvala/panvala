import * as React from 'react';
import styled from 'styled-components';
import { color } from 'styled-system';
import { ITag, IBallotDates } from '../interfaces';
import { COLORS } from '../styles';
import { isBallotOpen, getPrefixAndDeadline } from '../utils/status';
import { tsToDeadline } from '../utils/datetime';

const StyledDeadline = styled.div<{ ballot: IBallotDates }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  font-weight: bold;
  line-height: 1rem;
  border-radius: 4px;
  margin-right: 1rem;
  border: 1px solid transparent;
  padding: 0 0.5rem;
  background-color: ${({ ballot }: any) => (isBallotOpen(ballot) ? COLORS.yellow1 : COLORS.grey5)};
  color: ${COLORS.text};
  letter-spacing: 0;
  height: 2rem;
  ${color};
`;

interface IProps extends ITag {
  ballot: IBallotDates;
  route: string;
}

const Deadline: React.FunctionComponent<IProps> = ({ ballot, route }) => {
  const { prefix, deadline: timestamp } = getPrefixAndDeadline(ballot, route);
  const deadline = timestamp === 0 ? '' : tsToDeadline(timestamp);
  return (
    <Wrapper>
      <StyledDeadline ballot={ballot}>{`${prefix} ${deadline}`}</StyledDeadline>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default Deadline;
