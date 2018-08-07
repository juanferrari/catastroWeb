import React, {Component} from 'react'
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';

import MainMap from 'views/map/MainMap';
import Test from 'views/test/Test';

const AppRoute =() => (

        <div>
          <Switch>
          	<Route path="/test" component={Test}/>
            <Route path="/map" component={MainMap}/>
          </Switch>
          </div>

)

export default AppRoute
