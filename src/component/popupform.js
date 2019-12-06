import React, { Component } from 'react';
import {Popup } from "react-leaflet";
import styled, {keyframes }from 'styled-components'
import {handleName,handleAddress,handleCoordinate,handlePhoto,handleRemark,handleSubmit} from '../actions/index'
import { connect } from "react-redux";
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

class PopupForm extends Component {

hhandleSubmit (e) {
    
    //console.log(typeof(this.props.fdata.id))
    this.props.handleSubmit(this.props.fdata)
    e.preventDefault();
    //console.log(this.props.fdata,this.props.sfdata)
    
}   

    
    

    render() {
        
        return(
            <Popup >
                
                <PFrame> 
                <form onSubmit={e=>this.hhandleSubmit(e)}>    
                    <label >
                        
                        <input
                        name="name"
                        type="text"
                        placeholder="請輸入地點名稱"
                        value={this.props.fdata.name}
                        onChange={this.props.handleName} 
                        />
                    </label>
                    <br/>
                    <label>
                        
                        <input
                        name="address"
                        type="text"
                        placeholder="請輸入地址"
                        value={this.props.fdata.address||""}
                        onChange={this.props.handleAddress} 
                        />
                    </label>
                    <br />
                    
                    <label htmlFor="file"><span className='fa fa-edit edit-icon' style = {photostyle}> </span></label>

                    
                      <input
                        className ="edit-icon"
                        name="photo"
                        type="file"
                        ref={input => {
                          this.fileInput = input;
                        }} 
                        onChange={this.props.handlePhoto} 
                        id="file"
                        style={{display: 'none'}}
                        />
                    
                    <br />
                    <label>
                        備註:
                        <input 
                            name="remark"
                            type="text"
                            value={this.props.fdata.remark}
                            onChange={this.props.handleRemark}
                            />
                    </label>
                    <Button type="submit" value="Submit" onClick= {e=>this.hhandleSubmit(e)}></Button>
                </form>
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
        sfdata: state.sfdata,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleName: e => {
            dispatch(handleName(e.target.value))
        },
        handleAddress: e => {
            dispatch(handleAddress(e.target.value))
        },
        handleCoordinate: e => {
            dispatch(handleCoordinate(e.target.value))
        },
        handlePhoto: e => {
            dispatch(handlePhoto(e.target.value))
        },
        handleRemark: e => {
            dispatch(handleRemark(e.target.value))
        },
        handleSubmit: data =>{
            dispatch(handleSubmit(data))
        },
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupForm)