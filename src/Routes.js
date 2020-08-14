import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Login } from './layouts';

import {
  Dashboard as DashboardView,
  Cashier as CashierView,
  Customer as CustomerView,
  CreateCustomer as CreateCustomerView,
  EditCustomer as EditCustomerView,
  PurchaseOrder as PurchaseOrderView,
  CreatePurchaseOrder as CreatePurchaseOrderView,
  Transaction as TransactionView
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
        component={CashierView}
        exact
        layout={MainLayout}
        path="/cashier"
      />

      <RouteWithLayout
        component={CustomerView}
        exact
        layout={MainLayout}
        path="/customer"
      />

      <RouteWithLayout
        component={CreateCustomerView}
        exact
        layout={MainLayout}
        path="/customer/create"
      />

      <RouteWithLayout
        component={EditCustomerView}
        exact
        layout={MainLayout}
        path="/customer/edit/:id"
      />

      <RouteWithLayout
        component={PurchaseOrderView}
        exact
        layout={MainLayout}
        path="/purchase-order"
      />

      <RouteWithLayout
        component={CreatePurchaseOrderView}
        exact
        layout={MainLayout}
        path="/purchase-order/create/:id"
      />

      <RouteWithLayout
        component={TransactionView}
        exact
        layout={MainLayout}
        path="/report/selling"
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
