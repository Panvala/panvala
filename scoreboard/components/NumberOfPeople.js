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
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

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
function numberWithCommas(x) {
  var parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
const NumberOfPeople = ({ className, ...rest }) => {
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
              Number Of Participants
            </Typography>
            <Typography
              color='textPrimary'
              variant='h4'
              className={classes.amount}
            >
              {rest.quarterData?.donationCount}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <EmojiPeopleIcon />
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

export default NumberOfPeople;
