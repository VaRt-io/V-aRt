import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React, {Component} from 'react';
import {connect} from 'react-redux';

function VRArtistHub(props) {

    const currentArtistId = +props.match.params.id;
    const artists = props.artistsCollection;
    const currentArtist = artists.length && artists.filter(artist => +artist.id === currentArtistId)[0];
    let galleries;  
    let gridCellPositions;

    // Convert a 1D array to a 2D array of subarrays with a max length of 3
    function createGrid(arr) {
        var newArr = [];
        var clonedArr = arr.slice();
        while (clonedArr.length) {
          newArr.push(clonedArr.splice(0,3));
        }
        return newArr;
      }

    // Takes a 2D array and creates a 1D array of grid positions using the 3D coordinate system
      function mapCellPositions(grid) {
        var x = -3;
        var y = 0;
        var cellPositions = [];
        for (var i = 0; i < grid.length; i++) {
          y += 1.75;
          x = -3;
          // looping for each column
          for (var j = 0; j < grid[i].length; j++) {
            x += 1.5;
            cellPositions.push(`${x} ${y} -5`);
          }
        }
        return cellPositions;
      }
      // Created with the assumption that inner entities are positioned absolutely,
      // but they are positioned relatively within the entity they're containing
    //   function createTitlePosition(stringPosition) {
    //       const splitStringArr = stringPosition.split(' ');
    //       const [X, oldY, Z] = splitStringArr;
    //       const newY = (+oldY - 1).toString();
    //       const newStringPosition = [X, newY, Z].join();
    //       console.log('position', stringPosition, newStringPosition);
    //       return newStringPosition;
    //   }

      if (currentArtist){
        galleries = currentArtist.galleries;
        let grid = createGrid(galleries);
        gridCellPositions = mapCellPositions(grid);
    }

      return (
          galleries?
          <Scene>
          <a-entity light="type: ambient; color: #BBB"></a-entity>
          {/*
            Red stop sign with the word exit to allow user to exit to 2D artist page
        */}
          {
            gridCellPositions.map((position, index) => {
                return (
                    <a-link href={`/vr/${galleries[index].id}/${galleries[index].environment}`} key={`${galleries[index].id}`}>
                    <a-entity 
                        key={`${galleries[index].id}`} 
                        id={`${galleries[index].id}`} 
                        geometry={{primative: 'cube'}} 
                        material={`src: ${galleries[index].thumbnailUrl}`} 
                        position={position} 
                        >
                        <a-animation 
                            attribute="scale"
                            to="1.1 1.1 1.1"
                            repeat="indefinite"
                            dur="1000"
                        ></a-animation>
                        <a-text 
                            value={`${galleries[index].title}`}                       
                            align="center" 
                            anchor="center"
                            baseline="bottom"
                            position="0 -1 0"
                        ></a-text>
                    </a-entity>  
                    </a-link>

                );
            })
        }
            <a-entity camera="userHeight: 2.9" look-controls wasd-controls>
                <a-entity id="cursor" position="0 0 -2" cursor geometry="primitive: ring; radiusOuter: 0.08; radiusInner: 0.05" material="color: white"></a-entity>
            </a-entity>

            <a-link href={`/artists/${currentArtistId}`}>
            <a-circle color="#ff0000" radius="1" position={'8 3 -15'}>
              <a-text 
                  value='Exit'                      
                  align="center" 
                  anchor="center"
                  baseline="center"
                  position="0 0 0"
                  scale="1 1 1">
              </a-text>
            </a-circle>
          </a-link>

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

// <a-entity 
// id={galleries[0].id} 
// geometry={{primative: 'box'}} 
// material={`src: ${galleries[0].thumbnailUrl}`} 
// position={'0 3 -10'} 
// >
// </a-entity>  

