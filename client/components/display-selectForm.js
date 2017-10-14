import React,{Component} from 'react';



export default function DisplaySelectFromFS (props){
    console.log("DiSPLaY fRoM Fs PrOps",props);
    let handleChangeForEnvironment= props.handleChangeForEnvironment;
    let selected = props.selected;
    
    const nightscene={name: 'nightscene', environmentPic: '/COVERIMAGES/halloween.png'};
    const desert ={name: 'desert', environmentPic: '/COVERIMAGES/theDesert.png'};
    const starry={name: 'starry', environmentPic: '/COVERIMAGES/theRoom.png'};
    const vangogh={name:'vangogh', environmentPic: '/COVERIMAGES/theRoom.png'};
    
    return(
        <select name="environment" onChange={handleChangeForEnvironment}>
            <option>Selected-{selected}</option>
            <option  value={JSON.stringify(nightscene)}>Nightscene</option>
            
            <option value={JSON.stringify(desert)}>Desert</option>
            <option value={JSON.stringify(vangogh)}>Starry</option>
            <option value={JSON.stringify(vangogh)}>VanGogh</option>
        </select>
        );

}
