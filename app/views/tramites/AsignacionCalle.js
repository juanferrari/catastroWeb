import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading'
import ReactTable from 'react-table';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';
import lodash from 'lodash';
import CommonHeader from 'components/common/CommonHeader';
import DatosCatastrales from './components/DatosCatastrales';
import Ubicacion from 'views/ficha/components/Ubicacion'

class Busqueda extends Component{

	constructor(props){
    super(props);
    this.state = {
    }
  }

  componentWillMount(){
  }

	render(){

  	return (
        <div style={{fontSize:'90%'}}>
          <CommonHeader titulo="Asignación de calle"/>
          <div className="row wrapper border-bottom white-bg page-heading text-center">
      			<div className="row" style={{margin:'5vh',fontSize:'90%'}}>
              <br />
              <div className='col-md-6' style={{marginTop:'2%'}}>
                <DatosCatastrales />
              </div>
              <div className='col-md-6' style={{marginTop:'2%'}}>
                <Ubicacion />
              </div>   
      			</div>
          </div>
        </div>
  			)
  }
}

function mapStateToProps(state) {

  return {
  }

};

export default connect(mapStateToProps, { })(Busqueda);