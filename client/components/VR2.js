import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class VR2 extends Component{

  render(){
    const circutBoard = 'https://ucarecdn.com/cbef09b9-d5dc-4402-a8b8-ba64210d9283/';
    const nightScape = 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg';
    const groundTexture = 'https://cdn.aframe.io/a-painter/images/floor.jpg';
    const cyberRust = 'https://ucarecdn.com/90bc2baf-a4c1-4237-b00c-a75f9db0b45a/';
    const marbleTexture = 'https://ucarecdn.com/1b213dc4-386d-4978-8fe5-9b021b23c945/';
        // <a-assets>
        // <img id="marbleTexture" src="https://ucarecdn.com/1b213dc4-386d-4978-8fe5-9b021b23c945/">
        // <img id="tropicalYard" src="https://ucarecdn.com/603902b2-2ef7-41b2-88d8-fbdc98af9b7a/">
        // <img id="nightScape" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg">
        // <img id="grass" src="https://ucarecdn.com/2e6d4bd3-6bbc-4096-b8fd-3095eece781c/">
        // <img id="cyberRust" src="https://ucarecdn.com/90bc2baf-a4c1-4237-b00c-a75f9db0b45a/">
        // <img id="circutBoard" src="https://ucarecdn.com/cbef09b9-d5dc-4402-a8b8-ba64210d9283/">
        // <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg">
    
    return (
        <Scene>
        <Entity geometry={{primitive: 'box'}} material={{src: circutBoard}} position="-1 3 -3" rotation="0 90 0" />
        <Entity geometry = {{primitive: 'sphere'}} material ={{src: cyberRust}} position="0 7 -10" radius="1.25" />
        <Entity geometry ={{primitive: 'torus-knot'}} material={{src: cyberRust}}  position = "-5 2 -10" />
        <a-torus-knot src={cyberRust} position ="-5 2 -10"  />
        <a-dodecahedron src="#circutBoard" position= "5 8 -5"  />
        <a-text value ="Hello V-aRt" position="-1 2 -3" color="white" />
         <a-cylinder src="#marbleTexture" position="-3 0.75 -3" radius="0.5" height="1.5" rotation="90 0 0" color="gold" />
        
        <a-plane src={groundTexture} position="0 0 -4" rotation="-90 0 0" width="90" height="90dssa" repeat="10 10"  />

        <a-sky src= {nightScape} />
          </Scene>
    );
        
  }

}
