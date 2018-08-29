import React, { Component } from 'react';

class CommonHeader extends Component{
	render(){
		return(
			<div className="row wrapper border-bottom white-bg page-heading">
        <div className="col-lg-10">
          <h2>Aca poner titulo</h2>
          <ol className="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            <li className="active">
              <a href="ficha/">Ver ficha</a>
            </li>
          </ol>
        </div>
	    </div>
			);
	}
}

export default CommonHeader;