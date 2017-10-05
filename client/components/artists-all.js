import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {connect} from 'react-redux';

import store, {fetchUsers} from '../store';


class AllArtists extends Component {


  render(){
    console.log('PROPPPPSSSS', this.props);
    const artists = this.props.artistsCollection;
    console.log('ARTistS', artists);
    return (
      <div id="allGalleryBox">
      <h1>allArtists </h1>
        <div id="allGalleryRender">
          {
            artists && artists.map(artist => {
              return (
                <div key={artist.id}>
                  <h3 >
                    <Link to= {`/artists/${artist.id}`}>{artist.email}</Link>
                  </h3>
                </div>
              );
            })
          }
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

export default connect(mapState)(AllArtists);
