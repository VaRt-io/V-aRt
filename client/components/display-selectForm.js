import React from 'react';


export default function DisplaySelectFromFS (props){
    let handleChangeForEnvironment = props.handleChangeForEnvironment;
    let selected = props.selected;

    const nightscene = {name: 'nightscene', environmentPic: '/COVERIMAGES/halloween.png'};
    const desert = {name: 'desert', environmentPic: '/COVERIMAGES/theDesert.png'};
    const starry = {name: 'starry', environmentPic: '/COVERIMAGES/starry.jpg'};
    const vangogh = {name: 'vangogh', environmentPic: '/COVERIMAGES/theRoom.png'};
    const vaporwave = {name: 'vaporwave', environmentPic: '/COVERIMAGES/vaporwave.png'};

    return (
        <select name="environment" onChange={handleChangeForEnvironment} style={{backgroundColor: 'grey'}}>
            <option>Selected-{selected}</option>
            <option  value={JSON.stringify(nightscene)}>Nightscene</option>

            <option value={JSON.stringify(desert)}>Desert</option>
            <option value={JSON.stringify(starry)}>Starry</option>
            <option value={JSON.stringify(vangogh)}>VanGogh</option>
            <option value={JSON.stringify(vaporwave)}>Vaporwave</option>
        </select>
        );

}
