import React, { useState, useEffect } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import api from './servers/api';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,  
  Marca as MarcaView,
  MarcaInsertEdit as MarcaInsertEditView,
  ProductList as ProductListView,
  UserList as UserListView,
  Icons as IconsView,
  Account as AccountView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Logout
} from './views';

import { Creators as actions } from './store/actions/auth';

const Routes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dispatch = useDispatch(); 


  useFetching(dispatch, actions.authCheckState());
  const token = useSelector( state  => state.auth.token );
  
  useEffect(() => {   
    setIsAuthenticated(token !== null)    
  }, [token])

 
  let routes;

  if(isAuthenticated){
    api.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    routes = (
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
          component={MarcaView}
          exact
          layout={MainLayout}
          path="/marca"
        />
        <RouteWithLayout
          component={MarcaInsertEditView}
          exact
          layout={MainLayout}
          path="/marca/:id"
        />
        <RouteWithLayout
          component={UserListView}
          exact
          layout={MainLayout}
          path="/users"
        />
        <RouteWithLayout
          component={ProductListView}
          exact
          layout={MainLayout}
          path="/products"
        />
        <RouteWithLayout
          component={IconsView}
          exact
          layout={MainLayout}
          path="/icons"
        />
        <RouteWithLayout
          component={AccountView}
          exact
          layout={MainLayout}
          path="/account"
        />
        <RouteWithLayout
          component={NotFoundView}
          exact
          layout={MinimalLayout}
          path="/not-found"
        />
        <Route
          component={Logout}
          path="/logout"
        />
        <Redirect to="/not-found" />
      </Switch>
    );

  } else {
    routes = (
      <Switch>
        <Redirect
          exact
          from="/"
          to="/sign-in"
        />        
        <RouteWithLayout
          component={SignUpView}
          exact
          layout={MinimalLayout}
          path="/sign-up"
        />
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MinimalLayout}
          path="/sign-in"
        />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    routes
  );
};

const useFetching = (dispatch, action) => {
  const array = [];
  useEffect(() => {
    dispatch(action);
  }, array)
}

export default Routes;
