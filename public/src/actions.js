export const USER_LOGIN = 'USER_LOGIN';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const IS_LOADING = 'IS_LOADING';

export function userLogin(value){
  return (dispatch)=>{
    return $.post('http://localhost:80/api/login',value,function(data){
      Object.assign(value,JSON.parse(data));
      dispatch({
        type: USER_LOGIN, value
      });
    });
  };
};

export function updateProfile(value){
  return (dispatch)=>{
    return $.post('http://localhost:80/api/update_profile',value);
    dispatch({
      type:UPDATE_PROFILE, value
    });
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
