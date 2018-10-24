import React, { Component } from 'react';
import WizardFormFirstPage from './WizardFormFirstPage';
import WizardFormSecondPage from './WizardFormSecondPage';
import WizardFormThirdPage from './WizardFormThirdPage';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect, Link,Router, hashHistory ,withRouter } from 'react-router-dom';
import { editExpMensura } from 'actions/actions_parcelas';

class WizardForm extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      page: 1,
      rerender:false
    }
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  onSubmit(values){
    console.log('values onSubmit',values)
    const { id } = this.props;

    var submitJson = {
      "anoExpediente": values.anoExpediente,
      "conformeCodigo": values.conformeCodigo,
      "conformeEstadoCuentasTasasMun": values.conformeEstadoCuentasTasasMun,
      "corroboracionDesignacionTitulo": values.corroboracionDesignacionTitulo,
      "corroboracionDominio": values.corroboracionDominio,
      "corroboracionPlancheta": values.corroboracionPlancheta,
      "corroboracionRestricciones": values.corroboracionRestricciones,
      "fechaAprobacionMunicipal": + new Date(),
      "fechaAprobacionProvincial": + new Date(),
      "fechaVisado": + new Date(),
      "numeroExpediente": values.numeroExpediente,
      "numeroPlanoMensura": values.numeroPlanoMensura
    }

    this.props.editExpMensura(id,submitJson,this.props.history.push(`/tramites/${id}`));
  }

  render() {
    var onSubmit = this.onSubmit;
    const { page,fileList } = this.state
    return (
      <div>
        {page === 1 && <WizardFormFirstPage 
                          onSubmit={this.nextPage} 
                          subirArchivo={this.subirArchivo}
                          rerender={this.rerender}
                          fileList={fileList} 
                          id={this.props.id}
                          />}
        {page === 2 &&
          <WizardFormSecondPage
            previousPage={this.previousPage}
            onSubmit={onSubmit}
          />}
      </div>
    )
  }
}

export default withRouter(connect(null, { editExpMensura })(WizardForm));