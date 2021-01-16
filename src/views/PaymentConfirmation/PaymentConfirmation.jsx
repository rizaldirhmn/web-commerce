import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/Styles'
import { 
    Grid,
    Box,
    Typography,
    AppBar,
    Tabs,
    Tab
} from '@material-ui/core'

import TablePaymentConfirmation from './TablePaymentConfirmation'


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
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
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
    backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
    },
}))

const PaymentConfirmation = props => {
    const classes = useStyles()

    const [value, setValue] = React.useState(0);
    const handleChangeTabs = (event, newValue) => {
        setValue(newValue);
    };

    return (
    <Fragment>
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
                justify="space-between"
            >
                <Grid item>  
                    <Typography variant="h4" className={classes.title}>
                        Konfirmasi Pembayaran
                    </Typography>
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
                    <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={handleChangeTabs}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            <Tab label="Menunggu Konfirmasi Admin" {...a11yProps(0)} />
                            <Tab label="Pesanan Diproses" {...a11yProps(1)} />
                            <Tab label="Barang Sedang Dikirim" {...a11yProps(2)} />
                            <Tab label="Pesanan Dibatalkan" {...a11yProps(3)} />
                            <Tab label="Pesanan Selesai" {...a11yProps(4)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <TablePaymentConfirmation
                        status={2} 
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <TablePaymentConfirmation
                        status={3} 
                        />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <TablePaymentConfirmation
                        status={4} 
                        />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <TablePaymentConfirmation
                        status={5} 
                        />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <TablePaymentConfirmation
                        status={6} 
                        />
                    </TabPanel>
                </Grid>
            </Grid>
            
        </div>  
    </Fragment>
    )
}

export default PaymentConfirmation