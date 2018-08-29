import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';

class MedidasSuperficies extends Component{

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
                	Medidas y superficies (mts.)
              	</div>
              	<div className="panel-body">
                  <div className='row'>
                    <div className="col-lg-6">
                      <Field
                        label="Superficie s/ título"
                        name="supstitulo"
                        component={this.renderField}
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        label="Superficie s/ mensura"
                        name="supsmensura"
                        component={this.renderField}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className="col-lg-6">
                      <Field
                        label="Frente"
                        name="frente"
                        component={this.renderField}
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        label="Rumbo"
                        name="rumboFrente"
                        component={this.renderField}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className="col-lg-6">
                      <Field
                        label="Fondo"
                        name="fondo"
                        component={this.renderField}
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        label="Rumbo"
                        name="rumboFondo"
                        component={this.renderField}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className="col-lg-6">
                      <Field
                        label="Lateral"
                        name="lateral"
                        component={this.renderField}
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        label="Rumbo"
                        name="rumboLateral"
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

MedidasSuperficies = reduxForm(
  {
    enableReinitialize: true,
    form: 'FichaForm'
  })(MedidasSuperficies);

function mapStateToProps(state) {

  return {}

};

export default connect(mapStateToProps, null)(MedidasSuperficies);