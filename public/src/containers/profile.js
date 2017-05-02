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
    this.props.dispatch(actions.fetchPolls({
      id: this.props.routeParams.splat,
      category:'user'
    }));
  }

  render(){
    return (
      <div id="profile" className="row">
        <Polls polls={this.props.polls} user={this.props.user} dispatch={this.props.dispatch}/>
      </div>
    );
  }

};

export default connect(mapStateToProps)(Profile);
