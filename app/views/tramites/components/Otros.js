import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';

class Otros extends Component{

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
                  Otros
                </div>
                <div className="panel-body">
                  <div className='row'>
                    <div className="col-lg-12">
                      <div className="col-xs-12">
                        <a onClick={()=>console.log('catastro')}>
                          <p className="text-center btn-tramite">
                            REGISTRACIÓN DE PLANO DE OBRA
                          </p>
                        </a>
                      </div>
                      <div className="col-xs-12">
                        <a onClick={()=>console.log('catastro')}>
                          <p className="text-center btn-tramite">
                            CAMBIO DE DESTINO
                          </p>
                        </a>
                      </div>
                      <div className="col-xs-12">
                        <a onClick={()=>console.log('catastro')}>
                          <p className="text-center btn-tramite">
                            HABILITACIÓN DE COMERCIO E INDUSTRIA
                          </p>
                        </a>
                      </div>
                      <div className="col-xs-12">
                        <a onClick={()=>console.log('catastro')}>
                          <p className="text-center btn-tramite">
                            EXIMICIÓN IMPOSITIVA
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

export default connect(mapStateToProps, null)(Otros);