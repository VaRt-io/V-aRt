<<<<<<< HEAD
=======
import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {connect} from 'react-redux';
>>>>>>> abb757a1f2617694ad3af6a0f055e018196719bf
import store from '../store';

class AllGalleries extends Component{

  render(){
    console.log('PROPPPPSSSS', this.props);
    const galleries = this.props.galleryCollection;
    console.log('GALLERies', galleries);
    return (
            <div id="allGalleryBox">
            <h1>allGalleries </h1>
                <div id="allGalleryRender">
                {
                    galleries && galleries.map(gallery => {
                      return (
                        <div key={gallery.id}>
                          <h3>
                            <Link to= {`/galleries/${gallery.id}`}>{gallery.name}</Link>
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
    galleryCollection: state.galleries.galleryCollection
  };
};

export default connect(mapState)(AllGalleries);
