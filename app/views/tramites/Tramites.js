import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading'
import ReactTable from 'react-table';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';
import lodash from 'lodash';
import CommonHeader from 'components/common/CommonHeader';
import ShowMessage from 'components/common/ShowMessage';
import Catastro from './components/Catastro';
import Valuacion from './components/Valuacion';
import Otros from './components/Otros';

class Busqueda extends Component{

	constructor(props){
    super(props);
    this.state = {
    }
  }

  componentWillMount(){
  }

	render(){

    const {actionParcela} = this.props;

  	return (
        <div style={{fontSize:'90%'}}>
          <CommonHeader titulo="Acceso a trámites"/>
          <div className="row wrapper border-bottom white-bg page-heading text-center">
      			<div className="row" style={{margin:'5vh',fontSize:'90%'}}>
              <ShowMessage action={actionParcela}/>
              <br />
              <div className='col-md-6' style={{marginTop:'2%'}}>
                <Catastro />
              </div>
              <div className='col-md-6' style={{marginTop:'2%'}}>
                <Valuacion />
                <Otros />
              </div>   
      			</div>
          </div>
        </div>
  			)
  }
}

function mapStateToProps(state) {

  return {
    actionParcela: state.parcelas.actionParcela
  }

};

export default connect(mapStateToProps, { })(Busqueda);