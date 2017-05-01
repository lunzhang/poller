import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Router } from 'react-router';
import * as actions from '../actions.js';

const mapStateToProps = function(state){
  return {
    user : state.user
  };
}

class Settings extends Component{

  constructor(props){
      super(props);
      this.state = this.props.user;
      this.handleChange = this.handleChange.bind(this);
      this.updateProfile = this.updateProfile.bind(this);
  }

  updateProfile(e){
      e.preventDefault();
      if(this.state.name.length > 0){
          this.props.dispatch(actions.updateProfile({
            id: this.state.id,
            name: this.state.name,
            detail: this.state.detail
          }));
      }
  }

  handleChange(e){
    switch(e.target.name){
      case 'name':
        this.setState({'name':e.target.value});
        break;
      case 'detail':
        this.setState({'detail':e.target.value});
        break;
    }
  }

  render(){
    return (
    <div id="settings" className="row">
      <div className="col-sm-12">
        <form onSubmit={this.updateProfile}>
          <h1>
            Account
          </h1>
          <div className="input-group">
            <h4>
              Username
            </h4>
            <input className="form-control" name="name" value={this.state.name} onChange={this.handleChange}></input>
          </div>
          <div className="input-group">
            <h4>
              Something about you
            </h4>
            <textarea className="form-control" name="detail" value={this.state.detail} maxLength="120" onChange={this.handleChange}>

            </textarea>
          </div>
          <div className="input-group">
            <button className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
    );
  }


};

export default connect(mapStateToProps)(Settings);
