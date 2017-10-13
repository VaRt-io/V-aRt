import React, { Component } from 'react';
import {Carousel} from 'react-bootstrap';

export default class ourCarousel extends Component{

  render(){

    return (
      <div>
      
        <Carousel className="ourCarousel" className="col-md-6 col-lg-6 col-xs-12">
        
          <Carousel.Item>
            <img className="carImg" width="100%" height={350}  src="/COVERIMAGES/theDesert.png"  border="0" />
            <Carousel.Caption>
              <h3>The Desert</h3>
              <p>Surrealistic Landscapes</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="carImg" width="100%" height={350} src="/COVERIMAGES/theRoom.png" border="0" />
            <Carousel.Caption>
              <h3>Vangogh</h3>
              <p>A Celestial Scene</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="carImg"  height={350} src="/COVERIMAGES/halloween.png" />
            <Carousel.Caption>
              <h3>Nightscene</h3>
              <p>Spook your Freinds with a haloween theme</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}
