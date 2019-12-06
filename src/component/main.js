import React, { Component } from 'react';
import {GoogleLayer} from 'react-leaflet-google';
import { Map, TileLayer, Marker,FeatureGroup, Popup} from 'react-leaflet';
import WMTSTileLayer from 'react-leaflet-wmts';
import {getmoveend, DispatchAddMarker, DispatchAddCircle, DispatchAddPolyline, DispatchAddPolygon, DispatchAddRectangle, EditFeature, removeLi, DeleteFeature, getFeatureID} from '../actions/index';
import { connect } from "react-redux";
import  PopupForm  from './popupform';
import GooglePopupForm from './GoogleSearchPopup';
import { EditControl } from "react-leaflet-draw";
import * as filelayer from 'leaflet-filelayer'
import L from 'leaflet'
import { exportDefaultSpecifier } from '@babel/types';




const key = 'AIzaSyB-DzlaXFMDeKrnNKs_EzP27BTnqZ5BfiE'




class Main extends Component {
    constructor() {
      super()
      this.state={
        bluemarble: false,
        
      }
    }


    layeradd (e) {
      
      let zoom = this.getMapZoom()
      if(e.layer.dragging){
        //console.log('true')
        this.props.DispatchAddMarker(e.layer,zoom)
      }
      

    }
    GPXimport () {
        L.Control.fileLayerLoad({
          // Allows you to use a customized version of L.geoJson.
          // For example if you are using the Proj4Leaflet leaflet plugin,
          // you can pass L.Proj.geoJson and load the files into the
          // L.Proj.GeoJson instead of the L.geoJson.
          layer: L.geoJson,
          // See http://leafletjs.com/reference.html#geojson-options
          layerOptions: {style: {color:'red'}},
          // Add to map after loading (default: true) ?
          addToMap: true,
          // File size limit in kb (default: 1024) ?
          fileSizeLimit: 1024,
          // Restrict accepted file formats (default: .geojson, .json, .kml, and .gpx) ?
          formats: [
              '.geojson',
              '.kml',
              '.gpx'
          ]
      }).addTo(this.map)
      
      
    }
    getMapZoom() {
      return this.map && this.map.leafletElement.getZoom();
   }

    getBounds() {
      if(typeof(this.props.bounds) === "object"){
        return this.props.bounds
      }else{
      return this.map && this.map.leafletElement.getBounds();
      }
    }

    GoogleSearchMarker (status) {
      //console.log(this.props.GoogleSearchStatus,status)
      if(status == 'OK'){
        return(
          <Marker position={this.props.GoogleSearchPosition} opacity = {1}>
            <GooglePopupForm/>
          </Marker>
        )
      }
    }
    ToolStateSwitch(boolean) {
      
      if(boolean === true){
        return(
          
            <EditControl
                position='topright'
                onEdited={this._onEditPath}
                onCreated={this._onCreated}
                onDeleted={this._onDeleted}
                draw={{
                  rectangle: true,
                  circlemarker: false,
                  
                }}
                
            />
        )
      }
    }
    
    LayerSwitch(LayerId) {
      
      if (LayerId ==0) {
        
        return(<TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )
      }
      else if(LayerId ==1){
        
        return(
          <GoogleLayer googlekey={key}  maptype='HYBRID' />
        )
      }
      else if(LayerId ==2){
        
        return(
          <WMTSTileLayer
                  url="https://wmts.nlsc.gov.tw/wmts"
                  layer= "EMAP"//layer={this.state.bluemarble ? "EMAP":"LANDSECT"}
                  tilematrixSet="EPSG:3857"
                  format="image/jpeg"
                  transparent={true}
                  opacity={1}       
          />
        )
      }
    }
    _onCreated = (e) => {
      let type = e.layerType;
      let layer = e.layer;
      let bounds = this.getBounds()
      console.log(e.layer);
      if (type === 'marker') {
        // Do marker specific actions
        this.props.DispatchAddMarker(layer)
        console.log("_onCreated: marker created", this.props.sfdata);
      }
      else if(type === 'circle'){
        this.props.DispatchAddCircle(layer)
        this.GPXimport()
        console.log("_onCreated: circle created", this.props.sfdata);
      }else if(type === 'polyline'){
        this.props.DispatchAddPolyline(layer,bounds)
        console.log("_onCreated: polyline created", this.props.sfdata);
      }else if(type === 'polygon'){
        this.props.DispatchAddPolygon(layer,bounds)
        console.log("_onCreated: polygon created", this.props.sfdata);
      }else if(type === 'rectangle'){
        this.props.DispatchAddRectangle(layer,bounds)
        console.log("_onCreated: rectangle created", this.props.sfdata);
      }
      
      //console.log(e.layer);
      //console.log(e.layer._leaflet_id);
    }
    _onEditPath =(e) => {
      console.log(e)
      let zoom = this.getMapZoom()
      this.props.EditFeature(e.layers,zoom)

      console.log(this.props.sfdata)
    }
    _onDeleted =(e) => {
      console.log(e)
      
      this.props.DeleteFeature(e.layers)
      console.log(this.props.sfdata)
    }
    render() {
      let centerposition = [this.props.lat, this.props.lng]
      
      //console.log(centerposition,[this.props.lat, this.props.lng])
      return (
        
        <Map center={centerposition} 
             zoom={this.props.zoom}  
             zoomControl = {false} 
             style={{zIndex:1,cursor: this.props.mapcursor}} 
             ref={(ref) => { this.map = ref; }} 
             //useFlyTo = {true}
             bounds ={this.getBounds()}
             onmoveend={e=>this.props.getmoveend(e)}
             
             >
          
          {this.LayerSwitch(this.props.LayerId)}
          <FeatureGroup  onClick ={(e)=>this.props.getFeatureID(e.layer._leaflet_id)} onlayeradd ={(e)=>this.layeradd(e)} >
            <PopupForm />
            {this.ToolStateSwitch(this.props.toolsta)}
            {Object.keys(this.props.MarkersPosition).map((id,idx) =>{
              //console.log(this.props.MarkersPosition,id);
              
              return ( 
              <Marker key ={id} position={this.props.MarkersPosition[id]} opacity = {0.9} onClick={(e)=>console.log(e)}>
                <PopupForm />
              </Marker>
              )
            
            })}
          </FeatureGroup>
          {this.GoogleSearchMarker(this.props.GoogleSearchStatus)}
          
          
          
        </Map>
      )
    }
}
const mapStateToProps = state => {
      return {
          inputText: state.inputText,
          LayerId: state.LayerId,
          lat: state.lat,
          lng: state.lng,
          zoom: state.zoom,
          bounds: state.bounds,
          MarkersPosition: state.MarkersPosition,
          mapcursor: state.mapcursor,
          functiontype: state.functiontype,
          toolsta: state.toolsta,
          GoogleSearchStatus: state.GoogleSearchMarker.status,
          GoogleSearchPosition: state.GoogleSearchMarker.position,
          sfdata: state.sfdata,

    
      }
  }
  
const mapDispatchToProps = dispatch => {
  return {
    DispatchAddMarker: (layer) =>{
      dispatch(DispatchAddMarker(layer))
    },
    DispatchAddCircle: (layer) =>{
      dispatch(DispatchAddCircle(layer))
    },
    DispatchAddRectangle: (layer,zoom) =>{
      dispatch(DispatchAddRectangle(layer,zoom))
    },
    DispatchAddPolygon: (layer,zoom) =>{
      dispatch(DispatchAddPolygon(layer,zoom))
    },
    DispatchAddPolyline: (layer,zoom) =>{
      dispatch(DispatchAddPolyline(layer,zoom))
    },
    removeLi: layer => {
      dispatch(removeLi(layer))
    },
    EditFeature: (layer,zoom) => {
      dispatch(EditFeature(layer,zoom))
    },
    DeleteFeature: (layer) => {
      dispatch(DeleteFeature(layer))
    },
    getFeatureID: (ID) => {
      dispatch(getFeatureID(ID))
    },
    getmoveend:(e) => {
      dispatch(getmoveend(e))
    }

    
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)