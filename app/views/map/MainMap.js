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
      currentGeoJsonLayer: null,
      layerMunicipal:null,
      layerProvincial:null
    }
    this.getFeatureInfo = this.getFeatureInfo.bind(this);
    this.onOverlayAdd = this.onOverlayAdd.bind(this);
    this.onOverlayRemove = this.onOverlayRemove.bind(this);
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

      var myStyle = {
       "color": "#ff7800",
       "weight": 5,
       "opacity": 0.65
      };

      var map = L.map('map');

      map.getContainer().setAttribute('id', 'wmsContainer');

      map.setView([this.state.lat, this.state.lng], this.state.zoom);

      L.tileLayer.wms('http://186.33.216.232/geoserver/world/wms?', {
        layers: 'world:chacabuco_osm',
        opacity: 1

      }
      ).addTo(map);

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

      this.setState({layerProvincial:layerProvincial,layerMunicipal:layerMunicipal});

      var baseMaps = {
          "Parcelas Provinciales": layerProvincial,
          "Parcelas Municipales": layerMunicipal
          
      };

      map.on('click', this.getFeatureInfo, this);
      map.on('overlayadd', this.onOverlayAdd);
      map.on('overlayremove', this.onOverlayRemove);

      L.control.layers(null,baseMaps).addTo(map);

      this.setState({
        map:map,
        wmsParamsProvincial:layerProvincial.wmsParams,
        urlProvincial:layerProvincial._url,
        wmsParamsMunicipal:layerMunicipal.wmsParams,
        urlMunicipal:layerMunicipal._url
      });

    }).catch(error=>{
      console.log(error.stack)
    })

  }

  onOverlayAdd(){
    var layer = this.state.currentGeoJsonLayer;
    if(layer)
      layer.clearLayers();
  }

  onOverlayRemove(){
    var layer = this.state.currentGeoJsonLayer;
    if(layer)
      layer.clearLayers();
  }

  getFeatureInfo(evt){

    var layerMunicipalactivo = this.state.map.hasLayer(this.state.layerMunicipal);
    var layerProvincialactivo = this.state.map.hasLayer(this.state.layerProvincial);
    var wmsParams;
    var url;

    if(layerMunicipalactivo){
      wmsParams = this.state.wmsParamsMunicipal;
      url = this.state.urlMunicipal;
    }else if(layerProvincialactivo){
      wmsParams = this.state.wmsParamsProvincial;
      url = this.state.urlProvincial;
    }else{
      wmsParams = null;
    }

    var point = this.state.map.latLngToContainerPoint(evt.latlng, this.state.map.getZoom()),
        size = this.state.map.getSize(),
        
        params = {
          request: 'GetFeatureInfo',
          service: 'WMS',
          srs: 'EPSG:4326',
          styles: wmsParams.styles,
          transparent: wmsParams.transparent,
          version: wmsParams.version,      
          format: wmsParams.format,
          bbox: this.state.map.getBounds().toBBoxString(),
          height: size.y,
          width: size.x,
          layers: wmsParams.layers,
          query_layers: wmsParams.layers,
          info_format: 'application/json'
        };
    
    params[params.version === '1.3.0' ? 'i' : 'x'] = Math.trunc(point.x);
    params[params.version === '1.3.0' ? 'j' : 'y'] = Math.trunc(point.y);
    
    var geoserverUrl = url + L.Util.getParamString(params, url, true);

    axios.get(geoserverUrl)
    .then(data=>{

      if(data && data.data.features[0]){
        return data;
      }
      else if(layerMunicipalactivo){
        url = this.state.urlProvincial;
        wmsParams = this.state.wmsParamsProvincial;
        params.layers = wmsParams.layers,
        params.query_layers = wmsParams.layers,
        params.styles = wmsParams.styles,
        params.transparent = wmsParams.transparent,
        params.version = wmsParams.version,      
        params.format = wmsParams.format,
        geoserverUrl = url + L.Util.getParamString(params, url, true);
        return  axios.get(geoserverUrl);
      }
      else{
        return 'notFound';
      }

    }).then(data=>{
      if(data == 'notFound' || !data.data.features[0]){
        return;
      }else{
        var parcela = {};
        var map = this.state.map;
        var layer = this.state.currentGeoJsonLayer;
        var parcelaJson = JSON.parse(data.request.response);
        //console.log('parcela',parcelaJson)
        if(layer)
          layer.clearLayers();

        layer = L.geoJSON(parcelaJson).addTo(map);

        this.setState({currentGeoJsonLayer:layer})

        if(parcelaJson.features[0]){
          var layer;
          if(parcelaJson.features[0].properties.pseudoparcela)
            layer = 'Parcelas municipales';
          else
            layer = 'Parcelas provinciales'

          parcela.id = parcelaJson.features[0].properties.id;
          parcela.layer = layer;
          parcela.nomencla = parcelaJson.features[0].properties.nomenclatura;

          this.props.updateParcelaInfo(parcela);
          this.props.openModal();
        }
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
