import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions.js';

const mapStateToProps = function(state){
  return {
    user : state.user
  };
}

class Upload extends Component{

  constructor(props){
      super(props);
      this.upload = this.upload.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.addOption = this.addOption.bind(this);
      this.deleteOption = this.deleteOption.bind(this);
      this.state = {
          name:"Do you like Poller?",
          options:["yes","no"],
          option:""
      };
  }

  componentDidMount(){
    $('#uploadModal').on('show.bs.modal',(e)=>{
      this.setState({
        name:"Do you like Poller?",
        options:["yes","no"],
        option:""
      });
    });
  }

  handleChange(e){
    switch(e.target.name){
      case 'name':
        this.setState({'name':e.target.value});
        break;
      case 'option':
        this.setState({'option':e.target.value});
        break;
    }
  }

  render(){
    return(
      <div className="modal fade" id="uploadModal" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title">Upload a Poll</h1>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.upload}>
                <h4>Name</h4>
                <input className="form-control" name="name" value={this.state.name} onChange={this.handleChange} maxLength="120"/>
                <div id="poll-options">
                    <h4>Options </h4>
                    <div style={{marginTop:'10px',height:'200px',overflowY:'auto',overflowX:'hidden',border:'1px solid #d0d0d0'}}>
                    {
                      this.state.options.map((option,i)=>{
                        return(
                          <div className="option" key={i}>
                            <span className="form-control"> {option} </span>
                            <button className="btn btn-danger" onClick={this.deleteOption} value={i}>
                              <span className="glyphicon glyphicon-minus" value={i}> </span>
                            </button>
                          </div>
                        );
                      })
                    }
                    </div>
                    <div style={{paddingTop:'10px'}}>
                      <input className="form-control" placeholder="Enter an option" name="option" value={this.state.option} onChange={this.handleChange} maxLength="60"/>
                      <button className="btn btn-success" onClick={this.addOption}>
                        <span className="glyphicon glyphicon-plus"> </span>
                      </button>
                    </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={this.upload}>Upload</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  addOption(e){
    e.preventDefault();
    if(this.state.options.length < 8 && this.state.option.length > 0) this.setState({'options':this.state.options.concat([this.state.option])});
  }

  deleteOption(e){
    e.preventDefault();
    let i = parseInt(e.currentTarget.value);
    let options = this.state.options;
    this.setState({'options': options.slice(0,i).concat(options.slice(i+1)) });
  }

  upload(){
      if(this.state.name.length > 0 && this.state.options.length > 0){
          actions.uploadPoll({
            owner : this.props.user.id,
            name : this.state.name,
            options: this.state.options
          });
      }
  }

}

export default connect(mapStateToProps)(Upload);
