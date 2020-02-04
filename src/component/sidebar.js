import React, { Component } from 'react';
import styled, {keyframes }from 'styled-components'
import {test, ulonclick, pointer} from '../actions/index'
import { connect } from "react-redux";
import { ReactComponent as Minus } from '../icon/arrowLeft.svg'
import { ReactComponent as Plus } from '../icon/arrowRight.svg'
import { ReactComponent as Blog } from '../icon/blog.svg'


const Button = styled.button`

float: right;
z-index: 3;

`
const SideDiv = styled.div`
background: black;
margin:0 0 0 0;
height: 100%;
z-index:3;

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
.OpenButton{
    float: right;
    opacity: 0.2;
    transition: opacity .35s ease;
    display: inline;
    g {
    
        fill: #DB7290;;
    }
    g path {
        
        stroke: #DB7290;;
        fill: #FFD0DD;
        
    }
    
    max-width: 30px; 
    max-height: 30px;
    text-align: right;
}
.OpenButton:hover{
    float: right;
    opacity: 1;
}
`
const iconrotate = keyframes`


    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(45deg);
    }

`

const SlideFromLtoR = keyframes`

    
        from{
            width: 0%
        }
        to{
            width: 25%
        }
    
    
`
const SlideFromRtoL = keyframes`

    {
        from{
            width: 25%
        }
        to{
            width: 0%
        }
    
    
`
const Icondiv = styled.div`
    
    background:${props=> (props.clickstate ? 'rgba(0,0,0,.075)' : 'rgba(0,123,255,.25)')};
    float: left;
    display: inline;
    position: absolute;
    .App-minus g {
    
        fill: #DB7290;;
    }
    .App-minus g path {
        
        stroke: #DB7290;;
        fill: #FFD0DD;
        
    }
    .App-minus {
        max-width: 30px; 
        max-height: 30px;
        text-align: right;
        
        
    }
    width: 30px;
    
    z-index: 4;
    
    `
const H = styled.div``
const Sbar = styled.div`
    
    
    float: left;
    display: block;
    @media (min-width:375px) {
        
        height: 250px;
        width: 35%;
        margin: 0 auto;
        
    }
    @media (min-width:768px) {
        
        height: 720px;
        width: 15%;
        margin: 0 auto;
        
    }
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
    
    
    onclick =async () =>{
        this.setState({
            clickstate: !this.state.clickstate,
            
        })
        /* 
        await fetch('/app')
         .then(response => response.json())
      
         .then(posts => this.props.test(posts[0]))
        */
        //console.log(Object.keys(this.props.record).length)
        //console.log(typeof(this.props.record.id))
        //console.log(this.props.record.id)
        
    }



    

    render() {
        //console.log(this.props.record)
        return (
            <SideDiv className="SideDiv">
                
                <Sbar style= { { opacity: 0.5 }} clickstate = {this.state.clickstate}>
                    <H>{this.props.testOBJ.blog}</H>
                    { !this.state.clickstate ? '' :<Ful>
                        
                        {    //console.log(this.props.record),
                            !this.props.record?"this.props.record.map":Object.keys(this.props.record).map((todo, index)=>{
                                return(

                                    //console.log(this.props.record[todo].id),
                                    //console.log(index),
                                    <li className="subli" key={this.props.record[todo].id}>
                                        <span className="subtitle" style= {{cursor:'pointer',}} id={this.props.record[todo].id} onClick ={e => this.props.pointer(this.props.record[todo])}>{this.props.record[todo].name}</span>
                                        <div style={{width:'25px', display: 'inline-block' , float: 'right'}}>
                                        <Blog className="OpenButton" onClick={e => this.props.ulonclick(todo) } >O</Blog>
                                        </div>
                                    </li>    

                                )
                            })                      
                        }</Ful>
                    }
                </Sbar>
                <Icondiv clickstate = {this.state.clickstate}>
                    { !this.state.clickstate ? 
                    
                        <Plus onClick = {this.onclick} className="App-minus"/>
                    
                        :<Minus onClick = {this.onclick} className="App-minus" />}
                </Icondiv>
            </SideDiv>
        )
    }
}

const mapStateToProps = state => {
    return {
        ulstate: state.ulstate,
        record: state.sfdata,
        testOBJ: state.test,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ulonclick: id => {
            dispatch(ulonclick(id))
        },
        
        pointer: data => {
            dispatch(pointer(data))
        },
        test: testi =>{
            dispatch(test(testi))
          },
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)