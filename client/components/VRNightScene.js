import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';


class VRNightScene extends Component{

    render(){
    const currentGalleryId = this.props.match.params.id;
    const galleries = this.props.galleriesCollection;
    const currentGallery = galleries.length && galleries.filter(gallery => +gallery.id === +currentGalleryId)[0]
    const pedPositions = ["6.75 1 0", "3 1 6.2", "-2.644 1 6.353", "-6.619 1 0", "-2.862 1 -5.734", "3.000 1 -6.108"]
    const boxPositions = ["6.75 1.8 0", "3 1.8 6.2", "-2.644 1.8 6.353", "-6.619 1.8 0", "-2.862 1.8 -5.734", "3.000 1.8 -6.108"]
    const textPositions = ["6.75 3 0", "3 3 6.2", "-2.644 3 6.353", "-6.619 3 0", "-2.862 3 -5.734", "3.000 3 -6.108"]
    const textRotations = ["0 -90 0", "0 -145 0", "0 -215 0", "0 -270 0", "0 -335 0", "0 -35 0"]
    let paintings;
    if(currentGallery){
        paintings=currentGallery.paintings;
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
        <a-scene>
            <a-assets>
              <a-asset-item id="column-obj" src="/models/Column/column.obj"></a-asset-item>
              <a-asset-item id="column-mtl" src="/models/Column/column.mtl"></a-asset-item>
            </a-assets>
            <a-sphere src={cyberRust} position="5 12.82 -37.6" radius="1.25" />
            
            <a-torus-knot src={cyberRust} position ="-5 2 -14"  />
            <a-dodecahedron src={circutBoard} position= "-1 13 -32"  />

            { paintings && paintings.map((image, index) => {
                        return(
                          <a-text value={image.name} align="center" position={textPositions[index]} rotation={textRotations[index]} color="white" />
            )})
            }

            { paintings && paintings.map((image, index) => {
                        return(
                          <a-entity obj-model='obj:#column-obj; mtl:#column-mtl' position={pedPositions[index]} scale=".001 .001 .001" rotation="90 0 0" scale="5 5 5"/>
            )})
            }

            { paintings && paintings.map((image, index) => {
                        return(
                          <a-entity geometry={{primative: 'box'}} material={`src: ${paintings[index].url}`} position={boxPositions[index]} rotation="0 90 0" href>
                            <a-animation attribute="rotation"
                                dur="10000"
                                fill="forwards"
                                to="0 360 0"
                                repeat="indefinite"></a-animation>
                          </a-entity>
            )})
            }
            
            <a-plane src={groundTexture} position="0 0 -4" rotation="-90 0 0" width="90" height="90dssa" repeat="10 10"  />

            <a-sky src= {nightScape} />
            
          </a-scene>
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

export default connect(mapState)(VRNightScene)