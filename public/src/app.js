import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory,Redirect,IndexRoute } from 'react-router';

import { userLogin } from './actions.js';
import store from './store.js';
import Main from './containers/main.js';
import Wrapper from './containers/wrapper.js';
import Profile from './containers/profile.js';
import Login from './containers/login.js';
import Setting from './containers/settings.js';

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
      FB.api('/me?fields=name,picture',function(resp){
        store.dispatch(userLogin({
          fbId:resp.id,
          type:'FB',
          name:resp.name,
          pictureURL:resp.picture.data.url
        }));
      });
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
      <Route path="/" component={Wrapper}>
        <IndexRoute component={Main} />
        <Route path="/u/*" component={Profile} />
        <Route path="/settings" component={Setting} onEnter={authLogin}/>
        <Route path="/login" component={Login} onEnter={enterLogin}/>
      </Route>
      <Redirect from="*" to="/"/>
    </Router>
  </Provider>,
  document.getElementById('app')
);

//redirect if user not login
function authLogin(nextState,replace){
  let { user } = store.getState();
  if(!user.loggedIn){
    replace({
      pathname:'/'
    });
  }
};

//redirect if user already login
function enterLogin(nextState,replace){
  let { user } = store.getState();
  if(user.loggedIn){
    replace({
      pathname:'/'
    });
  }
};
