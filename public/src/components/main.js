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

class Main extends Component{

  constructor(props){
      super(props);
      this.logout = this.logout.bind(this);
  }

  render(){
    return (
      <div>
        <nav id="navbar" className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/home">Poller</Link>
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse" id="navbar-collapse">
            {
              this.props.user.loggedIn ?
              <div className="nav navbar-nav navbar-right">
                <div className="nav-item">
                  <div className="profile">
                    <img className="profile-pic" src={this.props.user.pictureURL} data-toggle="dropdown"/>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <Link className="dropdown-item" to="/profile">Profile</Link>
                      <a className="dropdown-item" onClick={this.logout}>Logout</a>
                    </div>
                  </div>
                </div>
                <div className="nav-item">
                    <button className="btn btn-primary">
                    <span className="glyphicon glyphicon-plus"></span>
                    Upload
                    </button>
                </div>
              </div> :
              <div className="nav navbar-nav navbar-right">
                <li className="nav-item">
                  <Link to="/login">Log In</Link>
                </li>
              </div>
            }
            </div>
          </div>
        </nav>
        <div className="container-fluid" style={{paddingTop:'75px',position:'relative',height:'100%'}}>
          {this.props.children}
        </div>
      </div>
    );
  }

  logout(){
    this.props.dispatch(actions.userLogout());
  }
};

export default connect(mapStateToProps)(Main);
