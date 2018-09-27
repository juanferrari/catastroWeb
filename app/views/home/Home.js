import React, { Component } from 'react';
import logoImg from '../../../public/img/logo-landing.png'
import './styles/styles.css';

class Home extends Component{
	render(){
		return(
      <div className='text-center'>
        <div className="jumbotron jumbotron-fluid" style={{maxHeight:'75vh',"backgroundImage": "url('https://www.argentina.gob.ar/sites/default/files/styles/jumbotron/public/header_ministerio_.jpg')"}}>
          <div className="container ">
            <br/>
            <div className='text-center'>
              <img style={{maxHeight:'25vh','margin':'auto','left':'0','right':'0'}}src={logoImg} alt="" className="img-responsive logo-home" />
            </div>
            <br/>
            <h2 className="display-4">SISTEMA DE CATASTRO</h2>
            <p className="lead">{/*Texto explicativo*/}</p>
          </div>
        </div>
        <div className="row">
          <div className='col-md-8 col-md-offset-2'>
            <div className="col-xs-4 col-md-4 col-centered">
              <a onClick={()=>this.props.history.push(`/busqueda`)}>
                <p className="text-center btn-buscarProyectos">
                  Consulta de fichas catastrales
                </p>
              </a>
            </div>
            <div className="col-xs-4 col-md-4 col-centered">
              <a onClick={()=>this.props.history.push(`/map`)}>
                <p className="text-center btn-buscarProyectos">
                  Información territorial
                </p>
              </a>
            </div>
            <div className="col-xs-4 col-md-4 col-centered">
              <a onClick={()=>this.props.history.push(`/tramites`)}>
                <p className="text-center btn-buscarProyectos">
                  Acceso a trámites
                </p>
              </a>
            </div>
          </div> 
        </div>
      </div>
			)
	}
}

export default Home;