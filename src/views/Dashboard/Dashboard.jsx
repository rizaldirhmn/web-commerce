import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  Grid, 
  Typography,
} from '@material-ui/core';
// import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { getCardStats } from '../../actions/dashboard'
// import '../../../public/index.css'

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
    fontFamily: 'Nunito'
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
            <Typography variant="h4" className={classes.title}>Dashboard</Typography>
          </Grid>
        </Grid>
        {/* <Grid
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
              <TotalInvestasi />
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
          >
              <TotalInvestasiRP />
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
          >
              <Investor />
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
          >
              <TotalSyirkah />
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
          >
              <SyirkahUmum />
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
          >
              <SyirkahUnitBisnis />
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
          >
              <LembarSaham />
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
        </Grid> */}
      </div>
  );
};

const mapStateToProps = state => ({
  dashboard : state.dashboard
})

export default connect(mapStateToProps, { getCardStats })(Dashboard)
