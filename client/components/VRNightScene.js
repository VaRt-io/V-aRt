import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';


class VRNightScene extends Component{

  render(){
    
     console.log('VR PROPS', this.props);
    
     const currentGalleryId = this.props.match.params.id;
     console.log("CURRENT GALLERY ID",currentGalleryId);
     const galleries = this.props.galleriesCollection;
     console.log("galleries", galleries)
     const currentGallery = galleries.length && galleries.filter(gallery => +gallery.id === +currentGalleryId)[0];
      console.log("Current Gallery", currentGallery);
      let paintings;
    if(currentGallery){
        paintings= currentGallery.paintings;
    }
    console.log("NiGhTScEne PRops", this.props);
    console.log('Paintings', paintings);



    const circutBoard = 'https://ucarecdn.com/cbef09b9-d5dc-4402-a8b8-ba64210d9283/';
    const nightScape = 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg';
    const groundTexture = 'https://cdn.aframe.io/a-painter/images/floor.jpg';
    const cyberRust = 'https://ucarecdn.com/90bc2baf-a4c1-4237-b00c-a75f9db0b45a/';
    const marbleTexture = 'https://ucarecdn.com/1b213dc4-386d-4978-8fe5-9b021b23c945/';
       
    
    return (
      paintings?
        <Scene>
        <Entity geometry={{primitive: 'box'}} material={{src: paintings[0].url}} position="-1 3 -3" rotation="0 90 0" />
        <Entity geometry = {{primitive: 'sphere'}} material ={{src: cyberRust}} position="0 7 -10" radius="1.25" />
        
        <a-torus-knot src={cyberRust} position ="-5 2 -10"  />
        <a-dodecahedron src={circutBoard} position= "5 8 -5"  />
        <a-text value ="Hello V-aRt" position="-1 2 -3" color="white" />
         <a-cylinder src={marbleTexture} position="-3 0.75 -3" radius="0.5" height="1.5" rotation="90 0 0" color="gold" />
        
        <a-plane src={groundTexture} position="0 0 -4" rotation="-90 0 0" width="90" height="90dssa" repeat="10 10"  />

        <a-sky src= {nightScape} />
          </Scene>
          :
          null
    );
        
  }

}

const mapState = function(state){
  return {
      galleriesCollection: state.galleries.galleryCollection,
  };
};

export default connect(mapState)(VRNightScene);