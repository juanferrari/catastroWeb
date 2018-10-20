import React, { Component } from 'react';
var moment = require('../../../node_modules/moment-timezone/builds/moment-timezone-with-data.min');


class Footer extends Component {
    render() {

        var year = moment().format('YYYY');
        return (
            <div className="footer hidden-print text-center" 
                style={{height:'5vh',position:'absolute',bottom:'auto',left:0,right:0}}>
                <div className="pull-left">
                    <img src='https://ppo.mininterior.gob.ar/images/logos/LogoMinInterior.png' style={{height:'30px',position:'absolute',marginTop:'1px'}}/>
                </div>
                <div>
                    Sistema de Catastro {year}
                </div>
            </div>
        )
    }
}

export default Footer
