import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
    Grid,
} from '@material-ui/core'

// component
import {
    ProductNotif,
    CollectionNotif,
    InfoNotif
} from './component'

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

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4)
    },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
        <Grid
            container
            spacing={2}
            justify="space-between"
        >
            <Grid item>  
                <Typography variant="h4" className={classes.title}>
                    Notifications
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
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    >
                    <Tab label="Produk" {...a11yProps(0)} />
                    <Tab label="Informasi" {...a11yProps(1)} />
                    <Tab label="Koleksi" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <ProductNotif />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <InfoNotif />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <CollectionNotif />
                </TabPanel>
            </Grid>
        </Grid>
    </div>
  );
}
