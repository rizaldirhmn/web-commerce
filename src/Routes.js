import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Login, Home as HomeLayout } from './layouts';

import {
  Dashboard as DashboardView,
  Profile as ProfileView,
  Home as HomeView,
  Customer as CustomerView,
  Task as TaskView,
  Report as ReportView
} from './views';

const Routes = () => {
  
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/home"
      />

      <RouteWithLayout 
        component={HomeView}
        exact
        layout={HomeLayout}
        path="/home"
      />

      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard/:id"
      />

      <RouteWithLayout
        component={ProfileView}
        exact
        layout={MainLayout}
        path="/profile"
      />

      <RouteWithLayout
        component={CustomerView}
        exact
        layout={MainLayout}
        path="/customer/:id"
      />

      <RouteWithLayout
        component={TaskView}
        exact
        layout={MainLayout}
        path="/task"
      />

      <RouteWithLayout 
        component={ReportView}
        exact
        layout={MainLayout}
        path="/report"
      />

      <Route
        component={Login}
        exact
        // layout={Login}
        path="/sign-in"
      />
      {/* <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      /> */}

      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
