import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React, {Component} from 'react';
import {connect} from 'react-redux';

function VRArtistHub(props) {
    const currentArtistId = props.match.params.id;
    const artists = props.artistsCollection;
    const currentArtist = artists.length && artists.filter(artist => +artist.id === +currentArtistId)[0];
    let galleries;  
    if (currentArtist){
        galleries = currentArtist.galleries;
    }
    console.log('rendering?', galleries);
    return (
        galleries?
        <Scene>
        <a-entity light="type: ambient; color: #BBB"></a-entity>
            <a-entity 
                id={galleries[0].id} 
                geometry={{primative: 'box'}} 
                material={`src: ${galleries[0].thumbnailUrl}`} 
                position={'0 3 -10'} 
                >
            </a-entity>  
            <a-entity environment="preset: contact"></a-entity>               
        </Scene>
        :
        null
    );
}

const mapState = function(state){
    return {
        artistsCollection: state.users.artistsCollection
    }
};

export default connect(mapState)(VRArtistHub);

// <a-curvedimage
// position="0 3 -16"
// rotation="0 -27 0"
// height="3.0"
// radius="4.0"
// theta-length="60"
// src={galleries[0].thumbnailUrl}
// >
// </a-curvedimage>