import React, { Component } from 'react';
import { NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import store from '../store';
import {Button} from 'react-bootstrap';

class SingleArtist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      profileImageUrl: '',
      bio: '',
      email: '',
      galleries: []
    }; 
  }

  

  componentWillReceiveProps(nextProps) {
    if (nextProps.artistsCollection.length !== this.props.artistsCollection.length) {

      const currentArtistId = nextProps.match.params.id;
      const artists = nextProps.artistsCollection;
      const currentArtist = artists.length && artists.filter(artist => +artist.id === +currentArtistId)[0];
      console.log('after filtering for curr artist', currentArtist);
      const galleries = currentArtist.galleries;
      console.log('current artist galleries', galleries);
      // this.paintings = currentArtist.galleries;

      const {name, profileImageUrl, bio, email} = currentArtist;

      this.setState({
        name,
        profileImageUrl,
        bio,
        email,
        galleries
      });

    } 
    // else {
    //   const currentArtistId = this.props.match.params.id;
    //   const artists = this.props.artistsCollection;
    //   const currentArtist = artists.length && artists.filter(artist => +artist.id === +currentArtistId)[0];
    //   console.log('after filtering for curr artist', currentArtist);
    //   const galleries = currentArtist.galleries;
    //   // this.paintings = currentArtist.galleries;

    //   const currentUser = this.props.currentUser;
    //   const {name, profileImageUrl, bio, email} = currentUser;

    //   this.setState({
    //     name,
    //     profileImageUrl,
    //     bio,
    //     email,
    //     galleries
    //   });
    // }
 
  }

  render(){
    const currentUser = this.props.currentUser;
    const currentArtist = this.state;
    console.log('currentUser', currentUser);
    console.log('currentArtist state', currentArtist);
   
    return (
      <div className="singleArtistContainer">
        <div id="profileColumn" className="col-md-4">
          <h2>{currentArtist.name}</h2>
          {
            currentUser.isLoggedIn &&
            ( <div>
              {/*TODO: Use a modal to edit user bio? */}
              <Button>Edit Profile</Button>
            </div>
            )
          }

          <img id="profilePic" src={currentArtist.profileImageUrl} />
          <h4>Biography</h4>
          <h5 style={{color: "blue"}}>{currentArtist.bio}</h5>
          <p />
          <p>{currentArtist.email}</p>
        </div>

        <div className="galleriesAndPaintings">
        <div>
        {
          currentUser.isLoggedIn && <Link className="btn btn-default" to="/gallery-create">New Gallery</Link>
        }
        </div>
          <div className= "singleUserGalleries">
            <h3>Galleries</h3>
            <div className="galleriesRow">
            {
              currentArtist.galleries && currentArtist.galleries.map(gallery=>{
                return(
                  <div className="innerGalleryBox" key={gallery.id}>
                  <Link className="singleUserGalleryLink" to={`/galleries/${gallery.id}`}>{gallery.title}</Link>
                  <img className="singleUserGalleryThumb" src={gallery.thumbnailUrl}/>
                  {
                    currentUser.isLoggedIn && <Link className="btn btn-warning edit-gallery-btn" to={`/gallery-edit/${gallery.id}`}>Edit</Link>
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
              this.galleries && this.galleries.map(gallery=>{
                return gallery.paintings.map(painting=>{
                  console.log(painting.url);
                  return (
                    <div className="innerGalleryBox" key={painting.id}>
                      <img className="singleUserGalleryThumb" src={painting.url}/>
                      <Link to={`/paintings/${painting.id}`} className="singleUserPaintingName">{painting.name}</Link>
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
