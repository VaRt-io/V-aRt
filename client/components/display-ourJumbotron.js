import React from 'react';
import {Jumbotron} from 'react-bootstrap';

export default function OurJumbotron (props){
    const currentGallery = props.currentGallery;

    return (
        <Jumbotron
          id="jumbo"
          style={{backgroundImage: `url(${currentGallery.thumbnailUrl})`,
        width: '75%',
        height: '400px',
        textAlign: 'center',
        margin: 'auto',
        backgroundPosition: 'center center',
        color: 'white',
        fontSize: '30px',
        marginTop: '0px',
        marginBottom: '40px'}} />
    );

}
