import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import axios from 'axios';
import ReactLoading from 'react-loading';

class ShowParcela extends Component {

  constructor(props){
    super(props);
    this.state = {
      zoom: 25
    }
  }

  getStyle(feature, layer) {
    return {
      color: '#006400',
      weight: 2,
      opacity: 0.65
    }
  }

  componentWillMount(){

    const {id} = this.props;
    var service_url = 'http://186.33.216.232/geoserver/catastro/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=catastro:parcelas_provinciales&outputFormat=application%2Fjson&featureID='
    
    // nuevas querys
    //'http://186.33.216.232/geoserver/catastro/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=catastro:parcelas_municipales&outputFormat=application%2Fjson&featureID='
    //'http://186.33.216.232/geoserver/catastro/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=catastro:parcelas_provinciales&outputFormat=application%2Fjson&featureID='
    service_url = service_url + id;

    axios.get(service_url)
    .then(data=>{

      var parcelaJson = JSON.parse(data.request.response);
      var latLong = [];

      var myStyle = {
       "color": "#ff7800",
       "weight": 5,
       "opacity": 0.65
      };

      var lng = parcelaJson.features[0].geometry.coordinates[0][0][0][0];
      var lat = parcelaJson.features[0].geometry.coordinates[0][0][0][1];

      this.setState({geojson:parcelaJson});

      var map = L.map('map');

      map.zoomControl.remove();

      L.control.zoom({zoomInTitle:'Acercar',zoomOutTitle:'Alejar'}).addTo(map);

      map.setView([lat, lng], this.state.zoom);
      console.log('test')

      L.tileLayer.wms('http://186.33.216.232/geoserver/world/wms?', {
        layers: 'world:chacabuco_osm'
      }
      ).addTo(map);

      console.log('test')

      var layerProvincial = L.tileLayer.wms('http://186.33.216.232/geoserver/catastro/wms?', {
        layers: 'world:parcelas_provinciales',
        transparent:true,
        format:'image/png'
      }
      ).addTo(map);

      var layerMunicipal = L.tileLayer.wms('http://186.33.216.232/geoserver/catastro/wms?', {
        layers: 'world:parcelas_municipales',
        transparent:true,
        format:'image/png'
      }
      ).addTo(map);

      var baseMaps = {
          "Parcelas Provinciales": layerProvincial,
          "Parcelas Municipales": layerMunicipal
      };

      L.geoJSON(parcelaJson,{style: myStyle}).addTo(map);

    }).catch(error=>{
      console.log(error.stack)
    })

  }

  render() {

    if(!this.state.geojson){
      return(
        <div className="centeredSpinner" >
          <ReactLoading type="spinningBubbles" style={{'color':"#444",'height':150,'width':150}} />
        </div>
      )
    }

    return (
      <div id='map' />
    )

  }
}

export default connect(null, {  })(ShowParcela);
