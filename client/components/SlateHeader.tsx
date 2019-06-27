import { IBallotDates, ISlate } from '../interfaces';
import { convertEVMSlateStatus } from '../utils/status';
import Flex from './system/Flex';
import Tag from './Tag';
import Deadline from './Deadline';

interface ISlateHeaderProps {
  slate: ISlate;
  currentBallot: IBallotDates;
}

const SlateHeader = ({ slate, currentBallot }: ISlateHeaderProps) => {
  const status = convertEVMSlateStatus(slate.status);
  return (
    <Flex justifyBetween alignCenter width="100%">
      <Flex>
        <Tag status={''}>{slate.category.toUpperCase()}</Tag>
        <Tag status={status}>{status}</Tag>
      </Flex>
      <Deadline ballot={currentBallot} route={'/slates'} />
    </Flex>
  );
};

export default SlateHeader;
