import React,{Component} from 'react';
import {Link} from 'react-router-dom';


export default function DisplayPaintings (props){
    console.log("displayPaintings PrOps",props)
    const currentGallery= props.currentGallery;
    return(

        <div className="userImagesInGalleryRow">
        {
            currentGallery && currentGallery.paintings.map(painting=>{
                return(

                  <div className="paintingsBox" key={painting.id}>
                  <img className="singleUserGalleryThumb" src={painting.url}/>
                  <Link to={`/paintings/${painting.id}`}>{painting.name}</Link>
                  </div>

                );
              })
            }

        </div>
        );

}
