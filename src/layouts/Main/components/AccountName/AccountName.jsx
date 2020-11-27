import React, { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
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
    margin: theme.spacing(3, 0, 2),
    border: '0.5px solid rgba(224, 224, 224, 0.5)',
    boxSizing: 'border-box',
    color: '#000000',
    // width: '100%',
    fontFamily: 'Montserrat',
    borderRadius: theme.spacing(1)
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

const Profile = props => {
  const { className, ...rest } = props

  const classes = useStyles();
  
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
          <img src={`${process.env.PUBLIC_URL}/images/jari_visibility.png`} alt="club" className={classes.logo} />
          <Button
            className={classes.teamName}
            component={CustomRouterLink}
            to="/home"
          >
            <div>
              Team : {sessionStorage.getItem('team')}
            </div>
          </Button>
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
