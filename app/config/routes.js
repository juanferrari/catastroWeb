import React, {Component} from 'react'
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import MainMap from 'views/map/MainMap';
import Busqueda from 'views/busqueda/Busqueda';
import Ficha from 'views/ficha/Ficha';

const AppRoute =() => (

        <div>
          <Switch>
          	<Route path="/ficha/:id" component={Ficha}/>
          	<Route path="/busqueda" component={Busqueda}/>
            <Route path="/map" component={MainMap}/>
          </Switch>
          </div>

)

export default AppRoute
