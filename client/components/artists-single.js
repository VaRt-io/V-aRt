import React, { Component } from 'react';
import { NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import store from '../store';
import {Button} from 'react-bootstrap';

class SingleArtist extends Component {

  constructor(props) {
    super(props);

    const currentArtistId = this.props.match.params.id;
    const artists = this.props.artistsCollection;
    const currentArtist = artists.length && artists.filter(artist => +artist.id === +currentArtistId)[0];

    const {name, profileImageUrl, bio, email, galleries} = currentArtist;

    this.state = {
      name,
      profileImageUrl,
      bio,
      email,
      galleries,
    }; 

    this.checkIfOwnProfile = this.checkIfOwnProfile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.artistsCollection.length !== this.props.artistsCollection.length) {
      const currentArtistId = nextProps.match.params.id;
      const artists = nextProps.artistsCollection;
      const currentArtist = artists.length && artists.filter(artist => +artist.id === +currentArtistId)[0];
      const galleries = currentArtist.galleries;

      const {name, profileImageUrl, bio, email} = currentArtist;

      this.setState({
        name,
        profileImageUrl,
        bio,
        email,
        galleries
      });
    } 
  }

  checkIfOwnProfile() {
    // check if logged in user id is the same as the one on the url
    const currentArtistId = +this.props.match.params.id;
    const currentUser = this.props.currentUser;
    if (currentUser.isLoggedIn && currentUser.id === currentArtistId) {
      return true;
    } 
    return false;
  }

  handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    this.setState({
      [name]: value
    });
  }

  handleOnBlur(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    console.log('blurred', name, value);
  }

  render(){

    const currentArtist = this.state;
    const currentUser = this.props.currentUser;
   // TODO: Add user input version of name, biography, and email
   // TODO: Allow to delete galleries and images from dashboard
   // TODO: Dispatch a thunk to put information
    return (
      <div className="singleArtistContainer">
        <div id="profileColumn" className="col-md-4">
           {
             this.checkIfOwnProfile() ? (
              <div>
                <input 
                autoFocus 
                type="text" 
                name="name"
                className="singleArtistDashboardNameInput" 
                value={currentArtist.name} 
                onChange={this.handleChange}
                onBlur={this.handleOnBlur}
                />
                <span className="glyphicon glyphicon-edit floatLeft"></span>              
              </div>
             ) : (
              <h2>{currentArtist.name}</h2>          
             )
           }

          <img id="profilePic" src={currentArtist.profileImageUrl} />
          <h4>Biography</h4>
          {
            this.checkIfOwnProfile() ? (
            <div>
              <input  
              type="text" 
              name="bio"
              className="singleArtistDashboardBioInput" 
              value={currentArtist.bio} 
              onChange={this.handleChange}
              />
              <span className="glyphicon glyphicon-edit floatLeft"></span> 
            </div>
            ) : (
          <h5 style={{color: "blue"}}>{currentArtist.bio}</h5>          
            )
          }
          <p />
          {
            this.checkIfOwnProfile() ? (
            <div>
              <input  
                type="text" 
                name="bio"
                className="singleArtistDashboardEmailInput" 
                value={currentArtist.email} 
                onChange={this.handleChange}
              />
              <span className="glyphicon glyphicon-edit floatLeft"></span> 
             </div>
            ) : (
              <p>{currentArtist.email}</p>          
            )
          }
        </div>

        <div className="galleriesAndPaintings">
        <div>
        {
          this.checkIfOwnProfile() && <Link className="btn btn-default" to="/gallery-create">New Gallery</Link>
        }
        </div>
          <div className= "singleUserGalleries">
            <h3>Galleries</h3>
            <div className="galleriesRow">
            {
              currentArtist.galleries && currentArtist.galleries.map(gallery=>{
                return (
                  <div className="innerGalleryBox" key={gallery.id}>
                  <Link className="singleUserGalleryLink" to={`/galleries/${gallery.id}`}>{gallery.title}</Link>
                  <img className="singleUserGalleryThumb" src={gallery.thumbnailUrl} />
                  {
                    this.checkIfOwnProfile() && <Link className="btn btn-warning edit-gallery-btn" to={`/gallery-edit/${gallery.id}`}>Edit</Link>
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
              currentArtist.galleries && currentArtist.galleries.map(gallery =>{
                return gallery.paintings.map(painting =>{

                  return (
                    <div className="innerGalleryBox" key={painting.id}>
                      <img className="singleUserGalleryThumb" src={painting.url} />
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

// {
//   currentUser.isLoggedIn &&
//   ( <div>
//     {/*TODO: Use a modal to edit user bio? */}
//     <Button>Edit Profile</Button>
//   </div>
//   )
// }
