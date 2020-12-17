import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';

import records from '../data/record-slugify.json';

function NumberOfDonations() {
  return (
    <div
      style={{
        padding: '10px',
        width: '100%',
        height: '300px',
      }}
    >
      <ResponsiveContainer>
        <AreaChart
          width={500}
          height={400}
          data={records}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='communityName' />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type='monotone'
            dataKey='donationCount'
            stackId='1'
            stroke='#8884d8'
            fill='#8884d8'
          />
          <Area
            type='monotone'
            dataKey='estimatedMultiplier'
            stackId='1'
            stroke='#82ca9d'
            fill='#82ca9d'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function CustomTooltip(props) {
  if (props.payload[0] != null) {
    const newPayload = [
      {
        name: 'Number of People Donating',
        value: props.payload[0].payload.donationCount,
        color: '#8884d8',
      },
      {
        name: 'Reward Multiplier',
        value:
          props.payload[0].payload.estimatedMultiplier +
          'X',
        color: '#82ca9d',
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

export default NumberOfDonations;
