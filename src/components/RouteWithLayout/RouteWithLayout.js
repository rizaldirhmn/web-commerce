import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// import {SignIn as SignInView} from 'views';
// import { Minimal as MinimalLayout } from 'layouts';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  const access_token = sessionStorage.getItem('access_token');

  return (
    <Route
      {...rest}
      render={matchProps => (
        access_token ?
        <Layout>
          <Component {...matchProps} />
        </Layout>
        : (
          <Redirect to="/sign-in"
          />
        )
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
