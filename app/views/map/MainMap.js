import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import { updateParcelaInfo, openModal, closeModal } from 'actions/actions_map'
import axios from 'axios';
import ModalParcelas from './ModalParcelas'
import ReactLoading from 'react-loading'

class MainMap extends Component {

  constructor(props){
    super(props);
    this.state = {
      lat: -34.64235943,
      lng: -60.46995009,
      zoom: 16,
      open: false,
      geojson:null,
      parcela:null
    }
    this.onEachFeature = this.onEachFeature.bind(this);
  }

  getStyle(feature, layer) {
    return {
      color: '#006400',
      weight: 2,
      opacity: 0.65
    }
  }

  onEachFeature(feature, layer) {
    var context = this;
    layer.on({
      click: function(event) {
        console.log(feature);
        console.log(context)
        context.setState({parcela:feature})
        context.props.updateParcelaInfo(feature);
        context.props.openModal();
      }
    });
  }

  componentWillMount(){
    var service_url = 'http://192.168.150.142:8080/geoserver/catastro/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=catastro:parcela_registro_grafico_provincial&maxFeatures=100&outputFormat=application%2Fjson';
    //var service_url = 'http://192.168.150.142:8080/geoserver/catastro/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=catastro:parcela_registro_grafico_provincial&outputFormat=application%2Fjson';
    axios.get(service_url)
    .then(data=>{
      this.setState({geojson:JSON.parse(data.request.response)})
    }).catch(error=>{
      console.log(error.stack)
    })
  }

  render() {
    const position = [this.state.lat, this.state.lng]

    if(!this.state.geojson){
      return(
      	<div className="centeredSpinner" >
        	<ReactLoading type="spinningBubbles" style={{'color':"#444",'height':150,'width':150}} />
      	</div>
      )
    }

    //return(<div>{this.state.geojson}</div>)
    return (
      <div>
      	<ModalParcelas />
        <div>
          <Map center={position} zoom={this.state.zoom}>
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <GeoJSON data={this.state.geojson} style={this.getStyle} onEachFeature={this.onEachFeature} />
          </Map>
        </div>
      </div>
    )
  }
}



export default connect(null, { updateParcelaInfo, openModal, closeModal })(MainMap);
