import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { connect } from "react-redux";
import {blogmodalstate, handleBlog, bloghandleSubmit} from '../actions/index'

class Blogmodal extends Component {
    constructor() {
      super()
      
    }
    render() {
        return (
            <>
                <Modal show = {this.props.bblogmodalstate} onHide = {this.props.blogmodalstate} >
                    
                      <Modal.Header closeButton >
                        <Modal.Title>寫點遊記吧!!!</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                      <Form id="myForm">
                        
                        <Form.Group controlId="formBasicImage">
                          <Form.Text className="text-muted">
                            寫點遊記吧!!!
                          </Form.Text>  
                          <Form.Label  ></Form.Label>
                          <textarea id='blogText' className="form-control" value={this.props.blog} onChange={e=>this.props.handleBlog(e.target.value)}></textarea>
                        </Form.Group>
                        
                      </Form>
                      </Modal.Body>

                      <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.blogmodalstate}> 結束 </Button>
                        <Button variant="primary" form="myForm" onClick={e=>{this.props.bloghandleSubmit(this.props.blog);alert('檔案已儲存')}} > 儲存 </Button>
                      </Modal.Footer>
                    
                </Modal>
            </>
        )
    }

}


const mapStateToProps = state =>{
    return {
        bblogmodalstate: state.blogmodalstate,
        blog: state.fdata.blog,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        blogmodalstate: mboolean => {
            dispatch(blogmodalstate(mboolean))
        },
        bloghandleSubmit:blog => {
          dispatch(bloghandleSubmit(blog))
        },
        handleBlog:blog => {
          dispatch(handleBlog(blog))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogmodal)