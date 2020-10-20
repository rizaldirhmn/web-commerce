import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  Grid, 
  Typography,
} from '@material-ui/core';
// import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { getCardStats } from '../../actions/dashboard'
// import '../../../public/index.css'
import { 
  TotalTransaction,
  TotalInvestasi,
  TotalInvestasiRP,
  Investor,
  TotalSyirkah,
  SyirkahUmum,
  GrafikTransactionSales,
  SyirkahUnitBisnis,
  LembarSaham,
  ActivityLog
} from './components'

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

// const CustomRouterLink = forwardRef((props, ref) => (
//   <div
//     ref={ref}
//     style={{ flexGrow: 1 }}
//   >
//     <RouterLink {...props} />
//   </div>
// ));

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
            {!loadingCard ? (
              <TotalTransaction loading={loadingCard} item={card.total_transaksi} />
            ):(
              <Skeleton variant="rect"></Skeleton>
            )}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
          >
            {!loadingCard ? (
              <TotalInvestasi loading={loadingCard} item={card.total_penjualan} />
            ):(
              <Skeleton variant="rect"></Skeleton>
            )}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
          >
            {!loadingCard ? (
              <TotalInvestasiRP loading={loadingCard} item={card.total_pembelian} />
            ):(
              <Skeleton variant="rect"></Skeleton>
            )}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
          >
            {!loadingCard ? (
              <Investor loading={loadingCard} item={card.total_biaya} />
            ):(
              <Skeleton variant="rect"></Skeleton>
            )}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
          >
            {!loadingCard ? (
              <TotalSyirkah loading={loadingCard} item={card.total_penjualan_bersih} />
            ):(
              <Skeleton variant="rect"></Skeleton>
            )}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
          >
            {!loadingCard ? (
              <SyirkahUmum loading={loadingCard} item={card.total_customer} />
            ):(
              <Skeleton variant="rect"></Skeleton>
            )}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
          >
            {!loadingCard ? (
              <SyirkahUnitBisnis loading={loadingCard} item={card.total_customer} />
            ):(
              <Skeleton variant="rect"></Skeleton>
            )}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
          >
            {!loadingCard ? (
              <LembarSaham loading={loadingCard} item={card.total_customer} />
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
            lg={8}
            md={8}
            sm={12}
            xs={12}
          >
            <GrafikTransactionSales />
          </Grid>
          <Grid
            item
            lg={4}
            md={4}
            sm={12}
            xs={12}
          >
            <ActivityLog />
          </Grid>
        </Grid>
      </div>
  );
};

const mapStateToProps = state => ({
  dashboard : state.dashboard
})

export default connect(mapStateToProps, { getCardStats })(Dashboard)
