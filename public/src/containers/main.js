import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import * as actions from '../actions.js';

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
        {
          Object.keys(this.props.polls).map((id,i)=>{
            let poll = this.props.polls[id];
            let options = Object.keys(poll.options).map((option,i)=>{
                return {
                  name: option,
                  votes: poll.options[option]
                };
            });
            options.sort(function(a,b){
                return b.votes - a.votes;
            });
            return(
              <div className="col-sm-6 text-center" key={i}>
                <div className="poll">
                  <h3> {poll.name} </h3>
                  <div className="options-wrapper text-left">
                    {
                      options.map((option,i)=>{
                          return(
                            <div key={i} className="options">
                              <span style={{lineHeight:'30px'}}> {option.name} </span>
                              <button className="btn btn-primary" onClick={()=>{
                                this.votePoll(poll._id,option.name);
                              }}>
                                {option.votes}
                              </button>
                            </div>
                          );
                      })
                    }
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }

  votePoll(poll,option){
    if(this.props.user.loggedIn === false){
      hashHistory.push('/login');
    }else{
      this.props.dispatch(actions.votePoll(this.props.user.id,poll,option));
    }
  }

}

export default connect(mapStateToProps)(Main);
