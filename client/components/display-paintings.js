import React from 'react';
import {Link} from 'react-router-dom';


export default function DisplayPaintings (props){
    const currentGallery = props.currentGallery;

    return (

        <div className="userImagesInGalleryRow">
        {
            currentGallery && currentGallery.paintings.map(painting => {
                return (

                  <div className="innerGalleryBox" key={painting.id}>
                  <img className="singleUserGalleryThumb" src={painting.url} />
                  <Link to={`/paintings/${painting.id}`} className="singleUserPaintingName">{painting.name}</Link>
                  </div>

                );
              })
            }

        </div>
        );

}
