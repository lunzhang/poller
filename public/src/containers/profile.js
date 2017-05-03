import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Router } from 'react-router';
import * as actions from '../actions.js';
import Polls from '../components/polls.js';

const mapStateToProps = function(state){
  return {
    user : state.user,
    polls: state.polls
  };
};

class Profile extends Component{

  constructor(props){
    super(props);
    this.state = {
        user:{}
    };
    this.props.dispatch(actions.fetchUser({
        id:this.props.routeParams.splat
    })).then((data)=>{
      data = JSON.parse(data);
      this.setState({
        user:data.user
      });
    });
  }

  render(){
    return (
      <div id="profile" className="row">
        <div className="col-sm-12">
          <img src={this.state.user.pictureURL}/>
          <h1>
            {this.state.user.name}
          </h1>
        </div>
        <div className="col-sm-12">
          <h4>
            {this.state.user.detail}
          </h4>
        </div>
        <Polls polls={this.props.polls} user={this.props.user} dispatch={this.props.dispatch}/>
      </div>
    );
  }

};

export default connect(mapStateToProps)(Profile);
