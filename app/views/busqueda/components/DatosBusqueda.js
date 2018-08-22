import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';

class DatosBusqueda extends Component{

	constructor(props){
	    super(props);
	    this.state = {
	    }

	    this.renderField = this.renderField.bind(this);
	    this.renderCheckbox = this.renderCheckbox.bind(this);
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

	renderCheckbox(field) {
	    const { meta: { touched, error } } = field;

	    const className = `form-check ${touched && error ? 'has-error' : ''}`;

	    return (
	      <div className={className}>
	        <label>{field.label} </label>

	        <input 
	          type="checkbox" 
	          className="web-two-style"
	          style={{"marginLeft":"5px","width":"20px","height":"18px"}}
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
		    <div className="col-md-12 ">
          <div className="ibox float-e-margins">
            <div className="ibox-content">
            	<div className="row">
              	<div className='col-lg-2 col-md-2'>
                	<h3 style={{'color':'#149bd3','fontWeight':'bold'}}>Filtros de búsqueda</h3>
                	<hr style={{'width':'100%','color':'#149bd3','borderColor':'#149bd3','borderWidth':'medium','margin':'10px 0','height':'2px'}} />
              	</div>
              	<div className="col-md-12">
                  <div className="col-lg-2">
                    <Field
                      label="Partida ARBA"
                      name="partida_arba"
                      component={this.renderField}
                    />
                    <Field
                      label="Circunscripción"
                      name="circunscripcion"
                      component={this.renderField}
                    />
                    <Field
                      label="Parcela"
                      name="parcela"
                      component={this.renderField}
                    />
                  </div>
                  <div className="col-lg-2">
                  	<Field
                        label="Partida Municipal"
                        name="partida_municipal"
                        component={this.renderField}
                    />
                    <Field
                      label="Sección"
                      name="seccion"
                      component={this.renderField}
                    />
                    <Field
                      label="Incluir Archivados"
                      name="incluir_archivados"
                      component={this.renderCheckbox}
                    />
                  </div>
                  <div className="col-lg-2">
                  	<Field
                        label="DNI-CUIT-CUIL Contribuyente"
                        name="dni_cuit_cuil"
                        component={this.renderField}
                    />
                    <Field
                      label="Chacra"
                      name="chacra"
                      component={this.renderField}
                    />
                  </div>
                  <div className="col-lg-2">
                  	<Field
                        label="Nombre Propietario"
                        name="nombre_propietario"
                        component={this.renderField}
                    />
                    <Field
                      label="Quinta"
                      name="quinta"
                      component={this.renderField}
                    />
                  </div>
                  <div className="col-lg-2">
                  	<Field
                        label="Calle"
                        name="calle"
                        component={this.renderField}
                      />
                    <Field
                      label="Fracción"
                      name="fraccion"
                      component={this.renderField}
                    />
                  </div>
                  <div className="col-lg-2">
                  	<Field
                      label="Altura"
                      name="altura"
                      component={this.renderField}
                    />
                    <Field
                      label="Manzana"
                      name="manzana"
                      component={this.renderField}
                    />
                  </div>
        		    </div>
      		    </div>
              <div className='text-center'>
                <div role="toolbar" className="btn-group">
                  <button type="submit" className="btn btn-default">Buscar  <i className="fa fa-search"></i></button>
                  <button 
                    className="btn btn-default"
                    onClick={()=>this.props.destroy('BusquedaForm')}
                    >
                      Limpiar  <i className="fa fa-eraser"></i>
                  </button>
                </div>
              </div>
      	    </div>
      	  </div>
        </div>
			)
	}
}

DatosBusqueda = reduxForm(
  {
    enableReinitialize: true,
    form: 'BusquedaForm'
  })(DatosBusqueda);

function mapStateToProps(state) {

  return {}

};

export default connect(mapStateToProps, null)(DatosBusqueda);