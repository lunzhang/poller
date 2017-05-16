import React, { Component } from 'react';
import * as actions from '../actions.js';
import { hashHistory } from 'react-router';
import { Link } from 'react-router';

export default class Polls extends Component{

  constructor(props){
    super(props);
    this.deletePoll = this.deletePoll.bind(this);
    this.closeVotersModal = this.closeVotersModal.bind(this);
    this.selectedPoll = '';
    this.state = {
      voters:{}
    };
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
                    <Link to={"/u/"+poll.owner}>
                      <h3> {poll.name} </h3>
                    </Link>
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
                            <div key={i} className={"options " +
                            (poll.voters[this.props.user.id] != undefined && poll.voters[this.props.user.id].option == option.name ? "selected-option" : "") } >

                              <span onClick={()=>{
                                this.setVoters(poll,option.name);
                              }} value={option.name} className="clickable" style={{lineHeight:'30px'}} data-toggle="modal" data-target="#poll-voters-modal">
                                {option.name}
                              </span>

                              <button className={"btn "+
                              (poll.voters[this.props.user.id] != undefined && poll.voters[this.props.user.id].option == option.name ? "btn-warning" : "btn-primary")}
                              onClick={()=>{
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

        <div className="modal fade" id="poll-voters-modal" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {
                  Object.keys(this.state.voters).map((id,i)=>{
                    let voter = this.state.voters[id];
                    return(
                      <Link to={"/u/"+id} key={i} onClick={this.closeVotersModal}>
                        <h5> {voter.name} </h5>
                      </Link>
                    );
                  })
                }
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

  closeVotersModal(){
    $('#poll-voters-modal').modal('hide');
  }

  setVoters(poll,option){
      let voters = {};
      for(let prop in poll.voters){
        if(poll.voters[prop].option === option){
          voters[prop] = poll.voters[prop];
        }
      }
      this.setState({voters});
  }

  deletePoll(e){
    this.props.dispatch(actions.deletePoll(this.props.user.id,this.selectedPoll));
  }

  votePoll(poll,option){
    if(this.props.user.loggedIn === false){
      hashHistory.push('/login');
    }else{
      this.props.dispatch(actions.votePoll(this.props.user.id,this.props.user.name,poll,option));
    }
  }

}
