import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import store, {updateGalleryThunk} from '../store';
import jwt_decode from 'jwt-decode';
import {Button} from 'react-bootstrap';
import {DisplayPaintings, OurPageHeader, DisplaySelectFromFS, DisplaySelectForm, PaintingDropdown, GalleryEditPageHeader } from './index';


class GalleryEdit extends Component{

    constructor(props){
        super(props);

        const currentGalleryId = this.props.match.params.id;
        const galleries = this.props.galleryCollection;
        const currentGallery = galleries.length && galleries.filter(gallery => +gallery.id === +currentGalleryId)[0];
        const {title, environment, thumbnailUrl} = currentGallery;

        this.state = {
            title,
            environment,
            thumbnailUrl,

        };
        this.handleChange = this.handleChange.bind(this);
    }
   
    componentWillReceiveProps(nextProps){
        if (nextProps.galleryCollection.length !== this.props.galleryCollection){
        const currentGalleryId = nextProps.match.params.id;
        const galleries = nextProps.galleryCollection;
        const currentGallery = galleries.length && galleries.filter(gallery => +gallery.id === +currentGalleryId)[0];
        const {title, environment, thumbnailUrl} = currentGallery;
        this.setState({
            title,
            environment,
            thumbnailUrl
        });
        }
    }
    handleChange(evt){ //you can declare a key in an object as a variable if you wrap it in brackets
        // evt.preventDefault();
        var value = evt.target.value;
        var name = evt.target.name;
        this.setState({
            [name]: value
        });

    }

      render(){
        console.log("STATE",this.state);
        const currentGalleryId = this.props.match.params.id;
        const galleries = this.props.galleryCollection;
        const currentGallery = galleries.length && galleries.filter(gallery => +gallery.id === +currentGalleryId)[0];
        let artistName;
        let artistId;
        if (currentGallery){
          artistName = currentGallery.user.name;
          artistId = currentGallery.user.id;
        }

        return (
        <div className="editGalleryContainter">
            
            <GalleryEditPageHeader classname="galleryEditPageHeader" title ={this.state.title} handleChange={this.handleChange}/>
          
            
        
            <div className="galleryCover">

                <div className="innerGalleryCover">
                    <div>
                    </div>

                    <div className="editGalleryColumn">
                        <h3>Set up your gallery</h3>
                        <img
                          className="galleryCover"
                          src={this.state.thumbnailUrl}
                          style={{height: '300px', width: '400px'}} />
                    </div>
      
                    <div className="editGalleryColumn">
                        <h3 >Gallery Cover</h3>
                        <PaintingDropdown currentGallery={currentGallery} handleChange={this.handleChange} selected={this.state.thumbnailUrl} />
                        <div id="enterVRButton" style={{textAlign: 'center', margin: 'auto'}}>
                        <Link to={`/vr/${currentGalleryId}/${this.state.environment}`}>
                        <button className="btn btn-danger" 
                        style={{backgroundColor: 'red', fontSize:'14px', margin: 'auto', color:'#222'}}>
                        Enter VR</button>
                        </Link>
                      </div>
                    </div>

                        <div className="editGalleryColumn">
                            <h3>Gallery Environment</h3>
                            <DisplaySelectForm handleChange={this.handleChange} selected={this.state.environment}/>
                            <Button onClick={()=>this.props.handleSubmit(this.state)}  className="btn btn-success" style={{ height: '60px',margin:'auto',color:'#101010'}}>Submit Changes</Button>
                        </div>
      {/*</form>*/}
                </div>
             </div>




            <div className="addAPaintingDiv" style={{marginTop:'40px'}}>
                <div className="addAPaintingColumn">
                    <h3>Add a painting</h3>
                        <Link to={`/canvas?galleryid=${currentGalleryId}`}><Button type="submit"
                                    className="btn btn-success"
                                    style={{margin: 'auto',color:'#222'}} >Canvas
                        </Button></Link>
                </div>
                <div className="addAPaintingColumn">
                <h3 style={{textAlign: 'left'}}>My Paintings</h3>
                <DisplayPaintings currentGallery={currentGallery} />
                </div>

            </div>


        </div>//this closes the first div

        );

    }
}

const mapState = (state, ownProps) => {
  return {
    galleryCollection: state.galleries.galleryCollection,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit(galleryState){
      console.log(galleryState);
      const id = ownProps.match.params.id;
      const userId = jwt_decode(localStorage.getItem('jwt')).userId;

      const title = galleryState.title;
      const environment = galleryState.environment;
      const thumbnailUrl = galleryState.thumbnailUrl;

      dispatch(updateGalleryThunk( { id, title, environment, thumbnailUrl, userId } ));
    }
  };
};

export default connect(mapState, mapDispatchToProps)(GalleryEdit);
