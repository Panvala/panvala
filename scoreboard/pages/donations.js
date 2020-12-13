import fs from 'fs';
import csvParse from 'csv-parse';
import path from 'path';
import { makeStyles, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';

import BaseLayout from "../layout";

export function getStaticProps(context) {
  return new Promise((resolve) => {
    const scoreboard = {};
    fs.createReadStream(path.resolve(process.cwd(), 'data/scoreboard-batch-9.csv'))
      .pipe(csvParse({columns: true}))
      .on('data', row => {
        scoreboard[row['Community']] = row;
      })
      .on('end', () => resolve(scoreboard));
  }).then(scoreboard => { return { props: { scoreboard } } });
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

export default function Donations(props) {
  const classes = useStyles();

  return (
    <BaseLayout>
      <Grid container spacing={4}>
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
                    {Object.entries(props.scoreboard).map(([community, data]) => {
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
