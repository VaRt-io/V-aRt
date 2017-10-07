import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {connect} from 'react-redux';
import store from '../store';

class AllGalleries extends Component{
 
  render(){
    console.log('PROPPPPSSSS', this.props);
    const galleries = this.props.galleryCollection;
    const artistName = galleries.user;
    console.log("HELLLLOOOO")
    console.log('GALLERies', galleries);
    console.log('ArTIstNaMe', artistName);

  
    return (
      <div id="allGalleryBox">
        <h1>allGalleries </h1>
        <div id="allGalleryRender">
          {
            galleries && galleries.map(gallery => {
              console.log(gallery);
              return (
                <div className="renderedBox col-md-3" key={gallery.id}>
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
