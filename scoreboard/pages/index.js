import { makeStyles, Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import Link from 'next/link'
import { BarChart, Bar, Legend, LineChart, Line, PieChart, Pie, ResponsiveContainer, Tooltip, XAxis, YAxis , CartesianGrid, ComposedChart, Cell, Area, Sector} from 'recharts';
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
  name: "Future Modern",
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

const shareData = [{
  name: "CSCF",
  share: 35.56,
  funding: 44.07,
  dontations: 45
}, {
  name: "KERNEL",
  funding: 7.53,
  share:14.88,
  donations: 23
}, {
  name: "DAppNode",
  funding: 7.20,
  share: 16.07,
  donations: 26
}, {
  name: "Meta Gamma",
  funding: 9.17,
  share: 3.56,
  donations: 29
}, {
  name: "MetaCartel",
  funding: 10.99,
  share: 1.51,
  donations: 36
}, {
  name: "DXdao",
  funding: 4.67,
  share: 3.93,
  donations: 23
}, {
  name: "Future Modern",
  funding: 12.08,
  share: 0.35,
  donations: 24
}, {
  name: "Hashing it Out",
  funding: 2.88,
  share: 19.36,
  donations: 12
}, {
  name: "WhalerDAO",
  funding: 0.72,
  share:2.36,
  donations: 12
}, {
  name: "DePo DAO",
  funding: 0.69,
  share: 1.51,
  donations: 10
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
        <Grid item xs={12}>
        <Paper className={classes.gridItemPaper}>
            <Typography component="h1" variant="h5" gutterBottom>Percentage Staked to Percentage recieved Funding</Typography>
            <Typography variant="caption" display="block">
              As you can see below, a higher number of donations corralates with a higher percentage of the funding pool. Quandratic funding skews towards a larger number of smaller donations in order to help projects that have donors with limited capital.
            </Typography>
            <br />
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={shareData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="funding" name="Amount Staked" fill="#2138b7" />
                  <Bar dataKey="share" name="Quadratic Funding Recieved" fill="#46b0aa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <Typography variant="caption" display="block">
              All values in percentages.
            </Typography>
          </Paper>
          </Grid>
          <Grid item xs={12}>
        <Paper className={classes.gridItemPaper}>
            <Typography component="h1" variant="h5" gutterBottom>Small donations to funding reward correlation</Typography>
            <Typography variant="caption" display="block">
              As you can see below, a higher number of donations corralates with a higher percentage of the funding pool. Quandratic funding skews towards a larger number of smaller donations in order to help projects that have donors with limited capital.
            </Typography>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <ComposedChart width={500} height={400} data={shareData} margin={{ top: 20, right: 20, bottom: 20, left: 20,}}>
                      <CartesianGrid stroke="#f5f5f5" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="funding"  name="Percentage of the funding pool" fill="#8884d8" stroke="#8884d8" />
                      <Bar dataKey="donations" barSize={20} name="Donors" fill="#413ea0" />
                      <Line type="monotone" dataKey="share" name="Percentage staked in the pool" stroke="#ff7300" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            <Typography variant="caption" display="block">
              Line Graphs = Percentages (%)
              <br />
              Donations = Number of donations
            </Typography>
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
                        <Link href={`/${community.slug}`}>
                          <a><img src={`/league/${community.img}`} height="144" /></a>
                        </Link>
                      </Box>
                      <Typography component="h3" variant="h6"><Link href={`/${community.slug}`}><a>{community.name}</a></Link></Typography>
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
