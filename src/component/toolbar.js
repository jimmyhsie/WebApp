import React, { Component } from 'react'
import styled  from 'styled-components'
import Geocode  from 'react-geocode'
import {modalstate, Geo, AupdateInputText, AhandleChange, mapcursor, toolstate, changeuserstatus} from '../actions/index'
import { connect } from "react-redux";
import { ReactComponent as Search } from '../icon/search.svg'
import { ReactComponent as Map } from '../icon/map.svg'
import { ReactComponent as User } from '../icon/user.svg'
import { Redirect,Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import FormControl from 'react-bootstrap/FormControl'


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

    path {
        
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

    componentDidMount() {
        fetch('/app/user/auth', {
            headers: {
                'Content-Type': 'application/json'
              },
            method: "get",
        })
        .then(response => response.json())
        .then(loginstate => {this.props.changeuserstatus(loginstate); console.log(typeof(loginstate),loginstate)})
    }
    
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
        event.preventDefault()
        let text = event.target.value
        this.props.AupdateInputText(text)
        console.log(text)
        if(event.charCode ==13 ){
            
            this.geoFirist(text);
        }
        
      }

    handleChange(event) {
      let id = event.target.value
      this.props.AhandleChange(id)
      
    }  
    
    userAuth(userloginstatus) {
         
        
        
        
        if(!userloginstatus[0]){
            return (
                <Nav className="justify-content-end">
                    <Nav.Link href="/login" >登入</Nav.Link>
                    <Nav.Link href="/userRegist" >註冊</Nav.Link>
                </Nav>
            )
        }else{
            return (
                
                <NavDropdown title={userloginstatus[1]} alignRight id="basic-nav-dropdown"  >
                    <NavDropdown.Item href="/userinf" >用戶資訊</NavDropdown.Item>
                    <NavDropdown.Item href="/logout">登出</NavDropdown.Item>
                </NavDropdown>
                
                
            )
        }
    }


    render() {
        //console.log(this.props.toolsta)
        return(
            
            <Navbar bg="light" expand="sm">
              <Navbar.Brand href="/">旅行戳記</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              
              <Navbar.Collapse id="basic-navbar-nav">
                <Map className ='icon' width={35} style={{ display: 'inline-block'}}  ></Map>  
                <Nav className="mr-auto">
                
                <Form.Control as="select" value={this.props.LayerId} onChange={(event) => this.handleChange(event)}>
                    {LayerList.map((todo, index)=>{
                            return(
                                <option key={todo.id}
                                value={todo.id}>{todo.name}
                                </option>
                            )
                        })
                    } 
                </Form.Control>
                  
                <Nav.Link href="#" onClick={e => this.props.toolstate(this.props.toolsta)}>Tool</Nav.Link>
                <Nav.Link href="#" onClick={this.props.modalstate}>importfile </Nav.Link>
                  
                </Nav>
                <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" 
                    onChange={(event) => this.updateInputText(event)} 
                    value = {this.props.inputText}   
                    placeholder='請輸入地址'
                    onKeyPress={(event) => this.updateInputText(event)}/>
                  <Search className ='icon' width={25} style={{cursor:'pointer', float:'right', display: 'inline-block'}}  onClick={ () => this.geoFirist(this.props.inputText)}></Search>
                  
                </Form>
                
                { this.userAuth(this.props.userloginstatus)}
              
              </Navbar.Collapse>  
              
            </Navbar>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        inputText: state.inputText,
        LayerId: state.LayerId,
        toolsta: state.toolsta,
        userloginstatus:state.userloginstatus,

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
        changeuserstatus: loginstatus => {
            dispatch(changeuserstatus(loginstatus))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar)