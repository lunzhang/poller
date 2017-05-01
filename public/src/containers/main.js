import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import * as actions from '../actions.js';

const mapStateToProps = function(state){
  return {
    user : state.user
  };
}

class Main extends Component{

  constructor(props){
      super(props);
  }

  render(){
    return(
      <div>
        Hello
      </div>
    );
  }
}

export default connect(mapStateToProps)(Main);
