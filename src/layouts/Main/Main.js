import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery, Button, Typography } from '@material-ui/core';
import { Link as RouterLink, Redirect } from 'react-router-dom';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import DashboardIcon from '@material-ui/icons/Dashboard';
import CartIcon from '@material-ui/icons/AddShoppingCart';
import UserIcon from '@material-ui/icons/People';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SignOutIcon from '@material-ui/icons/Input';
import ReportIcon from '@material-ui/icons/Assessment'
import SettingIcon from '@material-ui/icons/Settings'

import Hidden from '@material-ui/core/Hidden';

import { Footer, AppBar, AccountName } from './components';

const drawerWidth = 240;
const drawerColorBlue = '#011747';

const textMenuWhite = '#FFFFFF';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
    display: 'flex',
  },
  button: {
    width: '100%'
  },
  content: {
    flexGrow: 1,
    paddingTop: 56,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
      paddingTop: 56,
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: drawerColorBlue
  },
  
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    // backgroundColor: '#51CDFB'
  },
  menus: {
    paddingTop: theme.spacing(3)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  },
  flexGrow: {
    flexGrow: 1
  },
  bottomPush: {
    position: "fixed",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
  },
  textMenu: {
    color: textMenuWhite,
    fontFamily: 'Roboto'
  },
  textMenuNested: {
    color: textMenuWhite,
    fontFamily: 'Roboto',
    fontSize: '12px',
    textDecoration: 'underline'
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  nested: {
    paddingLeft: theme.spacing(8),
    fontSize: '14px'
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const Main = props => {
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [open, setOpen] = useState(false);

  // Dialog Box
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pengaturanOpen, setPengaturanOpen] = useState(false);
  const [ reportOpen, setReportOpen ] = useState(false)
  const [ transactionOpen, setTransactionOpen ] = useState(false)

  const handleClick = (event) => {
    if (event === 'pengaturan') {
      setPengaturanOpen(!pengaturanOpen);
    }else if(event === 'laporan'){
      setReportOpen(!reportOpen)
    }else if(event === 'transaksi'){
      setTransactionOpen(!transactionOpen)
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDoLogout = () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('expires_in');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('data');
    sessionStorage.clear();
    setRedirect({values: true});
  }

  const [redirect, setRedirect] = useState({
    values : false
  });

  const handlingSignout = event => {
    event.persist();
    setDialogOpen(true)
    
  };

  if (redirect.values) {
    return <Redirect to='/sign-in'/>;
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <AppBar handleDrawerOpen={handleDrawerOpen} open={open} setOpen={setOpen} />
      <SwipeableDrawer
        className={classes.drawer}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: textMenuWhite }} /> : <ChevronLeftIcon style={{ color: textMenuWhite }} />}
          </IconButton>
        </div>
        {open && <AccountName /> }
        
        <List
          className={classes.menus}
        >
          <Button
            activeclassname={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            onClick={handleDrawerClose}
            to='/dashboard'
          >
            <ListItem button key='dashboard'>
              <ListItemIcon>
                <DashboardIcon style={{ color: textMenuWhite }} />
              </ListItemIcon>
              <ListItemText secondary={<Typography type="subtitle1" className={classes.textMenu}>Dashboard</Typography>} />
            </ListItem>
          </Button>
          <Button
            activeclassname={classes.active}
            className={classes.button}
            
          >
            <ListItem
              button 
              key='transaksi'
              onClick={() => handleClick('transaksi')}
            >
              <ListItemIcon>
                <CartIcon style={{ color: textMenuWhite }} />
              </ListItemIcon>
              <ListItemText secondary={<Typography type="subtitle1" className={classes.textMenu}>Transaksi</Typography>} />
            </ListItem>
            {transactionOpen ? <ExpandLess style={{ color: textMenuWhite }} /> : <ExpandMore style={{ color: textMenuWhite }} />}
          </Button>
          <Collapse in={transactionOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Button
                fullWidth
                activeclassname={classes.active}
                className={classes.nested}
                component={CustomRouterLink}
                onClick={handleDrawerClose}
                to='/cashier'
              >
                <ListItem button key='cashier'>
                    <ListItemText secondary={<Typography type="caption" className={classes.textMenuNested}>Penjualan</Typography>} />
                </ListItem>
              </Button>
              <Button
                fullWidth
                activeclassname={classes.active}
                className={classes.nested}
                component={CustomRouterLink}
                onClick={handleDrawerClose}
                to='/cashier-buyback'
              >
                <ListItem button key='cashier-buyback'>
                    <ListItemText secondary={<Typography type="caption" className={classes.textMenuNested}>Buyback</Typography>} />
                </ListItem>
              </Button>
            </List>
          </Collapse>
          <Button
            activeclassname={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            onClick={handleDrawerClose}
            to='/customer'
          >
            <ListItem button key='customer'>
                <ListItemIcon>
                  <UserIcon style={{ color: textMenuWhite }} />
                </ListItemIcon>
                <ListItemText secondary={<Typography type="subtitle1" className={classes.textMenu}>Customer</Typography>} />
            </ListItem>
          </Button>
          <Button
            activeclassname={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            onClick={handleDrawerClose}
            to='/purchase-order'
          >
            <ListItem button key='purchase-order'>
                <ListItemIcon>
                  <CartIcon style={{ color: textMenuWhite }} />
                </ListItemIcon>
                <ListItemText secondary={<Typography type="subtitle1" className={classes.textMenu}>Purchase</Typography>} />
            </ListItem>
          </Button>
          <Button
            activeclassname={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            onClick={handleDrawerClose}
            to='/other-purchase-order'
          >
            <ListItem button key='other-purchase-order'>
                <ListItemIcon>
                  <CartIcon style={{ color: textMenuWhite }} />
                </ListItemIcon>
                <ListItemText secondary={<Typography type="subtitle1" className={classes.textMenu}>Biaya</Typography>} />
            </ListItem>
          </Button>
          <Button
            activeclassname={classes.active}
            className={classes.button}
            
          >
            <ListItem
              button 
              key='laporan'
              onClick={() => handleClick('laporan')}
            >
              <ListItemIcon>
                <ReportIcon style={{ color: textMenuWhite }} />
              </ListItemIcon>
              <ListItemText secondary={<Typography type="subtitle1" className={classes.textMenu}>Laporan</Typography>} />
            </ListItem>
            {reportOpen ? <ExpandLess style={{ color: textMenuWhite }} /> : <ExpandMore style={{ color: textMenuWhite }} />}
          </Button>
          <Collapse in={reportOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Button
                fullWidth
                activeclassname={classes.active}
                className={classes.nested}
                component={CustomRouterLink}
                onClick={handleDrawerClose}
                to='/report/selling'
              >
                <ListItem button key='report-selling'>
                    <ListItemText secondary={<Typography type="subtitle1" className={classes.textMenu}>Penjualan</Typography>} />
                </ListItem>
              </Button>
              <Button
                fullWidth
                activeclassname={classes.active}
                className={classes.nested}
                component={CustomRouterLink}
                onClick={handleDrawerClose}
                to='/report/buyback'
              >
                <ListItem button key='report-buyback'>
                    <ListItemText secondary={<Typography type="subtitle1" className={classes.textMenu}>Buyback</Typography>} />
                </ListItem>
              </Button>
              <Button
                fullWidth
                activeclassname={classes.active}
                className={classes.nested}
                component={CustomRouterLink}
                onClick={handleDrawerClose}
                to='/stock-history'
              >
                <ListItem button key='stock-history'>
                    <ListItemText secondary={<Typography type="subtitle1" className={classes.textMenu}>Stock</Typography>} />
                </ListItem>
              </Button>
            </List>
          </Collapse>
          <Button
            activeclassname={classes.active}
            className={classes.button}
            
          >
            <ListItem
              button 
              key='pengaturan'
              onClick={() => handleClick('pengaturan')}
            >
              <ListItemIcon>
                <SettingIcon style={{ color: textMenuWhite }} />
              </ListItemIcon>
              <ListItemText secondary={<Typography type="subtitle1" className={classes.textMenu}>Pengaturan</Typography>} />
            </ListItem>
            {pengaturanOpen ? <ExpandLess style={{ color: textMenuWhite }} /> : <ExpandMore style={{ color: textMenuWhite }} />}
          </Button>
          <Collapse in={pengaturanOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Button
                fullWidth
                activeclassname={classes.active}
                className={classes.nested}
                component={CustomRouterLink}
                onClick={handleDrawerClose}
                to='/begining-balance'
              >
                <ListItem button key='begining-balance'>
                    <ListItemText secondary={<Typography type="subtitle1" className={classes.textMenu}>Stock Awal</Typography>} />
                </ListItem>
              </Button>
              <Button
                fullWidth
                activeclassname={classes.active}
                className={classes.nested}
                component={CustomRouterLink}
                onClick={handleDrawerClose}
                to='/stock-opname'
              >
                <ListItem button key='stock-opname'>
                    <ListItemText secondary={<Typography type="subtitle1" className={classes.textMenu}>Stock Opname</Typography>} />
                </ListItem>
              </Button>
            </List>
          </Collapse>
          <Button
            className={classes.button}
            onClick={handlingSignout}
          >
            <ListItem button key='signout'>
                <ListItemIcon>
                  <SignOutIcon style={{ color: textMenuWhite }} />
                </ListItemIcon>
                <ListItemText secondary={<Typography type="subtitle1" className={classes.textMenu}>Sign Out</Typography>} />
            </ListItem>
          </Button>
        </List>
      </SwipeableDrawer>
      <main 
        className={classes.content}
      >
        {children}
        <Hidden only={['xs','sm']}>
          <Footer />
        </Hidden>
      </main>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Logout Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah anda ingin keluar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Tidak
          </Button>
          <Button onClick={handleDoLogout} color="primary" autoFocus>
            Ya
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
