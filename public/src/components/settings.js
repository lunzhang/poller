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
  }

  render(){
    return (
    <div id="settings" className="row">
      <div className="col-sm-12">
        <form>
          <h1>
            Account
          </h1>
          <div className="input-group">
            <h4>
              Username
            </h4>
            <input className="form-control" value={this.props.user.name}>

            </input>
          </div>
          <div className="input-group">
            <h4>
              Something about you
            </h4>
            <textarea className="form-control" maxLength="120">

            </textarea>
          </div>
        </form>
      </div>
    </div>
    );
  }


};

export default connect(mapStateToProps)(Settings);
