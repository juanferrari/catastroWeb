import React, { Component } from 'react';

class ShowMessage extends Component{
	render(){
		return(
      <div className="row">
          <div className='col-lg-10 col-lg-offset-1' >
           {(this.props.action!=null)?
            (<div className="col-md-12">
                <div className={this.props.action.action_className}>
                  <strong>{this.props.action.message}</strong>
                </div>
            </div>
            ):
            (<div className='hidden'></div>)
            }
          </div>
      </div>
			);
	}
}

export default ShowMessage;