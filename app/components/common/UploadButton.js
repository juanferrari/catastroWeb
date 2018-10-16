import React,{Component} from 'react';
import PropTypes from 'prop-types';

var upBtnWrapper = {
	  position: 'relative',
	  overflow: 'hidden',
	  display: 'inline-block',
	  cursor: 'pointer'
	}

var inputStyle = {
	  fontSize: '100px',
	  position: 'absolute',
	  left: '0',
	  top: '0',
	  opacity: '0',
	}


const UploadButton = ({ name = 'file', disabled, accept, onChange, style, className, label,icon,spinner,uploadedIcon }) => (
  <div className="upload-btn-wrapper" style={upBtnWrapper}>
    <button className={className} disabled={disabled} style={style}>{spinner}{icon}{uploadedIcon}{label}</button>
	<input type="file" name="myfile" onChange={onChange} style={inputStyle} />
  </div>
);

UploadButton.propTypes = {
	accept: PropTypes.string,
	className: PropTypes.string,
  	name: PropTypes.string,
  	onChange: PropTypes.func.isRequired,
  	style: PropTypes.object,
};


export default UploadButton;

