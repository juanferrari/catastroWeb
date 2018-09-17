import React, {Component} from 'react'
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import MainMap from 'views/map/MainMap';
import Busqueda from 'views/busqueda/Busqueda';
import Ficha from 'views/ficha/Ficha';
import Home from 'views/home/Home'
import Tramites from 'views/tramites/Tramites';
import AsignacionCalle from 'views/tramites/AsignacionCalle';

const AppRoute =() => (

        <div>
          <Switch>
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
