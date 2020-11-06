import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
  Button,
    Card,
    CardContent,
    CardHeader,
    Grid
} from '@material-ui/core'

// Layouts
import { ListSyirkah } from './components'

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
    flexGrow: 1,
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    margin: theme.spacing(2)
  },
  card: {
      width: '100%'
  },
  appBar: {
      backgroundColor: '#FFFFFF',
      boxShadow: 'none'
  },
  text: {
    fontFamily: 'Nunito'
  },
  cardContent: {
    backgroundColor: '#F7F9FC'
  }
}));

export default function Syirkah() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
        <Grid
            container
            spacing={3}
            justify="space-between"
        >
            <Grid item>  
              <Typography variant="h4" className={classes.text}>Syirkah</Typography>
            </Grid>
            <Grid item>  
              <Button color="primary" variant="contained" size="small">
                + Buat D'Syirkah
              </Button>
            </Grid>
        </Grid>
        <Grid
            container
            spacing={3}
        >  
            <Grid 
                item
                lg={12}
            >
                <Card className={classes.card}>
                    <CardContent>
                        <AppBar position="static" className={classes.appBar}>
                            <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                            >
                                <Tab label="Syirkah Opsi 1" {...a11yProps(0)} />
                                <Tab label="Syirkah Opsi 2" {...a11yProps(1)} />
                                <Tab label="Syirkah Opsi 3" {...a11yProps(2)} />
                            </Tabs>
                        </AppBar>
                    </CardContent>
                </Card>
                
                
            </Grid>
        </Grid>
        <Grid 
            container
            spacing={3}
        >
            <Grid
                item
                lg={12}
            >
                <Card className={classes.card}>
                    <CardHeader
                        title="Syirkah EOA Club Umum"
                    />
                    <CardContent className={classes.cardContent}>
                      <TabPanel value={value} index={0}>
                          <ListSyirkah />
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                          Item Two
                      </TabPanel>
                      <TabPanel value={value} index={2}>
                          Item Three
                      </TabPanel>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        <Grid 
            container
            spacing={3}
        >
            <Grid
                item
                lg={12}
            >
                <Card className={classes.card}>
                    <CardHeader
                        title="Syirkah Unit Bisnis"
                    />
                    <CardContent className={classes.cardContent}>
                      <TabPanel value={value} index={0}>
                          <ListSyirkah />
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                          Item Two
                      </TabPanel>
                      <TabPanel value={value} index={2}>
                          Item Three
                      </TabPanel>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </div>
  );
}
