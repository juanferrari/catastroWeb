import React, { Component } from 'react';

class Home extends Component{

	render(){
		return(
      <div className='text-center'>
        <div className="jumbotron jumbotron-fluid" style={{maxHeight:'75vh',"backgroundImage": "url('https://ppo.mininterior.gob.ar/images/GP/home.jpg')"}}>
          <div className="container ">
            <br/>
            <div className='text-center'>
              <img style={{maxHeight:'25vh','margin':'auto','left':'0','right':'0'}}src="https://ppo.mininterior.gob.ar/images/popover/iProyectos.png" alt="" className="img-responsive logo-home" />
            </div>
            <br/>
            <h2 className="display-4">BANCO DE PROYECTOS</h2>
            <p className="lead">El Banco de Proyectos tiene como objetivo lograr una gestión eficiente, fluida y ordenada de los proyectos desde su carga en el sistema hasta el inicio de su ejecución.</p>
          </div>
        </div>
        <div className='btn-group' style={{'padding-top': '5vh'}}>
          <button 
            style={{'margin-right': '2vh'}} 
            className="btn btn-lg btn-primary"
            onClick={()=>this.props.history.push(`/busqueda`)}
          >
            Buscar
          </button>
          <button 
            className="btn btn-lg btn-primary"
            onClick={()=>this.props.history.push(`/map`)}
          >
            Mapa
          </button>
        </div>
      </div>
			)
	}
}

export default Home;