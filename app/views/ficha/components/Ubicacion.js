import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';

class Ubicacion extends Component{

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
	          className="form-control input-sm ng-pristine ng-valid ng-empty ng-touched"
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
                	Ubicación
              	</div>
              	<div className="panel-body">
                  <div className='row'>
                    <div className="col-lg-4">
                      <Field
                        label="Partido"
                        name="partido"
                        component={this.renderField}
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        label="Localidad"
                        name="localidad"
                        component={this.renderField}
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        label="Barrio"
                        name="barrio"
                        component={this.renderField}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className="col-lg-12">
                      <Field
                        label="Calle"
                        name="domicilio"
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

Ubicacion = reduxForm(
  {
    enableReinitialize: true,
    form: 'FichaForm'
  })(Ubicacion);

function mapStateToProps(state) {

  return {}

};

export default connect(mapStateToProps, null)(Ubicacion);