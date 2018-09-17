import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading'
import ReactTable from 'react-table';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';
import lodash from 'lodash';
import CommonHeader from 'components/common/CommonHeader';
import DatosCatastrales from './components/DatosCatastrales';
import UbicacionCalle from './components/UbicacionCalle';
import { getCalles } from 'actions/actions_calles'
import { getParcela } from 'actions/actions_parcelas';

class Busqueda extends Component{

	constructor(props){
    super(props);
    this.state = {
    }
  }

  componentWillMount(){
    const {id} = this.props.match.params;
    this.props.getCalles();
    this.props.getParcela(id)
  }

	render(){

    const {calles,callesFetching,parcela,parcelaFetching} = this.props;

    if(!calles || callesFetching || !parcela || parcelaFetching){
      return(
        <div className="centeredSpinner" >
          <ReactLoading type="spinningBubbles" style={{'color':"#444",'height':150,'width':150}} />
        </div>
      )
    }

  	return (
        <div style={{fontSize:'90%'}}>
          <CommonHeader titulo="Asignación de calle"/>
          <div className="row wrapper border-bottom white-bg page-heading text-center">
      			<div className="row" style={{margin:'5vh',fontSize:'90%'}}>
              <br />
              <div className='col-md-6 col-md-offset-3' style={{marginTop:'2%'}}>
                <UbicacionCalle calles={calles} callesParcela={parcela.calles}/>
              </div>
              <br/> 
      			</div>
            <div className='row'>
              <button className='btn btn-primary'>Confirmar</button>
            </div>
          </div>
        </div>
  			)
  }
}

function mapStateToProps(state){
  console.log('mapStateToProps',state)

  return {
    calles: state.calles.calles,
    callesFetching: state.calles.callesFetching,
    parcela: state.parcelas.parcela,
    parcelaFetching: state.parcelas.parcelaFetching
  }

};

export default connect(mapStateToProps, { getCalles,getParcela })(Busqueda);