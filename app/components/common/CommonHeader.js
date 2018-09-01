import React, { Component } from 'react';

class CommonHeader extends Component{
	render(){
		return(
      <div className="col-lg-12">
  			<div className="row wrapper border-bottom white-bg page-heading text-center">
          <div className="col-lg-12">
            <h2><strong>{this.props.titulo}</strong></h2>
            <ol className="breadcrumb">
              <li>
                <a href="/">Home</a>
              </li>
              <li className="active">
                <a href="/busqueda/">Búsqueda</a>
              </li>
            </ol>
          </div>
  	    </div>
      </div>
			);
	}
}

export default CommonHeader;