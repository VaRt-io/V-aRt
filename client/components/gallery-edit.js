import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {updateGalleryThunk} from '../store';
import jwt_decode from 'jwt-decode';
import {Button} from 'react-bootstrap';
import {DisplayPaintings, DisplaySelectForm, PaintingDropdown, GalleryEditPageHeader } from './index';

const noWherePic = 'http://www.kansascyclist.com/img/photos/KansasCyclingPhotos_005.jpg';


class GalleryEdit extends Component{

    constructor(props){
        super(props);

        const currentGalleryId = this.props.match.params.id;
        const galleries = this.props.galleryCollection;
        const currentGallery = galleries.length && galleries.filter(gallery => +gallery.id === +currentGalleryId)[0];
        const {title, environment, thumbnailUrl, environmentPic} = currentGallery;

        this.state = {
            title,
            environment,
            thumbnailUrl,
            environmentPic,

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeForEnvironment = this.handleChangeForEnvironment.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.galleryCollection.length !== this.props.galleryCollection){
        const currentGalleryId = nextProps.match.params.id;
        const galleries = nextProps.galleryCollection;
        const currentGallery = galleries.length && galleries.filter(gallery => +gallery.id === +currentGalleryId)[0];
        const {title, environment, thumbnailUrl, environmentPic} = currentGallery;

        this.setState({
            title,
            environment,
            thumbnailUrl,
            environmentPic,
        });
        }
    }
    handleChange(evt){
        var value = evt.target.value;
        var name = evt.target.name;

        this.setState({
            [name]: value
        });
    }

    handleChangeForEnvironment(evt){
        const parsedEnvironmentObj = JSON.parse(evt.target.value);

        var environment = parsedEnvironmentObj.name;
        var environmentPic = parsedEnvironmentObj.environmentPic;

        this.setState({
            environment,
            environmentPic
        });

    }

      render(){
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
        <h1 style={{marginLeft: '20px'}}>Gallery Edit</h1>
          <div id="galleryEditPageHeader">
           <GalleryEditPageHeader className="galleryEditPageHeader" title ={this.state.title} handleChange={this.handleChange} />
          </div>


            <div className="galleryCover">

                <div className="innerGalleryCover">

                    <div className="editGalleryColumn">
                        <h3>Gallery Cover Image</h3>
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
                        <button
                          className="btn btn-danger"
                          style={{backgroundColor: 'red', fontSize: '14px', margin: 'auto', color: '#222'}}>
                        Enter VR</button>
                        </Link>
                      </div>
                    </div>

                    <div className="editGalleryColumn">
                         <h3>Gallery Environment</h3>
                        <DisplaySelectForm handleChangeForEnvironment={this.handleChangeForEnvironment} selected={this.state.environment} />
                        <Button onClick={() => this.props.handleSubmit(this.state)} className="btn btn-success" style={{ height: '60px', margin: 'auto', color: '#101010'}}>Submit Changes</Button>
                    </div>

                    <div className="editGalleryColumn">
                    <h3>Environment</h3>
                    <img
                      className="galleryCover"
                      src={this.state.environmentPic}
                      style={{height: '300px', width: '400px'}} />
                </div>
                </div>
             </div>

            <div className="addAPaintingDiv" style={{marginTop: '40px'}}>
                <div className="addAPaintingColumn">
                    <h3>Add a painting</h3>
                        <Link to={`/canvas?galleryid=${currentGalleryId}`}><Button
                            type="submit"
                            className="btn btn-success"
                            style={{margin: 'auto', marginTop: '45px', color: '#222'}} >Canvas
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
      const environmentPic = galleryState.environmentPic;
      dispatch(updateGalleryThunk( { id, title, environment, thumbnailUrl, userId, environmentPic } ));
    }
  };
};

export default connect(mapState, mapDispatchToProps)(GalleryEdit);
