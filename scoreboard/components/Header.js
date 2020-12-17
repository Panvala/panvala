import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(4),
    fontWeight: 'bold',
    fontSize: '24px',
  },
}));
const Header = (props) => {
  const classes = useStyles();
  const { className, ...rest } = props;

  return (
    <div {...rest} className={className}>
      <Typography
        component='h2'
        gutterBottom
        variant='overline'
      >
        Batch Eight, September 2020
      </Typography>
      <Typography
        component='h3'
        gutterBottom
        color='textSecondary'
        variant='h4'
        className={classes.container}
      >
        Panvala League Scoreboard
      </Typography>
    </div>
  );
};

export default Header;
