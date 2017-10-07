import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

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
      </Scene>
    );

  }

}
