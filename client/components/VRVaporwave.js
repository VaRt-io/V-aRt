import 'aframe';
import 'aframe-mountain-component';
import {Entity, Scene} from 'aframe-react';
import React, {Component} from 'react';
import {connect} from 'react-redux';



class VRVaporwave extends Component{
      
    componentWillUnmount(){
        console.log("UNMOUNT HIT");
        window.location.reload();
      }

    render(){
        console.log('V @ P O R W A V E P R OPS', this.props);
        const currentGalleryId = this.props.match.params.id;
        const galleries = this.props.galleriesCollection;
        const currentGallery = galleries.length && galleries.filter(gallery => +gallery.id === +currentGalleryId)[0];
        console.log('CURRENT GALLERY', currentGallery);
        const currentArtistId = currentGallery.userId;
        let paintings;
        if(currentGallery){
            paintings = currentGallery.paintings;
        }
        console.log('paintings',paintings);

        const pinkgrid = '/photos/pinkgrid.svg';
        const intensePinkGrid ='https://ak5.picdn.net/shutterstock/videos/15813655/thumb/1.jpg–'
        const pinkSky = '/photos/pinkSky.jpg';
        const retrowaveTex = '/photos/retrowaveTex.png';
        const retrowaveSun = '/photos/retrowaveSun.jpg';
        console.log("PAINTINGS",paintings);
        //positions at first index, rotation at second 
        let backIndex = 4;
        const palmCordsFront =[
            //FRONT 
            //right side 
            ['21 0 -21','0 270 0'],
            ['21 0 -50','0 270 0'],
            ['21 0 -80','0 270 0'],
            ['21 0 -130','0 270 0'],
            //left side 
            ['-21 0 -21','0 180 0'],
            ['-21 0 -50','0 180 0'],
            ['-21 0 -80','0 180 0'],
            ['-21 0 -130','0 180 0'],
        ];
        const palmCordsBack = [
            //right side
            ['21 3 21','0 270 0'],
            ['21 3 50','0 270 0'],
            ['21 3 80','0 270 0'],
            ['21 3 130','0 270 0'],
            //left side 
            ['-21 3 21','0 180 0'],
            ['-21 3 50','0 180 0'],
            ['-21 3 80','0 180 0'],
            ['-21 3 130','0 180 0'],
        ];
        const billBoardCordsFront =[
            //right side
            ['23 0 -35', '0 45 0 '],
            
            ['23 0 -93', '0 45 0'],

            //left side 
            ['-23 0 -35','0 135 0'],
            ['-23 0 -93', '0 135 0']
        ];
        const billBoardCordsBack =[
            //right side
            ['23 0 35', '0 320 0'],
            //left side 
            ['-23 0 35','0 225 0']
        ];
        return (
            paintings ?
            <Scene>
            <a-assets>
                <a-asset-item id="cityscape-obj" src='/models/cityscape/model.obj' />
                <a-asset-item id="cityscape-mtl" src='/models/cityscape/materials.mtl' />
                <a-asset-item id="palmTree-obj" src='/models/palmTree/model.obj' />
                <a-asset-item id="palmTree-mtl" src='/models/palmTree/materials.mtl' />
                <a-asset-item id="billboard-obj" src='/models/billboard/Billboard 1.obj' />
                <a-asset-item id="hotdog-obj" src='/models/hotDog/model.obj' />
                <a-asset-item id="hotdog-mtl" src='/models/hotDog/materials.mtl' />
            </a-assets>
            <a-entity obj-model='obj:#hotdog-obj; mtl:#hotdog-mtl' scale='5 5 5' position='22.5 1.5 0' />
            <a-mountain color="red" position='0 0 0'  material={`src: ${pinkgrid}; repeat: 10 10`}></a-mountain>
            
            {/*Scyscrapers*/}
            <a-entity obj-model='obj:#cityscape-obj;mtl:#cityscape-mtl' scale='40 30 20' position= '0 31 -150' rotation = '0 270 0' />
            {/*Sun*/}
        {/* <a-entity geometry={{primative: 'box'}} material ={`src: ${retrowaveSun}`} position = '0 47 272' scale ='200 200 1'/>*/}
            <a-entity geometry={{primative: 'box'}} material ={`src: ${retrowaveSun}`} position = '0 350 4445' scale ='2000 2000 1'/>

            {/*Billboards*/}
            {
                paintings && billBoardCordsFront.map((cord,index)=>{
                    let position =cord[0];
                    let rotation = cord[1];
                    
                    return(
                        <a-entity key={position} obj-model='obj:#billboard-obj' 
                        scale='.02 .02 .02' 
                        position= {position} 
                        rotation = {rotation} 
                        color='#4CC3D9'
                        >
                            <a-entity geometry={{primative: 'box'}} material ={`src: ${paintings[index].url}`} position = '-60.2 535.6 -70.8' scale ='300 230 1' rotation='0 90 0'/>
                        </a-entity>

                    );
                })  
            }
            {
                
                paintings && billBoardCordsBack.map((cord)=>{
                    let position =cord[0];
                    let rotation = cord[1];
                    
                    return(
                        <a-entity key={position} obj-model='obj:#billboard-obj' 
                        scale='.02 .02 .02' 
                        position= {position} 
                        rotation = {rotation} 
                        color='#4CC3D9'
                        >
                            <a-entity geometry={{primative: 'box'}} material ={`src: ${paintings[backIndex++].url}`} position = '-60.2 535.6 -70.8' scale ='300 230 1' rotation='0 90 0'/>
                        </a-entity>

                    );
                })
            }
            
            {/*Palms*/}
            {
                palmCordsFront.map(cord=> {
                    
                    let position = cord[0]
                    let rotation = cord[1]
                    console.log(position, cord)
                    return (
                        
                    <a-entity key ={position} obj-model='obj: #palmTree-obj;mtl:#palmTree-mtl' 
                    scale='10 10 10' 
                    position= {position} 
                    rotation= {rotation}
                    />
                    )
                })
            }
            {
                palmCordsBack.map(cord =>{
                    let position = cord[0]
                    let rotation = cord[1]
                    console.log(position, cord)
                    return(
                        <a-entity key ={position} obj-model='obj: #palmTree-obj;mtl:#palmTree-mtl' 
                    scale='10 10 10' 
                    position= {position} 
                    rotation= {rotation}
                    />
                    )
                })
            }
            <a-entity
              obj-model="obj:#pineTree-obj;mtl:#pineTree-mtl"
              position="24 12 14" scale="4 7 4" />
            <a-plane src={pinkgrid} position="0 0 -1" rotation="-90 0 0" width="1000" height="1000" repeat="20 20"  ></a-plane>
            <a-sky src={pinkSky} rotation="0 -90 0"></a-sky>
            <a-entity camera='userHeight: 2' look-controls wasd-controls position='0 0 -5'/>
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

export default connect(mapState)(VRVaporwave);