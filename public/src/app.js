import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory,Redirect } from 'react-router';

import { userLogin, newUser } from './actions.js';
import store from './store.js';
import Main from './components/main.js';
import Home from './components/home.js';
import Login from './components/login.js';

// init Facebook
window.fbAsyncInit = function() {
  FB.init({
    appId      : '1010443149089796',
    xfbml      : true,
    version    : 'v2.8'
  });
  FB.AppEvents.logPageView();
  FB.getLoginStatus(function(resp) {
    console.log(resp);
    if(resp.status === "connected"){
      let exist = true;
      if(exist){
        FB.api('/me?fields=name,picture',function(resp){
          store.dispatch(newUser({
              id:resp.id,
              name:resp.name,
              pictureURL:resp.picture.data.url
          }));
        });
      }
    }
  });
};
(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


//render app
render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} onEnter={enterLogin}/>
      </Route>
      <Redirect from="*" to="/"/>
    </Router>
  </Provider>,
  document.getElementById('app')
);

//redirect if user already login
function enterLogin(nextState,replace){
  let { user } = store.getState();
  if(user.loggedIn){
      replace({
        pathname:'/'
      });
  }
};
