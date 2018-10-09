const validate = values => {
  const errors = {}

  if(!values.circunscripcion){
    errors.circunscripcion = 'Campo obligatorio'
  }

  return errors
}

export default validate