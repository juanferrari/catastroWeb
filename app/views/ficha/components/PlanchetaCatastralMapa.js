import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';

class PlanchetaCatastralMapa extends Component{

	constructor(props){
	    super(props);
	    this.state = {
        collapsed:false,
	    }
  	}


	render(){

		return (
		    <div className="col-lg-12" id='test'>
          <div className="panel panel-info" style={{'borderColor': '#bce8f1'}}>
              	<div className='panel-heading' style={{'color': '#31708f','backgroundColor':'#d9edf7','borderColor': '#bce8f1'}}>
                	Plancheta Catastral
              	</div>
              	<div className="panel-body">  
                  <div className='row'>
                    <div className='col-lg-12'>
                      <img src='http://geomatica.com.ar/chacabuco/mapa_referencia.png' width="100%" />
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

export default connect(mapStateToProps, null)(PlanchetaCatastralMapa);