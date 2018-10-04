const validate = values => {
  const errors = {}

  if(!values.nroExpediente){
    errors.nroExpediente = 'Ingrese el número de expediente'
  }

  if(!values.nroPlano){
    errors.nroPlano = 'Ingrese el número de plano'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.favoriteColor) {
    errors.favoriteColor = 'Required'
  }
  return errors
}

export default validate