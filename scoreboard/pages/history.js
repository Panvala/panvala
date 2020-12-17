import { makeStyles, Grid, Paper, Typography } from '@material-ui/core';
import { BarChart, Bar, Legend, LineChart, Line, PieChart, Pie, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import BaseLayout from "../layout";

const quarterlyMetrics = [{
  date: '4/7/2020',
  leagueValue: 37650,
  fullValue: 49312.56,
  leagueDonations: 2905.47,
  fullDonations: 9978.74,
  leagueMultiplier: 12.96,
  fullMultiplier: 4.94,
}, {
  date: '7/3/2020',
  leagueValue: 50870.73,
  fullValue: 67827.61,
  leagueDonations: 9950.78,
  fullDonations: 12680.81,
  leagueMultiplier: 5.11,
  fullMultiplier: 5.35,
}, {
  date: '10/2/2020',
  leagueValue: 151450.49,
  fullValue: 201933.90,
  leagueDonations: 14757.34,
  fullDonations: 17490.25,
  leagueMultiplier: 10.26,
  fullMultiplier: 11.55,
}];

const fundingAllocations = [{
  name: "Commons Stack Community Fund",
  funding: 681805.60,
}, {
  name: "KERNEL",
  funding: 125472.13,
}, {
  name: "DAppNode",
  funding: 124967.46,
}, {
  name: "Meta Gamma Delta",
  funding: 119751.02,
}, {
  name: "MetaCartel Builder Awards",
  funding: 102809.70,
}, {
  name: "DXdao's DeFi Community Awards",
  funding: 74812.64,
}, {
  name: "future modern",
  funding: 62782.47,
}, {
  name: "Hashing it Out's Community Fund",
  funding: 51864.06,
}, {
  name: "WhalerDAO",
  funding: 13116.89,
}, {
  name: "DePo DAO",
  funding: 12553.03,
}];

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
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
        <Grid item xs={12}>
          <Typography variant="h1" gutterBottom>Funding History</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.gridItemPaper}>
            <Typography component="h1" variant="h4" gutterBottom>Quarterly Value Allocated</Typography>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={quarterlyMetrics}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="leagueValue" name="Panvala League" fill="#2138b7" />
                  <Bar dataKey="fullValue" name="Full Treasury" fill="#46b0aa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <Typography variant="caption" display="block">
              All values in USD.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.gridItemPaper}>
            <Typography component="h1" variant="h4" gutterBottom>Quarterly Donations</Typography>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={quarterlyMetrics}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="leagueDonations" name="Panvala League" fill="#2138b7" />
                  <Bar dataKey="fullDonations" name="Full Treasury" fill="#46b0aa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <Typography variant="caption" display="block">
              All values in USD.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.gridItemPaper}>
            <Typography component="h1" variant="h4" gutterBottom>Funding Allocations</Typography>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={fundingAllocations} dataKey="funding" fill="#46b0aa" />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Typography variant="caption" display="block">
              All values in PAN. These allocations are for the donation matching round that ended on 10/2/2020.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.gridItemPaper}>
            <Typography component="h1" variant="h4" gutterBottom>Matching Multipliers</Typography>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={quarterlyMetrics}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="leagueMultiplier" name="Panvala League" stroke="#2138b7" />
                  <Line type="monotone" dataKey="fullMultiplier" name="Full Treasury" stroke="#46b0aa" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};
