import React, { Component } from 'react';
import styled, {keyframes }from 'styled-components'
import {ulonclick, pointer} from '../actions/index'
import { connect } from "react-redux";

const Button = styled.button`

float: right;
z-index: 3;

`


const Ful = styled.ul`


margin:25 0 0 0;
padding:0;
list-style-type: none;
li.subli{
    margin-top:30px;
}
li.subli:hover{
    margin-top:30px;
}
a.subtitle{
    margin-top:15px;
}
ul.submenu{
    
    margin-left:25px;
    list-style-type:disc;
    color:#333333;
}
button.RemoveButton{
    float: right;
    opacity: 0.2;
    transition: opacity .35s ease;
}
button.RemoveButton:hover{
    float: right;
    opacity: 1;
}
button.OpenButton{
    float: right;
    opacity: 0.2;
    transition: opacity .35s ease;
}
button.OpenButton:hover{
    float: right;
    opacity: 1;
}
`


const SlideFromLtoR = keyframes`

from{
    width: 1%
}
to{
    width: 15%
}
`
const SlideFromRtoL = keyframes`

from{
    width: 15%
}
to{
    width: 1%
}
`

const Sbar = styled.div`
    
    
    float: left;
    display: block ;
    margin-left: auto;
    background: black;
    color: white;
    position: absolute;
    z-index: 2;
    animation: ${props=> (props.clickstate ? SlideFromLtoR : SlideFromRtoL)} 0.3s linear ;
    animation-fill-mode: forwards;
    `
    
class SideBar extends Component {
    constructor(props) {
        super(props)

        this.state={
            clickstate : true,
            
            
        }
    }
    
    onclick = () =>{
        this.setState({
            clickstate: !this.state.clickstate,
            
        })
        //console.log(Object.keys(this.props.record).length)
        //console.log(typeof(this.props.record.id))
        //console.log(this.props.record.id)
        
    }



    

    render() {
        //console.log(this.props.record)
        return (
            
            //console.log(this.state.clickstate),
            <Sbar style= { {height: 'calc(100% - 34px)', opacity: 0.5 ,}} clickstate = {this.state.clickstate}>
                <Button onClick = {this.onclick}>click</Button>
                { !this.state.clickstate ? '' :<Ful>
                    {    //console.log(this.props.record),
                        !this.props.record?"this.props.record.map":Object.keys(this.props.record).map((todo, index)=>{
                            return(

                                //console.log(this.props.record[todo].id),
                                //console.log(index),
                                <li className="subli" key={this.props.record[todo].id}>
                                    <span className="subtitle" style= {{cursor:'pointer',}} id={this.props.record[todo].id} onClick ={e => this.props.pointer(this.props.record[todo])}>{this.props.record[todo].name}</span>
                                    
                                    <button className="OpenButton" onClick={e => this.props.ulonclick(index)}>O</button>
                                    
                                    <ul className="submenu" style={{display: this.props.ulstate.OpenOrClose[index] ? 'block' : 'none' }}>

                                            <li>{this.props.record[todo].address}</li>
                                            <li>{this.props.record[todo].coordinate}</li>
                                            <li>{this.props.record[todo].photo}</li>
                                            <li>{this.props.record[todo].remark}</li>

                                    </ul>
                                </li>    

                            )
                        })                      
                    }</Ful>
                }
            </Sbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        ulstate: state.ulstate,
        record: state.sfdata,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        ulonclick: id => {
            dispatch(ulonclick(id))
        },
        
        pointer: data => {
            dispatch(pointer(data))
        }
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)