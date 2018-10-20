import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading'
import ReactTable from 'react-table';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';
import lodash from 'lodash';
import CommonHeader from 'components/common/CommonHeader';
import Servicios from './components/Servicios';
import { getParcela,editIndicadores } from 'actions/actions_parcelas';

class ObrasPublicas extends Component{

  constructor(props){
    super(props);
    this.state = {
      callesParcela:[]
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount(){
    const {id} = this.props.match.params;
    this.props.getParcela(id)
  }


  onSubmit(values){
    const {id} = this.props.match.params;
    console.log('values',values)
    console.log('id',id)
    this.props.editIndicadores(values,id,()=>{this.props.history.push('/tramites')});

  }

  render(){

    const {parcela,parcelaFetching,handleSubmit} = this.props;
    const {id} = this.props.match.params;
    
    var breadcrumb = [
                      {url:`/tramites/`,tag:'Trámites',active:false},
                      {url:`/obrasPublicas/${id}`,tag:'Obras Públicas',active:true}
                     ]

    if(!parcela || parcelaFetching){
      return(
        <div className="centeredSpinner" >
          <ReactLoading type="spinningBubbles" style={{'color':"#444",'height':150,'width':150}} />
        </div>
      )
    }

    return (
        <div style={{fontSize:'90%'}}>
          <CommonHeader titulo="Obras Públicas" breadcrumb={breadcrumb}/>
          <div className="row wrapper border-bottom white-bg page-heading text-center">
            <div className="row" style={{margin:'5vh',fontSize:'90%'}}>
              <br />
              <div className='col-md-6 col-md-offset-3' style={{marginTop:'2%'}}>
              <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Servicios />
                <div className='row'>
                  <button type='submit'className='btn btn-primary'>Confirmar</button>
                </div>
              </form>
              </div>
              <br/> 
            </div>
          </div>
        </div>
        )
  }
}

ObrasPublicas = reduxForm(
  {
    enableReinitialize: true,
    form: 'ObrasPublicasForm'
  })(ObrasPublicas);

function mapStateToProps(state){
  //console.log('mapStateToProps',state)
  var agua = false;
  var alumbrado = false;
  var barrido = false;
  var cloacas = false;
  var gas = false;
  var pavimento = false;
  var recoleccion = false;

  if(state.parcelas.parcela && state.parcelas.parcela.indicadores){
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
    parcela: state.parcelas.parcela,
    parcelaFetching: state.parcelas.parcelaFetching,
    initialValues:{
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

export default connect(mapStateToProps, { getParcela,editIndicadores })(ObrasPublicas);