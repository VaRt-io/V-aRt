import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React,{Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ReactDOM from 'react-dom';
import {getImagesFromGalleryThunk} from '../store'
// import AllImages from '../VRComponents/AllImages.js'

export class FrameVR extends Component{
    constructor(props){
        super(props);
        this.state = {
            images: [],
            models: [],
            galleries: []
        }
    }

    componentDidMount(){
    }

    render(){
        // var assetPath = "../public/models"
        // console.log(assetPath + "obj/Old_picture_frame.obj")
        console.log(this.state)
        let currGalleryId = this.props.match.params.galleryId
        var gallery = this.state.galleries.find(gallery => {return id === currGalleryId})
        var images = this.state.images.filter(image => {return galleryId === currGalleryId})
        var positions = ["0 3 0", "3 0 0", "0 -3 0", "-3 0 0"]
        var rotations = []
            return(
            <Scene>
                <a-assets>
                    <a-asset-item id="frame-obj" src="/models/Frame/Old_picture_frame.obj"></a-asset-item>
                    <a-asset-item id="frame-mtl" src="/models/Frame/Old_picture_frame.mtl"></a-asset-item>

                    {/* {models && models.map(model => {
                        return(
                            <div>
                                <a-asset-item id={model.name + "-obj"} src={model.objPath}></a-asset-item>
                                <a-asset-item id={model.name + "-mtl"} src={model.mtlPath}></a-asset-item>
                            </div>
                        )
                    }
                    
                )} */}
                </a-assets>
                <a-plane color="#CCC" height="20" width="20" position="-9.31 7.831 0.169" rotation="0 90 0"></a-plane>
                <a-plane color="#CCC" height="20" width="20" position="0.573 7.741 -9.667" rotation="0 0 0"></a-plane>
                <a-plane color="#CCC" height="20" width="20" position="10 8.266 0.114" rotation="0 -90 0"></a-plane>
                <a-plane color="#CCC" height="20" width="20" position="6.19 7.792 10.13" rotation="0 180 0"></a-plane>
                <a-plane color="#CCC" height="20" width="20" position="-2.89 0.047 -4.31" rotation="-90 0 0"></a-plane>
                <a-plane color="#CCC" height="20" width="20" position="6.19 7.792 10.13" rotation="90 0 0"></a-plane>
                {/* {models && models.map(model =>{
                    return(
                        <a-entity obj-model={`obj:#${model.name}-obj; mtl:#${model.name}-mtl`} position={model.position} scale="0.55 0.55 0.55"></a-entity>
                    )
                })} */}

                { images && images.map(image => {
                    return(
                    <a-entity obj-model="obj:#frame-obj; mtl:#frame-mtl" position={positions[image.position]} scale="0.55 0.55 0.55">
                        <a-image src={image.url} position="0 .4 0" scale="1 .7 1"></a-image>
                    </a-entity>
                )})
                }
            </Scene>
       );
       
   }

}

const mapDispatchToProps = dispatch => ({postNewCampus: (newCampus) => dispatch(postNewCampus(newCampus))})
const mapPropsToState = function(state){
 return{
   galleries: state.galleries.galleryCollection,
   images: state.images
 }
};

export default connect(mapPropsToState, mapDispatchToProps)(FrameVR);