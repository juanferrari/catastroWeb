import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { smoothlyMenu } from 'components/common/layouts/Helpers';
import { connect } from 'react-redux';

class TopHeader extends React.Component {

    toggleNavigation(e) {
        e.preventDefault();
        $("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }

    logOut(e){
      //localStorage.removeItem('session');
      //localStorage.removeItem('user_id');
      //localStorage.removeItem('permissions');
    }

    render() {
        return (
            <div className="row border-bottom hidden-print">
                <nav className="navbar navbar-static-top" role="navigation" style={{marginBottom: 0}}>
                    <div className="navbar-header">
                        <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " href="http://186.33.216.232"><i className="fa fa-bars"></i> </a>
                    </div>
                    <div className="hidden-lg hidden-md hidden-sm text-center"  >
                            <div>
                                <img style={{maxWidth:'50%',maxHeight:'80%',marginTop:"3vh",float:'left'}} src=""/>
                            </div>
                            <div >
                                <ul className="nav navbar-top-links navbar-right">

                                    <li>
                                        <a href="/#" onClick={this.logOut}>
                                            <i className="fa fa-sign-out" ></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                    </div>
                    <div className="hidden-xs">

                        <ul className="nav navbar-top-links navbar-right">
                             
                            <li><div>{/*Agregar algo aca*/}</div></li>
                            <li>
                                <a target="_blank" href="">
                                    <i className="fa fa-question-circle" ></i> 
                                    <strong>Ayuda</strong>
                                </a>
                            </li>
                            <li>
                                <a href="/#" onClick={this.logOut}>
                                    <i className="fa fa-sign-out" ></i> 
                                    <strong>Cerrar sesión</strong>
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                </nav>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
};

export default connect(mapStateToProps, null)(TopHeader);
