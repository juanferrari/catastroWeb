import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import { updateParcelaInfo, openModal, closeModal } from 'actions/actions_map'
import axios from 'axios';
import ModalParcelas from './ModalParcelas'
import ReactLoading from 'react-loading'
import DatosBusqueda from 'views/busqueda/components/DatosBusqueda'

class MainMap extends Component {

  constructor(props){
    super(props);
    this.state = {
      lat: -34.64235943,
      lng: -60.46995009,
      zoom: 16,
      open: false,
      geojson:null,
      parcela:null,
      map: null,
      wmsParams: null,
      url: null,
      currentGeoJsonLayer: null
    }
    this.getFeatureInfo = this.getFeatureInfo.bind(this);
  }

  getStyle(feature, layer) {
    return {
      color: '#006400',
      weight: 2,
      opacity: 0.65
    }
  }

  componentWillMount(){
    var service_url = 'http://186.33.216.232/geoserver/catastro/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=catastro:parcela_registro_grafico_provincial&maxFeatures=1&outputFormat=application%2Fjson';
    //var service_url = 'http://186.33.216.232/geoserver/catastro/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=catastro:parcela_registro_grafico_provincial&outputFormat=application%2Fjson';


    axios.get(service_url)
    .then(data=>{
      this.setState({geojson:JSON.parse(data.request.response)});

      var map = L.map('map');

      map.getContainer().setAttribute('id', 'wmsContainer');

      map.setView([this.state.lat, this.state.lng], this.state.zoom);

      L.tileLayer.wms('http://186.33.216.232/geoserver/world/wms?', {
        layers: 'world:chacabuco_osm'
      }
      ).addTo(map);

      var wmsInfo = L.tileLayer.wms('http://186.33.216.232/geoserver/catastro/wms?', {
        layers: 'world:parcela_registro_grafico_provincial',
        opacity: 0.5
      }
      ).addTo(map);


      map.on('click', this.getFeatureInfo, this);

      this.setState({map:wmsInfo._map,wmsParams:wmsInfo.wmsParams,url:wmsInfo._url});

    }).catch(error=>{
      console.log(error.stack)
    })

  }

  getFeatureInfo(evt){

    var point = this.state.map.latLngToContainerPoint(evt.latlng, this.state.map.getZoom()),
        size = this.state.map.getSize(),
        
        params = {
          request: 'GetFeatureInfo',
          service: 'WMS',
          srs: 'EPSG:4326',
          styles: this.state.wmsParams.styles,
          transparent: this.state.wmsParams.transparent,
          version: this.state.wmsParams.version,      
          format: this.state.wmsParams.format,
          bbox: this.state.map.getBounds().toBBoxString(),
          height: size.y,
          width: size.x,
          layers: this.state.wmsParams.layers,
          query_layers: this.state.wmsParams.layers,
          info_format: 'application/json'
        };
    
    params[params.version === '1.3.0' ? 'i' : 'x'] = Math.trunc(point.x);
    params[params.version === '1.3.0' ? 'j' : 'y'] = Math.trunc(point.y);
    
    var geoserverUrl = this.state.url + L.Util.getParamString(params, this.state.url, true);

    axios.get(geoserverUrl)
    .then(data=>{

      var parcela = {};
      var map = this.state.map;
      var layer = this.state.currentGeoJsonLayer;
      var parcelaJson = JSON.parse(data.request.response);

      if(layer)
        layer.clearLayers();

      layer = L.geoJSON(parcelaJson).addTo(map);

      this.setState({currentGeoJsonLayer:layer})

      if(parcelaJson.features[0]){
        parcela.id = parcelaJson.features[0].properties.id;
        parcela.layer = parcelaJson.features[0].properties.layer;
        parcela.etiqueta = parcelaJson.features[0].properties.etiqueta;
        parcela.nomencla = parcelaJson.features[0].properties.nomencla;

        this.props.updateParcelaInfo(parcela);
        this.props.openModal();
      }
      
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

    return (
      <div style={{fontSize:'90%'}}>
        <ModalParcelas />
        <div className="row wrapper border-bottom white-bg page-heading text-center">
          <div className='row'>
            <div className='col-lg-12'>
              <DatosBusqueda collapsed='true' titleCentered='true'/>
            </div>
          </div>
          <div className='col-lg-8 col-lg-offset-2' id='map' />
        </div>
        <br />
        
      </div>
    )

  }
}

export default connect(null, { updateParcelaInfo, openModal, closeModal })(MainMap);
