import React, { Component } from 'react';
import ShowParcela from 'components/common/ShowParcela';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import { Field, reduxForm } from 'redux-form'
import DatosCatastrales from './subcomponents/DatosCatastrales'

class DatosParcela extends Component{
	render(){

		var button_confirm = <button 
					             className='btn btn-primary' 
					             onClick={()=>this.props.onSubmit()}
					           >  Continuar 
					           </button>

		const {parcelasSubdivididas} = this.props;
		var parcelaGeojson;
		const {handleSubmit} = this.props;

		if(this.props.parcela == 1){
			if(parcelasSubdivididas){
				parcelaGeojson = JSON.parse(parcelasSubdivididas[0])
			}
		}else{
			if(parcelasSubdivididas){
				parcelaGeojson = JSON.parse(parcelasSubdivididas[1])
			}	
		}


		if(!parcelasSubdivididas){
	      return(
	        <div className="centeredSpinner" >
	          <ReactLoading type="spinningBubbles" style={{'color':"#444",'height':150,'width':150}} />
	        </div>
	      )
	    }

		return(
			<form onSubmit={handleSubmit}>
				<div className='row text-center'>
					<h1>Datos Parcela {this.props.parcela}</h1>
				</div>
				<div className='row text-center'>
					<div className='col-lg-6 col-md-6'>
						<DatosCatastrales id={this.props.parcela}/>
					</div>
					<div className='col-lg-6 col-md-6'>
						<ShowParcela geoJson={parcelaGeojson}/>
					</div>
				</div>
				<br/>
				<div className='row text-center'>
				  <button type="button" className="previous btn btn-primary" onClick={()=>this.props.previousPage()}>
		            Anterior
		          </button>
		          {button_confirm}
		        </div>
			</form>
			);
	}
}

DatosParcela = reduxForm(
  {
    form: 'DatosParcelaForm', // <------ same form name
	destroyOnUnmount: false, // <------ preserve form data
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  })(DatosParcela);

function mapStateToProps(state){
  console.log('mapStateToProps',state)

  return {
    parcelasSubdivididas: state.parcelas.parcelasSubdivididas
  }

};

export default connect(mapStateToProps, { })(DatosParcela);