import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';

class Contribuyente extends Component{

	constructor(props){
	    super(props);
	    this.state = {
        collapsed:false,
	    }

	    this.renderField = this.renderField.bind(this);
  	}

	componentWillMount(){
	}

	renderField(field) {
	    const { meta: { touched, error } } = field;

	    const className = `form-group ${touched && error ? 'has-error' : ''}`;

	    return (
	      <div className={className}>
	        <label>{field.label}</label>
	        <input
            disabled
	          className="form-control"
	          type="text"
	          {...field.input}
	        />
	        <div className="text-help">
	          {touched ? error : ''}
	        </div>
	      </div>
	    );
	} 

	render(){

		return (
		    <div className="col-lg-12" id='test'>
          <div className="panel panel-info" style={{'borderColor': '#bce8f1'}}>
              	<div className='panel-heading' style={{'color': '#31708f','backgroundColor':'#d9edf7','borderColor': '#bce8f1'}}>
                	Contribuyente
              	</div>
              	<div className="panel-body">
                  <div className='row'>
                    <div className="col-lg-6">
                      <Field
                        label="Apellido"
                        name="apellidoContribuyente"
                        component={this.renderField}
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        label="Nombre"
                        name="nombreContribuyente"
                        component={this.renderField}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className="col-lg-6">
                      <Field
                        label="DNI - CUIT - CUIL"
                        name="dniCuitCuilContribuyente"
                        component={this.renderField}
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        label="Teléfono"
                        name="telefonoContribuyente"
                        component={this.renderField}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className="col-lg-6">
                      <Field
                        label="Domicilio"
                        name="domicilioContribuyente"
                        component={this.renderField}
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        label="Email"
                        name="emailContribuyente"
                        component={this.renderField}
                      />
                    </div>
                  </div>
        		    </div>
      	  </div>
        </div>
			)
	}
}

Contribuyente = reduxForm(
  {
    enableReinitialize: true,
    form: 'FichaForm'
  })(Contribuyente);

function mapStateToProps(state) {

  return {}

};

export default connect(mapStateToProps, null)(Contribuyente);