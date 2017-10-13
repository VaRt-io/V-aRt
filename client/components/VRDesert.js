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
        const currentArtistId = currentGallery.userId;
        console.log(currentGallery)
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
        const circutBoard = 'https://ucarecdn.com/cbef09b9-d5dc-4402-a8b8-ba64210d9283/';
       
        
        return(
            paintings?
            <Scene>
            <a-assets>
            <a-asset-item id="daliClock-obj" src="/models/daliClock/memory.obj"></a-asset-item>
            <a-asset-item id="daliClock-mtl" src="/models/daliClock/memory.mtl"></a-asset-item>
           
            <a-asset-item id="marcus-obj" src="/models/marcus/MarcusAurelius.obj" ></a-asset-item>
            <a-asset-item id="piggy-obj" src='/models/piggy/piggy.obj'></a-asset-item>
            
            </a-assets>
                {/*DALI TREES*/}
                <a-entity obj-model="obj:#daliClock-obj;mtl:#daliClock-mtl" 
                position ="-16.6 2.44 -25"  
                rotation="-70 270 0" scale=".25 .25 .65"
                ></a-entity>
                <a-entity obj-model="obj:#daliClock-obj;mtl:#daliClock-mtl" 
                position ="23 2 -30"  
                rotation="-70 90 0" scale=".25 .25 .65"
                ></a-entity>

                {/*ROTATING PIGS*/}
                
               <a-entity obj-model="obj:#piggy-obj" scale="1 1 1" position="8 5 -12" material="color:pink">
               <a-animation attribute="rotation"
               easing="linear"
               dur="3000"
               fill="backwards"
               to="0 360 0"
               repeat="indefinite"></a-animation>
               </a-entity>

               <a-entity obj-model="obj:#piggy-obj" scale="1 1 1" position="-7 5 -12" material="color:pink">
               <a-animation attribute="rotation"
               easing="linear"
               dur="5000"
               fill="forwards"
               to="0 360 0"
               repeat="indefinite"></a-animation>
               </a-entity>

               {/*PAINTINGS */}
               {paintings[0]?
                <Entity geometry={{primitive: 'box'}} material={{src: paintings[0].url}} position="-7 10 -25" rotation="0 90 0" scale="2 2 2" />
                :
                null
            
            }
            {paintings[1]?
                <Entity geometry={{primitive: 'box'}} material={{src: paintings[1].url}} position="7 10 -25" rotation="0 90 0" scale="2 2 2" />
                :
                null
            
            }
            {paintings[2]?
                <Entity geometry={{primitive: 'box'}} material={{src: paintings[2].url}} position="16 6 -40" rotation="0 90 0" scale="8 8 8" />
                :
                null
            
            }
            {paintings[3]?
                <Entity geometry={{primitive: 'box'}} material={{src: paintings[3].url}} position="-9 0 -7" rotation="0 90 0" scale="2 2 2" />
                :
                null
            
            }
            {paintings[4]?
                <Entity geometry={{primitive: 'box'}} material={{src: paintings[4].url}} position="9 0 -7" rotation="0 90 0" scale="2 2 2" />
                :
                null
            
            }
            {paintings[5]?
                <Entity geometry={{primitive: 'box'}} material={{src: paintings[5].url}} position="180 40 -100" rotation="0 90 0" scale="40 40 40" />
                :
                null
            
            }
               
                <a-box src="/img/exitsign.png" href={`/galleries/${currentGalleryId}`} position="-1 2 3.5"></a-box>
                <a-box src="/img/back_button.png" href={`/vr/artists/${currentArtistId}/starry`} position="1 2 3.5"></a-box>
                <a-entity obj-model="obj:#marcus-obj" position="0 5 -25" scale="22 22 22" src="/MarcusAureliusTexture.jpg"></a-entity>
                <a-sky src={desert}  />
                <a-plane src={groundTexture} position="0 -2 -4" rotation="-90 0 0" width="90" height="90" repeat="10 10"  />
            </Scene>
            :
            null
        )
    
}

const mapState = function(state){
    return {
        galleriesCollection: state.galleries.galleryCollection,
    };
};

export default connect(mapState)(VRDesert);