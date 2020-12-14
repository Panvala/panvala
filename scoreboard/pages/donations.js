import fs from 'fs';
import csvParse from 'csv-parse';
import path from 'path';
import { makeStyles, Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import { Legend, LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import BaseLayout from "../layout";

function parseCommaFloat(text) {
  return parseFloat(text.replace(/,/g, ''));
}

function parsePercent(text) {
  return parseFloat(text) / 100;
}

export function getStaticProps(context) {
  return new Promise((resolve) => {
    const scoreboard = {};
    let totals = null;
    fs.createReadStream(path.resolve(process.cwd(), 'data/scoreboard-batch-9.csv'))
      .pipe(csvParse({columns: true}))
      .on('data', row => {
        if(row['Community'] === '' && parseCommaFloat(row['Staked Tokens']) > 0) {
          totals = row;
        } else if (row['Community'] !== '') {
          scoreboard[row['Community']] = row;
        }
      })
      .on('end', () => resolve([scoreboard, totals]));
  }).then(([scoreboard, totals]) => { return { props: { scoreboard, totals } } });
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

function getStakingYieldCurveData(community, totals) {
  const donationShare = parsePercent(community['Share of Quadratic Funding']);
  if (donationShare === 0) {
    return [{
      stakedAmount: 0,
      subsidy: 0,
      funding: 0,
    }];
  }

  const currentStakedTokens = parseCommaFloat(community['Staked Tokens']);
  const totalStakedTokens = parseCommaFloat(totals['Staked Tokens']);
  const fullyStakedAmount = (donationShare * totalStakedTokens - donationShare * currentStakedTokens) /
    (1 - donationShare);
  
  const SAMPLE_COUNT = 20;
  const stakedAmounts = [fullyStakedAmount];
  for (let i = 0; i < SAMPLE_COUNT; i++) {
    stakedAmounts.push(fullyStakedAmount / SAMPLE_COUNT * i);
  }

  const OVERFLOW_SLOPE = 2;
  const quadraticFunding = parseCommaFloat(community['Quadratic Funding']);
  const totalQuadraticFunding = parseCommaFloat(totals['Quadratic Funding']);
  const totalSubsidy = parseCommaFloat(totals['Estimated Subsidy\n(PAN)']);
  return stakedAmounts.map(stakedAmount => {
    const utilization = stakedAmount === 0 ? 0 : donationShare * (stakedAmount + totalStakedTokens - currentStakedTokens) / stakedAmount;
    const adjustedUtilization = Math.sqrt(-4 * (OVERFLOW_SLOPE / 2) * (1 - (OVERFLOW_SLOPE / 2 ) - utilization) / OVERFLOW_SLOPE);
    const subsidyPoints = utilization === 0 ? 0 : adjustedUtilization / utilization * quadraticFunding;
    const shareOfSubsidy = subsidyPoints / (totalQuadraticFunding - quadraticFunding + subsidyPoints);
    const subsidy = shareOfSubsidy * totalSubsidy;
    return {
      stakedAmount,
      subsidy,
      funding: subsidy + parseCommaFloat(community['PAN Donated']),
    };
  });
}

function getAllSubsidies(scoreboard, totals) {
  const chartData = {};
  Object.values(scoreboard).forEach(community => {
    const communityData = getStakingYieldCurveData(community, totals);
    communityData.forEach(item => {
      chartData[item.stakedAmount] = chartData[item.stakedAmount] || { stakedAmount: item.stakedAmount };
      chartData[item.stakedAmount][community['Community']] = item.subsidy;
    })
  });
  return Object.values(chartData).sort((a, b) => {
    if (a.stakedAmount === b.stakedAmount) {
      return 0;
    }
    if (a.stakedAmount > b.stakedAmount) {
      return 1;
    }
    return -1;
  });
}

export default function Donations({ scoreboard, totals }) {
  const classes = useStyles();
  const subsidyChartData = getAllSubsidies(scoreboard, totals);

  return (
    <BaseLayout>
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
        <Grid item xs={12} md={6}>
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
                    {Object.entries(scoreboard).map(([community, data]) => {
                      return (
                        <TableRow key={community}>
                          <TableCell>{data['Community']}</TableCell>
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
