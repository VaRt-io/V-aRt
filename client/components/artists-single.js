import React, { Component } from 'react';
import { NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import store from '../store';
import {Button} from 'react-bootstrap';

class SingleArtist extends Component{

  render(){
    // console.log('SINGL Artist PROPS', this.props);
    const currentArtistId = this.props.match.params.id;
    // console.log(currentArtistId);
    const artists = this.props.artistsCollection;
    const currentArtist = artists.length && artists.filter(artist => +artist.id === +currentArtistId)[0];
    const galleries = currentArtist.galleries;
    const paintings = currentArtist.galleries;
    const currentUser = this.props.currentUser;
    // console.log('current Artist', currentArtist);
    // console.log("GaLlERiEs", galleries);
    return (
      <div className="singleArtistContainer">
        <div id="profileColumn" className="col-md-4">
          <h2>{currentArtist.name}</h2>
          <img id="profilePic" src={currentArtist.profileImageUrl} />
          <h4>Biography</h4>
          <h5 style={{color: "blue"}}>{currentArtist.bio}</h5>
          <p />
          <p>{currentArtist.email}</p>
        </div>

        <div className="galleriesAndPaintings">
        <div>
        {
          /*
        TODO: Conditionally render button to link to create new allery page
        */
        }
        {
          currentUser.isLoggedIn && <Link className="btn btn-default" to="/gallery-create">New Gallery</Link> 
        }
        </div>
          <div className= "singleUserGalleries">
            <h3>Galleries</h3>
            <div className="galleriesRow">
            {
              galleries && galleries.map(gallery=>{
                return(
                  <div className="innerGalleryBox" key={gallery.id}>
                  <Link className="singleUserGalleryLink" to={`/galleries/${gallery.id}`}>{gallery.title}</Link>                  
                  <img className="singleUserGalleryThumb" src={gallery.thumbnailUrl}/>
                  {
                    /*
                    TODO: Conditionally render button to link to edit gallery page
                    */
                    currentUser.isLoggedIn && <Link className="btn btn-warning edit-gallery-btn" to='/gallery-edit'>Edit</Link>
                  }
                  </div>
                );
              })
            }
          
            </div>
          </div>

          <div className= "singleUserPaintings">
          <h3>Paintings</h3>
            <div className="paintingsRow">
            {
              galleries && galleries.map(gallery=>{
                return gallery.paintings.map(painting=>{
                  console.log(painting.url);
                  return (
                    <div className="innerGalleryBox" key={painting.id}>
                      <img className="singleUserGalleryThumb" src={painting.url}/>
                      <Link to="#">Painting Name</Link>
                    </div>
                  );
                });
              })
            }
            
            </div>
          </div>
        </div>

      </div>
    );
  }

}


const mapState = (state, ownProps) => {
  return {
    artistsCollection: state.users.artistsCollection,
    currentUser: state.currentUser
  };
};

export default connect(mapState)(SingleArtist);
