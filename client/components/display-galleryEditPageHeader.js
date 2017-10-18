import React from 'react';
import {Form, FormGroup, Col, FormControl, ControlLabel} from 'react-bootstrap';

export default function GalleryEditPageHeader (props){

    const title = props.title;
    const handleChange = props.handleChange;

    return (
        <Form horizontal style={{marginTop: '20px'}} onSubmit={(evt) => evt.preventDefault()}>
        <FormGroup controlId="formHorizontalTitle" id="editGalleryPageHeader">
          <Col
            style={{marginTop: '-30px', marginLeft: '-80px', marginBottom: '-30px', marginRight: '-20px'}}
          componentClass={ControlLabel} sm={2}>
          <h1><span id= "glyphpencil" style={{color: '#c32aff'}} className="glyphicon glyphicon-pencil" /></h1>
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              name="title"
              className = "galleryEditNameHead"
              value= {title}
              onChange={handleChange}
              style={{backgroundColor: '#333030', color: '#1ec503', border: 'none', fontSize: '36px', width: '50%', height: '48px'}} />
          </Col>
        </FormGroup>
        </Form>
        );

}
