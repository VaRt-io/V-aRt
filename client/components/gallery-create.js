import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postGalleryThunk } from '../store';
import { FormGroup, FormControl, ControlLabel, Form, Col, Button } from 'react-bootstrap';

class CreateGallery extends Component{

  constructor(props){
    super(props);
    this.state = {
      title: '',
      thumbnailUrl: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    const value = event.target.value;

    this.setState({
      [event.target.name]: value
    });
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  render(){
    const userId = this.props.currentUser.id;

    const handleChange = this.handleChange;

    return (

      <Form horizontal className=" formBox" onSubmit={(evt) => this.props.handleSubmit(evt, userId)}>
      <FormGroup controlId="formHorizontalTitle">
        <Col componentClass={ControlLabel} sm={2}>
          Gallery Name
        </Col>
        <Col sm={10}>
          <FormControl
            type="text"
            name="title"
            value= {this.state.title}
            placeholder="Enter new gallery name"
            onChange={handleChange}
            style={{backgroundColor: 'grey', color: 'lightgreen'}} />
        </Col>
      </FormGroup>


      <FormGroup>
        <Col smOffset={2} sm={10}>
        <Button type="submit" className="btn btn-success" style={{color: '#222'}} >Submit</Button>
        </Col>
      </FormGroup>
    </Form>

    );
  }

}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(event, userId){
      event.preventDefault();
      const title = event.target.title.value;
      const thumbnailUrl = null;
      const history = ownProps.history;
      dispatch(postGalleryThunk( { title, userId }, history ));
    }
  };
};

const mapState = ({currentUser}) => ({currentUser});

export default connect(mapState, mapDispatch)(CreateGallery);
