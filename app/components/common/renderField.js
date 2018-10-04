import React from 'react';

const renderField = ({ input, label, type, meta: { touched, error } }) => {
    const className = `form-group ${touched && error ? 'has-error' : ''}`;

    <div>
      <div className={className}>
        <label>{label}</label>
        <input
        disabled
          className="form-control input-sm ng-pristine ng-valid ng-empty ng-touched"
          type="text"
          {...input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    </div>
} 

export default renderField;

