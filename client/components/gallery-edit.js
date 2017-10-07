import React, { Component } from 'react';
import { NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import store from '../store';
import{PageHeader, Button} from 'react-bootstrap';


class GalleryEdit extends Component{
    
      render(){
        console.log("Gallery Edit PROPS",this.props);
        const currentGalleryId = this.props.match.params.id;
        const galleries = this.props.galleryCollection;
        const currentGallery = galleries.length && galleries.filter(gallery => +gallery.id === +currentGalleryId)[0];
        let artistName;
        let artistId;
        if(currentGallery){
          artistName =currentGallery.user.name;
          artistId= currentGallery.user.id;
        }
        console.log('CURRENT GALLERY', currentGallery);
        console.log('ArtistId', artistId);
        return (
            <div>
            <PageHeader>{currentGallery.title}
            <small style={{color:'blue'}}> By: 
            <Link to={`/artists/${artistId}`}>{`${artistName}`}</Link>
            </small>
          </PageHeader>
          <h3>Select a Picture for your Gallery Cover</h3>

          <h3>Add a painting</h3>
          <Link to={`/canvas?galleryid=${currentGalleryId}`}><Button type="submit" 
                    className="btn btn-success" 
                    style={{color:'#222'}} >Canvas
            </Button></Link>
            <h3>My Paintings</h3>
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
        );
    
    }
}



const mapState = (state, ownProps) => {
    return {
      galleryCollection: state.galleries.galleryCollection,
    };
  };
  
  export default connect(mapState)(GalleryEdit);