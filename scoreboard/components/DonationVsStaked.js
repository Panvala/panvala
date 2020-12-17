import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';

import records from '../data/record-slugify.json';

function DonationVsStaked() {
  return (
    <div
      style={{
        padding: '10px',
        width: '100%',
        height: '300px',
      }}
    >
      <ResponsiveContainer>
        <LineChart
          width={500}
          height={300}
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
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type='monotone'
            dataKey='panDonationPercentage'
            stroke='#8884d8'
            activeDot={{ r: 8 }}
          />
          <Line
            type='monotone'
            dataKey='capacityShareOfStakedTokens'
            stroke='#82ca9d'
          />
          <Line
            type='monotone'
            dataKey='shareOfQuadraticFunding'
            stroke='#b72158'
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function CustomTooltip(props) {
  if (props.payload[0] != null) {
    const newPayload = [
      {
        name: 'PAN Donated',
        value:
          props.payload[0].payload.panDonationPercentage +
          ' %',
        color: '#8884d8',
      },
      {
        name: 'PAN Staked',
        value:
          props.payload[0].payload
            .capacityShareOfStakedTokens + ' %',
        color: '#82ca9d',
      },

      {
        name: 'PAN Reward Got',
        value:
          props.payload[0].payload.shareOfQuadraticFunding +
          ' %',
        color: '#b72158',
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

export default DonationVsStaked;
