import React from 'react';
import {Link} from 'react-router-dom';
import {PageHeader} from 'react-bootstrap';

export default function OurPageHeader (props){
    const currentGallery = props.currentGallery;
    const artistName = props.artistName;
    const artistId = props.artistId;

    return (
      <PageHeader>{currentGallery.title} &nbsp;
        <small style={{color: '#c32aff'}}> By: &nbsp;
        <Link style={{color: '#c32aff'}}to={`/artists/${artistId}`}>{`${artistName}`}</Link>
        </small>
      </PageHeader>

    );

}
