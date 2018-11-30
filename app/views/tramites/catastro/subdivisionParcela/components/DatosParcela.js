import React, { Component } from 'react';
import ShowParcela from 'components/common/ShowParcela';

class DatosParcela extends Component{
	render(){
		var button_confirm;
		if(this.props.parcela == 1){
			 button_confirm = <button 
						             className='btn btn-primary' 
						             onClick={()=>this.props.onSubmit()}
						           >  Continuar 
						           </button>
		}else{
			 button_confirm = <button 
						             className='btn btn-primary' 
						             onClick={()=>this.props.onSubmit()}
						           >  Finalizar 
						           </button>
		}

		return(
			<div>
				<div className='row text-center'>
					<h1>Datos Parcela {this.props.parcela}</h1>
				</div>
				<div className='row text-center'>
					<div className='col-lg-6 col-md-6  col-lg-offset-6 col-md-offset-6'>
						<ShowParcela id={842998}/>
					</div>
				</div>
				<div className='row text-center'>
				  <button type="button" className="previous btn btn-primary" onClick={()=>this.props.previousPage()}>
		            Anterior
		          </button>
		          {button_confirm}
		        </div>
			</div>
			);
	}
}

export default DatosParcela;