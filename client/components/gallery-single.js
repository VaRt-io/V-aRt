import React, { Component } from 'react';
import { NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import store from '../store';
import {Jumbotron, PageHeader} from 'react-bootstrap';

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
    return (
      <div className="singleGalleryContainer">
        <PageHeader>{currentGallery.title}
          <small style={{color:'blue'}}> By: 
          <Link to={`/artists/${artistId}`}>{`${artistName}`}</Link>
          </small>
        </PageHeader>

      
        <div id="enterVRButton" style={{textAlign: 'center', marginTop:'10px', marginBottom:'50px'}}>
          <Link to="/vr" ><button className="btn btn-danger" style={{backgroundColor: 'red', fontSize:'20px'}}>Enter VR</button></Link>
        </div>
        
        <Jumbotron id="jumbo"  style={{backgroundImage: `url(${currentGallery.thumbnailUrl})`,
                          width: '75%',
                          height: '400px',
                          textAlign: 'center',
                          margin: 'auto',
                          backgroundPosition: 'center center',
                          color: 'white',
                          fontSize: '30px',
                          marginTop: '0px'}}>
        
        {currentGallery.title}</Jumbotron>
       
      
        <h3>user images in this gallery</h3>
        <div className="userImagesInGalleryRow">
        {
          currentGallery && currentGallery.paintings.map(painting=>{
            return(
              <div className="paintingsBox" key={painting.id}>
              <img className="singleUserGalleryThumb" src={painting.url}/>
              <Link to="#">Painting Name</Link>
              </div>
            );
          })
        }
        </div>
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
