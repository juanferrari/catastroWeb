import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

    }

    activeRoute(routeName) {
      return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }


    render() {

        var dashboard = <li  className={this.activeRoute("/map")}>
                            <Link to="/map"><i className="fa fa-user"></i> <span className="nav-label">Map</span></Link>
                        </li>

        var busqueda = <li  className={this.activeRoute("/busqueda")}>
                            <Link to="/busqueda"><i className="fa fa-user"></i> <span className="nav-label">Busqueda</span></Link>
                        </li>


        return (

            <nav className="navbar-default navbar-static-side hidden-print" role="navigation">
                    <ul className="nav metismenu" id="side-menu" ref="menu">
                        <li className="nav-header">
                            <div className="dropdown profile-element"> <span>
                             </span>
                               <img src="LOGO" alt="App logo" width="160px" />
                               <hr/>
                                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                            <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">LogoImage</strong>
                             </span> <span className="text-muted text-xs block">login name<b className="caret"></b></span> </span> </a>
                                <ul className="dropdown-menu animated flipInX m-t-xs">
                                    <li><a  href='/#' onClick={()=> console.log('logout')} > Logout</a></li>
                                </ul>


                            </div>
                            <div className="logo-element">
                                
                            </div>
                        </li>
                        {dashboard}
                        {busqueda}
                    </ul>

            </nav>
        )
    }
}


function mapStateToProps(state) {

    return {
    }


};

export default connect(mapStateToProps,null)(Navigation);
