import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery, Button, colors, Divider, Typography, Tooltip } from '@material-ui/core';
import { Link as RouterLink, Redirect } from 'react-router-dom';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';

import DashboardIcon from '@material-ui/icons/Dashboard';
import CartIcon from '@material-ui/icons/AddShoppingCart';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SignOutIcon from '@material-ui/icons/Input';

import Hidden from '@material-ui/core/Hidden';

import { Footer, AppBar, AccountName } from './components';

const drawerWidth = 240;
const drawerColorBlue = '#FFFFFF';

// const textMenuWhite = '#FFFFFF';
const textMenuBlack = '#000000';

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
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: drawerColorBlue
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    backgroundColor: drawerColorBlue,
    paddingTop: theme.spacing(5)
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
    width: 'auto'
  },
  textMenu: {
    color: textMenuBlack,
    fontFamily: 'Nunito',
    paddingLeft: theme.spacing(2)
  },
  textMenuNested: {
    color: textMenuBlack,
    fontFamily: 'Nunito',
    fontSize: '14px',
    paddingLeft: theme.spacing(2)
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
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

  const [open, setOpen] = useState(true);

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
        // className={classes.drawer}
        anchor="left"
        variant="permanent"
        open={open}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
        // classes={{
        //   paper: classes.drawerPaper,
        // }}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        {open && <AccountName /> }
        <Divider />
        <List
          className={classes.menus}
        >
          <ListItem 
            key='dashboard' 
            button
            disabledGutters
            className={classes.item}
          >
            <Button
              activeClassName={classes.active}
              className={classes.button}
              component={CustomRouterLink}
              
              to='/dashboard'
            >
              {open ? (
                <>
                <div className={classes.icon}>
                  <DashboardIcon style={{ color: textMenuBlack }} />
                </div>
                <div className={classes.textMenu}>
                  Dashboard
                </div>
                </>
              ):(
                <Tooltip title="Dashboard" placement="right" arrow>
                  <div className={classes.icon}>
                    <DashboardIcon style={{ color: textMenuBlack }} />
                  </div>
                </Tooltip>
              )}
            </Button>
          </ListItem>
          <ListItem
            key="transaksi"
            button 
            disabledGutters
            className={classes.item}
          >
            <Button
              className={classes.button}
            >
              {open ? (
                <>
                  <div className={classes.icon}>
                    <CartIcon style={{ color: textMenuBlack }} />
                  </div>
                  <div className={classes.textMenu}>
                    Transaksi
                  </div>
                </>
              ):(
                <Tooltip title="Transaksi" placement="right" arrow>
                  <div className={classes.icon}>
                    <CartIcon style={{ color: textMenuBlack }} />
                  </div>
                </Tooltip>
              )}
            </Button>
          </ListItem>
          
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
              {open ? (
                <>
                  <div className={classes.icon}>
                    <SignOutIcon style={{ color: textMenuBlack }} />
                  </div>
                  <div className={classes.textMenu}>Sign Out</div>
                </>
              ):(
                <Tooltip title="Signout" placement="right">
                  <div className={classes.icon}>
                    <SignOutIcon style={{ color: textMenuBlack }} />
                  </div>
                </Tooltip>
              )}
            </Button>
          </ListItem>
        </List>
        <div className={classes.bottomPush}>
          <div className={classes.toolbar}>
            {open ? (
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: textMenuBlack }} /> : <ChevronLeftIcon style={{ color: textMenuBlack }} />}
                <Typography>Kecilkan Menu</Typography>
              </IconButton>
            ):(
              <IconButton onClick={handleDrawerOpen}>
                {theme.direction === 'rtl' ? <ChevronLeftIcon style={{ color: textMenuBlack }} /> : <ChevronRightIcon style={{ color: textMenuBlack }} />}
              </IconButton>
            )}
          </div>
        </div>
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
