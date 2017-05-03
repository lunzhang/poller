export const USER_LOGIN = 'USER_LOGIN';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const IS_LOADING = 'IS_LOADING';
export const UPLOAD_POLL = 'UPLOAD_POLL';
export const FETCH_POLLS = 'FETCH_POLLS';
export const VOTE_POLL = 'VOTE_POLL';
export const DELETE_POLL = 'DELETE_POLL';

const DEFAULT_URL = 'http://poller-io.herokuapp.com/api/';

function postJSON(url,data,callback){
    return $.ajax({
        type:'POST',
        url:url,
        contentType:'application/json; charset=utf-8',
        data:data,
        dataType:'json',
        success:callback
    });
};

function postJSON2(url,data,callback){
  return $.ajax({
      type:'POST',
      url:url,
      contentType:'application/json; charset=utf-8',
      data:data,
      success:callback
  });
}

export function userLogin(user){
  return (dispatch)=>{
    return postJSON(DEFAULT_URL+'login',JSON.stringify(user),(data)=>{
      let value = Object.assign({},user,JSON.parse(data));
      dispatch({
        type: USER_LOGIN, value
      });
    });
  };
};

export function updateProfile(value){
  return (dispatch)=>{
    dispatch({
      type:UPDATE_PROFILE, value
    });
    return postJSON2(DEFAULT_URL+'update_profile',JSON.stringify(value));
  };
};

export function userLogout(){
  return (dispatch)=>{
    return FB.api("/me/permissions", "delete", function(resp){
      window.location.reload();
    });
  };
};

export function isLoading(value){
  return {
    type:IS_LOADING, value
  };
};

export function uploadPoll(newPoll){
  return (dispatch)=>{
    return postJSON(DEFAULT_URL+'upload_poll',JSON.stringify(newPoll),(poll)=>{
        dispatch({
            type:UPLOAD_POLL,
            value : JSON.parse(poll)
        });
    });
  };
};

export function fetchPolls(data){
  return (dispatch)=>{
    return $.get(DEFAULT_URL+'fetch_polls',data,(polls)=>{
        dispatch({
            type:FETCH_POLLS,
            polls: JSON.parse(polls)
        });
    });
  };
};

export function votePoll(user,poll,option){
  return (dispatch)=>{
    return postJSON(DEFAULT_URL+'vote_poll',JSON.stringify({user,poll,option}),(newPoll)=>{
      dispatch({
          type:VOTE_POLL,
          poll: JSON.parse(newPoll)
      });
    });
  };
};

export function deletePoll(user,poll){
  return (dispatch)=>{
    return postJSON2(DEFAULT_URL+'delete_poll',JSON.stringify({user,poll}),()=>{
      dispatch({
        type:DELETE_POLL,
        user,
        poll
      });
    });
  };
};

export function fetchUser(data){
  return (dispatch)=>{
      return $.get(DEFAULT_URL+'fetch_user',data,(data)=>{
        dispatch({
            type:FETCH_POLLS,
            polls: JSON.parse(data).polls
        });
      });
  };
};
