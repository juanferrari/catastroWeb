import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'

const WizardFormFirstPage = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
        <div className="panel panel-info" style={{'borderColor': '#bce8f1'}}>
          <div className='panel-heading' style={{'color': '#31708f','backgroundColor':'#d9edf7','borderColor': '#bce8f1'}}>
            Plano de mensura
          </div>
          <div className="panel-body">
            <div className='row'>
              <div className="col-lg-8 col-lg-offset-2">
                <a onClick={()=>console.log('adjuntar plano')}>
                  <p className="text-center btn-tramite">
                    Adjuntar plano digital
                  </p>
                </a>
              </div>
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
    </form>
  )
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFirstPage)