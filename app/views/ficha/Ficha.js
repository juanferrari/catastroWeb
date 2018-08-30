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

    this.props.editParcela(submitJson);
    $('html,body').scrollTop(0);

	}

	render(){

		const { handleSubmit } = this.props;
    const { parcela, parcelaFetching, parcelaEditing, actionParcela } = this.props;

    if (parcelaEditing){
      var button_confirm=<button type="submit" className="btn btn-primary" disabled>Confirmar <i className="fa fa-spinner fa-spin"></i></button>
    }else{
      var button_confirm=<button type="submit" className="btn btn-primary">Confirmar</button>
    }

    if(!parcela || parcelaFetching){
      return(
        <div className="centeredSpinner" >
          <ReactLoading type="spinningBubbles" style={{'color':"#444",'height':150,'width':150}} />
        </div>
      )
    }

		return (
			<div>
        <CommonHeader />
        <br />
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
            <div className='row text-center'>
              { button_confirm }
            </div>
          </form> 
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
  if(state.parcelas.parcela.rows[0] && state.parcelas.parcela.rows[0].catastro){
    nomTitCin = state.parcelas.parcela.rows[0].catastro.nomenclaturaTituloCircunscripcion;
    nomTitSec = state.parcelas.parcela.rows[0].catastro.nomenclaturaTituloSeccion;
    nomTitChacra = state.parcelas.parcela.rows[0].catastro.nomenclaturaTituloChacra;
    nomTitQuinta = state.parcelas.parcela.rows[0].catastro.nomenclaturaTituloQuinta;
    nomTitFraccion = state.parcelas.parcela.rows[0].catastro.nomenclaturaTituloFraccion;
    nomTitManzana = state.parcelas.parcela.rows[0].catastro.nomenclaturaTituloManzana;
    nomTitParcela = state.parcelas.parcela.rows[0].catastro.nomenclaturaTituloParcela;
  }
  //Catastro
  var nomCatCin,nomCatSec,nomCatChacra,nomCatQuinta,nomCatFraccion,
      nomCatManzana,nomCatParcela,partidaMunicipal,codigoPagoElectronico = null;
  if(state.parcelas.parcela.rows[0] && state.parcelas.parcela.rows[0].catastro){
    nomCatCin = state.parcelas.parcela.rows[0].catastro.nomenclaturaCatastroCircunscripcion;
    nomCatSec = state.parcelas.parcela.rows[0].catastro.nomenclaturaCatastroSeccion;
    nomCatChacra = state.parcelas.parcela.rows[0].catastro.nomenclaturaCatastroChacra;
    nomCatQuinta = state.parcelas.parcela.rows[0].catastro.nomenclaturaCatastroQuinta;
    nomCatFraccion = state.parcelas.parcela.rows[0].catastro.nomenclaturaCatastroFraccion;
    nomCatManzana = state.parcelas.parcela.rows[0].catastro.nomenclaturaCatastroManzana;
    nomCatParcela = state.parcelas.parcela.rows[0].catastro.nomenclaturaCatastroParcela;
    partidaMunicipal = state.parcelas.parcela.rows[0].catastro.partidaMunicipal;
    codigoPagoElectronico = state.parcelas.parcela.rows[0].catastro.codigoPagoElectronico;
  }

  return {
    parcelaFetching: state.parcelas.parcelaFetching,
    parcela: state.parcelas.parcela,
    parcelaEditing: state.parcelas.parcelaEditing,
    actionParcela: state.parcelas.actionParcela,
    initialValues:{
      partido: state.parcelas.parcela.rows[0].partido,
      localidad: state.parcelas.parcela.rows[0].localidad,
      barrio: state.parcelas.parcela.rows[0].barrio,
      domicilio: state.parcelas.parcela.rows[0].domicilio,
      nomenclaturaTituloCircunscripcion: nomCatCin,
      nomenclaturaTituloSeccion: nomTitSec,
      nomenclaturaTituloChacra: nomTitChacra,
      nomenclaturaTituloQuinta: nomTitQuinta,
      nomenclaturaTituloFraccion: nomTitFraccion,
      nomenclaturaTituloManzana: nomTitManzana,
      nomenclaturaTituloParcela: nomTitParcela,
      nomenclaturaCatastroCircunscripcion: nomCatCin,
      nomenclaturaCatastroSeccion: nomCatSec,
      nomenclaturaCatastroChacra: nomCatChacra,
      nomenclaturaCatastroQuinta: nomCatQuinta,
      nomenclaturaCatastroFraccion: nomCatFraccion,
      nomenclaturaCatastroManzana: nomCatManzana,
      nomenclaturaCatastroParcela: nomCatParcela,
      partidaMunicipal:partidaMunicipal,
      codigoPagoElectronico: codigoPagoElectronico
    }
  }

};

export default connect(mapStateToProps, { getParcela,editParcela })(Ficha);