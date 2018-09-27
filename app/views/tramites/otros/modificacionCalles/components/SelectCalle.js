import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect, Link,Router, hashHistory ,withRouter } from 'react-router-dom';
import ReactLoading from 'react-loading';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';
import Select from 'react-select';

class SelectCalle extends Component{

	constructor(props){
	    super(props);
	    this.state = {
        calles:[]
	    }

      this.renderSelect = this.renderSelect.bind(this);
  }

	componentWillMount(){
    var callesRaw = this.props.calles;
    var calles = [];
    for(var calle of callesRaw){
      calles.push({value:calle.id,label:calle.nombre})
    }

    this.setState({calles});
	}



  renderSelect(field,options,placeholder){
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-error' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <Select
          type="text"
          options={options}
          {...field.input}
          placeholder={placeholder}
          onBlur={() => {
                field.input.onBlur(...field.input)
          }}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  } 

	render(){


		return (
      <Field  className="form-control centeredLine" name='calle'  type="text"  component={props =>
          this.renderSelect(props,this.state.calles,'Seleccione una calle')
      }/>
			)
	}
}


function mapStateToProps(state) {

  return {
  }

};

export default withRouter(connect(mapStateToProps, null)(SelectCalle));