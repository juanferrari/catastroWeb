import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading'
import ReactTable from 'react-table';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';
import lodash from 'lodash';
import { getParcela } from 'actions/actions_parcelas';
import Ubicacion from './components/Ubicacion';
import DatosCatastrales from './components/DatosCatastrales';
import PlanchetaCatastral from './components/PlanchetaCatastral';
import IdentificacionProvincial from './components/IdentificacionProvincial';
import PlanchetaCatastralMapa from './components/PlanchetaCatastralMapa';

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

	onSubmit(values){
		
	}

	render(){

		const { handleSubmit } = this.props;
    const { parcela, parcelaFetching } = this.props;

    if(!parcela || parcelaFetching){
      return(
        <div className="centeredSpinner" >
          <ReactLoading type="spinningBubbles" style={{'color':"#444",'height':150,'width':150}} />
        </div>
      )
    }

		return (
			<div className="row">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className='col-lg-1' />
            <div className='col-lg-5' >
				      <Ubicacion />
              <DatosCatastrales />
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
            </div>
        </form>  
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

  if (!state.parcelas.parcela){
    return {
      parcelaFetching: state.parcelas.parcelaFetching,
      parcela: state.parcelas.parcela
    }
  }

  var nomCatCin = null;
  if(state.parcelas.parcela.rows[0] && state.parcelas.parcela.rows[0].catastro)
    nomCatCin = state.parcelas.parcela.rows[0].catastro.nomenclaturaCatastroCircunscripcion;
  var nomCatSec = null;
  if(state.parcelas.parcela.rows[0] && state.parcelas.parcela.rows[0].catastro)
    nomCatSec = state.parcelas.parcela.rows[0].catastro.nomenclaturaCatastroSeccion;
  var nomCatChacra = null;
  if(state.parcelas.parcela.rows[0] && state.parcelas.parcela.rows[0].catastro)
    nomCatChacra = state.parcelas.parcela.rows[0].catastro.nomenclaturaCatastroChacra;
  var nomCatQuinta = null;
  if(state.parcelas.parcela.rows[0] && state.parcelas.parcela.rows[0].catastro)
    nomCatQuinta = state.parcelas.parcela.rows[0].catastro.nomenclaturaCatastroQuinta;
  var nomCatFraccion = null;
  if(state.parcelas.parcela.rows[0] && state.parcelas.parcela.rows[0].catastro)
    nomCatFraccion = state.parcelas.parcela.rows[0].catastro.nomenclaturaCatastroFraccion;
  var nomCatManzana = null;
  if(state.parcelas.parcela.rows[0] && state.parcelas.parcela.rows[0].catastro)
    nomCatManzana = state.parcelas.parcela.rows[0].catastro.nomenclaturaCatastroManzana;
  var nomCatParcela = null;
  if(state.parcelas.parcela.rows[0] && state.parcelas.parcela.rows[0].catastro)
    nomCatParcela = state.parcelas.parcela.rows[0].catastro.nomenclaturaCatastroParcela;
  var partidaMunicipal = null;
  if(state.parcelas.parcela.rows[0] && state.parcelas.parcela.rows[0].catastro)
    partidaMunicipal = state.parcelas.parcela.rows[0].catastro.partidaMunicipal;
  var codigoPagoElectronico = null;
  if(state.parcelas.parcela.rows[0] && state.parcelas.parcela.rows[0].catastro)
    codigoPagoElectronico = state.parcelas.parcela.rows[0].catastro.codigoPagoElectronico;

  return {
    parcelaFetching: state.parcelas.parcelaFetching,
    parcela: state.parcelas.parcela,
    initialValues:{
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

export default connect(mapStateToProps, { getParcela })(Ficha);