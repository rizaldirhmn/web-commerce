import React, { forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useMediaQuery, Button, colors, Divider } from '@material-ui/core'
import { Link as RouterLink, Redirect } from 'react-router-dom'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import Hidden from '@material-ui/core/Hidden'

import { AppBar, AccountName } from './components'

const drawerWidth = 240
const drawerColorBlue = '#FFFFFF'

// const textMenuWhite = '#FFFFFF'
const textMenuBlack = '#000000'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#FFFFFF'
  },
  backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
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
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    zIndex: 1400
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: drawerColorBlue,
    borderRadius: theme.spacing(2)
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
    backgroundColor: drawerColorBlue,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 0,
    }
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
    fontFamily: 'Montserrat',
    paddingLeft: theme.spacing(2)
  },
  textMenuNested: {
    color: textMenuBlack,
    fontFamily: 'Montserrat',
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
    paddingTop: 0,
    paddingBottom: 0,
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
}))

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
))

const Main = props => {
  const { children, window } = props

  const classes = useStyles()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  })
  
  const [open, setOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleDrawerClose = () => {
    setMobileOpen(false)
  }

  // Dialog Box
  const [dialogOpen, setDialogOpen] = useState(false)
  // Collapsable Menus
  const [masterOpen, setMasterOpen] = useState(false);
  const [masterProduct, setMasterProduct] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  const handleDoLogout = () => {
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('expires_in')
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('data')
    sessionStorage.clear()
    setRedirect({values: true})
  }

  const [redirect, setRedirect] = useState({
    values : false
  })

  const handlingSignout = event => {
    event.persist()
    setDialogOpen(true)
  }

  const handleClick = (event) => {
    if (event === 'master') {
      setMasterOpen(!masterOpen);
    }else if(event === 'master-product'){
      setMasterProduct(!masterProduct)
    }
  };

  if (redirect.values) {
    return <Redirect to='/sign-in'/>
  }

  const drawer = (
    <div>
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
            onClick={handleDrawerClose}
            to={`/dashboard`}
          >
              <div className={classes.icon}>
                <img src={`${process.env.PUBLIC_URL}/images/icon/dashboard.svg`} alt="Dashboard" />
              </div>
              <div className={classes.textMenu}>
                Dashboard
              </div>
          </Button>
        </ListItem>
        
        
        <ListItem 
          key='master-product'
          disabledGutters
          className={classes.item}
          onClick={() => handleClick('master-product')}
        >
          <Button
            className={classes.button}
          >
            <div className={classes.icon}>
                <img src={`${process.env.PUBLIC_URL}/images/icon/Buy.svg`} alt="Master Product" />
            </div>
            <div className={classes.textMenu}>
              Produk
            </div>
          </Button>
          {masterProduct ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={masterProduct} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItem 
              key='product' 
              className={classes.nested}
            >
              <Button
                activeClassName={classes.active}
                className={classes.button}
                component={CustomRouterLink}
                onClick={handleDrawerClose}
                to={`/product`}
              >
                  <div className={classes.textMenu}>
                    Produk
                  </div>
              </Button>
            </ListItem>
            <ListItem 
              key='product-collection' 
              className={classes.nested}
            >
              <Button
                activeClassName={classes.active}
                className={classes.button}
                component={CustomRouterLink}
                onClick={handleDrawerClose}
                to={`/product/collection`}
              >
                  <div className={classes.textMenu}>
                    Koleksi
                  </div>
              </Button>
            </ListItem>
          </List>
        </Collapse>
        <ListItem 
          key='payment-confirmation' 
          button
          disabledGutters
          className={classes.item}
        >
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            onClick={handleDrawerClose}
            to={`/payment-confirmation`}
          >
              <div className={classes.icon}>
                <img src={`${process.env.PUBLIC_URL}/images/icon/wallet.svg`} alt="Dashboard" />
              </div>
              <div className={classes.textMenu}>
                Konfirmasi Pesanan
              </div>
          </Button>
        </ListItem>
        <ListItem 
          key='blog' 
          button
          disabledGutters
          className={classes.item}
        >
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            onClick={handleDrawerClose}
            to={`/blog`}
          >
              <div className={classes.icon}>
                <img src={`${process.env.PUBLIC_URL}/images/icon/Document.svg`} alt="Dashboard" />
              </div>
              <div className={classes.textMenu}>
                Blog
              </div>
          </Button>
        </ListItem>
        <ListItem 
          key='master'
          disabledGutters
          className={classes.item}
          onClick={() => handleClick('master')}
        >
          <Button
            className={classes.button}
          >
            <div className={classes.icon}>
              <img src={`${process.env.PUBLIC_URL}/images/icon/Setting.svg`} alt="Master" />
            </div>
            <div className={classes.textMenu}>
              Pengaturan
            </div>
          </Button>
          {masterOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={masterOpen} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItem
              key='banner'
              className={classes.nested}
            >
              <Button
                activeClassName={classes.active}
                className={classes.button}
                component={CustomRouterLink}
                onClick={handleDrawerClose}
                to={`/banner`}
              >
                  <div className={classes.textMenu}>
                    Banner
                  </div>
              </Button>
            </ListItem>
            <ListItem
              key='warehouse'
              className={classes.nested}
            >
              <Button
                activeClassName={classes.active}
                className={classes.button}
                component={CustomRouterLink}
                onClick={handleDrawerClose}
                to={`/warehouse`}
              >
                  <div className={classes.textMenu}>
                    Gudang
                  </div>
              </Button>
            </ListItem>
            <ListItem
              key='category'
              className={classes.nested}
            >
              <Button
                activeClassName={classes.active}
                className={classes.button}
                component={CustomRouterLink}
                onClick={handleDrawerClose}
                to={`/category`}
              >
                  <div className={classes.textMenu}>
                    Kategori
                  </div>
              </Button>
            </ListItem>
            <ListItem
              key='whatsapp-follow-settings'
              className={classes.nested}
            >
              <Button
                activeClassName={classes.active}
                className={classes.button}
                component={CustomRouterLink}
                onClick={handleDrawerClose}
                to={`/whatsapp-follow-settings`}
              >
                  <div className={classes.textMenu}>
                    Whatsapp
                  </div>
              </Button>
            </ListItem>
            
          </List>
        </Collapse>
        
        <ListItem 
          key='notifications' 
          button
          disabledGutters
          className={classes.item}
        >
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            onClick={handleDrawerClose}
            to={`/notifications`}
          >
              <div className={classes.icon}>
                <img src={`${process.env.PUBLIC_URL}/images/icon/Notification.svg`} alt="Dashboard" />
              </div>
              <div className={classes.textMenu}>
                Notifications
              </div>
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
              <div className={classes.icon}>
                <img src={`${process.env.PUBLIC_URL}/images/icon/Logout.svg`} alt="Dashboard" />
              </div>
              <div className={classes.textMenu}>Keluar</div>
          </Button>
        </ListItem>
      </List>
    </div>
  )
  
  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <AppBar handleDrawerToggle={handleDrawerToggle} open={open} setOpen={setOpen} />
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <SwipeableDrawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {<AccountName /> }
            {drawer}
          </SwipeableDrawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <SwipeableDrawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {open && <AccountName /> }
            {drawer}

          </SwipeableDrawer>
        </Hidden>
      </nav>
      <main 
        className={classes.content}
      >
        {children}
        {/* <Hidden only={['xs','sm']}>
          <Footer />
        </Hidden> */}
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
  )
}

Main.propTypes = {
  children: PropTypes.node
}

export default Main
