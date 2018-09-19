import React, {Component} from 'react'
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import MainMap from 'views/map/MainMap';
import Busqueda from 'views/busqueda/Busqueda';
import Ficha from 'views/ficha/Ficha';
import Home from 'views/home/Home'
import Tramites from 'views/tramites/Tramites';
import AsignacionCalle from 'views/tramites/AsignacionCalle';
import TramitesGenerales from 'views/tramitesGenerales/TramitesGenerales';
import ModificacionCalles from 'views/tramitesGenerales/ModificacionCalles';
import AgregarCalle from 'views/tramitesGenerales/AgregarCalle';
import ModificarCalle from 'views/tramitesGenerales/ModificarCalle';
import EliminarCalle from 'views/tramitesGenerales/EliminarCalle';

const AppRoute =() => (

        <div>
          <Switch>
            <Route path="/eliminarCalle" component={EliminarCalle}/>
            <Route path="/modificarCalle" component={ModificarCalle}/>
            <Route path="/agregarCalle" component={AgregarCalle}/>
            <Route path="/modificacionCalles" component={ModificacionCalles}/>
            <Route path="/tramitesGenerales" component={TramitesGenerales}/>
          	<Route path="/asignacionCalle/:id" component={AsignacionCalle}/>
          	<Route path="/tramites/:id" component={Tramites}/>
          	<Route path="/ficha/:id" component={Ficha}/>
          	<Route path="/busqueda" component={Busqueda}/>
            <Route path="/map" component={MainMap}/>
            <Route path="/" component={Home}/>
          </Switch>
          </div>

)

export default AppRoute
