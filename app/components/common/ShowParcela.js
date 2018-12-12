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

  componentDidMount(){

    const {id} = this.props;

    var parcelaJson = this.props.geoJson;

    console.log('parcela componentDidMount',parcelaJson);

    var latLong = [];

    var myStyle = {
     "color": "#8b0000",
     "weight": 5,
     "opacity": 0.65
    };

    var lng = parcelaJson.coordinates[0][0][0];
    var lat = parcelaJson.coordinates[0][0][1];

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


  }

  render() {

    return (
        <div id='map'/>
    )

  }
}

export default connect(null, {  })(ShowParcela);
