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

import DashboardIcon from '@material-ui/icons/Dashboard';
import CartIcon from '@material-ui/icons/AddShoppingCart';
import UserIcon from '@material-ui/icons/People';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SignOutIcon from '@material-ui/icons/Input';

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
  // drawer: {
  //   width: drawerWidth,
  //   flexShrink: 0,
  //   backgroundColor: drawerColorBlue
  //   // whiteSpace: 'nowrap',
  // },
  
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
  }
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
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'You will not be able to access this Dashboard Page',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes, Logout',
    //   cancelButtonText: 'No, keep it'
    // }).then((result) => {
    //   if (result.value) {
    //     // Swal.fire(
    //     //   'Logged Out',
    //     //   'You are Logged Out',
    //     //   'success'
    //     // )
        // sessionStorage.removeItem('access_token');
        // sessionStorage.removeItem('expires_in');
        // sessionStorage.removeItem('role');
        // sessionStorage.removeItem('data');
        // sessionStorage.clear();
        
    //     setRedirect({values: true});
    //   } 
    // })
    
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
            component={CustomRouterLink}
            to='/cashier'
          >
            <ListItem button key='cashier'>
              <ListItemIcon>
                <CartIcon style={{ color: textMenuWhite }} />
              </ListItemIcon>
              <ListItemText secondary={<Typography type="subtitle1" className={classes.textMenu}>Cashier</Typography>} />
            </ListItem>
          </Button>
          <Button
            activeclassname={classes.active}
            className={classes.button}
            component={CustomRouterLink}
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
            to='/purchase-order'
          >
            <ListItem button key='purchase-order'>
                <ListItemIcon>
                  <UserIcon style={{ color: textMenuWhite }} />
                </ListItemIcon>
                <ListItemText secondary={<Typography type="subtitle1" className={classes.textMenu}>Purchase Order</Typography>} />
            </ListItem>
          </Button>
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
          {/* <div className={classes.bottomPush}>
            <ListItem button key='kecilin'>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </ListItem>
          </div> */}
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
