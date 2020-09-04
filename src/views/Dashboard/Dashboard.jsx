import React, { forwardRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  Grid, 
  Typography,
  Button,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { getCardStats } from '../../actions/dashboard'

import { 
  TotalTransaction,
  TotalSelling,
  TotalPurchasing,
  TotalCost,
  OverviewTodayPricing,
  TotalProfitClean,
  TotalCustomer,
  GrafikNetIncome,
  GrafikGoldPrice,
  GrafikTransactionSales,
  GrafikTransactionSalesMoney,
  // GrafikStock
} from './components'

import CartIcon from '@material-ui/icons/AddShoppingCart'
import Skeleton from '@material-ui/lab/Skeleton'

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
  },
  btn: {
    backgroundColor: '#FF9300',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#FFA938',
      opacity: 1,
    },
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const Dashboard = ({ getCardStats, dashboard : { card, loadingCard } }) => {
  const classes = useStyles();

  useEffect(() => {
    getCardStats()
  }, [loadingCard, getCardStats])

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
              className={classes.btn}
              variant="contained"
              component={CustomRouterLink}
              to='/cashier'
              startIcon={<CartIcon />}
            >
              TRANSAKSI
            </Button>
          </Grid>
        </Grid>
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
            {!loadingCard ? (
              <TotalTransaction loading={loadingCard} item={card.total_transaksi} />
            ):(
              <Skeleton variant="rect"></Skeleton>
            )}
          </Grid>
          <Grid
            item
            lg={4}
            md={4}
            sm={6}
            xs={12}
          >
            {!loadingCard ? (
              <TotalSelling loading={loadingCard} item={card.total_penjualan} />
            ):(
              <Skeleton variant="rect"></Skeleton>
            )}
          </Grid>
          <Grid
            item
            lg={4}
            md={4}
            sm={6}
            xs={12}
          >
            {!loadingCard ? (
              <TotalPurchasing loading={loadingCard} item={card.total_pembelian} />
            ):(
              <Skeleton variant="rect"></Skeleton>
            )}
          </Grid>
          <Grid
            item
            lg={4}
            md={4}
            sm={6}
            xs={12}
          >
            {!loadingCard ? (
              <TotalCost loading={loadingCard} item={card.total_biaya} />
            ):(
              <Skeleton variant="rect"></Skeleton>
            )}
          </Grid>
          <Grid
            item
            lg={4}
            md={4}
            sm={6}
            xs={12}
          >
            {!loadingCard ? (
              <TotalProfitClean loading={loadingCard} item={card.total_penjualan_bersih} />
            ):(
              <Skeleton variant="rect"></Skeleton>
            )}
          </Grid>
          <Grid
            item
            lg={4}
            md={4}
            sm={6}
            xs={12}
          >
            {!loadingCard ? (
              <TotalCustomer loading={loadingCard} item={card.total_customer} />
            ):(
              <Skeleton variant="rect"></Skeleton>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <OverviewTodayPricing />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <GrafikNetIncome />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <GrafikGoldPrice />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <GrafikTransactionSales />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <GrafikTransactionSalesMoney />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            {/* <GrafikStock /> */}
          </Grid>
        </Grid>
      </div>
  );
};

const mapStateToProps = state => ({
  dashboard : state.dashboard
})

export default connect(mapStateToProps, { getCardStats })(Dashboard)
