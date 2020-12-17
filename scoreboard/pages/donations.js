import { makeStyles, Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import Link from 'next/link'
import { Legend, LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { getLeagueSubsidyChartData, parseCommaFloat } from '../lib/calculations';
import { communitySlugs } from '../communities';
import BaseLayout from "../layout";
import { getSpreadsheetData } from '../lib/static';


export async function getStaticProps(content) {
  return { props: await getSpreadsheetData() };
}

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
  },
  gridItemPaper: {
    minHeight: 300,
    padding: theme.spacing(4),
  },
}));



export default function Donations({ scoreboard, totals }) {
  const classes = useStyles();
  const subsidyChartData = getLeagueSubsidyChartData(scoreboard, totals);
  const sortedScoreboardEntries = Object.entries(scoreboard).sort((a, b) => {
    const stakedA = parseCommaFloat(a[1]['Fully Staked Funding\n(PAN)']);
    const stakedB = parseCommaFloat(b[1]['Fully Staked Funding\n(PAN)']);
    // Sort descending.
    if (stakedA === stakedB) return 0;
    if (stakedA > stakedB) return -1;
    return 1;
  });

  return (
    <BaseLayout title="Donations">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box p={2} clone>
            <Grid container component={Paper} alignItems="center" justify="space-around">
              <Grid item xs={2}>
                <Box xs={1} clone><Info color="primary" style={{ display: 'block', margin: '0 auto' }} /></Box>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="body1" gutterBottom>
                  In Panvala, donations are matched by <em>staking yield</em>. The share of donations that your community
                  has collected determines your staking yield curve. The larger a community's share of
                  the total donation credit, the higher yield they will earn for the PAN they stake until they've
                  staked their share.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.gridItemPaper}>
            <Typography component="h1" variant="h4" gutterBottom>Staking Yield Curves</Typography>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={subsidyChartData}>
                  <XAxis type="number" dataKey="stakedAmount" />
                  <YAxis />
                  <Tooltip />
                  {Object.keys(scoreboard).map(communityName => {
                    return <Line connectNulls={true} dataKey={communityName} name={communityName} key={communityName} />;
                  })}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <Typography variant="caption" display="block">
              The X-axis is the amount of PAN staked by each community. The Y-axis is the matching PAN each community
              can earn this quarter.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.gridItemPaper}>
            <Typography component="h1" variant="h4" gutterBottom>Donations</Typography>
            <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Community</TableCell>
                      <TableCell>PAN Donated</TableCell>
                      <TableCell>Donation Count</TableCell>
                      <TableCell>Share of Donations (Using Quadratic Funding)</TableCell>
                      <TableCell>Fully Staked Funding Estimate</TableCell>
                      <TableCell>Estimated Multiplier</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedScoreboardEntries.map(([community, data]) => {
                      return (
                        <TableRow key={community}>
                          <TableCell><Link href={`/${communitySlugs[data['Community Name']]}`}>{data['Community']}</Link></TableCell>
                          <TableCell>{data['PAN Donated']}</TableCell>
                          <TableCell>{data['Donation Count']}</TableCell>
                          <TableCell>{data['Share of Quadratic Funding']}</TableCell>
                          <TableCell>{data['Fully Staked Funding\n(PAN)']}</TableCell>
                          <TableCell>{data['Fully Staked Multiplier']}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};
