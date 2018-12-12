import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';

class DatosCatastrales extends Component{

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
		    <div className="col-lg-12" id='test' style={{fontSize:'90%'}}>
          <div className="panel panel-info" style={{'borderColor': '#bce8f1'}}>
              	<div className='panel-heading' style={{'color': '#31708f','backgroundColor':'#d9edf7','borderColor': '#bce8f1'}}>
                	Datos Catastrales
              	</div>
              	<div className="panel-body">
                  <div className='row'>
                    <div className="col-lg-6">
                      <Field
                        label="Partida Municipal"
                        name={"partidaMunicipal"+this.props.id}
                        component={this.renderField}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className="col-lg-6">
                      <h4><strong>Nomenclatura según Catastro:</strong></h4>
                    </div>
                  </div>
                  <div className='row'>
                    <div className="col-lg-2">
                      <Field
                        label="Circ."
                        name={"circunscripcion"+this.props.id}
                        component={this.renderField}
                      />
                      <Field
                        label="Parcela"
                        name={"parcela"+this.props.id}
                        component={this.renderField}
                      />
                    </div>
                    <div className="col-lg-2">
                      <Field
                        label="Sec."
                        name={"seccion"+this.props.id}
                        component={this.renderField}
                      />
                    </div>
                    <div className="col-lg-2">
                      <Field
                        label="Chacra"
                        name={"chacra"+this.props.id}
                        component={this.renderField}
                      />
                    </div>
                    <div className="col-lg-2">
                      <Field
                        label="Quinta"
                        name={"quinta"+this.props.id}
                        component={this.renderField}
                      />
                    </div>
                    <div className="col-lg-2">
                      <Field
                        label="Fracción"
                        name={"fraccion"+this.props.id}
                        component={this.renderField}
                      />
                    </div>
                    <div className="col-lg-2">
                      <Field
                        label="Manzana"
                        name={"manzana"+this.props.id}
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

function mapStateToProps(state) {

  return {}

};

export default connect(mapStateToProps, null)(DatosCatastrales);