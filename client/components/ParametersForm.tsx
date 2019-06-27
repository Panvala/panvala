import * as React from 'react';
import Flex, { BreakableFlex } from './system/Flex';
import Input from './Input';
import { EthereumContext } from './EthereumProvider';
import { formatPanvalaUnits } from '../utils/format';

const ParameterRow: React.SFC<any> = props => {
  return (
    <Flex
      p={3}
      justifyBetween
      alignCenter
      width="100%"
      bg="white"
      border={1}
      borderColor="greys.light"
    >
      <Flex justifyStart width="25%" fontSize={1}>
        {props.parameterName}
      </Flex>
      <BreakableFlex justifyStart width="35%" fontSize={1}>
        {props.oldValue}
      </BreakableFlex>
      <BreakableFlex justifyStart width="35%" fontSize={1}>
        <Input
          m={0}
          fontFamily="Fira Code"
          name="new-value"
          onChange={(e: any) => props.onChange(props.name, e.target.value)}
          value={props.newValue}
          placeholder="Propose New Value"
        />
      </BreakableFlex>
    </Flex>
  );
};

const ParametersForm: React.SFC<any> = props => {
  const {
    contracts: { gatekeeper },
    slateStakeAmount,
  } = React.useContext(EthereumContext);

  const parameters = [
    {
      parameterName: 'Gatekeeper Address',
      name: 'parameters.gatekeeperAddress.newValue',
      value: gatekeeper.address,
      newValue: props.newSlateStakeAmount,
    },
    {
      parameterName: 'Slate Stake Amount',
      name: 'parameters.slateStakeAmount.newValue',
      value: formatPanvalaUnits(slateStakeAmount),
      newValue: props.newGatekeeperAddress,
    },
  ];
  return (
    <>
      <Flex column>
        <Flex p={3} justifyBetween alignCenter width="100%" fontWeight="bold" bg="greys.light">
          <Flex justifyStart width="25%">
            Current Parameter
          </Flex>
          <Flex justifyStart width="35%">
            Current Value
          </Flex>
          <Flex justifyStart width="35%">
            Propose New Value
          </Flex>
        </Flex>
        {parameters.map(p => (
          <ParameterRow
            key={p.name}
            parameterName={p.parameterName}
            name={p.name}
            oldValue={p.value}
            newValue={p.newValue}
            onChange={props.onChange}
          />
        ))}
      </Flex>
    </>
  );
};

export default ParametersForm;
