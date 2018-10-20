import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';

class Servicios extends Component{

	constructor(props){
	    super(props);
	    this.state = {
        collapsed:false,
        calles: [{calle_id:1,nombre:'calleOne'},{calle_id:2,nombre:'calleTwo'},{calle_id:3,nombre:'calleThree'}]
	    }

	    this.renderSwitch = this.renderSwitch.bind(this);
  	}

	componentWillMount(){

	}

	renderSwitch(field) {
	    const { meta: { touched, error } } = field;

	    const className = `form-group ${touched && error ? 'has-error' : ''}`;

	    return (
        <div>
          <label className="switch">
            <input 
              type="checkbox" 
              defaultChecked={field.input.value}
              {...field.input}
            />
            <span className="test">{field.label}</span>
            <span className="slider"></span>
          </label>
        </div>
            
      );
	} 

	render(){

		return (
		    <div className="col-lg-12" id='test'>
          <div className="panel panel-info" style={{'borderColor': '#bce8f1'}}>
              	<div className='panel-heading' style={{'color': '#31708f','backgroundColor':'#d9edf7','borderColor': '#bce8f1'}}>
                	Servicios
              	</div>
              	<div className="panel-body">
                  <div className='row'>
                    <div className="col-lg-4 col-lg-offset-2">
                      <Field
                        label="Agua"
                        name="agua"
                        component={this.renderSwitch}
                      />
                      <Field
                        label="Barrido"
                        name="barrido"
                        component={this.renderSwitch}
                      />
                      <Field
                        label="Cloacas"
                        name="cloacas"
                        component={this.renderSwitch}
                      />
                      <Field
                        label="Gas"
                        name="gas"
                        component={this.renderSwitch}
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        label="Alumbrado"
                        name="alumbrado"
                        component={this.renderSwitch}
                      />
                      <Field
                        label="Pavimento"
                        name="pavimento"
                        component={this.renderSwitch}
                      />
                      <Field
                        label="Recolección"
                        name="recoleccion"
                        component={this.renderSwitch}
                      />
                    </div>
                  </div>
        		    </div>
      	  </div>
        </div>
			)
	}
}

Servicios = reduxForm(
  {
    enableReinitialize: true,
    form: 'ObrasPublicasForm'
  })(Servicios);

function mapStateToProps(state) {

};

export default connect(mapStateToProps, null)(Servicios);