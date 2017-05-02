import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import * as actions from '../actions.js';
import Polls from '../components/polls.js';

const mapStateToProps = function(state){
  return {
    user : state.user,
    polls : state.polls
  };
};

class Main extends Component{

  constructor(props){
    super(props);
    this.state = {
      category : 'popular'
    };
    this.props.dispatch(actions.fetchPolls({
      category:this.state.category
    }));
  }

  render(){
    return(
      <div id="main" className="row">
        <Polls polls={this.props.polls} user={this.props.user} dispatch={this.props.dispatch} />
      </div>
    );
  }

}

export default connect(mapStateToProps)(Main);
