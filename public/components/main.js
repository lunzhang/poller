import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Main extends Component{

  render(){

    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
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
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/login">Sign In</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div style={{paddingTop:'50px'}}>
          {this.props.children}
        </div>
      </div>
    );

  }

};
