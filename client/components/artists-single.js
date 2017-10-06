import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import store from '../store';

class SingleArtist extends Component{

  render(){
    console.log('SINGL Artist PROPS', this.props);
    const currentArtistId = this.props.match.params.id;
    console.log(currentArtistId);
    const artists = this.props.artistsCollection;
    const currentArtist = artists.length && artists.filter(artist => +artist.id === +currentArtistId)[0];

    console.log('current Artist', currentArtist);
    return (
      <div>
        <div id="profileColumn" className="col-md-3">
          <h1>{currentArtist.name}</h1>
          <img id="profilePic" src={currentArtist.profileImageUrl} />
          <h4 style={{color: "blue"}}>{currentArtist.bio}</h4>
          <p />
          <p>{currentArtist.email}</p>

        </div>
      </div>
    );
  }

}


const mapState = (state, ownProps) => {
  return {
    artistsCollection: state.users.artistsCollection
  };
};

export default connect(mapState)(SingleArtist);
