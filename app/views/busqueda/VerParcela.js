import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading'
import ReactTable from 'react-table';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';
import lodash from 'lodash';

class VerParcela extends Component{

	constructor(props){
    super(props);
    this.state = {
    }
  }

	onSubmit(values){

	}

	render(){

		const { handleSubmit } = this.props;

		return (
			<div className="row">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

        </form> 
			</div>
			)
	}
}

VerParcela = reduxForm(
  {
    enableReinitialize: true,
    form: 'VerParcelaForm'
  })(VerParcela);


function mapStateToProps(state) {

  return {}

};

export default connect(mapStateToProps, null)(VerParcela);