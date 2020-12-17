function Stats(props) {
  return (
    <Grid item sm={12}>
      <Paper className={classes.gridItemPaper}>
        <Typography
          component='h1'
          variant='h4'
          gutterBottom
        >
          Current Quarter
        </Typography>
        <Grid container spacing={4}>
          <Grid item sm={12} md={4}>
            <Typography component='h2' variant='h6'>
              Total Inflation
            </Typography>
            <Typography variant='body1'>
              1,755,937.14 PAN
            </Typography>
          </Grid>
          <Grid item sm={12} md={4}>
            <Typography component='h2' variant='h6'>
              League Application Deadline
            </Typography>
            <Typography variant='body1'>
              November 13
            </Typography>
          </Grid>
          <Grid item sm={12} md={4}>
            <Typography component='h2' variant='h6'>
              Donations Begin
            </Typography>
            <Typography variant='body1'>
              December 2
            </Typography>
          </Grid>
          <Grid item sm={12} md={4}>
            <Typography component='h2' variant='h6'>
              Donations End
            </Typography>
            <Typography variant='body1'>TBD</Typography>
          </Grid>
          <Grid item sm={12} md={4}>
            <Typography component='h2' variant='h6'>
              Staking Deadline
            </Typography>
            <Typography variant='body1'>
              January 15
            </Typography>
          </Grid>
          <Grid item sm={12} md={4}>
            <Typography component='h2' variant='h6'>
              Stake Holding Period
            </Typography>
            <Typography variant='body1'>
              January 15 - 29
            </Typography>
          </Grid>
          <Grid item sm={12} md={4}>
            <Typography component='h2' variant='h6'>
              Inflation Released
            </Typography>
            <Typography variant='body1'>
              January 29
            </Typography>
          </Grid>
        </Grid>
        <Box p={2} display='flex' justifyContent='flex-end'>
          <Button
            className={classes.button}
            variant='contained'
            color='secondary'
            href='https://handbook.panvala.com/governance/panvala-league'
          >
            More Info
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Stats;
