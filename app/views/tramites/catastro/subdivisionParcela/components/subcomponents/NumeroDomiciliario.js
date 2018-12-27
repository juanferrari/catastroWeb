import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect, Link,Router, hashHistory ,withRouter } from 'react-router-dom';
import ReactLoading from 'react-loading';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';
import CommonHeader from 'components/common/CommonHeader';
import { editCalle,getCalles } from 'actions/actions_calles';
import NumeroCalleArray from './NumeroCalleArray';

class NumeroDomiciliario extends Component{

  constructor(props){
      super(props);
      this.state = {
        calles:[]
      }

      this.onSubmit = this.onSubmit.bind(this);
      this.renderField = this.renderField.bind(this);
  }

  componentWillMount(){
    this.props.getCalles();
  }

  onSubmit(values){
    var calle = {id:values.calle.value,nombre:values.nombre}
    this.props.editCalle(calle,()=>{this.props.history.push('/modificacionCalles')})
  }  

  renderField(field) {

      const { meta: { touched, error } } = field;
      const className = `form-group ${touched && error ? 'has-error' : ''}`;

      return (
        <div className={className + ' text-center'}>
          <label>{field.label}</label>
          <input
            className="form-control input-sm ng-pristine ng-valid ng-empty ng-touched text-center"
            type="text"
            {...field.input}
          />
          <div className="text-help">
            {touched ? error : ''}
          </div>
        </div>
      );
  }

  render(){

    const {handleSubmit} = this.props;
    const {calles,callesFetching} = this.props;

    var breadcrumb = [
                      {url:`/tramites`,tag:'Acceso a trámites',active:false},
                      {url:`/modificacionCalles`,tag:'Modificación de una calle',active:false},
                      {url:`/modificarCalle`,tag:'Modificar una calle',active:true}
                     ]

    if(!calles || callesFetching){
      return(
        <div className="centeredSpinner" >
          <ReactLoading type="spinningBubbles" style={{'color':"#444",'height':150,'width':150}} />
        </div>
      )
    }

    return (
      <div className="col-lg-12">
        <div className="panel panel-info" style={{'borderColor': '#bce8f1'}}>
          <div className='panel-heading' style={{'color': '#31708f','backgroundColor':'#d9edf7','borderColor': '#bce8f1'}}>
            Número domiciliario
          </div>
          <div className="panel-body">
              <div className='col-lg-12'>
                <NumeroCalleArray calles={calles} id={this.props.id}/>
              </div>
              <br />
          </div>
        </div>
      </div>
      )
  }
}

function mapStateToProps(state) {

  return {
    calles: state.calles.calles,
    callesFetching: state.calles.callesFetching
  }

};

export default withRouter(connect(mapStateToProps, {editCalle,getCalles})(NumeroDomiciliario));