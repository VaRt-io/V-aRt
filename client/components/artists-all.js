import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

class AllArtists extends Component {


  render(){
    const artists = this.props.artistsCollection;
    return (
      <div id="allGalleryBox">
      <h1>All Artists</h1>
        <div id="allGalleryRender">
          {
            artists && artists.map(artist => {
              return (
              <div className="renderedBox col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3" key={artist.id}>
                <div className="innerRenderedBox">
                  <img id="allGalleryThumb" src={artist.profileImageUrl} />
                  <div style={{marginTop: '15px'}}>
                    <Link id="allGalleriesText" to= {`/artists/${artist.id}`}>{artist.name}</Link>

                  </div>

              </div>

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
