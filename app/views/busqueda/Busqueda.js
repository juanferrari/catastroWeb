import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading'
import ReactTable from 'react-table';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';
import DatosBusqueda from './components/DatosBusqueda';
import TablaParcelas from './components/TablaParcelas';
import lodash from 'lodash';

class Busqueda extends Component{

	constructor(props){
    super(props);
    this.state = {
    }
  }

	onSubmit(values){
    if(!_.isEmpty(values))
		  console.log('submit busqueda',values);
	}

	render(){

		const { handleSubmit } = this.props;

		return (
			<div className="row">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				  <DatosBusqueda collapsed='false'/>
        </form>
        <TablaParcelas />    
			</div>
			)
	}
}

Busqueda = reduxForm(
  {
    enableReinitialize: true,
    form: 'BusquedaForm'
  })(Busqueda);


function mapStateToProps(state) {

  return {}

};

export default connect(mapStateToProps, null)(Busqueda);