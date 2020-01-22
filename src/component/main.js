import React, { Component,useEffect  } from 'react';
import {GoogleLayer} from 'react-leaflet-google';
import { Map, TileLayer, Marker,FeatureGroup, Popup} from 'react-leaflet';
import WMTSTileLayer from 'react-leaflet-wmts';
import { PopupIdAdd, PopupOpenWhenCreatedActionForRectangle, PopupOpenWhenCreatedAction, removePopup, getmoveend, DispatchAddMarker, DispatchAddCircle, DispatchAddPolyline, DispatchAddPolygon, DispatchAddRectangle, EditFeature, removeLi, DeleteFeature, getFeatureID,} from '../actions/index';
import { connect  } from "react-redux";
import  PopupForm  from './popupform';
import GooglePopupForm from './GoogleSearchPopup';
import { EditControl } from "react-leaflet-draw";
import * as filelayer from 'leaflet-filelayer'
import L from 'leaflet'
import { exportDefaultSpecifier } from '@babel/types';
import styled from 'styled-components'

const greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const photostyle = {
  display: 'inline-block',
  width: '20px',
  height: '20px',
  backgroundColor: '#EEAA11',
}
const Button = styled.input`
background: #666666;
float: right;
`
const PFrame = styled.div`

  
  background: #FFFFFF;
  

`


const key = 'AIzaSyB-DzlaXFMDeKrnNKs_EzP27BTnqZ5BfiE'




class Main extends Component {
    constructor() {
      super()
      this.state={
        bluemarble: false,
        
      }
    }
    componentDidUpdate() {
      
  
  }
    
    
    layeradd (e) {
      //console.log(e.layer)
      let bounds = e.target.getBounds()
      let zoom = this.getMapZoom()
      this.props.PopupIdAdd(e.layer._leaflet_id)
      if(e.layer.dragging){
        //console.log('true')
        this.PopupOpenWhenCreated(e.layer)
        this.props.DispatchAddMarker(e.layer,zoom)
      }
      

    }
    
      
      
    
    getMapZoom() {
      return this.map && this.map.leafletElement.getZoom();
   }

    getBounds() {
      if(typeof(this.props.bounds) === "object"){
        return this.props.bounds
      }
    }

    GoogleSearchMarker (status) {
      //console.log(this.props.GoogleSearchStatus,status)
      if(status == 'OK'){
        return(
          <Marker icon = {greenIcon} position={this.props.GoogleSearchPosition} opacity = {1} ref ={ref=>{if(ref){ref.leafletElement.openPopup();} }}>
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
    CaculateBoundsToCenter= (layer) => {
      //console.log(center)
      let bounds = layer._latlngs[0]
      let center = [(bounds[0].lat + bounds[1].lat + bounds[2].lat + bounds[3].lat)/4,(bounds[0].lng + bounds[1].lng + bounds[2].lng + bounds[3].lng)/4]
      
      return center
    }
    PopupOpenWhenCreated = (layer) => {
      this.props.PopupOpenWhenCreatedAction(layer)
      
    }

    _onCreated = async (e) => {
      let type = e.layerType;
      let layer = e.layer;
      let bounds = e.target.getBounds()
      let zoom = this.getMapZoom()
      //console.log(layer);
      
      if (type === 'marker') {
        // Do marker specific actions
        //this.props.DispatchAddMarker(layer,zoom)
        //this.PopupOpenWhenCreated(layer)
        console.log("_onCreated: marker created", this.props.sfdata);
      }
      else if(type === 'circle'){
        
        this.props.DispatchAddCircle(layer,zoom)
        setTimeout(() => { 
          this.PopupOpenWhenCreated(layer)
        }, 100);
        //this.GPXimport()
        console.log("_onCreated: circle created", this.props.sfdata);
      }else if(type === 'polyline'){
        let center = layer._latlngs[0]
        this.props.PopupOpenWhenCreatedActionForRectangle(center)
        this.props.DispatchAddPolyline(layer,zoom)
        console.log("_onCreated: polyline created", this.props.sfdata);
      }else if(type === 'polygon'){
        let center = this.CaculateBoundsToCenter(layer)
        setTimeout(() => { 
          this.props.PopupOpenWhenCreatedActionForRectangle(center)
        }, 100);
        this.props.DispatchAddPolygon(layer,zoom)
        console.log("_onCreated: polygon created", this.props.sfdata);
      }else if(type === 'rectangle'){
        let center = this.CaculateBoundsToCenter(layer)
        setTimeout(() => {
          
          this.props.PopupOpenWhenCreatedActionForRectangle(center)
        }, 100);
        
        this.props.DispatchAddRectangle(layer,zoom)
        console.log("_onCreated: rectangle created", this.props.sfdata);
      }
      
      
      
      //console.log(uplaodLayer.test,this.props.sfdata[layer._leaflet_id].layer)
      await fetch('/app/insert/layer', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.props.sfdata[layer._leaflet_id] )
      });
      
      //console.log(e.layer);
      //console.log(e.layer._leaflet_id);
    }
    _onEditPath =(e) => {
      //console.log(e)
      let zoom = this.getMapZoom()
      this.props.EditFeature(e.layers,zoom)

      //console.log(this.props.sfdata)
    }
    _onDeleted =(e) => {
      console.log(e)
      
      this.props.DeleteFeature(e.layers)
      //console.log(this.props.sfdata)
    }

    showthepopup (ref) {
      console.log(this.props.pointerToPopup.TF )
      if(ref && this.props.pointerToPopup.TF) {
        ref.leafletElement.openPopup(this.props.pointerToPopup.po)    
      }
  
    }

    render() {
      
      
      //console.log([this.props.lat, this.props.lng])
      return (
        
        <Map center={[this.props.lat, this.props.lng]} 
             zoom={this.props.zoom}  
             zoomControl = {false} 
             style={{zIndex:1,cursor: this.props.mapcursor}} 
             ref={(reff) => { this.map = reff; }} 
             //useFlyTo = {true}
             //bounds ={this.getBounds()}
             //onmoveend={e=>this.props.getmoveend(e)}
             //onViewportChanged = {e=>this.props.getmoveend(e)}
             //onClick = {(e) => {this.props.removePopup(e);}}
             //onPreclick = {(e) => {this.props.removePopup(this.map.leafletElement.getCenter());}}
             >
          
          {this.LayerSwitch(this.props.LayerId)}
          <FeatureGroup  onClick ={(e)=>this.props.getFeatureID(e.layer._leaflet_id)} 
                         onlayeradd ={(e)=>this.layeradd(e)} 
                         ref={ref=>{if(ref&& this.props.pointerToPopup.TF){ref.leafletElement.openPopup(this.props.pointerToPopup.po);}}} 
                         onPopupClose = {e => {this.props.removePopup(e)}}
                         >
            {this.ToolStateSwitch(this.props.toolsta)}
            
            
            {Object.keys(this.props.MarkersPosition).map((id,idx) =>{
              //console.log(this.props.MarkersPosition,id);
              
              return ( 
              <Marker key ={id} position={this.props.MarkersPosition[id]} opacity = {0.9} >
                
              </Marker>
              )
            
            })}
            <PopupForm/>
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
          pointerToPopup: state.pointerToPopup,
          
          //position:[Math.round(state.lat*10000)/10000,Math.round(state.lng*10000)/10000],
          
          

    
      }
  }
  
const mapDispatchToProps = dispatch => {
  return {
    DispatchAddMarker: (layer,bounds) =>{
      dispatch(DispatchAddMarker(layer,bounds))
    },
    DispatchAddCircle: (layer,bounds) =>{
      dispatch(DispatchAddCircle(layer,bounds))
    },
    DispatchAddRectangle: (layer,bounds) =>{
      dispatch(DispatchAddRectangle(layer,bounds))
    },
    DispatchAddPolygon: (layer,bounds) =>{
      dispatch(DispatchAddPolygon(layer,bounds))
    },
    DispatchAddPolyline: (layer,bounds) =>{
      dispatch(DispatchAddPolyline(layer,bounds))
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
    },
    removePopup:(latlng) => {
      dispatch(removePopup(latlng))
    },
    PopupOpenWhenCreatedAction:(layer) => {
      dispatch(PopupOpenWhenCreatedAction(layer))
    },
    PopupOpenWhenCreatedActionForRectangle:(center) => {
      dispatch(PopupOpenWhenCreatedActionForRectangle(center))
    },
    PopupIdAdd:(id) =>{
      dispatch(PopupIdAdd(id))
    },
    
    
    

    
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)