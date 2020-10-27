import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { 
  Grid
} from '@material-ui/core';

import {
  Tab
} from './components';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  pageName: {
    fontSize: '20',
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  bgColor: {
    backgroundColor: '#BCE0FD',
    height: '312px',
    position: 'absolute',
    // zIndex: 0
  },
}))

const PembayaranEmas = props => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.bgColor}>
      </div>
      <div className={classes.pageName}>
        Pembayaran Emas
      </div>
      
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Tab />
        </Grid>
      </Grid>
    </div>
  )
}

export default PembayaranEmas;