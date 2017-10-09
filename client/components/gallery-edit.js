import React, { Component } from 'react';
import { NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import store from '../store';
import{Button} from 'react-bootstrap';
import {DisplayPaintings, OurPageHeader, DisplaySelectFromFS, DisplaySelectForm, PaintingDropdown } from './index';


class GalleryEdit extends Component{

    constructor(){
        super()
        this.state={
            title: '',
            environment: '',
            thumbnailUrl: '',

        };
        this.handleChange=this.handleChange.bind(this);
    }
    // componentDidMount(){
    //     const currentGalleryId = this.props.match.params.id;
    //     const galleries = this.props.galleryCollection;
    //     const currentGallery = galleries.length && galleries.filter(gallery => +gallery.id === +currentGalleryId)[0];
    //     const {title,environment,thumbnailUrl}= currentGallery;
    //     this.setState({
    //         title,
    //         environment,
    //         thumbnailUrl
    //     });
    // }
    componentWillReceiveProps(nextProps){
        if(nextProps.galleryCollection.length!==this.props.galleryCollection){
        const currentGalleryId = nextProps.match.params.id;
        const galleries = nextProps.galleryCollection;
        const currentGallery = galleries.length && galleries.filter(gallery => +gallery.id === +currentGalleryId)[0];
        const {title,environment,thumbnailUrl}= currentGallery;
        this.setState({
            title,
            environment,
            thumbnailUrl
        });
        }
    }


    handleChange(evt){ //you can declare a key in an object as a variable if you wrap it in brackets
        
        console.log('CHANGE REGISTERED');
        var value = evt.target.value;
        var name = evt.target.name;
        console.log(name);
        this.setState({
            [evt.target.name]: value
        });

    }
    
      render(){
          console.log("OUR NEW STATE",this.state);
        // console.log("Gallery Edit PROPS",this.props);
        const currentGalleryId = this.props.match.params.id;
        const galleries = this.props.galleryCollection;
        const currentGallery = galleries.length && galleries.filter(gallery => +gallery.id === +currentGalleryId)[0];
        let artistName;
        let artistId;
        if(currentGallery){
          artistName =currentGallery.user.name;
          artistId= currentGallery.user.id;
        }
        // console.log('CURRENT GALLERY', currentGallery);
        // console.log('ArtistId', artistId);
        // console.log("DispLaY cOmPonEnT", DisplaySelectForm);
        console.log(PaintingDropdown);
        console.log(this.state);

        return (
           
        <div className="editGalleryContainter">
            <OurPageHeader artistName={artistName} artistId={artistId} 
                        currentGallery={currentGallery}/>
          
            <div className="galleryCover">
            
                <div className="innerGalleryCover">
                    <div>
                    </div>
                    
                    <div className="editGalleryColumn">
                        <h3>Set up your gallery</h3>
                        <img className="galleryCover"src={this.state.thumbnailUrl} 
                        style={{height: '300px', width: '400px'}}
                        />
                    </div>

                    <div className="editGalleryColumn">
                        <h3 >Gallery Cover</h3>
                        <PaintingDropdown currentGallery={currentGallery} handleChange={this.handleChange}/>
                    </div>

                        <div className="editGalleryColumn">
                            <h3>Gallery Environment</h3>
                            <DisplaySelectForm handleChange={this.handleChange}/>
                            <Button className="btn btn-success" style={{margin:'auto',color:'#101010'}}>Submit</Button>
                        </div>
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
  
  export default connect(mapState)(GalleryEdit);