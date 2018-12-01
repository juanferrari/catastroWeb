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

    var parcelaJson = {"type":"FeatureCollection","totalFeatures":1,"features":[{"type":"Feature","id":"parcelas_municipales.7","geometry":{"type":"MultiPolygon","coordinates":[[[[-60.47530438,-34.62970129],[-60.47496845,-34.62966873],[-60.47581384,-34.62940399],[-60.47553578,-34.62960185],[-60.47530438,-34.62970129]]]]},"geometry_name":"geom","properties":{"id":7,"chacra":null,"circunscripcion":null,"fraccion":null,"manzana":null,"nomenclatura":null,"parcela_nom":null,"partida_provincial":null,"pseudoparcela":true,"quinta":null,"seccion":null,"parcela_id":7}}],"crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}}}
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


  }

  render() {

    return (
        <div id='map'/>
    )

  }
}

export default connect(null, {  })(ShowParcela);
