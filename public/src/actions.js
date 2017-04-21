export const USER_LOGIN = 'USER_LOGIN';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export function userLogin(value){
  return (dispatch)=>{
    $.post('http://localhost:80/api/login',value,function(data){
      Object.assign(value,JSON.parse(data));
      dispatch({
        type: USER_LOGIN, value
      });
    });
  };
};

export function updateProfile(value){
  return (dispatch)=>{
    $.post('http://localhost:80/api/update_profile',value);
    dispatch({
      type:UPDATE_PROFILE, value
    });
  };
};

export function userLogout(){
  return (dispatch)=>{
    FB.api("/me/permissions", "delete", function(resp){
      window.location.reload();
    });
  };
}
