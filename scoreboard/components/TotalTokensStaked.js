import React from 'react';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
} from '@material-ui/core';
import EvStationIcon from '@material-ui/icons/EvStation';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  avatar: {
    backgroundColor: colors.blue[900],
    height: 50,
    width: 50,
  },
  differenceIcon: {
    color: colors.red[900],
  },

  price: {
    fontWeight: 'bolder',
  },
  description: {
    fontSize: '16px',
  },
  cardHeading: {
    fontWeight: 'bold',
  },
}));

const TotalTokensStaked = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid container justify='space-between' spacing={3}>
          <Grid item>
            <Typography
              gutterBottom
              variant='h6'
              className={classes.cardHeading}
            >
              Total Staked Tokens
            </Typography>
            <Typography
              color='textPrimary'
              variant='h4'
              className={classes.amount}
            >
              {Math.floor(rest.quarterData?.stakedTokens) +
                ' PAN'}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <EvStationIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={2} display='flex' alignItems='center'>
          <Typography
            color='textSecondary'
            variant='caption'
            className={classes.description}
          >
            {rest.description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TotalTokensStaked;
