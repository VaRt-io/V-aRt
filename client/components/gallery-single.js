import React, { Component } from 'react';
import { NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import store from '../store';
import {Jumbotron} from 'react-bootstrap';
import {OurPageHeader, DisplayPaintings, OurJumbotron } from './index';


class SingleGallery extends Component{

  render(){
    console.log('SINGL GALLERY PROPS', this.props);
    const currentGalleryId = this.props.match.params.id;
    console.log(currentGalleryId);
    const galleries = this.props.galleryCollection;
    const currentGallery = galleries.length && galleries.filter(gallery => +gallery.id === +currentGalleryId)[0];
    const bgImage = currentGallery.thumbnailUrl;
    let artistName;
    let artistId;
    if(currentGallery){
      artistName =currentGallery.user.name;
      artistId= currentGallery.user.id;
    }
    console.log('CURRENT GALLERY', currentGallery);
    console.log('ArtistId', artistId);
    console.log(OurJumbotron)
    return (
      <div className="singleGalleryContainer">
        <OurPageHeader artistName={artistName} artistId={artistId} 
        currentGallery={currentGallery}/>
      
        <div id="enterVRButton" style={{textAlign: 'center', marginTop:'10px', marginBottom:'50px'}}>
          <Link to={{pathname: `/galleries/${currentGalleryId}/vr/nightscene`}} ><button className="btn btn-danger" style={{backgroundColor: 'red', fontSize:'20px'}}>Enter VR</button></Link>
        </div>
        
        <OurJumbotron currentGallery={currentGallery} />
      
        <h3>user images in this gallery</h3>
        <DisplayPaintings currentGallery={currentGallery} />   
        <Link to={`/canvas?galleryid=${currentGalleryId}`}><button className="btn btn-success">Create an Image</button></Link>
      </div>
    );
  }

}

const mapState = (state, ownProps) => {
  return {
    galleryCollection: state.galleries.galleryCollection,
  };
};

export default connect(mapState)(SingleGallery);
