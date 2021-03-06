import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading'
import ReactTable from 'react-table';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';
import lodash from 'lodash';
import { getParcela, editParcela } from 'actions/actions_parcelas';
import Ubicacion from './components/Ubicacion';
import DatosCatastrales from './components/DatosCatastrales';
import PlanchetaCatastral from './components/PlanchetaCatastral';
import IdentificacionProvincial from './components/IdentificacionProvincial';
import PlanchetaCatastralMapa from './components/PlanchetaCatastralMapa';
import Propietarios from './components/Propietarios';
import MedidasSuperficies from './components/MedidasSuperficies';
import Contribuyente from './components/Contribuyente';
import Indicadores from './components/Indicadores';
import Valuacion from './components/Valuacion';
import ExpedienteMensura from './components/ExpedienteMensura';
import ExpedienteObra from './components/ExpedienteObra';
import RegistroPropiedad from './components/RegistroPropiedad'
import CommonHeader from 'components/common/CommonHeader'

class Ficha extends Component{

	constructor(props){
    super(props);
    this.state = {
    }
  }

  componentWillMount(){
    const {id} = this.props.match.params;
    this.props.getParcela(id);
  }

  componentWillUnmount(){
    this.props.destroy('FichaForm');
  }

	onSubmit(values){
	  const { id } = this.props.match.params;
    const { parcela } = this.props;
    /*
    if(parcela.rows[0].catastro)
      var catastro_id = id;
    else
      var catastro_id = undefined;

    var submitJson =  {
                      "id": id,
                      "partido": values.partido,
                      "localidad": values.localidad,
                      "barrio": values.barrio,
                      "domicilio": values.domicilio,
                      "catastro": {
                        "id": catastro_id,
                        "partidaMunicipal": values.partidaMunicipal,
                        "codigoPagoElectronico": values.codigoPagoElectronico,
                        "nomenclaturaCatastroCircunscripcion": values.nomenclaturaCatastroCircunscripcion,
                        "nomenclaturaCatastroSeccion": values.nomenclaturaCatastroSeccion,
                        "nomenclaturaCatastroChacra": values.nomenclaturaCatastroChacra,
                        "nomenclaturaCatastroQuinta": values.nomenclaturaCatastroQuinta,
                        "nomenclaturaCatastroFraccion": values.nomenclaturaCatastroFraccion,
                        "nomenclaturaCatastroManzana": values.nomenclaturaCatastroManzana,
                        "nomenclaturaCatastroParcela": values.nomenclaturaCatastroParcela,
                        "nomenclaturaTituloCircunscripcion": values.nomenclaturaTituloCircunscripcion,
                        "nomenclaturaTituloSeccion": values.nomenclaturaTituloSeccion,
                        "nomenclaturaTituloChacra": values.nomenclaturaTituloChacra,
                        "nomenclaturaTituloQuinta": values.nomenclaturaTituloQuinta,
                        "nomenclaturaTituloFraccion": values.nomenclaturaTituloFraccion,
                        "nomenclaturaTituloManzana": values.nomenclaturaTituloManzana,
                        "nomenclaturaTituloParcela": values.nomenclaturaTituloParcela
                      },
                      "propietarios": []
                    }

    this.props.editParcela(submitJson);*/
    $('html,body').scrollTop(0);

	}

	render(){

		const { handleSubmit } = this.props;
    const { parcela, parcelaFetching, parcelaEditing, actionParcela } = this.props;
    const {id} = this.props.match.params;

    var breadcrumb = [
                      {url:`/busqueda`,tag:'Búsqueda',active:false},
                      {url:`/ficha/${id}`,tag:'Ficha',active:true}
                     ]

    if(!parcela || parcelaFetching){
      return(
        <div className="centeredSpinner" >
          <ReactLoading type="spinningBubbles" style={{'color':"#444",'height':150,'width':150}} />
        </div>
      )
    }

    var circuns = '-';
    var seccion = '-';
    var parc = '-';
    var partido = '';

    if(parcela.circunscripcion)
      circuns = parcela.circunscripcion
    if(parcela.seccion)
      seccion = parcela.seccion
    if(parcela.parcelaNom)
      parc = parcela.parcelaNom;
    if(parcela.partido)
      partido = parcela.partido;

   var titulo = 'Circunscripción: ' + circuns +
                ', Sección: ' + seccion +
                ', Parcela: ' +  parc +
                '. ' + partido;

		return (
			<div style={{fontSize:'90%'}}>
        <CommonHeader titulo={titulo} breadcrumb={breadcrumb}/>
        <br />
        <div className="row wrapper border-bottom white-bg page-heading text-center">
          <div className="row">
              <div className='col-lg-1' />
              <div className='col-lg-10' >
               {(actionParcela!=null)?
                (<div className="col-md-12">
                    <div className={actionParcela.action_className}>
                      <strong>{actionParcela.message}</strong>
                    </div>
                </div>
                ):
                (<div className='hidden'></div>)
                }
              </div>
          </div>
          <div className='row'>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <div className='row'>
                <div className='col-lg-1' />
                <div className='col-lg-5' >
    				      <Ubicacion />
                  <DatosCatastrales />
                  <Propietarios />
                  <Contribuyente />
                  <ExpedienteMensura />
                  <ExpedienteObra />
                  <RegistroPropiedad />
                </div>
                <div className='col-lg-5' >
                  <PlanchetaCatastral />
                  <div className='row'>
                    <div className='col-lg-6'>
                      <IdentificacionProvincial />
                    </div>
                    <div className='col-lg-6'>
                      <PlanchetaCatastralMapa />
                    </div>
                  </div>
                  <MedidasSuperficies />
                  <Indicadores />
                  <Valuacion />
                </div>
              </div>
            </form> 
          </div>
        </div>
        <br/>
        <br/>
        <br/>
			</div>
			)
	}
}

Ficha = reduxForm(
  {
    enableReinitialize: true,
    form: 'FichaForm'
  })(Ficha);


function mapStateToProps(state) {
  console.log('mapStateToProps',state)
  if (!state.parcelas.parcela){
    return {
      parcelaFetching: state.parcelas.parcelaFetching,
      parcela: state.parcelas.parcela,
      parcelaEditing: state.parcelas.parcelaEditing,
      actionParcela: state.parcelas.actionParcela
    }
  }
  //Titulo
  var nomTitCin,nomTitSec,nomTitChacra,nomTitQuinta,nomTitFraccion,
      nomTitManzana,nomTitParcela = null;
  if(state.parcelas.parcela.nomenclaturaTitulo){
    nomTitCin = state.parcelas.parcela.nomenclaturaTitulo.circunscripcion;
    nomTitSec = state.parcelas.parcela.nomenclaturaTitulo.seccion;
    nomTitChacra = state.parcelas.parcela.nomenclaturaTitulo.chacra;
    nomTitQuinta = state.parcelas.parcela.nomenclaturaTitulo.quinta;
    nomTitFraccion = state.parcelas.parcela.nomenclaturaTitulo.fraccion;
    nomTitManzana = state.parcelas.parcela.nomenclaturaTitulo.manzana;
    nomTitParcela = state.parcelas.parcela.nomenclaturaTitulo.parcelaNom;
  }

  var agua = false;
  var alumbrado = false;
  var barrido = false;
  var cloacas = false;
  var gas = false;
  var pavimento = false;
  var recoleccion = false;

  if(state.parcelas.parcela.indicadores){
    var ind = state.parcelas.parcela.indicadores;
    agua = ind.agua;
    alumbrado = ind.alumbrado;
    barrido = ind.barrido;
    cloacas = ind.cloacas;
    gas = ind.gas;
    pavimento = ind.pavimento;
    recoleccion = ind.recoleccion;
  }

  return {
    parcelaFetching: state.parcelas.parcelaFetching,
    parcela: state.parcelas.parcela,
    parcelaEditing: state.parcelas.parcelaEditing,
    actionParcela: state.parcelas.actionParcela,
    initialValues:{
      nomenclaturaTituloCircunscripcion: nomTitCin,
      nomenclaturaTituloSeccion: nomTitSec,
      nomenclaturaTituloChacra: nomTitChacra,
      nomenclaturaTituloQuinta: nomTitQuinta,
      nomenclaturaTituloFraccion: nomTitFraccion,
      nomenclaturaTituloManzana: nomTitManzana,
      nomenclaturaTituloParcela: nomTitParcela,
      circunscripcion: state.parcelas.parcela.circunscripcion,
      seccion: state.parcelas.parcela.seccion,
      chacra: state.parcelas.parcela.chacra,
      quinta: state.parcelas.parcela.quinta,
      fraccion: state.parcelas.parcela.fraccion,
      manzana: state.parcelas.parcela.manzana,
      parcela: state.parcelas.parcela.parcelaNom,
      partidaProvincial: state.parcelas.parcela.partidaProvincial,
      agua,
      alumbrado,
      barrido,
      cloacas,
      gas,
      pavimento,
      recoleccion
    }
  }

};

export default connect(mapStateToProps, { getParcela,editParcela })(Ficha);