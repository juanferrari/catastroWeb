import React, { Component } from 'react';
import Subdividir from './Subdividir';
import DatosParcela from './DatosParcela';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect, Link,Router, hashHistory ,withRouter } from 'react-router-dom';


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

  onSubmit(values){
    console.log('confimar valores',values)
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
        {page === 3 && <DatosParcela
            parcela={2}
            previousPage={this.previousPage}
            onSubmit={onSubmit}
        />}
      </div>
    )
  }
}

export default withRouter(connect(null, {  })(SubdivisionMain));