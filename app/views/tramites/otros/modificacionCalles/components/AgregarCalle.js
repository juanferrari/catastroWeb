import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect, Link,Router, hashHistory ,withRouter } from 'react-router-dom';
import ReactLoading from 'react-loading';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';
import CommonHeader from 'components/common/CommonHeader';
import {editCalle} from 'actions/actions_calles';

class AgregarCalle extends Component{

	constructor(props){
	    super(props);
	    this.state = {
	    }

      this.onSubmit = this.onSubmit.bind(this);
      this.renderField = this.renderField.bind(this);
  }

	componentWillMount(){
	}

  onSubmit(values){
    this.props.editCalle(values,()=>{this.props.history.push('/modificacionCalles')})
  }  

  renderField(field) {

      const { meta: { touched, error } } = field;
      const className = `form-group ${touched && error ? 'has-error' : ''}`;

      return (
        <div className={className}>
          <label>{field.label}</label>
          <input
            className="form-control input-sm ng-pristine ng-valid ng-empty ng-touched text-center"
            type="text"
            {...field.input}
          />
          <div className="text-help">
            {touched ? error : ''}
          </div>
        </div>
      );
  }

  componentWillUnmount(){
    this.props.destroy('AgregarCalleForm');
  } 

	render(){

    const {handleSubmit} = this.props;

    var breadcrumb = [
                      {url:`/tramites`,tag:'Acceso a trámites',active:false},
                      {url:`/modificacionCalles`,tag:'Modificación de una calle',active:false},
                      {url:`/agregarCalle`,tag:'Agregar una calle',active:true}
                     ]

		return (
      <div style={{fontSize:'90%'}}>
        <CommonHeader titulo="Modificación de calles" breadcrumb={breadcrumb}/>
        <div className="row wrapper border-bottom white-bg page-heading text-center">
          <div className="row" style={{margin:'5vh',fontSize:'90%'}}>
            <br />
            <div className='col-md-6 col-md-offset-3' style={{marginTop:'2%'}}>
             <div className="panel panel-info" style={{'borderColor': '#bce8f1'}}>
              <div className='panel-heading' style={{'color': '#31708f','backgroundColor':'#d9edf7','borderColor': '#bce8f1'}}>
                Agregar calle
              </div>
              <div className="panel-body">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <Field
                    label="Ingrese el nombre de la nueva calle:"
                    name="nombre"
                    component={this.renderField}
                  />
                  <br />
                  <div className='row'>
                    <button className='btn btn-sm btn-primary' type='submit'>Confirmar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
			)
	}
}

function validate(values) {
  const error = {};
  if (!values.nombre) {
    error.nombre = 'Ingrese un nombre para la calle';
  }
  return error;
}

AgregarCalle = reduxForm(
  {
    form: 'AgregarCalleForm',
    validate
  })(AgregarCalle);

function mapStateToProps(state) {

  return {}

};

export default withRouter(connect(mapStateToProps, {editCalle})(AgregarCalle));