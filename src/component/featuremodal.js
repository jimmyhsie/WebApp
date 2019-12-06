import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { connect } from "react-redux";
import {modalstate, } from '../actions/index'

class Featuremodal extends Component {
    constructor() {
      super()
      
    }
    render() {
        return (
            <>
                <Modal show = {this.props.mmodalstate} onHide = {this.props.modalstate}>
                    
                      <Modal.Header closeButton >
                        <Modal.Title>匯入檔案</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                      <Form>
                        
                        <Form.Group controlId="formBasicImage">
                          <Form.Text className="text-muted">
                            Please input GPX/Image/Raster/Vecter file
                          </Form.Text>  
                          <Form.Label  ></Form.Label>
                          <Form.Control type="file" placeholder="Image/Raster/PNG..." />
                        </Form.Group>
                        
                      </Form>
                      </Modal.Body>

                      <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.modalstate}> 結束 </Button>
                        <Button variant="primary"> 送出 </Button>
                      </Modal.Footer>
                    
                </Modal>
            </>
        )
    }

}


const mapStateToProps = state =>{
    return {
        mmodalstate: state.modalstate

    }
}

const mapDispatchToProps = dispatch => {
    return {
        modalstate: mboolean => {
            dispatch(modalstate(mboolean))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Featuremodal)