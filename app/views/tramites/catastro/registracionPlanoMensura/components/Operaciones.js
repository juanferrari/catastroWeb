import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect, Link,Router, hashHistory ,withRouter } from 'react-router-dom';
import ReactLoading from 'react-loading';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';

class Operaciones extends Component{

	constructor(props){
	    super(props);
	    this.state = {
        collapsed:false,
	    }
  }

	componentWillMount(){
	}

	render(){

    const {id} = this.props.match.params;

		return (
		    <div className="col-lg-12" id='test'>
          <div className="panel panel-info" style={{'borderColor': '#bce8f1'}}>
              	<div className='panel-heading' style={{'color': '#31708f','backgroundColor':'#d9edf7','borderColor': '#bce8f1'}}>
                	Operaciones
              	</div>
              	<div className="panel-body">
                  <div className='row'>
                    <div className="col-lg-12">
                      <div className="col-xs-12">
                        <a onClick={()=>console.log('catastro')}>
                          <p className="text-center btn-tramite">
                            UNIFICACIÓN DE PARCELAS
                          </p>
                        </a>
                      </div>
                      <div className="col-xs-12">
                        <a onClick={()=>console.log('catastro')}>
                          <p className="text-center btn-tramite">
                            SUBDIVISIÓN DE PARCELA
                          </p>
                        </a>
                      </div>
                      <div className="col-xs-12">
                        <a onClick={()=>console.log('catastro')}>
                          <p className="text-center btn-tramite">
                            UNIFICACIÓN Y SUBDIVISIÓN DE PARCELAS
                          </p>
                        </a>
                      </div>
                      <div className="col-xs-12">
                        <a onClick={()=>console.log('catastro')}>
                          <p className="text-center btn-tramite">
                            PROPIEDAD HORIZONTAL
                          </p>
                        </a>
                      </div>
                      <div className="col-xs-12">
                        <a onClick={()=>console.log('catastro')}>
                          <p className="text-center btn-tramite">
                            MODIFICACIÓN DE MEDIDAS
                          </p>
                        </a>
                      </div>
                      <div className="col-xs-12">
                        <a onClick={()=>console.log('catastro')}>
                          <p className="text-center btn-tramite">
                            MODIFICACIÓN DE NOMENCLATURA CATASTRAL
                          </p>
                        </a>
                      </div>
                      <div className="col-xs-12">
                        <a onClick={()=>this.props.history.push(`/nomenclaturaTitulo/${id}`)}>
                          <p className="text-center btn-tramite">
                            MODIFICACIÓN DE NOMENCLATURA SEGÚN TÍTULO
                          </p>
                        </a>
                      </div>
                    </div>
                  </div>
        		    </div>
      	  </div>
        </div>
			)
	}
}

function mapStateToProps(state) {

  return {}

};

export default withRouter(connect(mapStateToProps, null)(Operaciones));