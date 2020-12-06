import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import ExpandMore from '@material-ui/icons/ExpandMore';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import {
  Divider,
  Typography,
  Avatar,
  Hidden
} from '@material-ui/core'


const drawerWidth = 240;
// const appDrawerBlue = '#FFFFFF';
// const appDrawerDefault = '#FFFFFF';

// const iconBlack = '#000000';

const useStyles = makeStyles(theme => ({
  root: {
    
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    },
  },
  name_logo : {
    fontFamily : 'Montserrat',
    color: '#000000',
  },
  logo : {
    width: 'auto',
    height: 50,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  logo_min : {
    width: 'auto',
    height: 30,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: 'transparent'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    boxShadow: 'none',
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  flexGrow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  profileMenu: {
    marginTop : theme.spacing(2)
  },
  divider: {
    height: 28,
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    color: '#000',
    width: 'fit-content',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },
  avatar: {
    width: 30,
    height: 30,
    marginRight: theme.spacing(1)
  },
  flag: {
    width: '40px'
  }
}));

const Appbar = (props) => {
  const { handleDrawerToggle } = props;

  const classes = useStyles();
  // const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  // const [ openLanguage, setOpenLanguage ] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  // const isMenuLanguage = Boolean(openLanguage)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // const handleOpenLanguage = (event) => {
  //   setOpenLanguage(event.currentTarget)
  // }

  // const handleCloseLanguage = () => {
  //   setOpenLanguage(null)
  // }

  // useEffect(() => {
  //   getProfile()
  // }, [loadingGetProfile, getProfile])

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className={classes.profileMenu}
    >
      <Link to="/profile">
        <MenuItem onClick={handleMenuClose}>
          Profile
        </MenuItem>
      </Link>
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  // const renderLanguage = (
  //   <Menu
  //     anchorEl={openLanguage}
  //     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     open={isMenuLanguage}
  //     onClose={handleCloseLanguage}
  //     className={classes.profileMenu}
  //   >
  //     <Link to="#">
  //       <MenuItem onClick={handleMenuClose}>
  //         <img src={`${process.env.PUBLIC_URL}/images/english_flag.png`} alt="english" className={classes.flag} />
  //       </MenuItem>
  //     </Link>
  //     <Link to="#">
  //       <MenuItem onClick={handleMenuClose}>
  //         <img src={`${process.env.PUBLIC_URL}/images/indonesia_flag.jpg`} alt="indonesia" className={classes.flag} />
  //       </MenuItem>
  //     </Link>
  //     {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
  //   </Menu>
  // );

  const data = JSON.parse(sessionStorage.getItem('data'))

  return (
    // <div className={classes.flexGrow}>
      <AppBar
        position="fixed"
        // color="inherit"
        className={classes.appBar}
      >
        <Toolbar>
        <Hidden smUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon style={{ color: '#000' }} />
          </IconButton>
        </Hidden>
          
          <div className={classes.flexGrow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="default">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="default">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            {/* <IconButton
              onClick={handleOpenLanguage}
            >
                <img src={`${process.env.PUBLIC_URL}/images/english_flag.png`} alt="english" className={classes.flag} />
              
              <ExpandMore style={{ color: '#000' }} />
            </IconButton> */}
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
              onClick={handleProfileMenuOpen}
            >
                <Avatar
                  alt="Person"
                  className={classes.avatar}
                  // src={profile.image}
                  src={`${process.env.PUBLIC_URL}/images/logo/logo.png`}
                />
                <Typography variant="h5" className={classes.profileName}>
                  {data.display_name}
                </Typography>
              
              <ExpandMore style={{ color: '#000' }} />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon style={{ color: '#000' }} />
            </IconButton>
          </div>
        </Toolbar>
        {renderMobileMenu}
        {renderMenu}
        {/* {renderLanguage} */}
      </AppBar>
    // </div>
  );
};


export default Appbar
