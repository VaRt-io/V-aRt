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
    const pedPositions = ["6.75 .7 0", "3 .7 6.2", "-2.644 .7 6.353", "-6.619 .7 0", "-2.862 .7 -5.734", "3.000 .7 -6.108"]
    const boxPositions = ["6.75 1.8 0", "3 1.8 6.2", "-2.644 1.8 6.353", "-6.619 1.8 0", "-2.862 1.8 -5.734", "3.000 1.8 -6.108"]
    const textPositions = ["6.75 3 0", "3 3 6.2", "-2.644 3 6.353", "-6.619 3 0", "-2.862 3 -5.734", "3.000 3 -6.108"]
    const textRotations = ["0 -90 0", "0 -145 0", "0 -215 0", "0 -270 0", "0 -335 0", "0 -35 0"];
    const lightPositions = boxPositions.map(position => {
      var xyz = position.split(' ');
      xyz[0] = (Number(xyz[0]) > 0) ? ('-' + xyz[0]) : (xyz[0].slice(1));
      xyz[1] = '4.5';
      xyz[2] = (Number(xyz[2]) > 0) ? ('-' + xyz[2]) : (xyz[2].slice(1));
      return xyz.join(' ');
  });
    const ghostPositions = ["10 6 0", "-10 6 0", "0 6 10", "0 6 -10", "10 12 0", "-10 12 0", "0 12 10", "0 12 -10"]
    const ghostRotations = ["0 -90 0", "0 90 0", "0 180 0", "0 0 0", "30 90 0", "30 -90 0", "30 90 0", "30 -90 0"]
    const treePositions = []
    const treeRotations = []
    const agavePositions = new Array(40).fill()
    let paintings;
    let artist;
    if(currentGallery){
        paintings = currentGallery.paintings;
        artist = currentGallery.user;
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
            <a-asset-item id="ghost-obj" src="/models/Ghost/model.obj"></a-asset-item>
            <a-asset-item id="ghost-mtl" src="/models/Ghost/material.mtl"></a-asset-item>
            <a-asset-item id="pumpkin-obj" src="/models/Pumpkin/pumpkin.obj"></a-asset-item>
            <a-asset-item id="pumpkin-mtl" src="/models/Pumpkin/pumpkin.mtl"></a-asset-item>
          </a-assets>
            <a-sphere src={cyberRust} position="5 12.82 -37.6" radius="1.25" />
            <a-dodecahedron src={circutBoard} position= "-1 13 -32"  />
            <a-torus-knot src={cyberRust} position ="-5 2 -14"  />
            <a-entity obj-model="obj:#tree-obj;mtl:#tree-mtl"></a-entity>


            { ghostPositions.map((image, index) => {
                  let ghostDirection;
                  if(index < 4){
                    ghostDirection="0 360 0"
                  } else{
                    ghostDirection="0 -360 0"
                  }
                        return(
                      <a-entity position="0 0 0">
                        <a-animation attribute="rotation"
                                    dur="50000"
                                    fill="forwards"
                                    to={ghostDirection}
                                    repeat="indefinite"></a-animation>
                        <a-entity obj-model="obj:#ghost-obj;mtl:#ghost-mtl" position={ghostPositions[index]} rotation={ghostRotations[index]}></a-entity>
                      </a-entity>

            )})
            }

            { paintings && paintings.map((image, index) => {
                    if(index < 6){
                        return(
                          <a-text value={image.name} align="center" position={textPositions[index]} rotation={textRotations[index]} color="white" />
            )}})
            }

            { agavePositions.map((image, index) => {
                  let x
                  let y = "1"
                  let z
                  let coords;
                  let currCoords;
                  let currRot;
                  if(index < 10){
                    x = ((Math.random() * 30) - 15).toString()
                    z = ((Math.random() * 7) + 8).toString()
                    coords = [x, y, z]
                    currCoords = coords.join(' ');
                    currRot = "0 180 0"
                    console.log(currCoords)
                    return(
                      <a-entity obj-model="obj:#pumpkin-obj;mtl:#pumpkin-mtl" position={currCoords} rotation={currRot}></a-entity>
                    )
                  } else if(index < 20){
                    x = ((Math.random() * 7) + 8).toString()
                    z = ((Math.random() * 30) - 15).toString()
                    coords = [x, y, z]
                    currCoords = coords.join(' ');
                    currRot = "0 -90 0"
                    return(
                      <a-entity obj-model="obj:#pumpkin-obj;mtl:#pumpkin-mtl" position={currCoords} rotation={currRot}></a-entity>
                    )
                  } else if(index < 30){
                    x = ((Math.random() * 30) - 15).toString()
                    z = '-' + ((Math.random() * 7) + 8).toString()
                    coords = [x, y, z]
                    currCoords = coords.join(' ');
                    return(
                      <a-entity obj-model="obj:#pumpkin-obj;mtl:#pumpkin-mtl" position={currCoords}></a-entity>
                    )
                  } else{
                    x = '-' + ((Math.random() * 7) + 8).toString()
                    z = ((Math.random() * 30) - 15).toString()
                    coords = [x, y, z]
                    currCoords = coords.join(' ');
                    currRot = "0 90 0"
                    return(
                      <a-entity obj-model="obj:#pumpkin-obj;mtl:#pumpkin-mtl" position={currCoords} rotation={currRot}></a-entity>
                    )

                  }
            })
            }

            { paintings && paintings.map((image, index) => {
                  if(index < 6){
                        return(
                          <a-cylinder src={marbleTexture} position={pedPositions[index]} rotation="0 0 0" scale=".3 1.2 .3">
                          </a-cylinder>
            )}})
            }

            { paintings && paintings.map((image, index) => {
                        if(index < 6){
                        return(
                            <a-entity id={`painting${index}`} geometry={{primative: 'box'}} material={`src: ${paintings[index].url}`} position={boxPositions[index]} rotation="0 90 0">
                              <a-animation attribute="rotation"
                                      dur="10000"
                                      fill="forwards"
                                      to="0 -360 0"
                                      repeat="indefinite">
                              </a-animation>
                            </a-entity>
                      )}})
            }

            <a-entity camera="userHeight: 2.9" look-controls wasd-controls>
            <a-entity id="cursor" position="0 0 -2" cursor geometry="primitive: ring; radiusOuter: 0.08; radiusInner: 0.05" material="color: white"></a-entity>
            </a-entity>
            
          

            <a-link href={`/vr/artists/${artist.id}/hub`}>
            <a-circle color="#008080" radius="1" position={'5 3 -15'}>
              <a-text 
                  value={`${artist.name}'s hub`}                      
                  align="center" 
                  anchor="center"
                  baseline="center"
                  position="0 0 0"
                  scale="1 1 1">
              </a-text>
            </a-circle>
            </a-link>
            
            <a-link href={`/galleries/${currentGalleryId}`}>
            <a-circle color="#ff0000" radius="1" position={'8 3 -15'}>
              <a-text 
                  value='Exit'                      
                  align="center" 
                  anchor="center"
                  baseline="center"
                  position="0 0 0"
                  scale="1 1 1">
              </a-text>
            </a-circle>
            </a-link>

            <a-plane src={groundTexture} position="0 0 -4" rotation="-90 0 0" width="90" height="90" repeat="10 10"  />

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


// <a-link href={`/vr/artists/${currentGalleryId}`}>
// <a-entity geometry="primitive: triangle" material="side: double"></a-entity>
// <a-circle color="#ff0000" radius="1" position={'8 3 -15'}>
//   <a-text 
//       value='Exit'                      
//       align="center" 
//       anchor="center"
//       baseline="center"
//       position="0 0 0"
//       scale="1 1 1">
//   </a-text>
// </a-circle>
// </a-link>



