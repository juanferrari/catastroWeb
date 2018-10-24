import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading'
import ReactTable from 'react-table';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';
import lodash from 'lodash';
import CommonHeader from 'components/common/CommonHeader';
import Wizard from './components/Wizard';
import { getExpedienteMensura } from 'actions/actions_parcelas';

class VisadoPlanoMensura extends Component{

	constructor(props){
    super(props);
    this.state = {
    }
  }

  componentWillMount(){
    const {id} = this.props.match.params;
    this.props.getExpedienteMensura(id);
  }

	render(){

    const {id} = this.props.match.params;

    var breadcrumb = [
                      {url:`/tramites/`,tag:'Trámites',active:false},
                      {url:`/busqueda/visadoPlanoMensura/`,tag:'Búsqueda',active:false},
                      {url:`/visadoPlanoMensura/${id}`,tag:'Visado de plano de mensura',active:true}
                     ]

    if(false){
      return(
        <div className="centeredSpinner" >
          <ReactLoading type="spinningBubbles" style={{'color':"#444",'height':150,'width':150}} />
        </div>
      )
    }

  	return (
        <div style={{fontSize:'90%'}}>
          <CommonHeader titulo="Visado de plano de mensura" breadcrumb={breadcrumb}/>
          <div className="row wrapper border-bottom white-bg page-heading text-center">
      			<div className="row" style={{margin:'5vh',fontSize:'90%'}}>
              <br />
              <div className='col-md-6 col-md-offset-3' style={{marginTop:'2%'}}>
                <Wizard id={id}/>
              </div>
      			</div>
          </div>
        </div>
  			)
  }
}

function mapStateToProps(state){
  //console.log('mapStateToProps',state)

  return {
    expedienteMensura: state.parcelas.expedienteMensura
  }

};

export default connect(mapStateToProps, { getExpedienteMensura })(VisadoPlanoMensura);