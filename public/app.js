import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, hashHistory,Redirect } from 'react-router';

import routeReducer from './reducers.js';
import Main from './components/main.js';
import Home from './components/home.js';
import Login from './components/login.js';

let store = createStore(routeReducer);

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
      </Route>
      <Redirect from="*" to="/"/>
    </Router>
  </Provider>,
  document.getElementById('app')
);
