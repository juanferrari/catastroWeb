import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';

class Indicadores extends Component{

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
                	Indicadores
              	</div>
              	<div className="panel-body">
                  <div className='row'>
                    <div className="col-lg-4">
                      <Field
                        label="Zonif. urbanística"
                        name="zonifUrbanistica"
                        component={this.renderField}
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        label="Zona tributaria"
                        name="zonaTributaria"
                        component={this.renderField}
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        label="Uso - Tipo inmueble"
                        name="tipoInmueble"
                        component={this.renderField}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className="col-lg-3">
                      Servicios
                    </div>
                  </div>
                  <br/>
                  <div className='row'>
                    <div className="col-lg-3">
                      <span className="label label-info">Pavimento</span>
                      <br/>
                      <br/>
                      <span className="label label-info">Cloacas</span>
                    </div>
                    <div className="col-lg-3">
                      <span className="label label-info">Alumbrado</span>
                      <br/>
                      <br/>
                      <span className="label label-danger">Recolección</span>
                    </div>
                    <div className="col-lg-3">
                      <span className="label label-danger">Gas</span>
                      <br/>
                      <br/>
                      <span className="label label-danger">Barrido</span>
                    </div>
                    <div className="col-lg-3">
                      <span className="label label-danger">Agua</span>
                    </div>
                  </div>
        		    </div>


      	  </div>
        </div>
			)
	}
}

Indicadores = reduxForm(
  {
    enableReinitialize: true,
    form: 'FichaForm'
  })(Indicadores);

function mapStateToProps(state) {

  return {}

};

export default connect(mapStateToProps, null)(Indicadores);