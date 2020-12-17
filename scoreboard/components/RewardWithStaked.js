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

function StakedVsDonated() {
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
          <YAxis formatter={(label) => label + ' %'} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type='monotone'
            dataKey='shareOfQuadraticFunding'
            fill='#8884d8'
            stroke='#8884d8'
          />
          <Bar
            dataKey='capacityShareOfStakedTokens'
            fill='#46b0aa'
          />
          <Bar
            dataKey='panDonationPercentage'
            fill='#2138b7'
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

function CustomTooltip(props) {
  if (props.payload[0] != null) {
    const newPayload = [
      {
        name: 'Total Reward Percentage',
        value:
          props.payload[0].payload.shareOfQuadraticFunding +
          '%',
      },
      {
        name: 'Token Staked Percentage',
        value:
          props.payload[0].payload
            .capacityShareOfStakedTokens + '%',
        color: '#46b0aa',
      },
      {
        name: 'Tokens Donated Percentage',
        value:
          props.payload[0].payload.panDonationPercentage +
          '%',
        color: '#2138b7',
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

export default StakedVsDonated;
