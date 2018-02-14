import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

class AllGalleries extends Component{

  render(){
    const galleries = this.props.galleryCollection;

    return (
      <div id="allGalleryBox">
        <h1>All Galleries</h1>
        <div id="allGalleryRender">
          {
            galleries && galleries.map(gallery => {
              return (
                <div className="renderedBox col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3" key={gallery.id}>
                  <div className="innerRenderedBox">
                    <img id="allGalleryThumb" src={gallery.thumbnailUrl} />
                    <div style={{marginTop: '15px'}}>
                      <Link id="allGalleriesText" to= {`/galleries/${gallery.id}`}>{gallery.title}</Link>
                      <h5 id="byline">By
                      <Link to= {`/artists/${gallery.user.id}`}> {gallery.user.name}</Link>
                      </h5>
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
    galleryCollection: state.galleries.galleryCollection,
  };
};

export default connect(mapState)(AllGalleries);
