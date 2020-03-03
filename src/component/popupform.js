import React, { Component } from 'react';
import {Popup } from "react-leaflet";
import styled from 'styled-components'
import { blogmodalstate, handleName, handleAddress, handleCoordinate, handlePhoto, handleRemark, handleSubmit} from '../actions/index'
import { connect } from "react-redux";
import { ReactComponent as Photo } from '../icon/photo.svg'
import { ReactComponent as Markericon } from '../icon/marker.svg'
import { ReactComponent as Upload } from '../icon/upload.svg'
import { ReactComponent as Blog } from '../icon/blog.svg'

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
    width: 300px;
    

`

class PopupForm extends Component {

    
async hhandleSubmit (e) {
    e.preventDefault();
    //console.log(typeof(this.props.fdata.id))
    await this.props.handleSubmit(this.props.fdata)
    
    //console.log(this.props.fdata,this.props.sfdata)
    await fetch('/app/insert/layer/submit', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.props.sfdata[this.props.clickFeatureID] )
    });
}   
    
photoUpload = e =>{
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if(file){
        reader.onloadend = () => {
            this.props.handlePhoto(reader.result)
          
        }
        reader.readAsDataURL(file);
        
    }
    //console.log(reader)
}    

    render() {
        //console.log(this.props.position)
        return(
            <Popup autoPan ={false}>
                
                <PFrame> 
                <form onSubmit={e=>this.hhandleSubmit(e)}>    
                    <label >
                        
                        <input
                        name="name"
                        type="text"
                        placeholder="請輸入地點名稱"
                        value={this.props.fdata.name||""}
                        onChange={this.props.handleName} 
                        style ={{ width:'280px', padding:'0'}}
                        />
                    </label>
                    <br/>
                    <label>
                        
                        <input
                        name="address"
                        type="text"
                        placeholder="景點旅遊順序"
                        value={this.props.fdata.address||""}
                        onChange={this.props.handleAddress} 
                        style ={{ width:'280px', padding:'0'}}
                        />
                    </label>
                    <br />
                    
                    <label>
                        
                        <input 
                            name="remark"
                            type="text"
                            value={this.props.fdata.remark}
                            onChange={this.props.handleRemark}
                            placeholder="備註"
                            style ={{height:'30px', width:'280px', padding:'0'}}
                            />
                    </label>
                    <br />
                    <label htmlFor="photo-upload" style={{ width:'50%',marginLeft: 'auto', marginRight: 'auto', display:'block'}} >
                        <div className="img-wrap img-upload"  >
                            
                          <img  src={this.props.fdata.imagePreviewUrl} style={{ width:'50%',marginLeft: 'auto', marginRight: 'auto', display:'block'}}/>
                        </div>
                        <input id="photo-upload" type="file" onChange={this.photoUpload} style ={{display:'none'}}/> 
                    </label>
                    <br />
                    <ul style={{padding :'0' , float:'right'}}>
                        <label htmlFor="photo-upload" style={{cursor:'pointer',}} >
                            <Photo  width={25} ></Photo>
                        </label>
                        <label style={{cursor:'pointer',}}>
                            <Blog width={25} onClick ={this.props.blogmodalstate}></Blog>
                        </label>
                        <Upload width={25} style={{cursor:'pointer', float:'right'}}  onClick={e=>this.hhandleSubmit(e)} />
                    </ul>    
                    
                    <ul style={{padding :'0'}}>
                        <Markericon style={{float:'left'}} width={25} htmlFor ="" /> 
                        <span >{this.props.position[0]},{this.props.position[1]}</span>
                    </ul>
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
        clickFeatureID: state.clickFeatureID,
        pointerToPopup: state.pointerToPopup,
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
        handlePhoto: file => {
            dispatch(handlePhoto(file))
        },
        handleRemark: e => {
            dispatch(handleRemark(e.target.value))
        },
        handleSubmit: data =>{
            dispatch(handleSubmit(data))
        },
        blogmodalstate:mboolean =>{
            dispatch(blogmodalstate(mboolean))
        },
        
        
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupForm)