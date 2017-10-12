import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// THIS CODE/FILE IS BROKEN

export default class VR extends Component{

  render(){
    // THIS IS THE PIECE OF CODE ACCESSING THE PAINTINGS ARRAY WE PASSED IN FROM SINGLE GALLERY VIEW 
    const paintingsArray= this.props.location.fromSingleGallery.paintings;
    console.log('VR PROPS', this.props);
    console.log('PAINTINGS ARRAY', paintingsArray);
    console.log("Paintings arrayy 0 URL", paintingsArray[0].url);
    //THIS IS THE PIECE OF CODE ACCESSING THE PAINTINGS ARRAY WE PASSED IN FORM SINGLE GALLERY VIEW
    return (
      <Scene>
        <Entity geometry={{primitive: 'box'}} material={{src: paintingsArray[0].url}} position={{x: 0, y: 0, z: -5}} />
        <Entity particle-system={{preset: 'snow'}} />
        <Entity light={{type: 'point'}} />
        <Entity gltf-model={{src: 'virtualcity.gltf'}} />
        <Entity text={{value: 'Hello, WebVR!'}} />
        <Entity primitive="a-sky" color="blue" />
        <a-entity camera="userHeight: 2.9" look-controls wasd-controls>
          <a-entity id="cursor" position="0 0 -2" cursor geometry="primitive: ring; radiusOuter: 0.08; radiusInner: 0.05" material="color: white"></a-entity>
        </a-entity>
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
      </Scene>
    );

  }

}
