import React, { forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useMediaQuery, Button, colors, Divider, Tooltip } from '@material-ui/core'
import { Link as RouterLink, Redirect, useParams } from 'react-router-dom'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
// import ExpandLess from '@material-ui/icons/ExpandLess';
// import ExpandMore from '@material-ui/icons/ExpandMore';
// import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem'

import DashboardIcon from '@material-ui/icons/Dashboard'
// import CustomerIcon from '@material-ui/icons/People'
// import TaskIcon from '@material-ui/icons/AssignmentInd'
// import ReportIcon from '@material-ui/icons/Assessment'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import SignOutIcon from '@material-ui/icons/Input'

import Hidden from '@material-ui/core/Hidden'

import { AppBar, AccountName } from './components'

const drawerWidth = 240
const drawerColorBlue = '#FFFFFF'

// const textMenuWhite = '#FFFFFF'
const textMenuBlack = '#000000'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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
  
  const params = useParams()

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
  // const [taskOpen, setTaskOpen] = useState(false);

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

  // const handleClick = (event) => {
  //   if (event === 'task') {
  //     setTaskOpen(!taskOpen);
  //   }
  // };

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
            to={`/dashboard/${params.id}`}
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
