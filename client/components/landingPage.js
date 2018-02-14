import React, { Component } from 'react';
import {OurCarousel} from './index';

export default class Main extends Component{


  render(){
    return (
          <div>

        <h1>TESTTOOO</h1>
            <OurCarousel />
            <div id="landingPageDescriptors">
              <div className="col-md-4">
              <h3>Paint <span className="glyphicon glyphicon-pencil" /></h3>
              <h3>Create beautiful masterpieces on our canvas or drag and drop your own images</h3>
              </div>
              <div className="col-md-4">
              <h3>Browse<span className="glyphicon glyphicon-bookmark" /></h3>
              <h3>Discover and follow new artists and browse through their galleries for inspiration</h3>
              </div>
              <div className="col-md-4">
              <h3>View In VR <span className="glyphicon glyphicon-sunglasses" /></h3>
              <h3>See artworks come to life in surrealistic three dimensional environments</h3>
              </div>
            </div>

            <div
              className="col-md-12"
              style={{backgroundColor: 'black',
                      color: 'white',
                      height: '100px',
                      textAlign: 'center',
                      margin: 'auto',
                      marginTop: '50px'
          }}>

            <h5 style={{margin: '45px'}}>
            By Tawsif Ahmed, Jason Rosso, Alex Press, James Dooley
            </h5>
            </div>


           </div>

    );
  }
}
