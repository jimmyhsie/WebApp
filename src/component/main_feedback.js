import React, { Component } from 'react';
import {GoogleLayer} from 'react-leaflet-google';
import { Map, TileLayer, Marker,FeatureGroup, Circle} from 'react-leaflet';
import WMTSTileLayer from 'react-leaflet-wmts';
import {DispatchAddMarker} from '../actions/index'
import { connect } from "react-redux";
import  PopupForm  from './popupform';
import { EditControl } from "react-leaflet-draw"
import { exportDefaultSpecifier } from '@babel/types';


const key = 'AIzaSyB-DzlaXFMDeKrnNKs_EzP27BTnqZ5BfiE'


class Main extends Component {
    constructor() {
      super()
      this.state={
        bluemarble: false,
        
      }
    }
      
    
      FunctionSwitch(functiontype,e){

        if(functiontype == 'point'){
          this.props.DispatchAddMarker(e)
        }else if (functiontype == 'line') {
          this.props.DispatchAddMarker(e)
        } else if(functiontype == 'polygon'){
          this.props.DispatchAddMarker(e)
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
        if (type === 'marker') {
          // Do marker specific actions
          console.log("_onCreated: marker created", e);
        }
        console.log(e);
      }
      render() {
        let centerposition = [this.props.lat, this.props.lng]
        
        //console.log(centerposition,[this.props.lat, this.props.lng])
        return (
          
          <Map center={centerposition} zoom={this.props.zoom} onClick={e => this.FunctionSwitch(this.props.functiontype,e)} zoomControl = {false} style={{zIndex:1,cursor: this.props.mapcursor}}>
             
            {this.LayerSwitch(this.props.LayerId)}
            <Marker position={centerposition}>
              <PopupForm/>
            </Marker>
            
            {Object.keys(this.props.MarkersPosition).map((id,idx) =>{
              return(
                //console.log(this.props.MarkersPosition[id]),
                <Marker key ={id} position={this.props.MarkersPosition[id]} opacity = {0.5}>
                  <PopupForm/>
                </Marker>
              )
              
            })}
            <FeatureGroup>
              <PopupForm/>
              <EditControl
                  position='topright'
                  onEdited={this._onEditPath}
                  onCreated={this._onCreated}
                  onDeleted={this._onDeleted}
                  draw={{
                    rectangle: false
                  }}
              />
              <Circle center={[25.0782884,121.6067442]} radius={200} />
            </FeatureGroup>
            
            
            
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
          MarkersPosition: state.MarkersPosition,
          mapcursor: state.mapcursor,
          functiontype: state.functiontype,
    
      }
  }
  
const mapDispatchToProps = dispatch => {
  return {
    DispatchAddMarker: latlng =>{
      dispatch(DispatchAddMarker(latlng))
    },
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)