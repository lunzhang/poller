import React from 'react';
import { combineReducers } from 'redux';
import { USER_LOGIN,NEW_USER } from './actions.js';

const initialUser = {
  loggedIn : false
};

function user(state=initialUser,action){
  switch(action.type){
    case USER_LOGIN:
      return Object.assign({}, state, {loggedIn: action.value});
    case NEW_USER:
      return Object.assign({}, state, {
        loggedIn: true,
        id:action.value.id,
        name:action.value.name,
        pictureURL:action.value.pictureURL
      });
  }
  return state;
}

function routeReducer(state = {}, action) {
  switch (action.type) {
  }
  return state;
}

const appReducer = combineReducers({
  user,
  routeReducer
})

export default appReducer;
