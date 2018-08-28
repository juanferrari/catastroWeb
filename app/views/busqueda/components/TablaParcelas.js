import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import ReactTable from 'react-table';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';
import { getParcelas, getParcela } from 'actions/actions_parcelas'
import { BrowserRouter, Route, Switch, Redirect, Link,Router, hashHistory ,withRouter } from 'react-router-dom';
import 'react-table/react-table.css'

class TablaParcelas extends Component{

	constructor(props){
    super(props);
    this.state = {
      data:[]
    }
    this.abrirFicha = this.abrirFicha.bind(this);
  }

	componentWillMount(){
		var data = {};
		data.partida_catastro_arba = '26/6787';
		data.nomenclatura = 'Circunscripción: 1 Sección: A Manzana: 63 Parcela: 17A';
		data.direccion = 'Domingo Faustino Sarmiento 2, Chacabuco';
		data.partida_municipal = '15.698';
		data.contribuyente = 'Acevedo, Matías Exequiel';
		data.ambito = 'Urbano';
		data.plano = '22/08/2015';
		var dataArray = [];
		dataArray.push(data);
		this.setState({data:dataArray})
	}

  abrirFicha(parcela_id){
    console.log('this.props',this.props)
    this.props.history.push(`/ficha/${parcela_id}`);
  }

	render(){

    const { parcelas, parcelasFetching,filter }  = this.props;
    var abrirFicha = this.abrirFicha;

    var data = [];
    var pages = -1;

    if(parcelas && parcelas.rows)
      data = parcelas.rows;

    if(parcelas && parcelas.pages)
      pages = parcelas.pages;

		const columns = [
          {
              Header: '',
              maxWidth: 50,
              filterable:false,
              accessor: 'id',
              Cell: ({value}) => {
                                  return <Button
                                          className={'btn btn-default fa fa-search'}
                                          bsStyle="default"
                                          bsSize="small"
                                          onClick={()=>{abrirFicha(value)}}
                                         >
                                         </Button>
                                  },
             // filterMethod: (filter, row) => (console.log("valor row: "+row),row[filter.id].includes(filter.value))
          	},
            {
                Header: 'Partida Catastro ARBA',
                maxWidth: 160,
                Cell: (row) => ( <span >{row.original.catastro && row.original.catastro.id}</span>),
            },
            {
                Header: 'Nomenclatura',
                Cell: (row) => (<span >{row.original.catastro && 
                                        'Circunscripción: ' + row.original.catastro.nomenclaturaCatastroCircunscripcion +
                                        ' Sección: ' + row.original.catastro.nomenclaturaCatastroSeccion +
                                        ' Manzana: ' +  row.original.catastro.nomenclaturaCatastroManzana +
                                        ' Parcela: ' +  row.original.catastro.nomenclaturaCatastroParcela
                                        }
                                </span>),
            },
            {
                Header: 'Dirección',
                accessor: 'direccion',
            },
            {
               Header : 'Partida Municipal',
                accessor: 'partida_municipal',
                maxWidth: 130,
            },
            {
               Header : 'Contribuyente',
                accessor: 'contribuyente',
                //Cell: (row) => ( <span className={`label ${row.original.userStatusLabelColor} center-block`} style={{'fontSize': '13','float': 'none', 'margin': '3px'}}>{row.value}</span>),
            },
            {
               Header : 'Ámbito',
                accessor: 'ambito',
                maxWidth: 70,
            },
            {
               Header : 'Plano',
                accessor: 'plano',
                maxWidth: 120,
            }

        ]

		return (
      <div className="col-md-12 ">
          <div className="ibox float-e-margins">
              <div className="ibox-content">
                	<div className="row">
                  	<div className='col-lg-2 col-md-2'>
                    	<h3 style={{'color':'#149bd3','fontWeight':'bold'}}>Resultados de búsqueda</h3>
                    	<hr style={{'width':'100%','color':'#149bd3','borderColor':'#149bd3','borderWidth':'medium','margin':'10px 0','height':'2px'}} />
                  	</div>
                  	<div className="col-md-12">
            				<ReactTable className="-striped -highlight"
                          manual
                          columns={columns}
                          defaultPageSize={10}
                          data={data}
                          pages={pages}
                          loading={parcelasFetching}
                          onFetchData={data=>{this.props.getParcelas(data,filter)}}
                          previousText={'Anterior'}
                          nextText={'Siguiente'}
                          loadingText={'Cargando...'}
                          noDataText={'No existen registros'}
                          pageText={'Siguiente'}
                          ofText={'de'}
                          rowsText={'lineas'}
                        />
          		</div>
        		</div>
      	</div>
    	</div>
  </div>
			)
	}
}

TablaParcelas = reduxForm(
  {
    enableReinitialize: true,
    form: 'BusquedaForm'
  })(TablaParcelas);


function mapStateToProps(state) {
  return {
    parcelas: state.parcelas.parcelas,
    parcelasFetching: state.parcelas.parcelasFetching,
    filter: state.parcelas.filter
  }

};

export default withRouter(connect(mapStateToProps, { getParcelas,getParcela })(TablaParcelas));