import React from 'react'

const renderField = ({ input, label, type, meta: { touched, error } }) =>
  <div>
    <div className={`form-group ${touched && error ? 'has-error' : ''}`}>
      <label>{label}</label>
      <input 
        placeholder={label} 
        type={type}
        className="form-control input-sm ng-pristine ng-valid ng-empty ng-touched"
        {...input}
         />
      <div className="text-help">
        {touched ? error : ''}
      </div>
    </div>
  </div>

export default renderField
