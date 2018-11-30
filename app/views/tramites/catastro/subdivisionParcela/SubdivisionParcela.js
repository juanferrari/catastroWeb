import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading'
import ReactTable from 'react-table';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';
import lodash from 'lodash';
import CommonHeader from 'components/common/CommonHeader';
import SubdivisionMain from './components/SubdivisionMain';


class SubdivisionParcela extends Component{

  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentWillMount(){
    const {id} = this.props.match.params;
  }

  render(){

    const {id} = this.props.match.params;

    var breadcrumb = [
                      {url:`/tramites/`,tag:'Trámites',active:false},
                      {url:`/busqueda/subdivisionParcela/`,tag:'Búsqueda',active:false},
                      {url:`/subdivisionParcela/${id}`,tag:'Subdivisión de parcela',active:true}
                     ]

    if(false){
      return(
        <div className="centeredSpinner" >
          <ReactLoading type="spinningBubbles" style={{'color':"#444",'height':150,'width':150}} />
        </div>
      )
    }

    return (
        <div style={{fontSize:'90%'}}>
          <CommonHeader titulo="Subdivisión de parcela" breadcrumb={breadcrumb}/>
          <div className="row wrapper border-bottom white-bg page-heading text-center">
            <div className="row" style={{margin:'5vh',fontSize:'90%'}}>
              <br />
              <div className='col-lg-12' style={{marginTop:'2%'}}>
                <SubdivisionMain id={id}/>
              </div>
            </div>
          </div>
        </div>
        )
  }
}

function mapStateToProps(state){
  //console.log('mapStateToProps',state)

  return {
    expedienteMensura: state.parcelas.expedienteMensura
  }

};

export default connect(mapStateToProps, { })(SubdivisionParcela);