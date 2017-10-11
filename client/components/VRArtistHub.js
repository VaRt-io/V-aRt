import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React, {Component} from 'react';
import {connect} from 'react-redux';

function VRArtistHub(props) {
    const currentArtistId = props.match.params.id;
    const artists = props.artistsCollection;
    const currentArtist = artists.length && artists.filter(artist => +artist.id === +currentArtistId)[0];
    let galleries;
    let gridCellPositions;

    if (currentArtist){
        let galleries = currentArtist.galleries;
        let galleriesGrid = createGrid(galleries);
        gridCellPositions = mapCellPositions(galleriesGrid);
    }
    console.log('rendering?', gridCellPositions);

    function createGrid(arr) {
        var newArr = [];
        while (arr.length) {
          newArr.push(arr.splice(0,3));
        }
        return newArr;
      }

      function mapCellPositions(grid) {
        var x = 0;
        var y = 3;
        var cellPositions = [];
        for (var i = 0; i < grid.length; i++) {
          x += 3;
          // looping for each column
          for (var j = 0; j < 3; j++) {
            y += 3;
            cellPositions.push(`${x} ${y}`);
          }
        }
        return cellPositions;
      }

    return (
        galleries?
        <Scene>
        <a-entity light="type: ambient; color: #BBB"></a-entity>

            <a-entity environment="preset: contact"></a-entity>               
        </Scene>
        :
        null
    );
}

// <a-entity 
// id={galleries[0].id} 
// geometry={{primative: 'box'}} 
// material={`src: ${galleries[0].thumbnailUrl}`} 
// position={'0 3 -10'} 
// >
// </a-entity>  

const mapState = function(state){
    return {
        artistsCollection: state.users.artistsCollection
    }
};

export default connect(mapState)(VRArtistHub);


// {
//     gridCellPositions.map((position, index) => {
//         return (
//             <a-entity 
//             id={galleries[index].id} 
//             geometry={{primative: 'box'}} 
//             material={`src: ${galleries[index].thumbnailUrl}`} 
//             position={position} 
//             >
//         </a-entity>  
//         );
//     })
// }