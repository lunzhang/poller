export const USER_LOGIN = 'USER_LOGIN';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const IS_LOADING = 'IS_LOADING';
export const UPLOAD_POLL = 'UPLOAD_POLL';

export function userLogin(user){
  return (dispatch)=>{
    return postJSON('http://localhost:80/api/login',JSON.stringify(user),function(data){
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
    return postJSON('http://localhost:80/api/update_profile',JSON.stringify(value));
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
    return postJSON('http://localhost:80/api/upload_poll',JSON.stringify(newPoll),(poll)=>{
        dispatch({
            type:UPLOAD_POLL,
            value : JSON.parse(poll)
        });
    });
  };
}

function postJSON(url,data,callback){
    return $.ajax({
        type:'POST',
        url:url,
        contentType:'application/json; charset=utf-8',
        data:data,
        dataType:'json',
        success:callback
    });
}
