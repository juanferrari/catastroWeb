import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import FileUploader from 'components/common/FileUploader';


class WizardFormFirstPage extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      fileList:[],
    }
    this.subirArchivo = this.subirArchivo.bind(this);
  }

  subirArchivo(files,fields){
    var file = {file_id:Math.random(),file_url:'www.google.com',file_name:files[0].name}
    var files = this.state.fileList;
    files.push(file);
    fields.push(file);
    this.setState({fileList:files});
  }

  render(){
    const { handleSubmit } = this.props;
    var subirArchivo  = this.subirArchivo;

    return(
      <form onSubmit={handleSubmit}>
        <div className="panel panel-info" style={{'borderColor': '#bce8f1'}}>
          <div className='panel-heading' style={{'color': '#31708f','backgroundColor':'#d9edf7','borderColor': '#bce8f1'}}>
            Plano de mensura
          </div>
          <div className="panel-body">
            <div className='row'>
              <FileUploader 
                onFileUpload={subirArchivo}
                collapsed={'false'} 
                files={this.state.fileList}
                deleteFile={()=>console.log('deleteFile')}
                error={null}
                notCollapsible={'true'}/>
            </div>
            <br/>
            <div className='row'>
              <div className="col-lg-4 col-lg-offset-2">
                <Field
                  label="Número de expediente"
                  name="nroExpediente"
                  component={renderField}
                />
              </div>
              <div className="col-lg-4">
                <Field
                  label="Número de plano"
                  name="nroPlano"
                  component={renderField}
                />
              </div>
            </div>
          </div>
        </div>
      <div>
        <button type="submit" className="next btn btn-primary">
          Siguiente
        </button>
      </div>
    </form>);

  }
}

WizardFormFirstPage = reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFirstPage)

export default WizardFormFirstPage;
