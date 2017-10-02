import React, { Component } from 'react';
import {Carousel} from 'react-bootstrap'

export default class ourCarousel extends Component{
    
        render(){
            return(
                <Carousel className="col-md-6 col-lg-6 col-xs-12">
                <Carousel.Item>
                  <img className='carImg' width={500} height={500} alt="900x500" src="https://www.bloomberg.com/features/2017-art-auction-estimates-quiz/img/art-quiz-bloomberg-question-02.jpg"/>
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img width={500} height={500} alt="900x500" src="https://www.bloomberg.com/features/2017-art-auction-estimates-quiz/img/art-quiz-bloomberg-question-02.jpg"/>
                  <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img width={500} height={500} alt="900x500" src="https://www.bloomberg.com/features/2017-art-auction-estimates-quiz/img/art-quiz-bloomberg-question-02.jpg"/>
                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            )
        }
    }