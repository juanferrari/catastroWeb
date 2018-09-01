import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { closeModal } from 'actions/actions_map';
import ReactLoading from 'react-loading'
import { BrowserRouter, Route, Switch, Redirect, Link,Router, hashHistory ,withRouter } from 'react-router-dom';

class ModalParcelas extends Component {

	render(){

		const { parcelaInfo } = this.props;
		const { showModal } = this.props;

		if(!parcelaInfo){
	      return(
	      	null
	      )
	    }

		return(
			<Modal show={showModal} onHide={()=>this.props.closeModal()}>
	            <Modal.Header closeButton>
	              <Modal.Title>Información de la parcela</Modal.Title>
	            </Modal.Header>

	            <Modal.Body>
	              <label>Layer: </label>
		          {parcelaInfo.properties.layer}
		          <br/>
		          <label>Id de la parcela: </label>
		          {parcelaInfo.properties.id}
		          <br/>
		          <label>Etiqueta: </label>
		          {parcelaInfo.properties.etiqueta}
		          <br/>
		          <label>Nomenclatura: </label>
		          {parcelaInfo.properties.nomencla}
		          <br/>
	            </Modal.Body>
	            <Modal.Footer>
	              <button className='btn btn-primary btn-sm 'onClick={()=>this.props.history.push('/ficha/'+parcelaInfo.properties.id)}>Ver parcela</button>
	              <button className='btn btn-primary btn-sm 'onClick={()=>this.props.closeModal()}>Cancelar</button>
	            </Modal.Footer>
            </Modal>
		);
	}
}

function mapStateToProps(state) {
  console.log("state",state)
  return {
    parcelaInfo: state.map.parcelaInfo,
    showModal: state.map.showModal
  }
};

export default withRouter(connect(mapStateToProps, { closeModal })(ModalParcelas));
