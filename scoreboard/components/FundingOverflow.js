import {
  BarChart,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from 'recharts';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';

import records from '../data/record-slugify.json';

const renderCustomLabel = (value) => 'hello';

function FundingOverflow() {
  return (
    <div
      style={{
        padding: '10px',
        width: '100%',
        height: '400px',
      }}
    >
      <ResponsiveContainer>
        <ComposedChart
          data={records}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='communityName' />
          <YAxis type='number' domain={[0, 1500000]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type='monotone'
            dataKey='estimatedFundingPAN'
            fill='#059669'
            stroke='#059669'
          />
          <Area
            type='monotone'
            dataKey='couldHaveRecievedPAN'
            fill='#EF4444'
            stroke='#EF4444'
          />
          <Bar dataKey='stakedTokens' fill='#46b0aa' />
          <Bar dataKey='panDonated' fill='#2138b7' />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

function CustomTooltip(props) {
  if (props.payload[0] != null) {
    const newPayload = [
      {
        name: 'PAN Donated',
        value: props.payload[0].payload.panDonated + ' PAN',
      },
      {
        name: 'PAN Staked',
        value:
          props.payload[0].payload.stakedTokens + ' PAN',
        color: '#46b0aa',
      },

      {
        name: 'PAN Reward Got',
        value:
          props.payload[0].payload.estimatedFundingPAN +
          ' PAN',
        color: '#059669',
      },
      {
        name: 'PAN Could Have Got',
        value:
          props.payload[0].payload.couldHaveRecievedPAN +
          ' PAN',
        color: '#EF4444',
      },
    ];
    return (
      <DefaultTooltipContent
        {...props}
        payload={newPayload}
      />
    );
  }

  // we just render the default
  return <DefaultTooltipContent {...props} />;
}

export default FundingOverflow;
