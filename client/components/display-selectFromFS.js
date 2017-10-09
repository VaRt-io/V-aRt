import React,{Component} from 'react';



export default function DisplaySelectFromFS (props){
    console.log("DiSPLaY fRoM Fs PrOps",props)
    let handleChange = props.handleChange;
    console.log(handleChange)
    return(
        <form method="post" onChange={handleChange}>
            <label>
                Picture:
                <input type="file" name="thumbnailUrl" accept="image/*" />
            </label>
        </form>
        );

}
