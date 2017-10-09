import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

class /*SCENENAME*/ extends Component{

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
        return(
            paintings?
            <Scene>
                {/*DEFINE YOUR SKY,GROUND, OBJECTS SUCH AS TREES STATUES HERE*/}
            </Scene>
            :
            null
        )
    }
}

const mapState = function(state){
    return {
        galleries: state.galleries.galleryCollection,
    }
};

export default connect(mapState)(/*SCENE NAME*/)