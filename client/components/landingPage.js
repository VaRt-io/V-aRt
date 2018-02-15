import React, { Component } from 'react';
import {OurCarousel} from './index';

export default class Main extends Component{

  // OUR CAROUSEL LOCATED IN landingPageFeatured.js

  render(){
    return (
      //small test change
          <div>
            <OurCarousel /> 

            <div id="landingPageDescriptors">
              <div className=" col-xs-12 col-md-6 col-lg-4">
              <h3>Paint <span className="glyphicon glyphicon-pencil" /></h3>
              <h4>Create beautiful masterpieces on our canvas or drag and drop your own images</h4>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
              <h3>Browse<span className="glyphicon glyphicon-bookmark" /></h3>
              <h4>Discover and follow new artists and browse through their galleries for inspiration</h4>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
              <h3>View In VR <span className="glyphicon glyphicon-sunglasses" /></h3>
              <h4>See artworks come to life in surrealistic three dimensional environments</h4>
              </div>
            </div>

            <div className="col-xs-12 footer" >
            <h5 style={{margin: '45px'}}>
            By Tawsif Ahmed, Jason Rosso, Alex Press, James Dooley
            </h5>
            </div>

           </div>

    );
  }
}
