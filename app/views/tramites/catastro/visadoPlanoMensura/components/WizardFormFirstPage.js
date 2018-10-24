import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import validate from './validate'
import renderField from './renderField'
import FileUploader from 'components/common/FileUploader';
import { uploadPlano,deletePlano } from 'actions/actions_parcelas';

class WizardFormFirstPage extends Component{
  
  constructor(props){
    super(props);
    this.state = {
    }
    this.subirArchivo = this.subirArchivo.bind(this);
    this.borrarArchivo = this.borrarArchivo.bind(this);
  }

  subirArchivo(files,fields){
    var id = this.props.id;
    var file = {file_id:Math.random(),file_url:'www.google.com',file_name:files[0].name}
    fields.push(file);
    this.props.uploadPlano(files[0],id);
  }

  borrarArchivo(index,fields){
    var id = this.props.id;
    this.props.deletePlano(id,fields.get(index).file_id);
    fields.remove(index);
  }

  render(){
    const { handleSubmit,pristine } = this.props;
    var subirArchivo  = this.subirArchivo;
    var borrarArchivo = this.borrarArchivo;

    return(
      <form onSubmit={handleSubmit}>
        <div className="panel panel-info" style={{'borderColor': '#bce8f1'}}>
          <div className='panel-heading' style={{'color': '#31708f','backgroundColor':'#d9edf7','borderColor': '#bce8f1'}}>
            Plano de mensura
          </div>
          <div className="panel-body">
            <div className='row'>
              <FileUploader
                pristine={pristine} 
                onFileUpload={subirArchivo}
                collapsed={'false'} 
                deleteFile={borrarArchivo}
                error={null}
                notCollapsible={'true'}/>
            </div>
            <br/>
            <div className='row'>
              <div className="col-lg-4 col-lg-offset-2">
                <Field
                  label="Número de expediente"
                  name="numeroExpediente"
                  component={renderField}
                />
              </div>
              <div className="col-lg-4">
                <Field
                  label="Número de plano"
                  name="numeroPlanoMensura"
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

function mapStateToProps(state){
  //console.log('mapStateToProps',state)

  if(state.parcelas.expedienteMensura){
    var expMensura = state.parcelas.expedienteMensura;
    var files = [];
    if(expMensura.planos[0]){
      for(var plano of expMensura.planos){
        files.push({file_id:plano.id,file_url:'www.google.com',file_name:plano.fileName})
      }
    }
  }
  else{
    return {}
  }


  return {
    initialValues:{
      numeroPlanoMensura: expMensura.numeroPlanoMensura,
      numeroExpediente: expMensura.numeroExpediente,
      files:files,
      conformeEstadoCuentasTasasMun: expMensura.conformeEstadoCuentasTasasMun,
      conformeCodigo: expMensura.conformeCodigo,
      corroboracionPlancheta: expMensura.corroboracionPlancheta,
      corroboracionRestricciones: expMensura.corroboracionRestricciones,
      corroboracionDesignacionTitulo: expMensura.corroboracionDesignacionTitulo,
      corroboracionDominio: expMensura.corroboracionDominio
    }
  }

};

export default connect(mapStateToProps,{uploadPlano,deletePlano})(WizardFormFirstPage);
