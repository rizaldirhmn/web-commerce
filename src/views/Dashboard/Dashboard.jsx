import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  Grid, 
  Typography,
} from '@material-ui/core';
// import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux'
import moment from 'moment';

import {
  CardNumber,
  GrafikTransactionSales,
  TableProduct,
  TableReseller,
  TablePopularProduct,
  TableInterestedProduct,
  GrafikTransactionMonthly
} from './components'
import { Skeleton } from '@material-ui/lab';
import * as actions from '../../store/actions'

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
  title: {
    fontFamily: 'Montserrat'
  }
}));

// const CustomRouterLink = forwardRef((props, ref) => (
//   <div
//     ref={ref}
//     style={{ flexGrow: 1 }}
//   >
//     <RouterLink {...props} />
//   </div>
// ));

const Dashboard = props => {
  const classes = useStyles();
  const {
    totalUser,
    loadingTotalUser,
    onFetchDashboardTotalUser,
    totalTransaction,
    loadingTotalTransaction,
    onFetchDashboardTotalTransaction,
    onFetchDashboardGrafikIncome,
    loadingGrafikIncome,
    grafikIncome,
    onFetchDashboardProductBestseller,
    productBestseller,
    loadingProductBestseller,
    onFetchDashboardResellerActive,
    resellerActive,
    loadingResellerActive,
    onFetchDashboardPopularProduct,
    popularProduct,
    loadingPopularProduct,
    onFetchDashboardInterestedProduct,
    interestedProduct,
    loadingInterestedProduct,
    grafikTransactionMonthly,
    loadingGrafikTransactionMonthly,
    onFetchDashboardGrafikTransactionMonthly
  } = props

  const [selectedDate ] = useState(new Date());
  const submitDefault = moment().subtract(7, 'd').format('YYYY-MM-DD');
  const submitDefaultEndDate = moment().format('YYYY-MM-DD');
  const [ startDate, setStartDate ] = useState({
      submit: {
          submit: submitDefault
      },
      view: {
          view: moment().subtract(7, 'd').format('YYYY-MM-DD')
      }
  });

  const [ endDate, setEndDate ] = useState({
      submit: {
          submit: submitDefaultEndDate
      },
      view: {selectedDate}
  });

  // Set Year for Grafik Transaction Monthly
  const [selectedYear] = useState(new Date())
  const submitDefaultYear = moment().format('YYYY');
  const [ year, setYear ] = useState({
      submit: {
          submit: submitDefaultYear
      },
      view: {
          view: {selectedYear}
      }
  });

  useEffect(() => {
    onFetchDashboardTotalTransaction()
    onFetchDashboardTotalUser()
    onFetchDashboardProductBestseller(10)
    onFetchDashboardResellerActive(10)
    onFetchDashboardPopularProduct()
    onFetchDashboardInterestedProduct()
  }, [
    onFetchDashboardTotalTransaction, 
    onFetchDashboardTotalUser, 
    onFetchDashboardProductBestseller, 
    onFetchDashboardResellerActive,
    onFetchDashboardPopularProduct,
    onFetchDashboardInterestedProduct
  ])

  useEffect(() => {
    onFetchDashboardGrafikIncome(startDate.submit.submit, endDate.submit.submit)
  }, [onFetchDashboardGrafikIncome, startDate, endDate ])

  useEffect(() => {
    onFetchDashboardGrafikTransactionMonthly(year.submit.submit)
  }, [onFetchDashboardGrafikTransactionMonthly, year])

  return (
      <div className={classes.root}>
        <div className={classes.bgColor}></div>
        <Grid
          container
          spacing={3}
          justify="space-between"
        >
          <Grid item>  
            <Typography variant="h4" className={classes.title}>Dashboard</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
        >
          {loadingTotalUser && totalUser === null ? (
            <Grid
              item
              lg={3}
              md={3}
              sm={6}
              xs={12}
            >
                <Skeleton></Skeleton>
            </Grid>
          ):(
            <Grid
              item
              lg={4}
              md={4}
              sm={6}
              xs={12}
            >
                <CardNumber cardName="Total Pengguna" count={totalUser} />
            </Grid>
          )}
          {loadingTotalTransaction || totalTransaction === null ? (
            <Grid
              item
              lg={4}
              md={4}
              sm={6}
              xs={12}
            >
                <Skeleton></Skeleton>
            </Grid>
          ):(
            <>
            <Grid
              item
              lg={4}
              md={4}
              sm={6}
              xs={12}
            >
                <CardNumber cardName="Menunggu Konfirmasi Admin" count={totalTransaction.menunggu_konfirmasi_admin} />
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              sm={6}
              xs={12}
            >
                <CardNumber cardName="Pesanan Diproses" count={totalTransaction.pesanan_diproses} />
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              sm={6}
              xs={12}
            >
                <CardNumber cardName="Barang Sedang dikirim" count={totalTransaction.barang_sedang_dikirim} />
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              sm={6}
              xs={12}
            >
                <CardNumber cardName="Pesanan dibatalkan admin" count={totalTransaction.pesanan_dibatalkan_admin} />
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              sm={6}
              xs={12}
            >
                <CardNumber cardName="Pesanan dibatalkan user" count={totalTransaction.pesanan_dibatalkan_user} />
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              sm={6}
              xs={12}
            >
                <CardNumber cardName="Pesanan selesai" count={totalTransaction.pesanan_selesai} />
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              sm={6}
              xs={12}
            >
                <CardNumber cardName="Gross Income" type="money" count={totalTransaction.overall_transaksi} />
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              sm={6}
              xs={12}
            >
                <CardNumber cardName="Transaksi Terbesar" type="money" count={totalTransaction.transaksi_terbesar} />
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              sm={6}
              xs={12}
            >
                <CardNumber cardName="Rata-rata Transaksi" type="money" count={totalTransaction.rata_rata_transaksi} />
            </Grid>
            </>
          )}
        </Grid>
        <Grid
          container
          spacing={2}
        >
          {loadingGrafikIncome || grafikIncome === null ? (
            <Grid
              item
              lg={8}
              md={8}
              sm={12}
              xs={12}
            >
              <Skeleton></Skeleton>
            </Grid>
          ):(
            <Grid
              item
              lg={8}
              md={8}
              sm={12}
              xs={12}
            >
              <GrafikTransactionSales
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                grafikIncome={grafikIncome}
                loadingGrafikIncome={loadingGrafikIncome}
              />
            </Grid>
          )}
          {loadingProductBestseller || productBestseller === null ? (
            <Grid
              item
              lg={4}
              md={4}
              sm={12}
              xs={12}
            >
              <Skeleton></Skeleton>
            </Grid>
          ):(
            <Grid
              item
              lg={4}
              md={4}
              sm={12}
              xs={12}
            >
              <TableProduct
                productBestseller={productBestseller}
              />
            </Grid>
          )}
        </Grid>
        <Grid
          container
          spacing={2}
        >
          {loadingResellerActive || resellerActive === null ? (
            <Grid
              item
              lg={4}
              md={4}
              sm={6}
              xs={12}
            >
              <Skeleton></Skeleton>
            </Grid>
          ):(
            <Grid
              item
              lg={4}
              md={4}
              sm={6}
              xs={12}
            >
              <TableReseller
                resellerActive={resellerActive}
              />
            </Grid>
          )}
          {loadingGrafikIncome || grafikIncome === null ? (
            <Grid
              item
              lg={8}
              md={8}
              sm={12}
              xs={12}
            >
              <Skeleton></Skeleton>
            </Grid>
          ):(
            <Grid
              item
              lg={8}
              md={8}
              sm={6}
              xs={12}
            >
              <GrafikTransactionMonthly
                year={year}
                setYear={setYear}
                grafikTransactionMonthly={grafikTransactionMonthly}
                loadingGrafikTransactionMonthly={loadingGrafikTransactionMonthly}
              />
            </Grid>
          )}
          
        </Grid>
        <Grid
          container
          spacing={2}
        >
          {loadingPopularProduct || popularProduct === null ? (
            <Grid
              item
              lg={6}
              md={6}
              sm={12}
              xs={12}
            >
              <Skeleton></Skeleton>
            </Grid>
          ):(
            <Grid
              item
              lg={6}
              md={6}
              sm={12}
              xs={12}
            >
              <TablePopularProduct
                popularProduct={popularProduct}
              />
            </Grid>
          )}
          {loadingInterestedProduct || interestedProduct === null ? (
            <Grid
              item
              lg={6}
              md={6}
              sm={12}
              xs={12}
            >
              <Skeleton></Skeleton>
            </Grid>
          ):(
            <Grid
              item
              lg={6}
              md={6}
              sm={12}
              xs={12}
            >
              <TableInterestedProduct
                interestedProduct={interestedProduct}
              />
            </Grid>
          )}
        </Grid>
      </div>
  );
};

const mapStateToProps = state => ({
  totalUser : state.dashboard.totalUser,
  loadingTotalUser : state.dashboard.loadingTotalUser,
  totalTransaction : state.dashboard.totalTransaction,
  loadingTotalTransaction : state.dashboard.loadingTotalTransaction,
  grafikIncome: state.dashboard.grafikIncome,
  loadingGrafikIncome: state.dashboard.loadingGrafikIncome,
  productBestseller: state.dashboard.productBestseller,
  loadingProductBestseller: state.dashboard.loadingProductBestseller,
  resellerActive: state.dashboard.resellerActive,
  loadingResellerActive: state.dashboard.loadingResellerActive,
  popularProduct: state.dashboard.popularProduct,
  loadingPopularProduct: state.dashboard.loadingPopularProduct,
  interestedProduct: state.dashboard.interestedProduct,
  loadingInterestedProduct: state.dashboard.loadingInterestedProduct,
  grafikTransactionMonthly: state.dashboard.grafikTransactionMonthly,
  loadingGrafikTransactionMonthly: state.dashboard.loadingGrafikTransactionMonthly
})

const mapDispatchToProps = dispatch => {
  return {
    onFetchDashboardTotalUser: () => dispatch(actions.fetchDashboardTotalUser()),
    onFetchDashboardTotalTransaction: () => dispatch(actions.fetchDashboardTotalTransaction()),
    onFetchDashboardGrafikIncome: (startDate, endDate) => dispatch(actions.fetchDashboardGrafikIncome(startDate, endDate)),
    onFetchDashboardProductBestseller: (limit) => dispatch(actions.fetchDashboardProductBestseller(limit)),
    onFetchDashboardResellerActive: (limit) => dispatch(actions.fetchDashboardResellerActive(limit)),
    onFetchDashboardPopularProduct: () => dispatch(actions.fetchDashboardPopularProduct()),
    onFetchDashboardInterestedProduct: () => dispatch(actions.fetchDashboardInterestedProduct()),
    onFetchDashboardGrafikTransactionMonthly: (year) => dispatch(actions.fetchDashboardGrafikTransactionMonthly(year)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
