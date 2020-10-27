import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  Button,
  Chip,
  Grid, Paper, Typography
} from '@material-ui/core';
import {
  TableComponents
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
  topPage: {
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  namePage: {
    fontSize: theme.spacing(2),
    fontWeight: 'bold',
  },
  btnPrimary: {
    textTransform: 'none',
    backgroundColor: '#0277BD',
    '&:hover': {
      backgroundColor: '#015d8e'
    },
    fontSize: 13,
    color: '#FFFFFF',
    borderRadius: '8px'
  },
  pengirimStyle: {
    listStyleType: 'none',
    // fontSize: '16px'
  },
  ulNoneStyleRight: {
    listStyleType: 'none',
    '& li': {
      textAlign: 'right',
    }
  },
  containerBtn: {
    width: 200,
    float: 'right'
  },
  btnReject: {
    textTransform: 'none',
    // padding: '10px',
    backgroundColor: '#FF4343',
    '&:hover': {
      backgroundColor: '#FF4343'
    },
    fontSize: 13,
    color: '#FFFFFF',
    borderRadius: '8px',
    margin: '5px 0px 5px 5px',
    width: '45%'
  },
  btnAcept: {
    textTransform: 'none',
    // padding: '10px',
    backgroundColor: '#27AE60',
    '&:hover': {
      backgroundColor: '#27AE60'
    },
    fontSize: 13,
    color: '#FFFFFF',
    borderRadius: '8px',
    margin: '5px 0px 5px 5px',
    width: '45%'
  }
}));

const RincianTransaksi = props => {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <div className={classes.bgColor}>
      </div>
      <div className={classes.pageName}>
        Rincian Transaksi
      </div>
      
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Paper className={classes.root}>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className={classes.topPage}>
                  <div className={classes.namePage}>
                    Detail Pembayaran
                  </div>
                  <div className={classes.namePage}>
                    <Button variant="contained" className={classes.btnPrimary} size="small">Bukti Transfer</Button>
                  </div>
                </div>

                <div className={classes.topPage}>
                  <div >
                    <Typography>
                    <ul className={classes.pengirimStyle}>
                      <li>Nama Pengirim : Fulan</li>
                      <li>Nama Bank : Mandiri</li>
                      <li>No Rekening : 75985429340</li>
                      <li>a/n : Fulan bin Manaf</li>
                    </ul>
                    </Typography>
                  </div>
                  <div>
                    <Typography>
                      <ul className={classes.ulNoneStyleRight}>
                        <li><b>Bank Tujuan</b></li>
                        <li>BNI Syariah</li>
                        <li>890275894359</li>
                        <li>Faisal Afrianto</li>
                      </ul>
                    </Typography>
                  </div>
                </div>

                <br/><hr />

                <div className={classes.topPage}>
                  <div >
                    <Typography>
                    <ul className={classes.pengirimStyle}>
                      <li><b>Investor</b></li>
                      <li>Fulan bin Manaf</li>
                      <li>Puribeta, Suite 600</li>
                      <li>Ciledug, CA 94107</li>
                    </ul>
                    </Typography>
                  </div>
                  <div>
                    <Typography>
                      <ul className={classes.pengirimStyle}>
                        <li><b>Tanggal: </b>15 Agustus 2020</li>
                        <li>
                          <b>Status: </b>
                          <Chip
                            label="Menunggu Konfirmasi"
                            clickable
                            // color="primary"
                            variant="outlined"
                            style={{color: '#FFA800', borderColor: '#FFA800'}}
                          />
                          
                        </li>
                        <li><b>No Invoice: </b>#1234567</li>
                      </ul>
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TableComponents />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className={classes.topPage}>
                  <div>

                  </div>
                  <div className={classes.containerBtn}>
                    <Button variant="contained" className={classes.btnReject}>Tolak</Button>                    
                    <Button variant="contained"className={classes.btnAcept}>Terima</Button>
                  </div>
                </div>
              </Grid>
            </Grid>

          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default RincianTransaksi;