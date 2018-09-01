import React from 'react';
import Progress from 'components/common/Progress';
import Navigation from 'components/common/Navigation';
import Footer from 'components/common/Footer';
import TopHeader from 'components/common/TopHeader';
import { correctHeight,detectBody } from 'components/common/layouts/Helpers'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import AppRoute from 'config/routes';
import { connect } from 'react-redux';


class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };

    }

    componentDidMount(){
        $("#root").css("background-color", "yellow");
    }

    componentWillMount(){

    }

    render() {

        let wrapperClass = "white-bg wrapperClass"; 

        return (
            <div>
              <div id="wrapper">
                  <Progress />
                  
                  <div >
                      <TopHeader />
                      <div className='row'>
                        <AppRoute />
                      </div>
                      <div className='row'>
                        <div>{/*<Footer />*/}</div>
                      </div>
                  </div>
              </div>
            </div>
          )


}



    componentDidMount() {

        $('html,body').scrollTop(0);
        // Run correctHeight function on load and resize window event

        $(window).bind("load resize", function() {
            correctHeight();
            detectBody();
        });

        // Correct height of wrapper after metisMenu animation.
        $('.metismenu a').click(() => {
            setTimeout(() => {
                correctHeight();
            }, 300)
        });
    }
}



function mapStateToProps(state) {

    return {
    }
};


export default connect(mapStateToProps, null)(Main);
