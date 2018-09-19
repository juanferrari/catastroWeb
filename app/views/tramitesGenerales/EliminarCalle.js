import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect, Link,Router, hashHistory ,withRouter } from 'react-router-dom';
import ReactLoading from 'react-loading';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';
import CommonHeader from 'components/common/CommonHeader';
import { getCalles,deleteCalle } from 'actions/actions_calles';
import SelectCalle from './components/SelectCalle';

class EliminarCalle extends Component{

	constructor(props){
	    super(props);
	    this.state = {
        calles:[]
	    }

      this.onSubmit = this.onSubmit.bind(this);
  }

	componentWillMount(){
    this.props.getCalles();
	}

  onSubmit(values){
    this.props.deleteCalle(values.calle.value,()=>{this.props.history.push('/modificacionCalles')})
  }  

	render(){

    const {handleSubmit} = this.props;
    const {calles,callesFetching} = this.props;

    var breadcrumb = [
                      {url:`/tramitesGenerales`,tag:'Acceso a trámites',active:false},
                      {url:`/modificacionCalles`,tag:'Modificación de una calle',active:false},
                      {url:`/eliminarCalle`,tag:'Eliminar una calle',active:true}
                     ]

    if(!calles || callesFetching){
      return(
        <div className="centeredSpinner" >
          <ReactLoading type="spinningBubbles" style={{'color':"#444",'height':150,'width':150}} />
        </div>
      )
    }

		return (
      <div style={{fontSize:'90%'}}>
        <CommonHeader titulo="Modificación de calles" breadcrumb={breadcrumb}/>
        <div className="row wrapper border-bottom white-bg page-heading text-center">
          <div className="row" style={{margin:'5vh',fontSize:'90%'}}>
            <br />
            <div className='col-md-6 col-md-offset-3' style={{marginTop:'2%'}}>
             <div className="panel panel-info" style={{'borderColor': '#bce8f1'}}>
              <div className='panel-heading' style={{'color': '#31708f','backgroundColor':'#d9edf7','borderColor': '#bce8f1'}}>
                Eliminar calle
              </div>
              <div className="panel-body">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <SelectCalle calles={calles}/>
                  <br />
                  <div className='row'>
                    <button className='btn btn-sm btn-primary' type='submit'>Confirmar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
			)
	}
}

function validate(values) {
  const error = {};

  if (!values.calle) {
    error.calle = 'Seleccione una calle';
  }

  return error;
}

EliminarCalle = reduxForm(
  {
    form: 'EliminarCalleForm',
    validate
  })(EliminarCalle);

function mapStateToProps(state) {

  return {
    calles: state.calles.calles,
    callesFetching: state.calles.callesFetching
  }

};

export default withRouter(connect(mapStateToProps, {deleteCalle,getCalles})(EliminarCalle));