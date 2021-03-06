import React, {Component} from 'react'
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import MainMap from 'views/map/MainMap';
import Busqueda from 'views/busqueda/Busqueda';
import Ficha from 'views/ficha/Ficha';
import Home from 'views/home/Home'
import Tramites from 'views/tramites/Tramites';
import AsignacionCalle from 'views/tramites/catastro/asignacionCalle/AsignacionCalle';
import ModificacionCalles from 'views/tramites/otros/modificacionCalles/ModificacionCalles';
import AgregarCalle from 'views/tramites/otros/modificacionCalles/components/AgregarCalle';
import ModificarCalle from 'views/tramites/otros/modificacionCalles/components/ModificarCalle';
import EliminarCalle from 'views/tramites/otros/modificacionCalles/components/EliminarCalle';
import VisadoPlanoMensura from 'views/tramites/catastro/visadoPlanoMensura/VisadoPlanoMensura';
import RegistracionPlanoMensura from 'views/tramites/catastro/registracionPlanoMensura/RegistracionPlanoMensura';
import NomenclaturaTitulo from 'views/tramites/catastro/nomenclaturaTitulo/NomenclaturaTitulo';
import ObrasPublicas from 'views/tramites/valuacion/obrasPublicas/ObrasPublicas';
import UnificacionParcelas from 'views/tramites/catastro/unificacionParcelas/UnificacionParcelas';
import SubdivisionParcela from 'views/tramites/catastro/subdivisionParcela/SubdivisionParcela';

const AppRoute =() => (

        <div>
          <Switch>
            <Route path="/subdivisionParcela/:id" component={SubdivisionParcela}/>
            <Route path="/unificacionParcelas/:id" component={UnificacionParcelas}/>
            <Route path="/obrasPublicas/:id" component={ObrasPublicas}/>
            <Route path="/nomenclaturaTitulo/:id" component={NomenclaturaTitulo}/>
            <Route path="/registracionPlanoMensura/:id" component={RegistracionPlanoMensura}/>
            <Route path="/visadoPlanoMensura/:id" component={VisadoPlanoMensura}/>
            <Route path="/asignacionCalle/:id" component={AsignacionCalle}/>
            <Route path="/eliminarCalle" component={EliminarCalle}/>
            <Route path="/modificarCalle" component={ModificarCalle}/>
            <Route path="/agregarCalle" component={AgregarCalle}/>
            <Route path="/modificacionCalles" component={ModificacionCalles}/>	
          	<Route path="/tramites" component={Tramites}/>
          	<Route path="/ficha/:id" component={Ficha}/>
            <Route path="/busqueda/:tramite" component={Busqueda}/>
          	<Route path="/busqueda" component={Busqueda}/>
            <Route path="/map" component={MainMap}/>
            <Route path="/" component={Home}/>
          </Switch>
          </div>

)

export default AppRoute
