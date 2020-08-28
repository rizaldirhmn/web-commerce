import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Login } from './layouts';

import {
  Dashboard as DashboardView,
  Cashier as CashierView,
  CashierBuyback as CashierBuybackView,
  Customer as CustomerView,
  CreateCustomer as CreateCustomerView,
  EditCustomer as EditCustomerView,
  PurchaseOrder as PurchaseOrderView,
  CreatePurchaseOrder as CreatePurchaseOrderView,
  Transaction as TransactionView,
  BeginingBalance as BeginingBalanceView,
  DetailTransaction as DetailTransactionView,
  StockOpname as StockOpnameView,
  Profile as ProfileView,
  TransactionBuyback as TransactionBuybackView,
  DetailTransactionBuyback as DetailTransactionBuybackView,
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
        component={CashierView}
        exact
        layout={MainLayout}
        path="/cashier"
      />

      <RouteWithLayout
        component={CashierBuybackView}
        exact
        layout={MainLayout}
        path="/cashier-buyback"
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

      <RouteWithLayout
        component={DetailTransactionView}
        exact
        layout={MainLayout}
        path="/report/selling/detail/:id"
      />

      <RouteWithLayout
        component={TransactionBuybackView}
        exact
        layout={MainLayout}
        path="/report/buyback"
      />

      <RouteWithLayout
        component={DetailTransactionBuybackView}
        exact
        layout={MainLayout}
        path="/report/buyback/detail/:id"
      />

      <RouteWithLayout
        component={BeginingBalanceView}
        exact
        layout={MainLayout}
        path="/begining-balance"
      />

      <RouteWithLayout
        component={StockOpnameView}
        exact
        layout={MainLayout}
        path="/stock-opname"
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
