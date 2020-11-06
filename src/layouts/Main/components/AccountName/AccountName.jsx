import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

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
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
    color: nameColorWhite,
    fontFamily: 'Nunito'
  }
}));

const Profile = props => {
  const { className, ...rest } = props

  const classes = useStyles();
  // const data = profile

  const profile = {
    name: "Rizaldi Rahman",
    // avatar: data.image,
    email: 'rizaldirahman0@gmail.com' 
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
          <Avatar
            alt="Person"
            className={classes.avatar}
            component={RouterLink}
            // src={profile.image}
            src={`${process.env.PUBLIC_URL}/images/logo/logo.png`}
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
