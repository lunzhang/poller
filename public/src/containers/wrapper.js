import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Router } from 'react-router';
import * as actions from '../actions.js';
import Upload from '../components/upload.js';
import Navbar from '../components/navbar.js';

const mapStateToProps = function(state){
  return {
    user : state.user
  };
}

class Wrapper extends Component{

  constructor(props){
      super(props);
  }

  render(){
    return (
      <div id="wrapper">

        <Navbar user={this.props.user} dispatch={this.props.dispatch} />

        <Upload user={this.props.user} dispatch={this.props.dispatch} />

        <div className="container" style={{paddingTop:'75px',position:'relative',height:'100%'}}>
          {this.props.children}
        </div>

        {
          this.props.user.isLoading &&
          <div id="loading-wrapper">
            <div id="loading-content">
              Loading....
            </div>
          </div>
        }

      </div>
    );
  }

};

export default connect(mapStateToProps)(Wrapper);
