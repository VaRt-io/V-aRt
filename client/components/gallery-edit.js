import React, { Component } from 'react';
import { NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import store from '../store';
import{Button} from 'react-bootstrap';
import {DisplayPaintings, OurPageHeader} from './index';


class GalleryEdit extends Component{
    
      render(){
        console.log("Gallery Edit PROPS",this.props);
        const currentGalleryId = this.props.match.params.id;
        const galleries = this.props.galleryCollection;
        const currentGallery = galleries.length && galleries.filter(gallery => +gallery.id === +currentGalleryId)[0];
        let artistName;
        let artistId;
        if(currentGallery){
          artistName =currentGallery.user.name;
          artistId= currentGallery.user.id;
        }
        console.log('CURRENT GALLERY', currentGallery);
        console.log('ArtistId', artistId);
        console.log("Display Paintings", DisplayPaintings);
        return (
           
        <div className="editGalleryContainter">
            <OurPageHeader artistName={artistName} artistId={artistId} 
                        currentGallery={currentGallery}/>
          
            <div className="galleryCover">
                <h3>Select a Picture for your Gallery Cover</h3>
                <div className="innerGalleryCover">
                <div>
                    <img src={currentGallery.thumbnailUrl} />
                    </div>
                <div>
                    <h3>Choose From Gallery</h3>
                    <select>
                    
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                </select>
                </div>

            <div><h3>Or</h3></div>

            <div>
            <h3>Upload A Cover</h3>
                <form action="">
                    <label>
                        Picture:
                        <input type="file" name="pic" accept="image/*" />
                    </label>
                </form>
            </div>
          </div>
        </div>

          <h3>Add a painting</h3>
          <hr style={{color: 'white'}}/>
          <div className="addAPaintingDiv">
            
                <div className="addAPaintingTextDiv">
                <h3>Draw From Canvas</h3>
                    <Link to={`/canvas?galleryid=${currentGalleryId}`}><Button type="submit" 
                                className="btn btn-success" 
                                style={{color:'#222'}} >Canvas
                        </Button></Link>
                </div>
                <div className="addAPaintingTextDiv">
                <h3>Or Uplaod A Picture</h3>
                    <form action="">
                        <label>
                        Picture:
                        <input type="file" name="pic" accept="image/*" />
                        </label>
                    </form>
                </div>

                <div></div>
                </div>

                <h3>My Paintings</h3>
                <DisplayPaintings currentGallery={currentGallery} />
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