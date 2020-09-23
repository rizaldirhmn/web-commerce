import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery, Button, colors } from '@material-ui/core';
import { Link as RouterLink, Redirect } from 'react-router-dom';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import DashboardIcon from '@material-ui/icons/Dashboard';
import CartIcon from '@material-ui/icons/AddShoppingCart';
import PurchaseIcon from '@material-ui/icons/Assignment';
import UserIcon from '@material-ui/icons/People';
import PaymentIcon from '@material-ui/icons/Payment'

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
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
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
    fontFamily: 'Nunito'
  },
  textMenuNested: {
    color: textMenuWhite,
    fontFamily: 'Nunito',
    fontSize: '14px',
    // textDecoration: 'underline'
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  nested: {
    paddingLeft: theme.spacing(6),
    // fontSize: '14px'
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
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
          <ListItem 
            key='dashboard' 
            disabledGutters
            className={classes.item}
          >
            <Button
              activeClassName={classes.active}
              className={classes.button}
              component={CustomRouterLink}
              onClick={handleDrawerClose}
              to='/dashboard'
            >
              <div className={classes.icon}>
                <DashboardIcon style={{ color: textMenuWhite }} />
              </div>
              <div className={classes.textMenu}>
                Dashboard
              </div>
            </Button>
          </ListItem>
          <ListItem
            button 
            disabledGutters
            className={classes.item}
            onClick={() => handleClick('transaksi')}
          >
            <Button
              className={classes.button}
            >
              <div className={classes.icon}>
                <CartIcon style={{ color: textMenuWhite }} />
              </div>
              <div className={classes.textMenu}>
                Transaksi
              </div>
            </Button>
            {transactionOpen ? <ExpandLess style={{ color: textMenuWhite }} /> : <ExpandMore style={{ color: textMenuWhite }} />}
          </ListItem>
          <Collapse in={transactionOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem 
                key='cashier'
                className={classes.nested}
              >
                <Button
                  fullWidth
                  activeClassName={classes.active}
                  className={classes.button}
                  component={CustomRouterLink}
                  onClick={handleDrawerClose}
                  to='/cashier'
                >
                    <div className={classes.textMenuNested}>Penjualan</div>
                </Button>
              </ListItem>
              <ListItem
                key='cashier-buyback'
                className={classes.nested}
              >
                <Button
                  fullWidth
                  activeClassName={classes.active}
                  className={classes.button}
                  component={CustomRouterLink}
                  onClick={handleDrawerClose}
                  to='/cashier-buyback'
                >
                    <div className={classes.textMenuNested}>Buyback</div>
                </Button>
              </ListItem>
            </List>
          </Collapse>
          <ListItem 
            key='customer' 
            disabledGutters
            className={classes.item}
          >
            <Button
              activeClassName={classes.active}
              className={classes.button}
              component={CustomRouterLink}
              onClick={handleDrawerClose}
              to='/customer'
            >
                <div className={classes.icon}>
                  <UserIcon style={{ color: textMenuWhite }} />
                </div>
                <div className={classes.textMenu}>Customer</div>
            </Button>
          </ListItem>
          <ListItem
            key='purchase-order'
            disabledGutters
            className={classes.item}
          >
            <Button
              activeClassName={classes.active}
              className={classes.button}
              component={CustomRouterLink}
              onClick={handleDrawerClose}
              to='/purchase-order'
            >
                <div className={classes.icon}>
                  <PurchaseIcon style={{ color: textMenuWhite }} />
                </div>
                <div className={classes.textMenu}>Purchase</div>
            </Button>
          </ListItem>
          <ListItem 
            key='other-purchase-order'
            disabledGutters
            className={classes.item}
          >
            <Button
              activeClassName={classes.active}
              className={classes.button}
              component={CustomRouterLink}
              onClick={handleDrawerClose}
              to='/other-purchase-order'
            >
                <div className={classes.icon}>
                  <PaymentIcon style={{ color: textMenuWhite }} />
                </div>
                <div className={classes.textMenu}>Biaya</div>
            </Button>
          </ListItem>
          
          <ListItem
            className={classes.item}
            disabledGutters
            button 
            onClick={() => handleClick('laporan')}
          >
            <Button
              className={classes.button}
            >
              <div className={classes.icon}>
                <ReportIcon style={{ color: textMenuWhite }} />
              </div>
              <div className={classes.textMenu}>Laporan</div>
            </Button>
            {reportOpen ? <ExpandLess style={{ color: textMenuWhite }} /> : <ExpandMore style={{ color: textMenuWhite }} />}
          </ListItem>
          <Collapse in={reportOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem 
                className={classes.nested} 
                key='report-selling'
              >
                <Button
                  fullWidth
                  activeClassName={classes.active}
                  className={classes.button}
                  component={CustomRouterLink}
                  onClick={handleDrawerClose}
                  to='/report/selling'
                >
                    <div className={classes.textMenu}>Penjualan</div>
                </Button>
              </ListItem>
              <ListItem 
                className={classes.nested} 
                key='report-buyback'
              >
                <Button
                  fullWidth
                  activeClassName={classes.active}
                  className={classes.button}
                  component={CustomRouterLink}
                  onClick={handleDrawerClose}
                  to='/report/buyback'
                >
                    <div className={classes.textMenu}>Buyback</div>
                </Button>
              </ListItem>
              <ListItem 
                className={classes.nested} 
                key='stock-history'
              >
                <Button
                  fullWidth
                  activeClassName={classes.active}
                  className={classes.button}
                  component={CustomRouterLink}
                  onClick={handleDrawerClose}
                  to='/stock-history'
                >
                    <div className={classes.textMenu}>Stock</div>
                </Button>
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            className={classes.item}
            disabledGutters
            button 
            onClick={() => handleClick('pengaturan')}
          >
            <Button
              className={classes.button}
            >
              <div className={classes.icon}>
                <SettingIcon style={{ color: textMenuWhite }} />
              </div>
              <div className={classes.textMenu}>Pengaturan</div>
            </Button>
            {pengaturanOpen ? <ExpandLess style={{ color: textMenuWhite }} /> : <ExpandMore style={{ color: textMenuWhite }} />}
          </ListItem>
          <Collapse in={pengaturanOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem 
                className={classes.nested}
                key='begining-balance'
              >
                <Button
                  fullWidth
                  activeClassName={classes.active}
                  className={classes.button}
                  component={CustomRouterLink}
                  onClick={handleDrawerClose}
                  to='/begining-balance'
                >
                    <div className={classes.textMenu}>Stock Awal</div>
                </Button>
              </ListItem>
              <ListItem 
                className={classes.nested} 
                key='stock-opname'
              >
                <Button
                  fullWidth
                  activeClassName={classes.active}
                  className={classes.button}
                  component={CustomRouterLink}
                  onClick={handleDrawerClose}
                  to='/stock-opname'
                >
                    <div className={classes.textMenu}>Stock Opname</div>
                </Button>
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            disabledGutters
            className={classes.item}
            key='signout'
          >
            <Button
              activeClassName={classes.active}
              className={classes.button}
              component={CustomRouterLink}
              onClick={handlingSignout}
            >
                <div className={classes.icon}>
                  <SignOutIcon style={{ color: textMenuWhite }} />
                </div>
                <div className={classes.textMenu}>Sign Out</div>
            </Button>
          </ListItem>
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
