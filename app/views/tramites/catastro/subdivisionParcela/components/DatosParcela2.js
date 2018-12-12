import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import { Field, reduxForm } from 'redux-form';
import Ubicacion from './subcomponents/Ubicacion';

class DatosParcela2 extends Component{
	render(){
		
		var button_confirm = <button 
					             className='btn btn-primary' 
					             onClick={()=>this.props.onSubmit()}
					           >  Continuar 
					           </button>


		const {handleSubmit} = this.props;

		return(
			<form onSubmit={handleSubmit}>
				<div className='row text-center'>
					<h1>Datos Parcela2 {this.props.parcela}</h1>
				</div>
				<div className='row text-center'>
					<div className='col-lg-6 col-md-6'>
						<Ubicacion id={this.props.parcela}/>
					</div>
				</div>
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

DatosParcela2 = reduxForm(
  {
    form: 'DatosParcelaForm', // <------ same form name
	destroyOnUnmount: false, // <------ preserve form data
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  })(DatosParcela2);

function mapStateToProps(state){
  console.log('mapStateToProps',state)

  return {
    parcelasSubdivididas: state.parcelas.parcelasSubdivididas
  }

};

export default connect(mapStateToProps, { })(DatosParcela2);