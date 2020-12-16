import { makeStyles, Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import Link from 'next/link'
import { BarChart, Bar, Legend, LineChart, Line, PieChart, Pie, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import BaseLayout from "../layout";
import { communitiesBySlug } from '../communities';

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
          <Paper className={classes.gridItemPaper}>
            <Typography component="h1" variant="h4" gutterBottom>Current Quarter</Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Typography component="h2" variant="h6">Total Inflation</Typography>
                <Typography variant="body1">1,755,937.14 PAN</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography component="h2" variant="h6">League Application Deadline</Typography>
                <Typography variant="body1">November 13</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography component="h2" variant="h6">Donations Begin</Typography>
                <Typography variant="body1">December 2</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography component="h2" variant="h6">Donations End</Typography>
                <Typography variant="body1">TBD</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography component="h2" variant="h6">Staking Deadline</Typography>
                <Typography variant="body1">January 15</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography component="h2" variant="h6">Stake Holding Period</Typography>
                <Typography variant="body1">January 15 - 29</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography component="h2" variant="h6">Inflation Released</Typography>
                <Typography variant="body1">January 29</Typography>
              </Grid>
            </Grid>
            <Box p={2} display="flex" justifyContent="flex-end">
              <Button className={classes.button} variant="contained" color="secondary" href="https://handbook.panvala.com/governance/panvala-league">More Info</Button>
            </Box>
          </Paper>
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
        <Grid item xs={12}>
          <Paper className={classes.gridItemPaper}>
            <Typography component="h1" variant="h4" gutterBottom>Panvala League Communities</Typography>
            <Typography component="h2" variant="h6" gutterBottom>{Object.values(communitiesBySlug).length} communities</Typography>
            <Grid container spacing={4}>
              {Object.values(communitiesBySlug).map(community => {
                return (
                  <Grid item xs={12} md={4} key={community.name}>
                    <Box display="flex" alignItems="center">
                      <Box mr={3}>
                        <img src={`/league/${community.img}`} height="144" />
                      </Box>
                      <Typography component="h3" variant="h6"><Link href={`/${community.slug}`}>{community.name}</Link></Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
            <Box p={2} display="flex" justifyContent="flex-end">
              <Button className={classes.button} variant="contained" color="secondary" href="https://handbook.panvala.com/governance/panvala-league">Join the League</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};
