import { makeStyles, Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import Link from 'next/link'
import { BarChart, Bar, Legend, LineChart, Line, PieChart, Pie, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import BaseLayout from "../layout";
import { communitiesBySlug } from '../communities';


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
