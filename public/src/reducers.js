import React from 'react';
import { combineReducers } from 'redux';
import * as actions from './actions.js';

function user(state={loggedIn : false},action){
  switch(action.type){
    case actions.USER_LOGIN:
      return Object.assign({}, state, {
        loggedIn: true,
        id:action.value._id,
        name:action.value.name,
        detail:action.value.detail,
        pictureURL:action.value.pictureURL,
        polls:action.value.polls
      });
    case actions.UPDATE_PROFILE:
      return Object.assign({},state,{
        name:action.value.name,
        detail:action.value.detail
      });
    case actions.IS_LOADING:
      return Object.assign({},state,{
        isLoading:action.value
      });
    case actions.UPLOAD_POLL:
      return Object.assign({},state,{
          polls : state.polls.concat(action.value._id)
      });
  }
  return state;
}

function polls(state = {}, action) {
  switch (action.type){
      case actions.FETCH_POLLS:
        let polls = {};
        action.polls.map((poll,i)=>{
          polls[poll._id] = poll;
        });
        return Object.assign({},state,polls);
      case actions.VOTE_POLL:
        let newPoll = {};
        newPoll[action.poll._id] = action.poll;
        return Object.assign({},state,newPoll);
  }
  return state;
}

const appReducer = combineReducers({
  user,
  polls
})

export default appReducer;
