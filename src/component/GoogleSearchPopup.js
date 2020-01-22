import React, { Component } from 'react';
import {Popup } from "react-leaflet";
import styled from 'styled-components'
import {GoogleMarkerToLayer} from '../actions/index'
import { connect } from "react-redux";
import { ReactComponent as Markericon } from '../icon/marker.svg';

const Button = styled.button`
color: tomato;
background: #666666;
float: right;
`
const PFrame = styled.div`

    width: 300px;
    background: #FFFFFF;
    

`

class GooglePopupForm extends Component {



    
    

    render() {
        
        return(
            <Popup >
                
                <PFrame> 
                  
                    <span>{this.props.GoogleSearchMarker.value.formatted_address}</span>
                        
                        
                    
                    <br/>
                    <Markericon style={{float:'left'}} width={20} htmlFor ="" />
                    <span>
                        {this.props.GoogleSearchMarker.position}
                        
                    </span>
                    
                    <Button type="submit"  onClick= {e=>this.props.GoogleMarkerToLayer(e)}>加入圖層</Button>
                    
                
                </PFrame>
            
            </Popup>
        )
    }
}

const mapStateToProps = state => {
    return {
        fdata: state.fdata,
        LayerId: state.LayerId,
        ulstate: state.ulstate,
        position:[Math.round(state.lat*10000)/10000,Math.round(state.lng*10000)/10000],
        GoogleSearchMarker:state.GoogleSearchMarker,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
        GoogleMarkerToLayer: marker =>{
            dispatch(GoogleMarkerToLayer(marker))
        },
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GooglePopupForm)