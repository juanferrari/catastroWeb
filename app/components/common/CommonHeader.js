import React, { Component } from 'react';

class CommonHeader extends Component{
	render(){
    var key = 0;
		return(
      <div className="col-lg-12">
  			<div className="row wrapper border-bottom white-bg page-heading text-center">
          <div className="col-lg-12">
            <h2><strong>{this.props.titulo}</strong></h2>
            <ol className="breadcrumb">
              <li>
                <a href="/">Home</a>
              </li>
              {_.map(this.props.breadcrumb, function (bc) {
                key++;
                return(
                  <li key={key} className={(bc.active)?'active':''}>
                    <a href={bc.url}>{bc.tag}</a>
                  </li>
                )
              })}
              
            </ol>
          </div>
  	    </div>
      </div>
			);
	}
}

export default CommonHeader;