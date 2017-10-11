import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React, {Component} from 'react';
import {connect} from 'react-redux';

function VRCity(props){
        const currentGalleryId = props.match.params.id;
        const galleries = props.galleriesCollection;
        const currentGallery = galleries.length && galleries.filter(gallery => +gallery.id === +currentGalleryId)[0];
        let paintings;   //current galleries will be async, we have to wait for it to come in before we can define paintings 
        if(currentGallery){
            paintings= currentGallery.paintings;
        }
        // DEFINE ALL YOUR IMAGE TEXTURES HERE AND SAVE THEM AS CONSTANTS 
        // EX.) const marbleTexture = 'https://ucarecdn.com/1b213dc4-386d-4978-8fe5-9b021b23c945/';
        // YOU WILL BE USING THEM ON YOU OBJECTS BELOW
        console.log('paintings', paintings);
        return(
            paintings?
            <Scene>
            <a-entity environment="preset: forest"></a-entity>
            <a-image position="-20.9 3 3" rotation="0 90 0" src={paintings[0].url}></a-image>
          </Scene>
            :
            null
        );
    
}

const mapState = function(state){
    return {
        galleriesCollection: state.galleries.galleryCollection,
    }
};

export default connect(mapState)(VRCity);

/*
           <Scene>
            <a-assets>
            <a-asset-item id="cityModel" src="https://cdn.aframe.io/test-models/models/virtualcity/VC.gltf"></a-asset-item>
            </a-assets>

            <a-gltf-model src="#cityModel"></a-gltf-model>
            </Scene>
*/