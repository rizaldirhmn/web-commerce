import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
  Paper
} from '@material-ui/core'
// Components
import {
	BranchPricing,
	AOGPricing,
  MOGPricing,
  CustomerPricing,
  BuybackPrice
} from './components'

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

const AntTabs = withStyles({
  root: {
    padding: 8,
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    height: 5,
    backgroundColor: '#FF9300',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    margin: 'auto',
    fontFamily: [
      'Roboto',
    ].join(','),
    '&:hover': {
      color: '#011747',
      opacity: 1,
    },
    '&$selected': {
      color: '#000000',
      // backgroundColor: '#011747',
      fontWeight: theme.typography.fontWeightMedium,
      borderRadius: theme.spacing(4),
      margin: 'auto'
    },
    '&:focus': {
      color: '#000000',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: 'auto',
    marginTop: theme.spacing(2)
    // backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    // borderRadius: theme.spacing(4)
    backgroundColor: 'transparent'
  },
  tab: {
      borderRadius: theme.spacing(4),
      margin: theme.spacing(2),
      // backgroundColor: '#0277BD',
      color: '#FFFFFF'
  }
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
        <Paper>
          <AntTabs 
            value={value} 
            onChange={handleChange} 
            aria-label="ant example" 
            variant="scrollable"
            scrollButtons="auto"
            classes={{ indicator: classes.bigIndicator}}
          >
            <AntTab label="Cabang" />
            <AntTab label="Agent of Gold" />
            <AntTab label="Member of Gold" />
            <AntTab label="Umum" />
            <AntTab label="Buyback" />
          </AntTabs>
          <TabPanel value={value} index={0}>
            <BranchPricing />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AOGPricing />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <MOGPricing />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <CustomerPricing />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <BuybackPrice />
          </TabPanel>
        </Paper>
    </div>
  );
}
