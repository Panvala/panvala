import {
  makeStyles,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { useEffect } from 'react';
import {
  BarChart,
  Bar,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Pie,
  PieChart,
} from 'recharts';
import Header from '../components/Header';
import EstimatedFunds from '../components/EstimatedFunds';
import records from '../data/record-slugify.json';

import BaseLayout from '../layout';
import { getQuarterData } from '../utils/getData';
import NumberOfPeople from '../components/NumberOfPeople';
import TotalTokensStaked from '../components/TotalTokensStaked';
import StakedVsDonated from '../components/RewardWithStaked';
import FundingOverflow from '../components/FundingOverflow';
import DonationVsStaked from '../components/DonationVsStaked';
import NumberOfDonations from '../components/NumberOfDonations';

const quarterlyMetrics = [
  {
    date: '4/7/2020',
    leagueValue: 37650,
    fullValue: 49312.56,
    leagueDonations: 2905.47,
    fullDonations: 9978.74,
    leagueMultiplier: 12.96,
    fullMultiplier: 4.94,
  },
  {
    date: '7/3/2020',
    leagueValue: 50870.73,
    fullValue: 67827.61,
    leagueDonations: 9950.78,
    fullDonations: 12680.81,
    leagueMultiplier: 5.11,
    fullMultiplier: 5.35,
  },
  {
    date: '10/2/2020',
    leagueValue: 151450.49,
    fullValue: 201933.9,
    leagueDonations: 14757.34,
    fullDonations: 17490.25,
    leagueMultiplier: 10.26,
    fullMultiplier: 11.55,
  },
];

const useStyles = makeStyles((theme) => ({
  button: {
    color: 'white',
  },
  gridItemPaper: {
    minHeight: 300,
    padding: theme.spacing(4),
  },
}));

export default function Index() {
  const classes = useStyles();
  const quarterData = getQuarterData();

  return (
    <BaseLayout>
      <Header />
      <Grid container spacing={2}>
        <Grid item lg={4} sm={6} xl={4} xs={12}>
          <EstimatedFunds quarterData={quarterData} />
        </Grid>
        <Grid item lg={4} sm={6} xl={4} xs={12}>
          <TotalTokensStaked quarterData={quarterData} />
        </Grid>
        <Grid item lg={4} sm={6} xl={4} xs={12}>
          <NumberOfPeople quarterData={quarterData} />
        </Grid>

        <Grid item sm={12} md={6}>
          <Paper className={classes.gridItemPaper}>
            <Typography
              component='h1'
              variant='h4'
              gutterBottom
            >
              Quarterly Value Allocated
            </Typography>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={quarterlyMetrics}>
                  <XAxis dataKey='date' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey='leagueValue'
                    name='Panvala League'
                    fill='#2138b7'
                  />
                  <Bar
                    dataKey='fullValue'
                    name='Full Treasury'
                    fill='#46b0aa'
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={classes.gridItemPaper}>
            <Typography
              component='h1'
              variant='h4'
              gutterBottom
            >
              Quarterly Donations
            </Typography>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={quarterlyMetrics}>
                  <XAxis dataKey='date' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey='leagueDonations'
                    name='Panvala League'
                    fill='#2138b7'
                  />
                  <Bar
                    dataKey='fullDonations'
                    name='Full Treasury'
                    fill='#46b0aa'
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>
        <Grid item sm={12}>
          <Paper className={classes.gridItemPaper}>
            <Typography
              component='h1'
              variant='h4'
              gutterBottom
            >
              Staked Token VS Donated Tokens VS Funding
              Received
            </Typography>
            <Typography
              component='h1'
              variant='caption'
              gutterBottom
            >
              If the donated amount is in proportion to
              staked amount you get maximum returns.
            </Typography>

            <StakedVsDonated />
          </Paper>
        </Grid>
        <Grid item sm={12}>
          <Paper className={classes.gridItemPaper}>
            <Typography
              component='h1'
              variant='h4'
              gutterBottom
            >
              Imbalance of Staked and Donated Tokens =
              MISSED OPPURTINITY
            </Typography>
            <Typography
              component='h1'
              variant='caption'
              gutterBottom
            >
              The funding was missed becaus of imbalance in
              Donated and Staked tokens.
            </Typography>

            <FundingOverflow />
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={classes.gridItemPaper}>
            <Typography
              component='h1'
              variant='h4'
              gutterBottom
            >
              Matching Multipliers
            </Typography>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={quarterlyMetrics}>
                  <XAxis dataKey='date' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type='monotone'
                    dataKey='leagueMultiplier'
                    name='Panvala League'
                    stroke='#2138b7'
                  />
                  <Line
                    type='monotone'
                    dataKey='fullMultiplier'
                    name='Full Treasury'
                    stroke='#46b0aa'
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={classes.gridItemPaper}>
            <Typography
              component='h1'
              variant='h4'
              gutterBottom
            >
              Donation vs Staked
            </Typography>

            <DonationVsStaked />
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={classes.gridItemPaper}>
            <Typography
              component='h1'
              variant='h4'
              gutterBottom
            >
              Number of Donations VS Reward Multiplier
            </Typography>
            <Typography variant='caption' gutterBottom>
              Panvala celebrates community, the number of
              people making donation is more important than
              the amount of donation.
            </Typography>

            <NumberOfDonations />
          </Paper>
        </Grid>
        <Grid item sm={12}>
          <Paper className={classes.gridItemPaper}>
            <Typography
              component='h1'
              variant='h4'
              gutterBottom
            >
              Panvala League Communities
            </Typography>
            <Typography
              component='h2'
              variant='h6'
              gutterBottom
            >
              25 communities
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </BaseLayout>
  );
}
