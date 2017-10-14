import React from 'react';
import {Jumbotron} from 'react-bootstrap';

export default function OurJumbotron (props){
    console.log("displayPaintings PrOps",props)
    const currentGallery= props.currentGallery;
    const artistName = props.artistName;
    const artistId = props.artistId;
    return (
        <Jumbotron id="jumbo"  style={{backgroundImage: `url(${currentGallery.thumbnailUrl})`,
        width: '75%',
        height: '400px',
        textAlign: 'center',
        margin: 'auto',
        backgroundPosition: 'center center',
        color: 'white',
        fontSize: '30px',
        marginTop: '0px',
        marginBottom: '40px'}}>
        </Jumbotron>
       
        );

}