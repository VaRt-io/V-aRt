import 'aframe';
import 'aframe-particle-system-component';
import { Scene } from 'aframe-react';
import React from 'react';
import { connect } from 'react-redux';

function VRArtistHub(props) {

    const currentArtistId = props.match.params.id;
    const currArtistIdNum = Number(currentArtistId);
    const nextArtistId = (currArtistIdNum + 1).toString();
    const previousArtistId = (currArtistIdNum - 1).toString();
    const artists = props.artistsCollection;
    const currentArtist = artists.length && artists.filter(artist => +artist.id === +currentArtistId)[0];
    let galleries;
    let gridCellPositions;

    // Convert a 1D array to a 2D array of subarrays with a max length of 3
    function createGrid(arr) {
        var newArr = [];
        var clonedArr = arr.slice();
        while (clonedArr.length) {
          newArr.push(clonedArr.splice(0, 3));
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
          galleries ?
          <Scene>
          <a-entity light="type: ambient; color: #BBB" />
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
                        />
                        <a-text
                            value={`${galleries[index].title}`}
                            align="center"
                            anchor="center"
                            baseline="bottom"
                            position="0 -1 0"
                        />
                    </a-entity>
                    </a-link>

                );
            })
        }
        <a-entity camera="userHeight: 2.9" look-controls wasd-controls>
                <a-entity
                  cursor="fuse: true; fuseTimeout: 1500"
                  id="cursor" position="0 0 -2" geometry="primitive: ring; radiusOuter: 0.08; radiusInner: 0.05" material="color: white">
                <a-animation
                  begin="click"
                  easing="ease-in"
                  attribute="scale" dur="150"
                  fill="forwards" from="0.1 0.1 0.1" to="1 1 1" />
                <a-animation
                  begin="cursor-fusing"
                  easing="ease-in"
                  attribute="scale"
                  dur="1500"
                  fill="backwards" from="1 1 1" to="0.1 0.1 0.1" />
                </a-entity>
        </a-entity>

            <a-box src="/img/exitsign.png" href={'/artists'} position="0 2 3.5" />
            <a-box src="/img/next.png" href={`/vr/artists/${currentArtistId + 1}/starry`} position="3.5 2 0" />
            <a-box src="/img/previous.jpeg" href={`/vr/artists/${currentArtistId - 1}/starry`} position="-3.5 2 0" />
            <a-entity environment="preset: contact" />
          </Scene>
          :
          <Scene>
              <a-entity camera="userHeight: 2.9" look-controls wasd-controls>
                <a-entity
                cursor="fuse: true; fuseTimeout: 1500"
                id="cursor" position="0 0 -2" geometry="primitive: ring; radiusOuter: 0.08; radiusInner: 0.05" material="color: white">
                    <a-animation
                      begin="click"
                      easing="ease-in"
                      attribute="scale"
                      dur="150"
                      fill="forwards" from="0.1 0.1 0.1" to="1 1 1" />
                    <a-animation
                      begin="cursor-fusing"
                      easing="ease-in"
                      attribute="scale"
                      dur="1500"
                      fill="backwards" from="1 1 1" to="0.1 0.1 0.1" />
                </a-entity>
            </a-entity>

            <a-box src="/img/exitsign.png" href={'/artists'} position="0 2 3.5" />
            <a-box src="/img/next.png" href={`/vr/artists/${nextArtistId}/starry`} position="3.5 2 0" />
            <a-box src="/img/previous.jpeg" href={`/vr/artists/${previousArtistId}/starry`} position="-3.5 2 0" />
            <a-entity environment="preset: contact" />
        </Scene>

      );
}

const mapState = function(state){
    return {
        artistsCollection: state.users.artistsCollection
    };
};

export default connect(mapState)(VRArtistHub);
