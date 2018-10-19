import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import { BrowserRouter, Route, Switch, Redirect, Link,Router, hashHistory ,withRouter } from 'react-router-dom';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';

class Valuacion extends Component{

	constructor(props){
	    super(props);
	    this.state = {
        collapsed:false,
	    }
  }

	componentWillMount(){
	}

	render(){

		return (
		    <div className="col-lg-12" id='test'>
          <div className="panel panel-info" style={{'borderColor': '#bce8f1'}}>
              	<div className='panel-heading' style={{'color': '#31708f','backgroundColor':'#d9edf7','borderColor': '#bce8f1'}}>
                	Valuacion
              	</div>
              	<div className="panel-body">
                  <div className='row'>
                    <div className="col-lg-12">
                      <div className="col-xs-12">
                        <a onClick={()=>this.props.history.push(`/busqueda/obrasPublicas`)}>
                          <p className="text-center btn-tramite">
                            OBRAS PÚBLICAS
                          </p>
                        </a>
                      </div>
                      <div className="col-xs-12">
                        <a onClick={()=>console.log('catastro')}>
                          <p className="text-center btn-disabled">
                            EMPADRONAMIENTO DE CONSTRUCCIONES NO DECLARADAS
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

export default withRouter(connect(mapStateToProps, null)(Valuacion));