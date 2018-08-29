import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';

class Valuacion extends Component{

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
                	Valuación
              	</div>
              	<div className="panel-body">
                  <div className='row'>
                    <div className="col-lg-6">
                      <Field
                        label="Mts. cubiertos"
                        name="mtsCubiertos"
                        component={this.renderField}
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        label="Mts. semicubiertos"
                        name="mtsSemicubiertos"
                        component={this.renderField}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className="col-lg-6">
                      <Field
                        label="Pileta"
                        name="pileta"
                        component={this.renderField}
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        label="Otros"
                        name="otros"
                        component={this.renderField}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className="col-lg-6">
                      <Field
                        label="Valor tierra"
                        name="valorTierra"
                        component={this.renderField}
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        label="Valor edificio"
                        name="valorEdificio"
                        component={this.renderField}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className="col-lg-6">
                      <Field
                        label="Mejoras"
                        name="mejoras"
                        component={this.renderField}
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        label="Valuación fiscal"
                        name="valuacionFiscal"
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

Valuacion = reduxForm(
  {
    enableReinitialize: true,
    form: 'FichaForm'
  })(Valuacion);

function mapStateToProps(state) {

  return {}

};

export default connect(mapStateToProps, null)(Valuacion);