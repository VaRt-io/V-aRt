import React,{Component} from 'react';



export default function DisplaySelectFromFS (props){
    // console.log("DiSPLaY fRoM Fs PrOps",props);
    let handleChange= props.handleChange;
    return(
        <select name="environment" onChange={handleChange}>
            <option  value="nightscene">nightscene</option>
            <option  value="cube">cube</option>
        </select>
        );

}