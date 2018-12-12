import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import { updateParcelaInfo } from 'actions/actions_map';
import { subdivisionParcela } from 'actions/actions_parcelas'; 
import axios from 'axios';
import ReactLoading from 'react-loading';
import { FeatureGroup,Draw,addControl,extend } from 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import leafletDrawJson from 'config/leafletDraw.json';

class Subdividir extends Component {

  constructor(props){
    super(props);
    this.state = {
      lat: -34.64235943,
      lng: -60.46995009,
      zoom: 25,
      open: false,
      geojson:null,
      parcela:null,
      map: null,
      wmsParams: null,
      url: null,
      currentGeoJsonLayer: null,
      subdividirEnabled: false
    }
    //this.getFeatureInfo = this.getFeatureInfo.bind(this);
    this.subdividir = this.subdividir.bind(this);
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
    var service_url = 'http://186.33.216.232/geoserver/catastro/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=catastro:parcelas_provinciales&outputFormat=application%2Fjson&featureID=';
    service_url = service_url + id;

    axios.get(service_url)
    .then(data=>{
      if(data && data.data.features[0]){
        return data
      }
      else{ 
        service_url = 'http://186.33.216.232/geoserver/catastro/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=catastro:parcelas_municipales&outputFormat=application%2Fjson&featureID=' + id;
        return axios.get(service_url)
      }
    }).then(data=>{

      var parcelaJson = JSON.parse(data.request.response);
      
      var drawnItems = new L.FeatureGroup();

      var latLong = [];
      var thisTime = true;
      /*
      var savedLatLong = [];

      parcelaJson.features.forEach(function(currentFeature){

          currentFeature.geometry.coordinates[0].forEach(function(locationArray){

              locationArray.forEach(function(location){

                  latLong.push([location[1] , location[0]]);
                  savedLatLong.push([location[1] , location[0]]);
              });
          });


          console.log('coords original',latLong)
          var polygon = L.polygon(latLong).addTo(drawnItems);
          latLong = [];
      });*/

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

      map.getContainer().setAttribute('id', 'wmsContainer');

      map.setView([lat, lng], this.state.zoom);

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

      L.geoJSON(parcelaJson,{style: myStyle}).addTo(map);

      //map.on('click', this.getFeatureInfo, this);

      // FeatureGroup is to store editable layers
      
      map.addLayer(drawnItems);

     
      L.drawLocal = leafletDrawJson;
      

      var drawControl = new L.Control.Draw({
         /*edit: {

            featureGroup: drawnItems,
            remove:false
         },*/
         draw: {
            polyline:false,
            marker: false,
            rectangle:false,
            circle:false,
            circlemarker:false
         }
      });

      map.addControl(drawControl);

      //drawnItems.addLayer(L.geoJSON(parcelaJson));

      //console.log('drawItems',drawnItems);

      var context = this;

      map.on(L.Draw.Event.CREATED, function (e) {
        //console.log('evento',e)

         var polygon = L.polygon(e.layer._latlngs)

         var gojsonPolygon = polygon.toGeoJSON();

         gojsonPolygon.crs = {"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}};
         gojsonPolygon.type = 'Polygon';
         gojsonPolygon.coordinates = gojsonPolygon.geometry.coordinates;
         delete gojsonPolygon.geometry;

         //console.log('polygon geojson',JSON.stringify(gojsonPolygon));

         drawnItems.addLayer(L.geoJSON(gojsonPolygon));

         context.setState({subdividirEnabled:true,subdivisionJson:gojsonPolygon})
      });

      /*map.on('draw:edited', function (e) {
         var layers = e.layers;
         console.log('edited layer',layers._layers[1]._latlngs)

         var polygon = L.polygon(layers._layers[1]._latlngs)

         var gojsonPolygon = polygon.toGeoJSON();
      });*/

      /*var modifiedDraw = L.drawLocal.extend({
         draw: {
             toolbar: {
                 buttons: {
                     polygon: 'Draw an awesome polygon'
                 }
             }
         }
     });*/

    }).catch(error=>{
      console.log(error.stack)
    })

  }

  subdividir(){
    console.log('continuar subdivision',this.props)
    this.props.nextPage();
    const {id} = this.props;
    console.log('subdividir parcela id',id);
    console.log('subdividir parcela json',this.state.subdivisionJson);
    var geoJson = JSON.stringify(this.state.subdivisionJson);
    console.log('sendd',geoJson);
    this.props.subdivisionParcela(id,geoJson)
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
      <div style={{fontSize:'90%'}}>
        <div className="row wrapper border-bottom white-bg page-heading text-center">
          <div className='col-lg-8 col-lg-offset-2' id='map' />
        </div>
        <br />
        <div className='row text-center'>
          <button 
            className='btn btn-primary' 
            onClick={this.subdividir}
            disabled={!this.state.subdividirEnabled}
          > Continuar 
          </button>
        </div>
      </div>
    )

  }
}

export default connect(null, { updateParcelaInfo,subdivisionParcela })(Subdividir);
