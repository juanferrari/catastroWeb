import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect, Link,Router, hashHistory ,withRouter } from 'react-router-dom';
import ReactLoading from 'react-loading';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm,FieldArray } from 'redux-form';
import Select from 'react-select';

class NumeroCalleArray extends Component{

  constructor(props){
      super(props);
      this.state = {
        calles:[],
        selectedOption:null,
        numero:null
      }

      this.renderSelect = this.renderSelect.bind(this);
      this.renderField= this.renderField.bind(this);
      this.onChange = this.onChange.bind(this);
  }

  componentWillMount(){
    var callesRaw = this.props.calles;
    var calles = [];
    for(var calle of callesRaw){
      calles.push({value:calle.id,label:calle.nombre})
    }

    this.setState({calles});
  }

  onChange(event){

    console.log('onchange numero',event.target.value)
    this.setState({numero:event.target.value})

  }


  renderSelect(options,placeholder,fields){
    const { selectedOption } = this.state;

    console.log('renderSelectFields',fields)

    const handleChange = (selectedOption) => {
      console.log('numero',this.state.numero)
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption);

    }

    const handleClick = (fields) => {
      console.log('fields',fields)
      console.log(`Option selected:`, this.state.selectedOption);
      if(this.state.selectedOption && this.state.numero){
        var values = {};
        values.id = this.state.selectedOption.value;
        values.label = this.state.selectedOption.label + ' ' + this.state.numero;
        values.numero = this.state.numero;
        fields.push(values)
        this.setState({numero:null})
      }
    }

    

    return (
      <div className='row text-center'>
        <div className='row'>
          <div className='col-lg-8'>
            <Select
              value={selectedOption}
              onChange={handleChange}
              placeholder={placeholder}
              options={options}
            />
          </div>
          <div className='col-lg-2'>
            <input 
              type='text' 
              key={this.state.numero}
              onBlur={this.onChange.bind(this)} 
              defaultValue={this.state.numero}
              className="form-control input-sm "
              />
          </div>
        </div>
        <br/>
        <div className='row'>
          <button className='btn btn-info btn-sm' type='button' onClick={()=>handleClick(fields)}>Agregar</button>
        </div>
      </div>
    );
  } 

  renderField(field) {
      const { meta: { touched, error } } = field;
      console.log('renderField',field)
      return (
          <div className="list-item">{field.input.value.label}</div>
      );
  } 

  render(){
    var buttonClassName;
    const deleteCalle = (index,fields) => {
      fields.remove(index);
    }
    const renderFiles = ({ fields, meta: { error },props }) =>
    <div className={`form-group ${ !this.props.pristine && error ? 'has-error' : ''}`}>
      {this.renderSelect(this.state.calles,'Seleccione una calle',fields)}
      <ul className="list-group">
        {fields.map((field, index) =>
          <li key={index} className='list-group-item'>
            <Field
              name={field}
              type="text"
              component={this.renderField}
              label={`calle #${index + 1}`}
            />
            <div 
              className="list-item delete-button"
              onClick={()=> deleteCalle(index,fields)}
            >
              &#x2715;
            </div>
          </li>
        )}
        <div className="text-help">
          {!this.props.pristine ? error : ''}
        </div>
      </ul>
    </div>

    if(this.props.notCollapsible == 'true'){
     title = null;
    }

    if(this.props.collapsed == 'false'){
      buttonClassName = 'col-md-12 collapse in';
    }else{
      buttonClassName = 'col-md-12 collapse';
    }


    return (
      <FieldArray  className="form-control centeredLine" name={'numeroCalleArray'+this.props.id}  type="text"  component={renderFiles}/>
      )
  }
}


function mapStateToProps(state) {

  return {
  }

};

export default withRouter(connect(mapStateToProps, null)(NumeroCalleArray));