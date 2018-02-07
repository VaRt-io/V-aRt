import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React, {Component} from 'react';
import {connect} from 'react-redux';

class VRVanGogh extends Component{

  componentWillUnmount(){
    console.log('UNMOUNT HIT');
    window.location.reload();
  }

    render(){
        const currentGalleryId = this.props.match.params.id;
        const galleries = this.props.galleriesCollection;
        const currentGallery = galleries.length && galleries.filter(gallery => +gallery.id === +currentGalleryId)[0];
        const currentArtistId = currentGallery.userId;
        let paintings;   //current galleries will be async, we have to wait for it to come in before we can define paintings
        if (currentGallery){
            paintings = currentGallery.paintings;
        }
        // DEFINE ALL YOUR IMAGE TEXTURES HERE AND SAVE THEM AS CONSTANTS
        // EX.) const marbleTexture = 'https://ucarecdn.com/1b213dc4-386d-4978-8fe5-9b021b23c945/';
        // YOU WILL BE USING THEM ON YOU OBJECTS BELOW

        
        var snowyGround= 'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX1726024.jpg';

    
        return(
            paintings?
            <Scene>

            <a-assets>
            <a-asset-item id="starryNight" src="/models/vangogh/untitled-scene.obj"></a-asset-item>
            <a-asset-item id="starryNight-mtl" src="/models/vangogh/untitled-scene.mtl"></a-asset-item>
            <a-asset-item id="room" src="/models/vangogh/room.obj"></a-asset-item>
            <a-asset-item id="room-mtl" src="/models/vangogh/room.mtl"></a-asset-item>
            <a-asset-item id="saturn-obj" src="/models/saturn/saturn.obj"></a-asset-item>
            <a-asset-item id="saturn-mtl" src="/models/saturn/saturn.mtl"></a-asset-item>
            <a-asset-item id="jupiter-obj" src="/models/jupiter/jupiter.obj"></a-asset-item>
            <a-asset-item id="jupiter-mtl" src="/models/jupiter/jupiter.mtl"></a-asset-item>
            </a-assets>


            <a-entity
              obj-model="obj:#starryNight; mtl:#starryNight-mtl"
              position="0 -45 50" scale="50 50 50"
              rotation="0 0 0" />
            <a-entity
              obj-model="obj:#starryNight; mtl:#starryNight-mtl"
              position="0 -45 -60" scale="50 50 50"
              rotation="0 180 0" />

            <a-entity
              obj-model="obj:#room; mtl:#room-mtl"
              position="0 0 -15" scale="1 1 1" />

            <a-entity
              obj-model="obj:#saturn-obj; mtl:#saturn-mtl"
              position="-130 50 -100"
              rotation="130 0 0"
              scale="1000 1000 1000"
            />


            <a-entity obj-model="obj:#jupiter-obj; mtl:#jupiter-mtl"
            position="130 20 0"
            scale="2000 2000 2000"
            ></a-entity>
                <a-sky src='/models/vangogh/sky/milkyWay.png' />
                <a-plane src={snowyGround} position="0 -2 -4" rotation="-90 0 0" width="90" height="90" repeat="10 10"  />
                <Entity particle-system={{preset: 'snow'}} />
                {
                  paintings.length >= 1 &&
                  <a-curvedimage
                    position="0 3 -23"
                    rotation="0 150 0"
                    height="3.0"
                    radius="4.0"
                    theta-length="60"
                    src={paintings[0].url} />
                }
                {
                  paintings.length >= 2 &&
                  <a-curvedimage
                    position="12 3 -23"
                    rotation="-12 150 0"
                    height="3.0"
                    radius="4.0"
                    theta-length="60"
                    src={paintings[1].url} />
                }
                {
                  paintings.length >= 3 &&
                  <a-curvedimage
                      position="-12 3 -23"
                      rotation="0 150 0"
                      height="3.0"
                      radius="4.0"
                      theta-length="60"
                      src={paintings[2].url} />
                }

                {
                  paintings.length >= 4 &&
                  <a-curvedimage
                      position="0 3 20"
                      rotation="0 330 0"
                      height="3.0"
                      radius="4.0"
                      theta-length="60"
                      src={paintings[3].url} />
                }

                {
                  paintings.length >= 5 &&
                  <a-curvedimage
                      position="12 3 20"
                      rotation="0 330 0"
                      height="3.0"
                      radius="4.0"
                      theta-length="60"
                      src={paintings[3].url} />
                }

                {
                  paintings.length >= 6 &&
                  <a-curvedimage
                    position="-12 3 20"
                    rotation="0 330 0"
                    height="3.0"
                    radius="4.0"
                    theta-length="60"
                    src={paintings[3].url} />
                }

                <a-box src="/img/exitsign.png" href={'/galleries'} position="-1 0 3.5" />
                <a-box src="/img/back_button.png" href={`/vr/artists/${currentArtistId}/starry`} position="1 0 3.5" />
                <a-entity camera="userHeight: 1.6" look-controls wasd-controls>
                    <a-entity
                      cursor="fuse: true; fuseTimeout: 1500"
                      id="cursor" position="0 0 -2" geometry="primitive: ring; radiusOuter: 0.08; radiusInner: 0.05" material="color: white">
                        <a-animation
                          begin="click" easing="ease-in" attribute="scale" dur="150"
                          fill="forwards" from="0.1 0.1 0.1" to="1 1 1" />
                        <a-animation
                          begin="cursor-fusing" easing="ease-in" attribute="scale" dur="1500"
                          fill="backwards" from="1 1 1" to="0.1 0.1 0.1" />
                    </a-entity>
                </a-entity>
            </Scene>
            :
            null
        );
    }
}

const mapState = function(state){
    return {
        galleriesCollection: state.galleries.galleryCollection
    };
};

export default connect(mapState)(VRVanGogh);
