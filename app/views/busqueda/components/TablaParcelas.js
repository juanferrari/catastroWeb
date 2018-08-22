import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import ReactTable from 'react-table';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';

class TablaParcelas extends Component{

	constructor(props){
    super(props);
    this.state = {
      data:[]
    }
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

	render(){

		const columns = [
          {
              Header: '',
              maxWidth: 50,
              filterable:false,
              Cell: ({value}) => {
                                  return <Button
                                          className={'btn btn-default fa fa-search'}
                                          bsStyle="default"
                                          bsSize="small"
                                          onClick={()=>{console.log('abrir fila')}}
                                         >
                                         </Button>
                                  },
             // filterMethod: (filter, row) => (console.log("valor row: "+row),row[filter.id].includes(filter.value))
          	},
            {
                Header: 'Partida Catastro ARBA',
                accessor:'partida_catastro_arba',
                maxWidth: 160,
            },
            {
                Header: 'Nomenclatura',
                accessor: 'nomenclatura',
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
                      columns={columns}
                      defaultPageSize={10}
                      data={this.state.data}
                      //loading={arePersonsFetching}
                      //filterable
                      previousText={'Anterior'}
                      nextText={'Siguiente'}
                      loadingText={'Cargando...'}
                      noDataText={'No existen registros'}
                      pageText={'Siguiente'}
                      ofText={'de'}
                      rowsText={'lineas'}
                      //defaultFilterMethod={this.filterMethod}
                      /*getTdProps={(state, rowInfo, column, instance) => {
                          var ret = {

                              onClick:(e, handleOriginal) => {
                                  if (this.state.CurrentID ==rowInfo.original.person_id ){
                                      this.setState({CurrentID: null,CurrentName: null});

                                  }
                                  else{
                                      this.setState({CurrentID: rowInfo.original.person_id,CurrentName: rowInfo.row.name,disabled:'disabled'});

                                  }
                                  this.setState({message_class: "alert alert-danger hidden"})
                                  this.props.clearMessage();
                                  if (handleOriginal) {
                                    handleOriginal()
                                  }
                              }
                          }
                          if(rowInfo && (this.state.CurrentID == rowInfo.original.person_id)){
                              ret.style = { background: '#B0C4DE'}

                          }

                          return ret;
                      }}*/
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

  return {}

};

export default connect(mapStateToProps, null)(TablaParcelas);