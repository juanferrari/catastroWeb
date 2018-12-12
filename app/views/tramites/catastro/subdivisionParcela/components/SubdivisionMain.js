import React, { Component } from 'react';
import Subdividir from './Subdividir';
import DatosParcela from './DatosParcela';
import DatosParcela2 from './DatosParcela2';
import DatosParcela3 from './DatosParcela3';
import DatosParcela4 from './DatosParcela4';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect, Link,Router, hashHistory ,withRouter } from 'react-router-dom';
import { subdividirParcela } from 'actions/actions_parcelas';

class SubdivisionMain extends Component {
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

  onSubmit(){
    //console.log('confimar valores',values)
    const {parcelasSubdivididas} = this.props;
    const {id} = this.props;

    console.log('confimar valores',parcelasSubdivididas);

    var values = [];

    var parcela1 = {};
    var parcela2 = {};

    parcela1.parcelaGeom = {geom:parcelasSubdivididas[0]};
    parcela1.pseudoparcela = true;
    parcela2.parcelaGeom = {geom:parcelasSubdivididas[1]};
    parcela2.pseudoparcela = true;

    values.push(parcela1);
    values.push(parcela2);

    var values2 = [];

    values2[0] = JSON.stringify(parcela1);
    values2[1] = JSON.stringify(parcela2);
    console.log('confirmar valores', values2.toString());

    this.props.subdividirParcela(id,values)
  }

  render() {
    var onSubmit = this.onSubmit;
    const { page,fileList } = this.state
    return (
      <div>
        {page === 1 && <Subdividir id={this.props.id} nextPage={this.nextPage}/>}
        {page === 2 && <DatosParcela
            parcela={1}
            id={this.props.id}
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
        />}
        {page === 3 && <DatosParcela2
            parcela={1}
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
        />}
        {page === 4 && <DatosParcela3
            parcela={1}
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
        />}
        {page === 5 && <DatosParcela
            parcela={2}
            previousPage={this.previousPage}
            onSubmit={onSubmit}
        />}
      </div>
    )
  }
}

function mapStateToProps(state){
  console.log('mapStateToProps',state)

  return {
    parcelasSubdivididas: state.parcelas.parcelasSubdivididas
  }

};

export default connect(mapStateToProps, { subdividirParcela })(SubdivisionMain);