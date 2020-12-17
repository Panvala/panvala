import { makeStyles, Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import { useRouter } from 'next/router'
import { Legend, LineChart, Line, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { communitiesBySlug } from '../communities';
import BaseLayout from "../layout";
import { getCommunitySubsidyChartData, parseCommaFloat, parsePercent } from '../lib/calculations';
import { getSpreadsheetData } from '../lib/static';

export async function getStaticProps(content) {
  return { props: await getSpreadsheetData() };
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(communitiesBySlug).map(slug => { return { params: { slug } }; }),
    fallback: false,
  };
}

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
  },
  fullyStaked: {
    fontWeight: "bold",
    color: "green",
  },
  notFullyStaked: {
    fontWeight: "bold",
    color: "red",
  },
  gridItemPaper: {
    minHeight: 300,
    padding: theme.spacing(4),
  },
}));

export default function Community({ scoreboard, totals }) {
  const classes = useStyles();
  const { slug } = useRouter().query;
  const communityInfo = communitiesBySlug[slug];
  const { line, dot } = getCommunitySubsidyChartData(communityInfo.name, scoreboard, totals);
  const communityRow = scoreboard[communityInfo.name];
  const fullyStaked = parsePercent(communityRow['Utilization (Share of QF / Capacity)']) < 1;

  return (
    <BaseLayout>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h1" gutterBottom>{communityInfo.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.gridItemPaper}>
            <Typography component="h1" variant="h4" gutterBottom>Staking Yield Curves</Typography>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={line}>
                  <XAxis type="number" dataKey="stakedAmount" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" connectNulls={true} dataKey="subsidy" name="Matching PAN" key="subsidy" />
                  <Line yAxisId="right" connectNulls={true} dataKey="yield" name="Yield (APY)" stroke="#888888" key="yield" />
                  <ReferenceDot yAxisId="left" x={dot.stakedAmount} y={dot.subsidy} fill="red" />
                  <ReferenceDot yAxisId="right" x={dot.stakedAmount} y={dot.yield} fill="red" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <Typography variant="caption" display="block">
              The X-axis is the amount of PAN staked by each community. The left Y-axis is the matching PAN each community
              can earn this quarter. The right Y-axis is percent yield on the staked tokens.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.gridItemPaper}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Typography component="h2" variant="h6">Donations</Typography>
                <Typography variant="body1">{communityRow['PAN Donated']} PAN</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography component="h2" variant="h6">Staked PAN</Typography>
                <Typography variant="body1">{communityRow['Staked Tokens']} PAN</Typography>
                <Typography variant="body1">{fullyStaked ? 
                  <span className={classes.fullyStaked}>FULLY STAKED</span> : 
                  <span className={classes.notFullyStaked}>NOT FULLY STAKED</span>
                }</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography component="h2" variant="h6">Matching PAN</Typography>
                <Typography variant="body1">{communityRow['Estimated Subsidy\n(PAN)']} PAN</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography component="h2" variant="h6">Total Funding</Typography>
                <Typography variant="body1">{communityRow['Estimated Funding\n(PAN)']} PAN</Typography>
                <Typography variant="body1">{communityRow['Estimated Multiplier']}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography component="h2" variant="h6">Staking Yield</Typography>
                <Typography variant="body1">{dot.yield}% APY</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};
