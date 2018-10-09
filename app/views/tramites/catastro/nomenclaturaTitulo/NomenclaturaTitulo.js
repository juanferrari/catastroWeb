import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading'
import ReactTable from 'react-table';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';
import lodash from 'lodash';
import CommonHeader from 'components/common/CommonHeader';
import DatosNomenclatura from './components/DatosNomenclatura';
import validate from './components/validate';
import { editNomenclatura,getParcela } from 'actions/actions_parcelas';

class NomenclaturaTitulo extends Component{

	constructor(props){
    super(props);
    this.state = {
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount(){
    console.log(this.props)
    const {id} = this.props.match.params; 
    console.log('getting parcela')
    this.props.getParcela(id);
  }

  onSubmit(values){
    console.log('onConfirm',values);
    const {id} = this.props.match.params; 
    this.props.editNomenclatura(values,id,()=>{this.props.history.push('/tramites')});
  }

	render(){

    const {id} = this.props.match.params;
    const { handleSubmit } = this.props;
    const { parcelaFetching } = this.props;

    var onConfirm = this.onConfirm;

    var breadcrumb = [
                      {url:`/tramites/`,tag:'Trámites',active:false},
                      {url:`/busqueda/registracionPlanoMensura/`,tag:'Búsqueda',active:false},
                      {url:`/registracionPlanoMensura/${id}`,tag:'Registración de plano de mensura',active:false},
                      {url:`/nomenclaturaTitulo/${id}`,tag:'Nomenclatura según título',active:true}
                     ]

    if(parcelaFetching){
      return(
        <div className="centeredSpinner" >
          <ReactLoading type="spinningBubbles" style={{'color':"#444",'height':150,'width':150}} />
        </div>
      )
    }

  	return (
        <div style={{fontSize:'90%'}}>
          <CommonHeader titulo="Modificación de nomenclatura según título" breadcrumb={breadcrumb}/>
          <div className="row wrapper border-bottom white-bg page-heading text-center">
      			<div className="row" style={{margin:'5vh',fontSize:'90%'}}>
              <br />
              <div className='col-md-6 col-md-offset-3' style={{marginTop:'2%'}}>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <DatosNomenclatura />
                  <button type="submit" className="btn btn-primary">Confirmar</button>
                </form>
              </div>
      			</div>
          </div>
        </div>
  			)
  }
}

NomenclaturaTitulo = reduxForm(
  {
    enableReinitialize: true,
    form: 'nomenclaturaForm',
    validate
  })(NomenclaturaTitulo);

function mapStateToProps(state){
  console.log('mapStateToProps',state)

  if(!state.parcelas.parcela){
    return {
      parcelaFetching: state.parcelas.parcelaFetching
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

  return {
    parcelaFetching: state.parcelas.parcelaFetching,
    parcela: state.parcelas.parcela,
    initialValues:{
      circunscripcion: nomTitCin,
      seccion: nomTitSec,
      chacra: nomTitChacra,
      quinta: nomTitQuinta,
      fraccion: nomTitFraccion,
      manzana: nomTitManzana,
      parcela: nomTitParcela
    }
  }

};

export default connect(mapStateToProps, { editNomenclatura,getParcela })(NomenclaturaTitulo);