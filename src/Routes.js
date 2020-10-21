import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Login } from './layouts';

import {
  Dashboard as DashboardView,
  Profile as ProfileView,
  PembayaranEmas as PembayaranEmasView,
  PengirimanEmas as PengirimanEmasView,
  RincianTransaksi as RincianTransaksiView,
} from './views';

const Routes = () => {
  
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />

      <RouteWithLayout
        component={ProfileView}
        exact
        layout={MainLayout}
        path="/profile"
      />

      <RouteWithLayout
        component={PengirimanEmasView}
        exact
        layout={MainLayout}
        path="/pengiriman-emas"
      />

      <RouteWithLayout
        component={RincianTransaksiView}
        exact
        layout={MainLayout}
        path="/rincian-transaksi"
      />

      <RouteWithLayout
        component={PembayaranEmasView}
        exact
        layout={MainLayout}
        path="/pembayaran-emas"
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
