import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Router } from 'react-router';
import * as actions from '../actions.js';

const mapStateToProps = function(state){
  return {
    user : state.user
  };
}

class Profile extends Component{

  constructor(props){
      super(props);
  }

  render(){
    return (
    <div id="profile">
      Profile Page
    </div>
    );
  }


};

export default connect(mapStateToProps)(Profile);
