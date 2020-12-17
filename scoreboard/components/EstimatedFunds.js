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
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

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
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1),
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

const HighlightedCard = ({ className, ...rest }) => {
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
              Total Estimated Funds
            </Typography>
            <Typography
              color='textPrimary'
              variant='h4'
              className={classes.amount}
            >
              {Math.floor(
                rest.quarterData?.estimatedFundingPAN
              ) + ' PAN'}
            </Typography>

            <Typography
              color='textSecondary'
              variant='caption'
              className={classes.description}
            >
              ${rest.quarterData?.estimatedFundingUSD}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HighlightedCard;
