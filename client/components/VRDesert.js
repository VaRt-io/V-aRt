import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

function VRDesert(props){
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

        const techdesert ='https://www.svrf.com/vr/Desert-city-at-night/5894166894608384?utm_source=SVRF-Web&utm_medium=Link&utm_campaign=Link-Share'
        const desertWithBlue= 'https://www.svrf.com/vr/Desert-Level-of-Edge-Guardian-More-info-about-the-game-here/5733678428717056?utm_source=SVRF-Web&utm_medium=Link&utm_campaign=Link-Share'
        const vaporWaveVid = 'https://ucarecdn.com/8021248f-051c-45f6-9156-36bc29295a8d/';
        const desert = 'https://ucarecdn.com/39f58506-1bfa-4464-b66e-c356292be9c8/';
        const groundTexture = 'https://cdn.aframe.io/a-painter/images/floor.jpg';
        
        return(
            paintings?
            <Scene>
            <a-assets>
            <a-asset-item id="daliClock-obj" src="/models/daliClock/memory.obj"></a-asset-item>
            <a-asset-item id="daliClock-mtl" src="/models/daliClock/memory.mtl"></a-asset-item>
            </a-assets>
            
                <a-entity obj-model="obj:#daliClock-obj;mtl:#daliClock-mtl" position ="-6.3 .25 -3"  rotation="-70 0 0" scale=".1 .1 .1"></a-entity>
                <a-sky src={desert}  />
                <a-plane src={groundTexture} position="0 0 -4" rotation="-90 0 0" width="90" height="90dssa" repeat="10 10"  />
            </Scene>
            :
            null
        )
    
}

const mapState = function(state){
    return {
        galleriesCollection: state.galleries.galleryCollection,
    }
};

export default connect(mapState)(VRDesert);