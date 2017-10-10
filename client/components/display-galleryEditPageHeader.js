import React from 'react';
import {Link} from 'react-router-dom';
import {PageHeader, Form, FormGroup, Col, FormControl, ControlLabel} from 'react-bootstrap';

export default function GalleryEditPageHeader (props){
    // console.log("displayPaintings PrOps",props)
    // const currentGallery= props.currentGallery;
    // const artistName = props.artistName;
    // const artistId = props.artistId;
    const title = props.title;
    const handleChange = props.handleChange;
    console.log("PRops", props.title);

    function stopRefresh (e){
      e.preventDefault();
    }

    return(
        <Form horizontal onSubmit={(e)=> e.preventDefault()}>
        <FormGroup controlId="formHorizontalTitle" id="editGalleryPageHeader">
          <Col style={{marginTop: '-30px', marginLeft:'-80px', marginBottom: '-30px',marginRight: '-20px'}}
          componentClass={ControlLabel} sm={2}>
          <h1><span id= "glyphpencil" class="glyphicon glyphicon-pencil"></span></h1>
          </Col>
          <Col sm={10}>
            <FormControl 
              type="text" 
              name="title"
              className = "galleryEditNameHead"
              value= {title}
              onChange={handleChange}
              style={{backgroundColor:'#333030', color: 'green', border:'none', fontSize: '36px', width: '50%'}}/>
          </Col>
        </FormGroup>
        </Form>
        );

}