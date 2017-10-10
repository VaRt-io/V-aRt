import 'aframe';
import 'aframe-particle-system-component';
import 'aframe-physics-system'
import {Entity, Scene} from 'aframe-react';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import store from '../store';

export function VRHub (props){
            var galleries = props.galleries;
            var positions = ['-1.50 2.0 -9.65', '3.454 2.00 -9.65', '5.000 2.00 -6.20' , '5.000 2.00 -2.00', '2.50 2.0 2.10', '-1.50 2.0 2.10', '-4.00 2.0 -1.50', '-4.00 2.0 -7.00']
            var textPositions = positions.map(position => {
                var xyz = position.split(' ');
                xyz[1] = '4.5';
                return xyz.join(' ');
            });
            var rotations = ['0 0 0', '0 0 0', '0 -90 0', '0 -90 0', '0 180 0', '0 180 0', '0 90 0', '0 90 0'];
            return(
            <a-scene physics="friction: 0.1; restitution: 0.5">
                 <a-assets>
                    <a-asset-item id="frame-obj" src="/models/Frame/Old_picture_frame.obj"></a-asset-item>
                    <a-asset-item id="frame-mtl" src="/models/Frame/Old_picture_frame.mtl"></a-asset-item>
                </a-assets>

                <a-plane height="20" width="20" repeat="10 10" src="https://blogs.ancestry.com/ancestry/files/2014/09/Brickwall.jpg" position="-4.17 7.831 -1.71" rotation="0 90 0"></a-plane>
                <a-plane height="20" width="20" repeat="10 10" src="https://blogs.ancestry.com/ancestry/files/2014/09/Brickwall.jpg" position="0.573 7.741 -9.667" rotation="0 0 0"></a-plane>
                <a-plane height="20" width="20" repeat="10 10" src="https://blogs.ancestry.com/ancestry/files/2014/09/Brickwall.jpg" position="5.157 8.266 0.114" rotation="0 -90 0"></a-plane>
                <a-plane height="20" width="20" repeat="10 10" src="https://blogs.ancestry.com/ancestry/files/2014/09/Brickwall.jpg" position="4.729 8.618 2.151" rotation="0 180 0"></a-plane>
                <a-plane height="20" width="20" repeat="10 10" src="https://vignette.wikia.nocookie.net/recettear/images/f/f1/Tile_Floor_texture.png/revision/latest?cb=20140710081635" position="-2.89 0.047 -4.31" rotation="-90 0 0"></a-plane>
                <a-plane height="20" width="20" repeat="10 10" src="https://vignette.wikia.nocookie.net/recettear/images/f/f1/Tile_Floor_texture.png/revision/latest?cb=20140710081635" position="5.680 7.015 0.019" rotation="90 0 0"></a-plane>
 
                <a-text value="Exit VR" position="1 4 -9.52" align='center'></a-text>
                <a-entity obj-model="obj:#frame-obj" material="color:blue" position="1 2.759 -9.52" rotation="0 0 0" href='/galleries'>
                    <a-image src='https://blogs.ancestry.com/ancestry/files/2014/09/Brickwall.jpg' position="0 .4 0" scale="1 .7 1"></a-image>
                </a-entity>
                
                <a-text value="View All Artists" position=".537 4.5 2.1" rotation="0 180 0" align='center'></a-text>
                <a-entity obj-model="obj:#frame-obj" material="color:red" position=".537 3.138 2.1" rotation="0 0 0" href="/artists">
                    <a-image src='https://blogs.ancestry.com/ancestry/files/2014/09/Brickwall.jpg' position="0 .4 0" scale="1 .7 1"></a-image>
                </a-entity>


                { galleries && galleries.map((gallery, index) => {
                    console.log(textPositions[index])
                    return(
                        <a-text value={gallery.title} position={textPositions[index]} rotation={rotations[index]} align='center'></a-text>
                )})
                }

                { galleries && galleries.map((gallery, index) => {
                    console.log(gallery.thumbnailUrl)
                    return(

                    <a-entity key={gallery.id} obj-model="obj:#frame-obj" material= "color:blue" position={positions[index]} rotation={rotations[index]} scale="2.5 2.5 1" href={`/vr/${gallery.id}/${gallery.environment}`}>
                        <a-image src={gallery.thumbnailUrl} position="0 .4 0" scale="1 .7 1"></a-image>
                    </a-entity>
                )})
                }
                <a-entity camera="userHeight: 2.9" look-controls wasd-controls>
                    <a-entity id="cursor" position="0 0 -2" cursor geometry="primitive: ring; radiusOuter: 0.11; radiusInner: 0.08" material="color: white"></a-entity>
                </a-entity>
            </a-scene>
       );
       
}


const mapState = function(state, ownProps){
    return {
        galleries: state.galleries.galleryCollection,
    };
};

export default connect(mapState)(VRHub);