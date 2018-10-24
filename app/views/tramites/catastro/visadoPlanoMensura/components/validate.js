const validate = values => {
  const errors = {}

  if(!values.nroExpediente){
    errors.nroExpediente = 'Ingrese el número de expediente'
  }

  if(!values.nroPlano){
    errors.nroPlano = 'Ingrese el número de plano'
  }

  if(!values.files || !values.files[0]){
    errors.files = { _error: 'Debe subirse al menos un archivo.' }
  }

  //console.log('errors',errors)

  return errors
}

export default validate