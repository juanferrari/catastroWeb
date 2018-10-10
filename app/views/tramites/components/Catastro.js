import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect, Link,Router, hashHistory ,withRouter } from 'react-router-dom';
import ReactLoading from 'react-loading';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';

class Catastro extends Component{

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
                	Catastro
              	</div>
              	<div className="panel-body">
                  <div className='row'>
                    <div className="col-lg-12">
                      <div className="col-xs-12">
                        <a onClick={()=>this.props.history.push(`/busqueda/visadoPlanoMensura`)}>
                          <p className="text-center btn-tramite">
                            VISADO DE PLANO DE MENSURA
                          </p>
                        </a>
                      </div>
                      <div className="col-xs-12">
                        <a onClick={()=>this.props.history.push(`/busqueda/registracionPlanoMensura`)}>
                          <p className="text-center btn-tramite">
                            REGISTRACIÓN DE PLANO DE MENSURA
                          </p>
                        </a>
                      </div>
                      <div className="col-xs-12">
                        <a onClick={()=>console.log('catastro')}>
                          <p className="text-center btn-disabled">
                            COPIA DE PLANCHETAS
                          </p>
                        </a>
                      </div>
                      <div className="col-xs-12">
                        <a onClick={()=>console.log('catastro')}>
                          <p className="text-center btn-disabled">
                            REGISTRACIÓN DE PLANO DE POSESIÓN
                          </p>
                        </a>
                      </div>
                      <div className="col-xs-12">
                        <a onClick={()=>console.log('catastro')}>
                          <p className="text-center btn-disabled">
                            EMPADRONAMIENTO DE PARCELAS INFORMALES
                          </p>
                        </a>
                      </div>
                      <div className="col-xs-12">
                        <a onClick={()=>console.log('catastro')}>
                          <p className="text-center btn-disabled">
                            CAMBIO DE TITULARIDAD
                          </p>
                        </a>
                      </div>
                      <div className="col-xs-12">
                        <a onClick={()=>console.log('catastro')}>
                          <p className="text-center btn-disabled">
                            ASIGNACIÓN DE NÚMERO DOMICILIARIO
                          </p>
                        </a>
                      </div>
                      <div className="col-xs-12">
                        <a onClick={()=>this.props.history.push(`/busqueda/asignacionCalle`)}>
                          <p className="text-center btn-tramite">
                            ASIGNACIÓN DE CALLE
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

export default withRouter(connect(mapStateToProps, null)(Catastro));