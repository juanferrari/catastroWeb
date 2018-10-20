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
      this.renderIndicador = this.renderIndicador.bind(this);
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

  renderIndicador(field){
    if(field.input.value){
      return(
      <span className="label label-info">{field.label}</span>
      )
    }else{
      return(
      <span className="label label-danger">{field.label}</span>
      )
    }
    

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
                      <Field
                        label="Pavimento"
                        name="pavimento"
                        component={this.renderIndicador}
                      />
                      <br/>
                      <br/>
                      <Field
                        label="Cloacas"
                        name="cloacas"
                        component={this.renderIndicador}
                      />
                    </div>
                    <div className="col-lg-3">
                      <Field
                        label="Alumbrado"
                        name="alumbrado"
                        component={this.renderIndicador}
                      />
                      <br/>
                      <br/>
                      <Field
                        label="Recolección"
                        name="recoleccion"
                        component={this.renderIndicador}
                      />
                    </div>
                    <div className="col-lg-3">
                      <Field
                        label="Gas"
                        name="gas"
                        component={this.renderIndicador}
                      />
                      <br/>
                      <br/>
                      <Field
                        label="Barrido"
                        name="barrido"
                        component={this.renderIndicador}
                      />
                    </div>
                    <div className="col-lg-3">
                      <Field
                        label="Agua"
                        name="agua"
                        component={this.renderIndicador}
                      />
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