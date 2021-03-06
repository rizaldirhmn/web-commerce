import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Login, Home as HomeLayout } from './layouts';

import {
  Dashboard as DashboardView,
  Profile as ProfileView,
  Home as HomeView,
  Warehouse as WarehouseView,
  CreateWarehouse as CreateWarehouseView,
  Category as CategoryView,
  CreateCategory as CreateCategoryView,
  Product as ProductView,
  CraeteProduct as CraeteProductView,
  PaymentConfirmation as PaymentConfirmationView,
  EditProduct as EditProductView,
  EditCategory as EditCategoryView,
  Collection as CollectionView,
  CreateCollection as CreateCollectionView,
  EditCollection as EditCollectionView,
  WhatsappFollow as WhatsappFollowView,
  Banner as BannerView,
  CreateBanner as CreateBannerView,
  EditBanner as EditBannerView,
  Blog as BlogView,
  CreateBlog as CreateBlogView,
  EditBlog as EditBlogView,
  Notification as NotificationView,
  SocialMedia as SocialMediaView,
  CreateSocialMedia as CreateSocialMediaView,
  EditSocialMedia as EditSocialMediaView,
  Users as UsersView,
  CreateUser as CreateUserView,
  EditUser as EditUserView
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
        component={HomeView}
        exact
        layout={HomeLayout}
        path="/home"
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
        component={WarehouseView}
        exact
        layout={MainLayout}
        path="/warehouse"
      />

      <RouteWithLayout
        component={CreateWarehouseView}
        exact
        layout={MainLayout}
        path="/warehouse/create"
      />

      <RouteWithLayout
        component={CategoryView}
        exact
        layout={MainLayout}
        path="/category"
      />

      <RouteWithLayout
        component={CreateCategoryView}
        exact
        layout={MainLayout}
        path="/category/create"
      />

      <RouteWithLayout
        component={EditCategoryView}
        exact
        layout={MainLayout}
        path="/category/edit/:id"
      />

      <RouteWithLayout
        component={ProductView}
        exact
        layout={MainLayout}
        path="/product"
      />

      <RouteWithLayout
        component={CraeteProductView}
        exact
        layout={MainLayout}
        path="/product/create"
      />

      <RouteWithLayout
        component={EditProductView}
        exact
        layout={MainLayout}
        path="/product/edit/:id"
      />

      <RouteWithLayout
        component={CollectionView}
        exact
        layout={MainLayout}
        path="/product/collection"
      />

      <RouteWithLayout
        component={CreateCollectionView}
        exact
        layout={MainLayout}
        path="/product/collection/create"
      />

      <RouteWithLayout
        component={EditCollectionView}
        exact
        layout={MainLayout}
        path="/product/collection/edit/:id"
      />

      <RouteWithLayout
        component={PaymentConfirmationView}
        exact
        layout={MainLayout}
        path="/payment-confirmation"
      />

      <RouteWithLayout
        component={WhatsappFollowView}
        exact
        layout={MainLayout}
        path="/whatsapp-follow-settings"
      />

      <RouteWithLayout
        component={BannerView}
        exact
        layout={MainLayout}
        path="/banner"
      />

      <RouteWithLayout
        component={CreateBannerView}
        exact
        layout={MainLayout}
        path="/banner/create"
      />

      <RouteWithLayout
        component={EditBannerView}
        exact
        layout={MainLayout}
        path="/banner/edit/:id"
      />

      <RouteWithLayout
        component={BlogView}
        exact
        layout={MainLayout}
        path="/blog"
      />

      <RouteWithLayout
        component={CreateBlogView}
        exact
        layout={MainLayout}
        path="/blog/create"
      />

      <RouteWithLayout
        component={EditBlogView}
        exact
        layout={MainLayout}
        path="/blog/edit/:slug"
      />

      <RouteWithLayout
        component={NotificationView}
        exact
        layout={MainLayout}
        path="/notifications"
      />

      <RouteWithLayout
        component={SocialMediaView}
        exact
        layout={MainLayout}
        path="/social-media"
      />

      <RouteWithLayout
        component={CreateSocialMediaView}
        exact
        layout={MainLayout}
        path="/social-media/create"
      />

      <RouteWithLayout
        component={EditSocialMediaView}
        exact
        layout={MainLayout}
        path="/social-media/edit/:id"
      />

      <RouteWithLayout
        component={UsersView}
        exact
        layout={MainLayout}
        path="/users"
      />

      <RouteWithLayout
        component={CreateUserView}
        exact
        layout={MainLayout}
        path="/users/create"
      />

      <RouteWithLayout
        component={EditUserView}
        exact
        layout={MainLayout}
        path="/users/edit/:id"
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
