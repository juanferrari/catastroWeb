import React from 'react';

class Blank extends React.Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }

    componentDidMount(){
        $('body').addClass('white-bg');
    }

    componentWillUnmount(){
        $('body').removeClass('white-bg');
    }
}

export default Blank