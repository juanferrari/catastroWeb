import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading'
import ReactTable from 'react-table';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';
import DatosBusqueda from 'views/busqueda/components/DatosBusqueda';
import TablaParcelas from 'views/busqueda/components/TablaParcelas';
import lodash from 'lodash';
import { getParcelas,updateFilter } from 'actions/actions_parcelas'
import CommonHeader from 'components/common/CommonHeader'

class Busqueda extends Component{

	constructor(props){
    super(props);
    this.state = {
    }
  }

  componentWillMount(){
  }

	onSubmit(values){
    var data = {};

    if(!_.isEmpty(values)){
      var filteredQuery = '&searchParcela='

      //http://186.33.216.232/catastro-service/v1/parcelas?searchCatastro=nomenclaturaCatastroQuinta:442&size=10&page=2
      if(values.partida_arba)
        filteredQuery =  filteredQuery + ',id:' + values.partida_arba;

      if(values.circunscripcion)
        filteredQuery =  filteredQuery + ',circunscripcion:' + values.circunscripcion;

      if(values.seccion)
        filteredQuery =  filteredQuery + ',seccion:' + values.seccion;

      this.props.updateFilter(filteredQuery);
      this.props.getParcelas(this.props.tableInfo,filteredQuery);
    }else{
      this.props.updateFilter('');
      this.props.getParcelas(this.props.tableInfo,'');
    }
		
	}

	render(){

		const { handleSubmit } = this.props;
    const {tramite} = this.props.match.params;

    var breadcrumb = [
                      {url:`/busqueda`,tag:'Búsqueda',active:true},
                     ]

    var titulo = 'Búsqueda';

    if(tramite){

      switch(tramite){
        case 'asignacionCalle':
          titulo = 'Asignación de calle';
          break;
        case 'visadoPlanoMensura':
          titulo = 'Visado de plano de mensura';
          break;
      }


      breadcrumb = [
                      {url:`/tramites`,tag:'Trámites',active:false},
                      {url:`/busqueda/${tramite}`,tag:titulo,active:true},
                   ]

    }



		return (
      <div>
        <CommonHeader titulo={titulo} breadcrumb={breadcrumb}/>
        <br />
  			<div className="row" style={{margin:'5vh',fontSize:'90%'}}>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
  				  <DatosBusqueda collapsed='false'/>
          </form>
          <TablaParcelas />    
  			</div>
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

  return {
    tableInfo: state.parcelas.tableInfo
  }

};

export default connect(mapStateToProps, { getParcelas,updateFilter })(Busqueda);