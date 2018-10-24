import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import {Button,Modal} from 'react-bootstrap';
import { Field,reduxForm,FieldArray } from 'redux-form';
import UploadButton from 'components/common/UploadButton';

class FileUploader extends Component{

  constructor(props){
      super(props);
      this.state = {
        collapsed:false,
      }

      this.renderField = this.renderField.bind(this);
      this.collapse = this.collapse.bind(this);
    }

  componentWillMount(){
    var buttonClass;
    if(this.props.collapsed == 'true'){
      this.setState({collapsed:false});
      buttonClass = 'fa fa-angle-down';
    }else{
      this.setState({collapsed:true});
      buttonClass = 'fa fa-angle-up';
    }
    this.setState({collapseButton: <button 
                          type="button" 
                          className="btn-sm btn-default" 
                          data-toggle="collapse" 
                          data-target="#demo"
                          onClick={()=>this.collapse()}
                        >
                          <i className={buttonClass}></i>
                        </button>})

    if(this.props.notCollapsible == 'true'){
     this.setState({collapseButton:null});
    }
  }

  collapse(){

    this.setState({collapsed:!this.state.collapsed});

    var buttonClass;
    if(this.state.collapsed){
      buttonClass = 'fa fa-angle-down';
    }else{
      buttonClass = 'fa fa-angle-up';
    }
    this.setState({collapseButton: <button 
                          type="button" 
                          className="btn-sm btn-default" 
                          data-toggle="collapse" 
                          data-target="#demo"
                          onClick={()=>this.collapse()}
                        >
                          <i className={buttonClass}></i>
                        </button>})
  }

  renderField(field) {
      const { meta: { touched, error } } = field;
      return (
          <div className="list-item"><a target="_blank"  href={field.input.value.file_url}>{field.input.value.file_name}</a></div>
      );
  } 

  render(){

    var buttonClassName;
    var deleteFile = this.props.deleteFile;
    var title = 'Archivos:';
    var renderField = this.renderField;
    var subirArchivo = this.props.onFileUpload;

    const renderFiles = ({ fields, meta: { error } }) =>
    <div className={`form-group ${ !this.props.pristine && error ? 'has-error' : ''}`}>
      <UploadButton
            className="btn btn-info"
            onChange={(e) => subirArchivo(e.target.files,fields)}
            style={{ visible: true }}
            disabled={false}
            label={" Adjuntar plano"}
            spinner={<i className="fa fa-spinner fa-spin" style={{ display: (false) ? 'inherit' : 'none' }}></i>}
            icon={<span className="glyphicon glyphicon-upload"></span>}
          />
      <ul className="list-group">
        {fields.map((field, index) =>
          <li key={index} className='list-group-item'>
            <Field
              name={field}
              type="text"
              component={renderField}
              label={`Archivo #${index + 1}`}
            />
            <div 
              className="list-item delete-button"
              onClick={()=> deleteFile(index,fields)}
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

    /*if (!this.props.files) {
      return (
        <div className="row">
          <div className="centeredSpinner" >
            <ReactLoading type="spinningBubbles" style={{ 'color': "#444", 'height': 150, 'width': 150 }} />
          </div>
        </div>
      );

    }*/

    return (
              <div className="row text-center">
                <div className='row' style={{display:(title)?'inherit':'none'}}>
                  <div className='col-lg-5 col-md-5'/>
                  <div className='col-lg-2 col-md-2'>
                    <div className='col-lg-5 col-md-5'>
                      <h4>{title}</h4>
                    </div>
                    <div className='col-lg-5 col-md-5'>
                      {this.state.collapseButton}
                    </div>
                  </div>
                </div>
                
                <br style={{display:(title)?'inherit':'none'}} />
                <div id="demo" className={buttonClassName}> 
                  <div className='row'>
                    {this.props.uploadButton}
                  </div>
                  <FieldArray name='files' component={renderFiles} />
                </div>
                {this.props.error}
              </div>
      )
  }
}

function mapStateToProps(state) {

  return {}

};

export default connect(mapStateToProps, null)(FileUploader);