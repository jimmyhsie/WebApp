import React, { Component } from 'react'
import styled  from 'styled-components'
import Geocode  from 'react-geocode'
import {modalstate, Geo, AupdateInputText, AhandleChange, mapcursor, toolstate} from '../actions/index'
import { connect } from "react-redux";
import { ReactComponent as Search } from '../icon/search.svg'

const SearchBar = styled.div`
height: 100%;
float: right;
display: inline-block;
margin-left: auto;
background: black;
color: white;

@media (min-width:375px) {
    width: 100px;
    input {
        display: inline-block;
        width: 100%;
        height: 20px;
        margin: 8px 0px 0px 0px ;
    }
}
@media (min-width:768px) {
    width: 200px;
    input {
        display: inline-block;
        width: 100%;
        height: 20px;
        margin: 8px 0px 0px 0px ;
    }
}

`
const ToolBarOutline = styled.div`
width: 100%;
height: 34px;
background: black;
position: relative;
color: white;
select {
    height: 20px;
    margin: 7px;
    float:left;
}
.icon {
    margin: 8px 0px 0px 0px ;
    g {
    
        fill: #DB7290;;
    }
    g path {
        
        stroke: #DB7290;;
        fill: #FFD0DD;
    
    }
}
 
`
const ToolBarMaterial = styled.div`
@media (min-width:375px) {
    width: 150px;
}
@media (min-width:768px) {
    width: 200px;
}
height: 29px;
float: left;
display: inline-block;
top: 0px;
background: black;
color: white;
margin-top: 5px;
.point {
    margin:4px;
    float:left;
    cursor:pointer;
}
.importfile {
    margin:4px;
    float:left;
    cursor:pointer;
}

`

const LayerList = [
    { id:0, name:'OSM', url:''},
    { id:1, name:'google', url:''},
    { id:2, name:'hybird', url:''},
]

const key = 'AIzaSyB-DzlaXFMDeKrnNKs_EzP27BTnqZ5BfiE'



class ToolBar extends Component {
    
    geoFirist(text) {
    Geocode.setApiKey(key)
    // Enable or disable logs. Its optional.
    Geocode.enableDebug()
    // Get latidude & longitude from address.
    Geocode.fromAddress(text).then(
        response => {

            const address = response.results[0];
            console.log(address)
            this.props.Geo(address)
          
          
        },
        error => {
          console.error(error);
          alert("查不到該點位")
        }
    )
    }
    updateInputText(event) {
        let text = event.target.value
        this.props.AupdateInputText(text)
        
        if(event.key === 'Enter'){
            
            this.geoFirist(text);
        }
        
      }

    handleChange(event) {
      let id = event.target.value
      this.props.AhandleChange(id)
      
    }  

    render() {
        //console.log(this.props.toolsta)
        return(
            <div>
            <ToolBarOutline>
                <select  value={this.props.LayerId} onChange={(event) => this.handleChange(event)}>
                {LayerList.map((todo, index)=>{
                        return(
                            <option key={todo.id}
                            value={todo.id}>{todo.name}
                            </option>
                        )
                    })
                }    
                </select>
                
                <ToolBarMaterial>
                    
                    <span className="point" onClick={e => this.props.toolstate(this.props.toolsta)}> Tools </span> 
                    <span className="importfile" onClick={this.props.modalstate}> </span>    
                </ToolBarMaterial>
                <SearchBar>
                    <input onChange={(event) => this.updateInputText(event)} 
                        value = {this.props.inputText} 
                        type="text"  
                        placeholder='請輸入地址'
                        onKeyPress={(event) => this.updateInputText(event)}>
                    </input>    
                </SearchBar>
                <Search className ='icon' width={25} style={{cursor:'pointer', float:'right', display: 'inline-block'}}  onClick={ () => this.geoFirist(this.props.inputText)}></Search>
            </ToolBarOutline>
            
            
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        inputText: state.inputText,
        LayerId: state.LayerId,
        toolsta: state.toolsta,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        Geo: inputText => {
            dispatch(Geo(inputText))
        },
        AupdateInputText: inputText => {
            dispatch(AupdateInputText(inputText))
        },
        AhandleChange: id =>{
            dispatch(AhandleChange(id))
        },
        mapcursor: cursortype=>{
            dispatch(mapcursor(cursortype))
        },
        toolstate: sboolean => {
            dispatch(toolstate(sboolean))
        },
        modalstate: mboolean => {
            dispatch(modalstate(mboolean))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar)