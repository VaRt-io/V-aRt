import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

class VRVanGogh extends Component{

    render(){
        const currentGalleryId = this.props.match.params.id;
        const galleries = this.props.galleriesCollection;
        const currentGallery = galleries.length && galleries.filter(gallery => +gallery.id === +currentGalleryId)[0];
        let paintings;   //current galleries will be async, we have to wait for it to come in before we can define paintings 
        if(currentGallery){
            paintings= currentGallery.paintings;
        }
        // DEFINE ALL YOUR IMAGE TEXTURES HERE AND SAVE THEM AS CONSTANTS 
        // EX.) const marbleTexture = 'https://ucarecdn.com/1b213dc4-386d-4978-8fe5-9b021b23c945/';
        // YOU WILL BE USING THEM ON YOU OBJECTS BELOW
        var nightSky='http://chrusion.com/public_files/tycho/Stars_Tycho2+Milkyway_3000.png';
        var snowyGround= 'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX1726024.jpg';
        return(
            paintings?
            <Scene>
            <a-asset-item id="starryNight" src="/models/vangogh/untitled-scene.obj"></a-asset-item>
            <a-asset-item id="starryNight-mtl" src="/models/vangogh/untitled-scene.mtl"></a-asset-item>
            <a-asset-item id="room" src="/models/vangogh/room.obj"></a-asset-item>
            <a-asset-item id="room-mtl" src="/models/vangogh/room.mtl"></a-asset-item>

            <a-entity obj-model="obj:#starryNight; mtl:#starryNight-mtl"
            position="0 -45 50" scale="50 50 50"
            rotation="0 0 0"></a-entity>

            <a-entity obj-model="obj:#room; mtl:#room-mtl"
            position="0 0 -15" scale="1 1 1"></a-entity>


                <a-sky src={nightSky} />
                <a-plane src={snowyGround} position="0 -2 -4" rotation="-90 0 0" width="90" height="90" repeat="10 10"  />
                <Entity particle-system={{preset: 'snow'}} />
            </Scene>
            :
            null
            
        );
    }
}

const mapState = function(state){
    return {
        galleriesCollection: state.galleries.galleryCollection,
    }
};

export default connect(mapState)(VRVanGogh);