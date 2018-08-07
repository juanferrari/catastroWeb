import React, { Component } from 'react';
var moment = require('../../../node_modules/moment-timezone/builds/moment-timezone-with-data.min');


class Footer extends Component {
    render() {

        var year = moment().format('YYYY');
        return (
            <div className="footer hidden-print">
                <div className="pull-right">

                </div>
                <div>
                    <strong>Copyright</strong> CatastroWeb&copy; {year}
                </div>
            </div>
        )
    }
}

export default Footer
