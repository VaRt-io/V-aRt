import React,{Component} from 'react';


export default function PaintingDropdown (props){
    console.log("DrOpDowN PrOps",props);
    let currentGallery= props.currentGallery;
    let handleChange=props.handleChange;

    return(
        <select name="thumbnailUrl" onChange={handleChange}>
        {
            currentGallery && currentGallery.paintings.map(painting=>{
                return(
                  <option name="thumbnailUrl" key={painting.id}  value={painting.url}>{painting.name}</option>
                );
              })
        }
            
           
        </select>
        );

}