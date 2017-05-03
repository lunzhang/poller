import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions.js';

const mapStateToProps = function(state){
  return {
    user : state.user
  };
};

class Login extends Component{

  constructor(props){
    super(props);

    this.fbLogin = this.fbLogin.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user.loggedIn){
      hashHistory.push('/');
    }
  }

  fbLogin(){
    this.props.dispatch(actions.isLoading(true));
    FB.login((resp)=>{
      if(resp.status == "connected"){
          FB.api('/me?fields=name,picture',(resp)=>{
            this.props.dispatch(actions.userLogin({
              fbId:resp.id,
              type:'FB',
              name:resp.name,
              pictureURL:resp.picture.data.url
            })).then(()=>{
                this.props.dispatch(actions.isLoading(false));
                hashHistory.push('/');
            });
          });
      }else{
        this.props.dispatch(actions.isLoading(false));
      }
    });
  }

  render(){
    return (
      <div id="login" className="row">
        <div className="col-sm-4 col-sm-push-4">
          <div style={{fontWeight: "bold",fontSize:"48px"}}>
            Login
          </div>
          <div style={{fontStyle:"italic",padding:"10px 0px 20px 0px"}}>
            Connect with a social network
          </div>
          <div className="fb_btn" onClick={this.fbLogin}>
            Facebook
          </div>
        </div>
      </div>
    );
  }

};

export default connect(mapStateToProps)(Login);
