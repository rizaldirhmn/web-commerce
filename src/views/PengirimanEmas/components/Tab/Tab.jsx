import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Divider, FormControl, Grid, IconButton, InputBase, InputLabel, Paper, Select, withStyles } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import {
  WatchLaterSharp as WatchLaterSharpIcon,
  CheckCircleSharp as CheckCircleSharpIcon,
  HourglassFullSharp as HourglassFullSharpIcon,
  LocalShippingSharp as LocalShippingSharpIcon,
  CachedSharp as CachedSharpIcon,
  ErrorSharp as ErrorSharpIcon,
  CancelSharp as CancelSharpIcon
} from '@material-ui/icons';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

import { 
  TransaksiBaru
} from './compenents';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{padding: '10px'}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  searchSelectRoot: {
    padding: '2px 10px',
    display: 'flex',
    alignItems: 'center',
    width: 'auto'
  // marginTop: theme.spacing(2)
  },
  searchRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 'auto'
  // marginTop: theme.spacing(2)
  },
  
  divider: {
    height: 28,
    margin: 4
  },
  iconButton: {
    padding: 10,
    backgroundColor: '#0277BD',
    '&:hover': {
      backgroundColor: '#0277BD'
    },
    color: '#FFFFFF',
    borderRadius: 0
  },
  panelHead: {
    padding: '10px 10px 0px',
    fontWeight: 'bold',
  },
  tabStyle: {
    textTransform: 'none'
  },
  labelFont: {
    fontSize: '12px'
  }
}));

const TabCustom = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    margin: 'auto'
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const ScrollableTabsButtonForce = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const submitDefault = moment().subtract(7, 'd').format('YYYY-MM-DD');
  const [ startDate, setStartDate ] = useState({
    submit: {
        submit: submitDefault
    },
    view: {
        view: moment().subtract(7, 'd').format('YYYY-MM-DD')
    }
  });
  const handleStartDate = (date) => {
    const changeDate = moment(date).format('YYYY-MM-DD');
        setStartDate(startDate => ({
            ...startDate,
                submit: {
                    submit: changeDate
            },
                view: {
                    view: date
            }
        }));
    };

  return (
    <Fragment>

    <div className={classes.root}>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <TabCustom label="Transaksi Baru" icon={<WatchLaterSharpIcon />} {...a11yProps(0)} />
          <TabCustom label="Paket Sampai" icon={<LocalShippingSharpIcon />} {...a11yProps(1)} />
          <TabCustom label="Pengecekan Paket" icon={<HourglassFullSharpIcon />} {...a11yProps(2)} />
          <TabCustom label="Paket Diterima" icon={<CheckCircleSharpIcon />} {...a11yProps(3)} />
          <TabCustom label="Pusat Resolusi" icon={<CachedSharpIcon />} {...a11yProps(4)} />
          <TabCustom label="Tidak Valid" icon={<ErrorSharpIcon />} {...a11yProps(5)} />
          <TabCustom label="Dibatalkan" icon={<CancelSharpIcon />} {...a11yProps(6)} />
        </Tabs>

        <hr/><br/>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container spacing={2}>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <div className={classes.searchSelectRoot}>
                  <FormControl
                    // error={errors.id_cat && true}
                    variant="outlined" className={classes.formControl} fullWidth>
                    <InputLabel className={classes.labelFont} htmlFor="outlined-age-native-simple">Semua Tipe</InputLabel>
                    <Select
                      native
                      // value={formSearch.id_cat}
                      // onChange={handleSearch}
                      label="Semua Tipe"
                      inputProps={{
                        name: 'id_cat',
                        id: 'outlined-age-native-simple'
                      }}
                      name="id_cat"
                    >
                      <option aria-label="None" value="" />
                      {/* {optionCategories} */}
                    </Select>
                    {/* <FormHelperText>{errors.id_cat && errors.id_cat.message}</FormHelperText> */}
                  </FormControl>
                </div>
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <div className={classes.searchSelectRoot}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker 
                      fullWidth
                      label="Tanggal Awal"
                      variant="outlined"
                      name="start_date"
                      format="dd MMMM yyyy"
                      value={startDate.view.view} 
                      onChange={handleStartDate} 
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <div className={classes.searchSelectRoot}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker 
                      fullWidth
                      label="Tanggal Akhir"
                      variant="outlined"
                      name="start_date"
                      format="dd MMMM yyyy"
                      value={startDate.view.view} 
                      onChange={handleStartDate} 
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <Paper className={classes.searchRoot}>
                  <InputBase
                    className={classes.input}
                    name="name"
                    placeholder="Cari Nama Investore"
                    inputProps={{ 'aria-label': 'Cari Nama Investor' }}
                    // onChange={handleSearch}
                    // value={formSearch.name}
                  />
                  <Divider className={classes.divider} orientation="vertical" />
                  <IconButton className={classes.iconButton} aria-label="search">
                    <Search />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      
    </div>
    <div style={{marginTop: '20px'}}>
      <Paper>
        
        <TabPanel value={value} index={0}>
          <TransaksiBaru />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </Paper>
    </div>
    </Fragment>
  );
}

export default ScrollableTabsButtonForce;