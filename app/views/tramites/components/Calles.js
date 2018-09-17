import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';
import Select from 'react-select';
import 'react-select/dist/react-select.css'

class Calles extends Component{

	constructor(props){
	    super(props);
	    this.state = {
        collapsed:false,
        calles: [{value:1,label:'Sarmiento'},{value:2,label:'Avellaneda'},{value:3,label:'Mitre'},{value:4,label:'Rivadavia'}],
        callesParcela:[{value:4,label:'Rivadavia'},{value:2,label:'Avellaneda'}],
        calleSeleccionada: null
	    }

	    this.renderField = this.renderField.bind(this);
      this.borrarCalle = this.borrarCalle.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.agregarCalle = this.agregarCalle.bind(this);
  	}

	componentWillMount(){
    var calles = this.state.calles;
    var callesParcela = this.state.callesParcela;

    var valuesCalles = [];

    for(var calle of callesParcela){
      valuesCalles.push(calle.value);
    }

    calles = calles.filter(calle => !valuesCalles.includes(calle.value));

    this.setState({calles})
	}

	renderField(field) {
	    const { meta: { touched, error } } = field;

	    const className = `form-group ${touched && error ? 'has-error' : ''}`;

	    return (
	      <div className={className}>
	        <label>{field.label}</label>
	        <input
            disabled
	          className="form-control input-sm ng-pristine ng-valid ng-empty ng-touched"
	          type="text"
	          {...field.input}
	        />
	        <div className="text-help">
	          {touched ? error : ''}
	        </div>
	      </div>
	    );
	}

  borrarCalle(value){
    console.log('borrarCalle',value);
    var callesParcela = this.state.callesParcela;
    var calles = this.state.calles;

    var calleBorrar = callesParcela.filter(calle => calle.value == value)[0];
    console.log('calleBorrar',calleBorrar)
    calles.push(calleBorrar);
    callesParcela = callesParcela.filter(calle=> calle.value != value);
    this.setState({calles,callesParcela});

  }

  agregarCalle(){
    var calles = this.state.calles;
    var valuesCalles = [];

    if(this.state.calleSeleccionada){
      var callesActuales = this.state.callesParcela;
      callesActuales.push(this.state.calleSeleccionada);

      for(var calle of callesActuales){
        valuesCalles.push(calle.value);
      }

      calles = calles.filter(calle => !valuesCalles.includes(calle.value));
      console.log('calles a elegir',calles)

      this.setState({callesParcela:callesActuales,calles:calles,calleSeleccionada:null})
    }
  }

  handleChange(calleSeleccionada){

    this.setState({ calleSeleccionada });
    console.log(`Option selected:`, calleSeleccionada);
  }

	render(){

    const { calleSeleccionada } = this.state;
    var agregarCalle = this.agregarCalle;
    var borrarCalle = this.borrarCalle;

		return (
		    <div className="col-lg-12" id='test'>
          <div className='row'>
            <strong>Calles asociadas a la parcela:</strong>
          </div>
          <ul className="list-group">
            {
              _.map(this.state.callesParcela, function (calle) {
                return(
                  <li key={calle.value} className='list-group-item' >
                    <div className='list-item'>{calle.label}</div>
                    <div 
                      className="list-item delete-button"
                      onClick={()=> borrarCalle(calle.value)}
                    >
                      &#x2715;
                    </div>
                  </li>
                )
              })
            }
          </ul> 
          <div className='row'>
            <div className='col-lg-10 col-lg-offset-1'>
              <Select
                options={this.state.calles}
                value={calleSeleccionada}
                onChange={this.handleChange}
                placeholder='Agregar una calle'
              />
            </div>
            <div 
              className="col-lg-1"
              onClick={()=> agregarCalle()}
            >
              <a className='fa fa-check fa-2x' />
            </div>
          </div>
        </div>
			)
	}
}

/*Calles = reduxForm(
  {
    enableReinitialize: true,
    form: 'FichaForm'
  })(Calles);
*/
function mapStateToProps(state) {

  return {}

};

export default connect(mapStateToProps, null)(Calles);