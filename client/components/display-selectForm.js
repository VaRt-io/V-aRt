import React,{Component} from 'react';



export default function DisplaySelectFromFS (props){
    // console.log("DiSPLaY fRoM Fs PrOps",props);
    let handleChange= props.handleChange;
    let selected = props.selected;
    
    
    return(
        <select name="environment" onChange={handleChange}>
            <option>Selected-{selected}</option>
            <option  value="nightscene">nightscene</option>
            <option  value="cube">cube</option>
            <option value="desert">desert</option>
            <option value="starry">starry</option>
            <option value="vangogh">vanGogh</option>
        </select>
        );

}