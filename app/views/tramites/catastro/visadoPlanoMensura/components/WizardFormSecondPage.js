import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import renderField from './renderField';
import renderCheckbox from 'components/common/renderCheckBox';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect, Link,Router, hashHistory ,withRouter } from 'react-router-dom';

class WizardFormSecondPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render(){

    const { handleSubmit, pristine, previousPage, submitting, notReady } = this.props;

    var buttonConfirm;

    if(this.props.notReady){
      buttonConfirm = <button className="submit btn btn-primary" type="submit" >
                        Guardar y continuar después
                      </button>
    }else{
      buttonConfirm = <button className="submit btn btn-primary" type="submit" disabled={this.state.notReady}>
                        Visar
                      </button>
    }

    return(
        <form onSubmit={handleSubmit}>
          <div className="panel panel-info" style={{'borderColor': '#bce8f1'}}>
            <div className='panel-heading' style={{'color': '#31708f','backgroundColor':'#d9edf7','borderColor': '#bce8f1'}}>
              Verificaciones
            </div>
            <div className="panel-body">
              <div className='row'>
                <div className="col-lg-7 col-lg-offset-3">
                  <Field
                    label="Conforme estado de cuentas tasas municipales"
                    name="conformeEstadoCuentasTasasMun"
                    component={renderCheckbox}
                  />
                </div>
              </div>
              <div className='row'>
                <div className="col-lg-7 col-lg-offset-3">
                  <Field
                    label="Conforme código"
                    name="conformeCodigo"
                    component={renderCheckbox}
                  />
                </div>
              </div>
              <div className='row'>
                <div className="col-lg-7 col-lg-offset-3">
                  <Field
                    label="Corroboración en plancheta (medidas, linderos, superficies y nomenclatura catastral y urbana)"
                    name="corroboracionPlancheta"
                    component={renderCheckbox}
                  />
                </div>
              </div>
              <div className='row'>
                <div className="col-lg-7 col-lg-offset-3">
                  <Field
                    label="Corroboración restricciones"
                    name="corroboracionRestricciones"
                    component={renderCheckbox}
                  />
                </div>
              </div>
              <div className='row'>
                <div className="col-lg-7 col-lg-offset-3">
                  <Field
                    label="Corroboración designación según título"
                    name="corroboracionDesignacionTitulo"
                    component={renderCheckbox}
                  />
                </div>
              </div>
              <div className='row'>
                <div className="col-lg-7 col-lg-offset-3">
                  <Field
                    label="Corroboración de dominio"
                    name="corroboracionDominio"
                    component={renderCheckbox}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <button type="button" className="previous btn btn-primary" onClick={previousPage}>
              Anterior
            </button>
            {buttonConfirm}
          </div>
        </form>
      );
  }
}

function mapStateToProps(state) {

  var notReady = true;
  var w = state.form.wizard.values;

  if(w && w.conformeEstadoCuentasTasasMun && w.corroboracionDominio && w.corroboracionDesignacionTitulo && w.corroboracionRestricciones
     && w.corroboracionPlancheta && w.conformeCodigo){
    notReady = false;
  }

  return {
    notReady: notReady
  }

}

WizardFormSecondPage = reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormSecondPage)

export default withRouter(connect(mapStateToProps, { })(WizardFormSecondPage));