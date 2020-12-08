import {
  makeStyles,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
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
} from 'recharts';

import BaseLayout from '../layout';

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

  return (
    <BaseLayout>
      <Grid container spacing={4}>
        <Grid item sm={12}>
          <Paper className={classes.gridItemPaper}>
            <Typography component='h1' variant='h4' gutterBottom>
              Current Quarter
            </Typography>
            <Grid container spacing={4}>
              <Grid item sm={12} md={4}>
                <Typography component='h2' variant='h6'>
                  Total Inflation
                </Typography>
                <Typography variant='body1'>1,755,937.14 PAN</Typography>
              </Grid>
              <Grid item sm={12} md={4}>
                <Typography component='h2' variant='h6'>
                  League Application Deadline
                </Typography>
                <Typography variant='body1'>November 13</Typography>
              </Grid>
              <Grid item sm={12} md={4}>
                <Typography component='h2' variant='h6'>
                  Donations Begin
                </Typography>
                <Typography variant='body1'>December 2</Typography>
              </Grid>
              <Grid item sm={12} md={4}>
                <Typography component='h2' variant='h6'>
                  Donations End
                </Typography>
                <Typography variant='body1'>TBD</Typography>
              </Grid>
              <Grid item sm={12} md={4}>
                <Typography component='h2' variant='h6'>
                  Staking Deadline
                </Typography>
                <Typography variant='body1'>January 15</Typography>
              </Grid>
              <Grid item sm={12} md={4}>
                <Typography component='h2' variant='h6'>
                  Stake Holding Period
                </Typography>
                <Typography variant='body1'>January 15 - 29</Typography>
              </Grid>
              <Grid item sm={12} md={4}>
                <Typography component='h2' variant='h6'>
                  Inflation Released
                </Typography>
                <Typography variant='body1'>January 29</Typography>
              </Grid>
            </Grid>
            <Box p={2} display='flex' justifyContent='flex-end'>
              <Button
                className={classes.button}
                variant='contained'
                color='secondary'
                href='https://handbook.panvala.com/governance/panvala-league'
              >
                More Info
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={classes.gridItemPaper}>
            <Typography component='h1' variant='h4' gutterBottom>
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
            <Typography component='h1' variant='h4' gutterBottom>
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
        <Grid item sm={12} md={6}>
          <Paper className={classes.gridItemPaper}>
            <Typography component='h1' variant='h4' gutterBottom>
              Funding Allocations
            </Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={classes.gridItemPaper}>
            <Typography component='h1' variant='h4' gutterBottom>
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
        <Grid item sm={12}>
          <Paper className={classes.gridItemPaper}>
            <Typography component='h1' variant='h4' gutterBottom>
              Panvala League Communities
            </Typography>
            <Typography component='h2' variant='h6' gutterBottom>
              25 communities
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </BaseLayout>
  );
}
