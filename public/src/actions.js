export const USER_LOGIN = 'USER_LOGIN';
export const NEW_USER = 'NEW_USER';

export function userLogin(value){
  return {
    type: USER_LOGIN, value
  };
};

export function userLogout(){
  return (dispatch)=>{
    FB.api("/me/permissions", "delete", function(resp){
      window.location.reload();
    });
  };
}

export function newUser(value){
  return {
    type: NEW_USER, value
  };
};
