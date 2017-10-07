import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { postGalleryThunk } from '../store';

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

  render(){
    const currentGalleryId = this.props.match.params.id;

    const handleChange = this.handleChange;

    const galleries = this.props.galleryCollection;

    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            <label>Add a Gallery: </label>
            <br />
            <input
              type="text"
              name="title"
              value= {this.state.title}
              placeholder="Enter new gallery name"
              onChange={handleChange} />
            <br />
            <input
              type="text"
              name="thumbnailUrl"
              value= {this.state.thumbnailUrl}
              placeholder="Enter gallery thumbnail"
              onChange={handleChange} />
          </div>
          <br />
          <div>
            <button type="submit" className="button" >Submit</button>
          </div>
        </form>
      </div>
    );
  }

}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(event){
      event.preventDefault();
      const title = event.target.title.value;
      const thumbnailUrl = event.target.thumbnailUrl.value;

      dispatch(postGalleryThunk( {
        title,
        thumbnailUrl
      } ));
    }
  };
};

export default connect(null, mapDispatch)(CreateGallery);
