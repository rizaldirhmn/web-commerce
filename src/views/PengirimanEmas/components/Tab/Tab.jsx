import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Divider, FormControl, Grid, IconButton, InputBase, InputLabel, Paper, Select, withStyles } from '@material-ui/core';
import { Search, DoneOutline as DoneOutlineIcon, PersonAddDisabled as PersonAddDisabledIcon, Block as BlockIcon, Schedule as ScheduleIcon } from '@material-ui/icons';

import { DateRangePicker, DateRange } from "materialui-daterange-picker";

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
}))((props) => <Tab disableRipple {...props} />)

const ScrollableTabsButtonForce = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState({});

  console.log(dateRange);

  const toggle = () => setOpen(!open);

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
          <TabCustom label="Transaksi Baru" icon={<ScheduleIcon />} {...a11yProps(0)} />
          <TabCustom label="Pembayaran Diterima" icon={<DoneOutlineIcon />} {...a11yProps(1)} />
          <TabCustom label="Pembayaran Ditolak" icon={<BlockIcon />} {...a11yProps(2)} />
          <TabCustom label="Pembayaran Dibatalkan" icon={<PersonAddDisabledIcon />} {...a11yProps(3)} />
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
                    <InputLabel htmlFor="outlined-age-native-simple">Semua Tipe</InputLabel>
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
                  <FormControl
                    // error={errors.id_cat && true}
                    variant="outlined" className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="outlined-age-native-simple">Semua Metode Pembayaran</InputLabel>
                    <Select
                      native
                      // value={formSearch.id_cat}
                      // onChange={handleSearch}
                      label="Semua Metode Pembayaran"
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
                <DateRangePicker
                  open={open}
                  toggle={toggle}
                  onChange={(range) => setDateRange(range)}
                />

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
        <Typography className={classes.panelHead}>
          Menunggu Konfirmasi
        </Typography>
        
        <TabPanel value={value} index={0}>
          Item One
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