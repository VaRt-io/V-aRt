import React, { Component } from 'react';
import {Carousel} from 'react-bootstrap';

export default class ourCarousel extends Component{

  render(){

    return (
      <div>
        <Carousel className="carousel" interval={3000} >

          <Carousel.Item>
            <img className="carImg" width="100%" height='100%' src="/COVERIMAGES/theDesert.png"  border="0" />
            <Carousel.Caption>
              <h3>The Desert</h3>
              <p>Surrealistic Landscapes</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img className="carImg" width="100%" height='100%' src="/COVERIMAGES/theRoom.png" border="0" />
            <Carousel.Caption>
              <h3>VanGogh</h3>
              <p>A Celestial Scene</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img className="carImg" width="100%" height='100%' src="/COVERIMAGES/halloween.png" border="0" />
            <Carousel.Caption>
              <h3>Nightscene</h3>
              <p>Spook your friends with a Halloween theme</p>
            </Carousel.Caption>
          </Carousel.Item>

        </Carousel>
      </div>
    );
  }
}
