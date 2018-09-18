import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading'
import ReactTable from 'react-table';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';
import lodash from 'lodash';
import CommonHeader from 'components/common/CommonHeader';
import ShowMessage from 'components/common/ShowMessage';
import DatosMunicipio from './components/DatosMunicipio';

class TramitesGenerales extends Component{

	constructor(props){
    super(props);
    this.state = {
    }
  }

  componentWillMount(){
  }

	render(){

    var breadcrumb = [
                      {url:`/tramitesGenerales`,tag:'Acceso a trámites',active:true},
                     ]

  	return (
        <div style={{fontSize:'90%'}}>
          <CommonHeader titulo="Acceso a trámites" breadcrumb={breadcrumb}/>
          <div className="row wrapper border-bottom white-bg page-heading text-center">
      			<div className="row" style={{margin:'5vh',fontSize:'90%'}}>
              <br />
              <div className='col-md-6 col-md-offset-3' style={{marginTop:'2%'}}>
                <DatosMunicipio />
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

export default connect(mapStateToProps, { })(TramitesGenerales);