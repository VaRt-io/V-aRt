import React, { Component } from 'react';
import { NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import store, {updateUserThunk} from '../store';
import {Button} from 'react-bootstrap';

class SingleArtist extends Component {

  constructor(props) {
    super(props);

    const currentArtistId = this.props.match.params.id;
    const artists = this.props.artistsCollection;
    const currentArtist = artists.length && artists.filter(artist => +artist.id === +currentArtistId)[0];

    const {id, name, profileImageUrl, bio, email, galleries} = currentArtist;

    this.state = {
      id,
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

      const {id, name, profileImageUrl, bio, email} = currentArtist;

      this.setState({
        id,
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
    const userState = Object.assign({}, this.state, {password: this.props.currentUser.password} );
    delete userState.galleries;
    this.props.updateUser(userState);
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
              onBlur={this.handleOnBlur}
              />
              <span className="glyphicon glyphicon-edit floatLeft"></span> 
            </div>
            ) : (
          <h5 style={{color: "blue"}}>{currentArtist.bio}</h5>          
            )
          }
          <p />
              <p>{currentArtist.email}</p>          
        </div>

        <div className="galleriesAndPaintings">
        <div style={{marginBottom: '40px', marginTop: '20px'}}>
        {
          this.checkIfOwnProfile() && <Link className="btn btn-default" to="/gallery-create">New Gallery</Link>
        }
        
        <Link to={`/vr/artists/${currentArtist.id}/:env`}>
        <Button style={{backgroundColor:'red', color:'#222', marginLeft: '50px',padding: '10px 15px'}} className="btn btn-danger">Enter VR</Button>
        </Link>
        
        </div>
          <div className= "singleUserGalleries">
            <h3>Galleries</h3>
            <hr/>
            
            <div className="galleriesRow">
            {
              currentArtist.galleries && currentArtist.galleries.map(gallery=>{
                return (
                  <div className="innerGalleryBox" key={gallery.id}>
                  <img className="singleUserGalleryThumb" src={gallery.thumbnailUrl} />
                  <Link className="singleUserGalleryLink" to={`/galleries/${gallery.id}`}>{gallery.title}</Link>
                  {
                    this.checkIfOwnProfile() && <Link style={{backgroundColor:'#c32aff', color: 'black'}} className="btn btn edit-gallery-btn" to={`/gallery-edit/${gallery.id}`}>Edit</Link>
                  }
                  {
                    this.checkIfOwnProfile() && <Link  style={{ backgroundColor: 'maroon',marginTop: '5px', color: 'black'}} className="btn btn-danger  edit-gallery-btn" to={`/gallery-edit/${gallery.id}`}>Delete</Link>
                  }
                  </div>
                );
              })
            }

            </div>
          </div>

          <div className= "singleUserPaintings">
          <h3>Paintings</h3>
          <hr/>
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

const mapDispatch = (dispatch) => {
  return {
    updateUser: (user) => {
      delete user.password;
      dispatch(updateUserThunk(user));
    }
  };
};

export default connect(mapState, mapDispatch)(SingleArtist);

// {
//   currentUser.isLoggedIn &&
//   ( <div>
//     {/*TODO: Use a modal to edit user bio? */}
//     <Button>Edit Profile</Button>
//   </div>
//   )
// }
