import React, { Component } from 'react';
import * as actions from '../actions.js';
import { hashHistory } from 'react-router';

export default class Polls extends Component{

  constructor(props){
    super(props);
    this.deletePoll = this.deletePoll.bind(this);
    this.selectedPoll = '';
  }

  componentDidMount(){
    $('#delete-poll-modal').on('show.bs.modal', (e)=>{
      this.selectedPoll = e.relatedTarget.value;
    });
  }

  render(){
    return (
      <div className="polls">
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
                  <div className="poll-header">
                    <h3> {poll.name} </h3>
                    {
                      poll.owner === this.props.user.id &&
                      <button className="btn btn-danger" data-toggle="modal" data-target="#delete-poll-modal" value={id}>
                        X
                      </button>
                    }
                  </div>
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
        <div className="modal fade" id="delete-poll-modal" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h3>
                  Are you sure you want to delete this poll?
                </h3>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={this.deletePoll} data-dismiss="modal">Delete</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  deletePoll(e){
    this.props.dispatch(actions.deletePoll(this.props.user.id,this.selectedPoll));
  }

  votePoll(poll,option){
    if(this.props.user.loggedIn === false){
      hashHistory.push('/login');
    }else{
      this.props.dispatch(actions.votePoll(this.props.user.id,poll,option));
    }
  }

}
