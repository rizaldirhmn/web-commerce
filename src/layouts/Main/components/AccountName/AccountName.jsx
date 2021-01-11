import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { 
  Avatar,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux'
import { getProfile } from '../../../../actions/profile'

const nameColorWhite = '#000000';
// const nameColorBlack = '#000000';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  logo: {
    width: '100%',
    top: 0,
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
    color: nameColorWhite,
    fontFamily: 'Montserrat'
  },
  teamName: {
    // margin: theme.spacing(3, 0, 2),
    marginTop: theme.spacing(3),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    border: '0.5px solid rgba(224, 224, 224, 0.5)',
    boxSizing: 'border-box',
    color: '#000000',
    width: '100%',
    fontFamily: 'Montserrat',
    borderRadius: theme.spacing(1)
  },
  text: {
    width: '100%'
  }
}));

const Profile = props => {
  const { className, ...rest } = props

  const classes = useStyles();
  const data = JSON.parse(sessionStorage.getItem('data'))

  const profile = {
    name: `${data.name}`,
    // avatar: data.image,
    email: `${data.email}` 
  };
  
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
          {/* <img src={`${process.env.PUBLIC_URL}/images/jari_visibility.png`} alt="club" className={classes.logo} />
          <Button
            className={classes.teamName}
            component={CustomRouterLink}
            to="/home"
          >
            <div className={classes.text}>
              {sessionStorage.getItem('team')}
            </div>
          </Button> */}
          <Avatar
            alt="Person"
            className={classes.avatar}
            component={RouterLink}
            // src={profile.image}
            src={`${process.env.PUBLIC_URL}/images/logo/logo_dzualan.png`}
            to="/profile"
          />
          <Typography
            className={classes.name}
            variant="h4"
          >
            {profile.name}
          </Typography>
          <Typography variant="body2" style={{ color: nameColorWhite, fontFamily: 'Nunito' }}>{profile.email}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getProfile})(Profile)
