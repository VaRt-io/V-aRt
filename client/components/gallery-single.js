import React, { Component } from 'react';
import { NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import store from '../store';
import {Jumbotron} from 'react-bootstrap';
import {OurPageHeader, DisplayPaintings, OurJumbotron } from './index';


class SingleGallery extends Component{

  checkIfOwnGallery() {
      // get array of all artist's own galleries by filtering galleries by ones that have his user id
      // check if currentGalleryId is within that array of filtered gallaries
    
    const currentUserId = this.props.currentUser.isLoggedIn && this.props.currentUser.id;
    const currentGalleryId = +this.props.match.params.id;

    const ownGalleries = this.props.galleryCollection
                          .filter((gallery) => currentUserId === gallery.userId)
                          .map((filteredGalleries) => filteredGalleries.id);

    console.log('own galleries', ownGalleries);
    console.log('currentGalleryid', currentGalleryId);

    if (ownGalleries.includes(currentGalleryId)) {
      console.log('own gallery');
      return true;
    } else {
      console.log('not own gallery');
      return false;
    }
  }

  render(){
    const currentGalleryId = this.props.match.params.id;
    const galleries = this.props.galleryCollection;
    const currentGallery = galleries.length && galleries.filter(gallery => +gallery.id === +currentGalleryId)[0];
    const bgImage = currentGallery.thumbnailUrl;
    let artistName;
    let artistId;
    if(currentGallery){
      artistName =currentGallery.user.name;
      artistId= currentGallery.user.id;
    }
    return (
      <div className="singleGalleryContainer">
        <OurPageHeader artistName={artistName} artistId={artistId} 
        currentGallery={currentGallery}/>
      
        <div id="enterVRButton" style={{textAlign: 'center', marginTop:'10px', marginBottom:'50px'}}>
          <Link to={{pathname: `/galleries/${currentGalleryId}/vr/nightscene`}} ><button className="btn btn-danger" style={{backgroundColor: 'red', fontSize:'20px'}}>Enter VR</button></Link>
        </div>
        
        <OurJumbotron currentGallery={currentGallery} />
      
        <h3>My Paintings</h3>
        <DisplayPaintings currentGallery={currentGallery} />   
        <div className="single-gallery-create-painting-wrapper">
        {
          // Render if gallery belongs to user
          this.checkIfOwnGallery() && (
            <Link to={`/canvas?galleryid=${currentGalleryId}`} className="btn btn-success">Create New Painting</Link>
          )
        }
        </div>
      </div>
    );
  }

}

const mapState = (state, ownProps) => {
  return {
    galleryCollection: state.galleries.galleryCollection,
    currentUser: state.currentUser
  };
};

export default connect(mapState)(SingleGallery);
