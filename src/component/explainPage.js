import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { connect } from "react-redux";
import {pagestate} from '../actions/index'
import searchExample from '../icon/searchExample.png'
import tools from '../icon/tools.png'
import popupform from '../icon/popupform.png'
import sidebar from '../icon/sidebar.png'
import '../App.css'


class ExplainPage extends Component {
    constructor() {
      super()
      
    }
    render() {
        return (
            <>
                <Modal show = {this.props.pagestate} onHide = {this.props.ppagestate} >
                    
                      <Modal.Header closeButton >
                        <Modal.Title>歡迎來到阿震的小空間 !!! <h6>(持續開發中)</h6></Modal.Title>
                      </Modal.Header>

                      <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto'}}>
                      <Form id="myForm">
                        
                        <Form.Group controlId="formBasicImage">
                          <Form.Text className="text-muted">
                            <h2>以下是操作教學</h2>
                            
                            <ul>
                                <h4>ToolBar</h4>
                                    <li className = "toolbarPoints">位於網頁最頂層的黑色區塊</li>
                                    <li className = "toolbarPoints">最左邊可以點選切換圖層</li>
                                    <li className = "toolbarPoints">點擊 Tools 會顯示繪圖工具列於右側</li>
                                    <img src={tools} style={{ width:'20%', display:'block'}} ></img>
                                    <li className = "toolbarPoints">import File 此功能尚在開發中，敬請期待!!!</li>
                                    <li className = "toolbarPoints">最右側的搜尋列可以輸入想搜尋的地理位置 EX: 台北車站</li>
                                    <img src={searchExample} style={{ width:'80%', display:'block'}} ></img>
                                    <p>點選加入圖層後就能新增註解(包含圖片、長篇網誌)</p>
                                    <li className = "toolbarPoints">每個圖層都能加入註解、圖片以及網誌(點選右下角圖示)</li>
                                    <img src={popupform} style={{ width:'80%', display:'block'}} ></img>
                                <h4>SideBar</h4>
                                    <li className = "toolbarPoints" > 已加入的圖層則會顯示在地圖以及側邊黑框中</li>
                                    <img src={sidebar} style={{ width:'80%', display:'block'}} ></img>
                            </ul>

                            
                            
                          </Form.Text>  
                          
                        </Form.Group>
                        
                      </Form>
                      </Modal.Body>

                      <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.ppagestate}> 我瞭解了~ </Button>
                        
                      </Modal.Footer>
                    
                </Modal>
            </>
        )
    }

}


const mapStateToProps = state =>{
    return {
        pagestate: state.pagestate,
        

    }
}

const mapDispatchToProps = dispatch => {
    return {
        ppagestate: () => {
            dispatch(pagestate())
        },
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExplainPage)