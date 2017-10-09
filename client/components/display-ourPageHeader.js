import React from 'react';
import {Link} from 'react-router-dom';
import {PageHeader} from 'react-bootstrap';

export default function OurPageHeader (props){
    // console.log("displayPaintings PrOps",props)
    const currentGallery= props.currentGallery;
    const artistName = props.artistName;
    const artistId = props.artistId;
    return(
        <PageHeader>{currentGallery.title}
        <small style={{color:'blue'}}> By: 
        <Link to={`/artists/${artistId}`}>{`${artistName}`}</Link>
        </small>
      </PageHeader>
       
        );

}