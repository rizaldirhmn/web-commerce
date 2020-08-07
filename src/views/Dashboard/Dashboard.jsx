import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  Grid, 
  Typography,
  Button,
  Hidden
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import { 
  TotalTransaction,
  TotalSelling,
  TotalPurchasing,
  TotalCost,
  OverviewTodayPricing,
  TotalProfit
} from './components'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
  bgColor: {
    backgroundColor: '#BCE0FD',
    height: '312px',
    position: 'absolute',
    // zIndex: 0
  },
  cardMobile: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
    width: '100%'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  executiveSummary: {
    marginBottom: theme.spacing(2)
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const Dashboard = () => {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <div className={classes.bgColor}></div>
        <Grid
          container
          spacing={3}
          justify="space-between"
        >
          <Grid item>  
            <Typography variant="h4">Dashboard</Typography>
          </Grid>
          <Grid item>
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              component={CustomRouterLink}
              to='/cashier'
            >
              KASIR
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
          >
            <TotalTransaction />
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
          >
            <TotalSelling />
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
          >
            <TotalPurchasing />
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
          >
            <TotalCost />
          </Grid>
        </Grid>
          <Hidden only={['sm','xs']}>
              <Grid
                container
                spacing={2}
              >
                <Grid
                  item
                  lg={8}
                  md={8}
                  sm={12}
                  xs={12}
                >
                  <OverviewTodayPricing />
                </Grid>
                <Grid
                  item
                  lg={4}
                  md={4}
                  sm={6}
                  xs={12}
                >
                  <TotalProfit />
                </Grid>
              </Grid>
          </Hidden>
          <Hidden only={['md','lg','xl']}>
              <Grid
                container
                spacing={2}
              >
                <Grid
                  item
                  lg={4}
                  md={4}
                  sm={6}
                  xs={12}
                >
                  <TotalProfit />
                </Grid>
                <Grid
                  item
                  lg={8}
                  md={8}
                  sm={12}
                  xs={12}
                >
                  <OverviewTodayPricing />
                </Grid>
              </Grid>
          </Hidden>
      </div>
  );
};

export default Dashboard;
