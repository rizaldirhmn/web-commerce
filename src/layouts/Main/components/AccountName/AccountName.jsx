import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

import { connect } from 'react-redux'
import { getProfile } from '../../../../actions/profile'
import Skeleton from '@material-ui/lab/Skeleton';

const nameColorWhite = '#FFFFFF';
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
    color: nameColorWhite
  }
}));

const Profile = props => {
  const { getProfile, profile: { profile, loadingGetProfile }, className, ...rest } = props;

  useEffect(() => {
    getProfile()
  }, [loadingGetProfile, getProfile])

  const classes = useStyles();
  // const data = profile

  // const user = {
  //   name: data.name,
  //   avatar: data.image,
  //   position: data.role
  // };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
        {!loadingGetProfile ? (
          <Avatar
            alt="Person"
            className={classes.avatar}
            component={RouterLink}
            src={profile.image}
            to="/profile"
          />
        ): (
          <Skeleton variant="rect" className={classes.avatar}></Skeleton>
        )}
        {!loadingGetProfile ? (
          <Typography
            className={classes.name}
            variant="h4"
          >
            {profile.name}
          </Typography>
        ):(
          <Skeleton variant="rect" className={classes.name}></Skeleton>
        )}
        {!loadingGetProfile ? (
          <Typography variant="body2" style={{ color: nameColorWhite }}>{profile.email}</Typography>
        ):(
          <Skeleton variant="rect"></Skeleton>
        )}
        
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
