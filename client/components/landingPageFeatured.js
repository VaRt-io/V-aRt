import React, { Component } from 'react';
import {Carousel} from 'react-bootstrap';

export default class ourCarousel extends Component{

  render(){

    return (
      <div>
        <Carousel className="col-md-6 col-lg-6 col-xs-12">
          <Carousel.Item>
            <img className="carImg" width={500} height={500} alt="900x500" src="https://www.bloomberg.com/features/2017-art-auction-estimates-quiz/img/art-quiz-bloomberg-question-02.jpg" />
            <Carousel.Caption>
              <h3></h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="carImg" width={500} height={500} alt="900x500" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg" />
            <Carousel.Caption>
              <h3></h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="carImg" width={500} height={500} alt="900x500" src="https://10mosttoday.com/wp-content/uploads/2013/09/The_Persistence_of_Memory.jpg" />
            <Carousel.Caption>
              <h3></h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}
