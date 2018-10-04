import React from 'react';

const renderCheckBox = ({ input, label, type, meta: { touched, error } }) =>
  <div>
    <div className={`form-group ${touched && error ? 'has-error' : ''}`}>
      <div className='row'>
        <div className='col col-lg-1'>
  	      <input 
  	        placeholder={label} 
  	        type='checkbox'
            defaultChecked={input.value}
  	        {...input}
  	         />
        </div>
        <div className='col col-lg-8'>
          <strong>{label}</strong>
        </div>
	      <div className="text-help">
	        {touched ? error : ''}
	      </div>
	   </div>
    </div>
  </div>

export default renderCheckBox;
