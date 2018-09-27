import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';
import Select from 'react-select';
import 'react-select/dist/react-select.css'
import AccionesCalles from './components/AccionesCalles';
import CommonHeader from 'components/common/CommonHeader';
import ShowMessage from 'components/common/ShowMessage';

class ModificacionCalles extends Component{

	constructor(props){
    super(props);
    this.state = {
    }
  }


	render(){
    const {actionCalles} = this.props;
    var breadcrumb = [
                      {url:`/tramites`,tag:'Acceso a trámites',active:false},
                      {url:`/modificacionCalles`,tag:'Modificación de una calle',active:true}
                     ]

		return (
		    <div style={{fontSize:'90%'}}>
          <CommonHeader titulo="Modificación de calles" breadcrumb={breadcrumb}/>
          <div className="row wrapper border-bottom white-bg page-heading text-center">
            <div className="row" style={{margin:'5vh',fontSize:'90%'}}>
              <ShowMessage action={actionCalles}/>
              <br />
              <div className='col-md-6 col-md-offset-3' style={{marginTop:'2%'}}>
                <AccionesCalles />
              </div>   
            </div>
          </div>
        </div>
			)
	}
}

function mapStateToProps(state) {

  return {
    actionCalles:state.calles.actionCalles
  }

};

export default connect(mapStateToProps, null)(ModificacionCalles);