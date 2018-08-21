import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading'
import ReactTable from 'react-table';
import {Button,Modal} from 'react-bootstrap';
import 'react-table/react-table.css';
import { Field,reduxForm } from 'redux-form';

class Busqueda extends Component{

	constructor(props){
	    super(props);
	    this.state = {
	      data:[]
	    }

	    this.renderField = this.renderField.bind(this);
	    this.renderCheckbox = this.renderCheckbox.bind(this);
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

	renderField(field) {
	    const { meta: { touched, error } } = field;

	    const className = `form-group ${touched && error ? 'has-error' : ''}`;

	    return (
	      <div className={className}>
	        <label>{field.label}</label>
	        <input
	          className="form-control"
	          type="text"
	          {...field.input}
	        />
	        <div className="text-help">
	          {touched ? error : ''}
	        </div>
	      </div>
	    );
	} 

	renderCheckbox(field) {
	    const { meta: { touched, error } } = field;

	    const className = `form-check ${touched && error ? 'has-error' : ''}`;

	    return (
	      <div className={className}>
	        <label>{field.label} </label>

	        <input 
	          type="checkbox" 
	          className="web-two-style"
	          style={{"margin-left":"5px","width":"20px","height":"18px"}}
	          value=""
	          {...field.input}
	        />
	        <div className="text-help">
	          {touched ? error : ''}
	        </div>
	      </div>
    );
  }

	onSubmit(){
		console.log('submit busqueda');
	}

	render(){

		const { handleSubmit } = this.props;

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
			<div className="row">
				<div className="col-md-12 ">
                    <div className="ibox float-e-margins">
                        <div className="ibox-content">
                          	<div className="row">
                            	<div className='col-lg-2 col-md-2'>
	                            	<h3 style={{'color':'#149bd3','fontWeight':'bold'}}>Filtros de búsqueda</h3>
	                            	<hr style={{'width':'100%','color':'#149bd3','borderColor':'#149bd3','borderWidth':'medium','margin':'10px 0','height':'2px'}} />
                            	</div>
                            	<div className="col-md-12">
                    				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					                    <div className="col-lg-2">
				                            <Field
				                              label="Partida ARBA"
				                              name="partida_arba"
				                              component={this.renderField}
				                            />
				                            <Field
				                              label="Circunscripción"
				                              name="circunscripcion"
				                              component={this.renderField}
				                            />
				                            <Field
				                              label="Parcela"
				                              name="parcela"
				                              component={this.renderField}
				                            />
				                        </div>
				                        <div className="col-lg-2">
				                        	<Field
				                              label="Partida Municipal"
				                              name="partida_municipal"
				                              component={this.renderField}
				                            />
				                            <Field
				                              label="Sección"
				                              name="seccion"
				                              component={this.renderField}
				                            />
				                            <Field
				                              label="Incluir Archivados"
				                              name="incluir_archivados"
				                              component={this.renderCheckbox}
				                            />
				                        </div>
				                        <div className="col-lg-2">
				                        	<Field
				                              label="DNI-CUIT-CUIL Contribuyente"
				                              name="dni_cuit_cuil"
				                              component={this.renderField}
				                            />
				                            <Field
				                              label="Chacra"
				                              name="chacra"
				                              component={this.renderField}
				                            />
				                        </div>
				                        <div className="col-lg-2">
				                        	<Field
				                              label="Nombre Propietario"
				                              name="nombre_propietario"
				                              component={this.renderField}
				                            />
				                            <Field
				                              label="Quinta"
				                              name="quinta"
				                              component={this.renderField}
				                            />
				                        </div>
				                        <div className="col-lg-2">
				                        	<Field
				                              label="Calle"
				                              name="calle"
				                              component={this.renderField}
				                            />
				                            <Field
				                              label="Fracción"
				                              name="fraccion"
				                              component={this.renderField}
				                            />
				                        </div>
				                        <div className="col-lg-2">
				                        	<Field
				                              label="Altura"
				                              name="altura"
				                              component={this.renderField}
				                            />
				                            <Field
				                              label="Manzana"
				                              name="manzana"
				                              component={this.renderField}
				                            />
				                        </div>
					                </form>
		                		</div>
		              		</div>
		            	</div>
		          	</div>
		        </div>
                <div className="col-md-12 ">
                    <div className="ibox float-e-margins">
                        <div className="ibox-content">
                          	<div className="row">
                            	<div className="col-md-12 ">
                              		<div role="toolbar" className="btn-group">
                              		</div>
                            	</div>
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
			</div>
			)
	}
}

Busqueda = reduxForm(
  {
    enableReinitialize: true,
    form: 'BusquedaForm'
  })(Busqueda);


export default connect(null, null)(Busqueda);