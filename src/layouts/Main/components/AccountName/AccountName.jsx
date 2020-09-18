import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

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
  const { className, ...rest } = props;

  const classes = useStyles();
  const data = JSON.parse(sessionStorage.getItem('data'))

  const user = {
    name: data.name,
    avatar: data.image,
    position: data.role
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
        src={user.avatar}
        to="/profile"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.name}
      </Typography>
      <Typography variant="body2" style={{ color: nameColorWhite }}>{user.position}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
