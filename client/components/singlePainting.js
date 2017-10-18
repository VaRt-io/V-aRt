import React, { Component } from 'react';
import {connect} from 'react-redux';

class SinglePainting extends Component{

  render(){
    const currentPaintingId = this.props.match.params.id;

    const paintings = this.props.paintingsCollection;

    const currentPainting = paintings.length && paintings.filter(painting => +painting.id === +currentPaintingId)[0];

    function getPaintingName(address) {
      let addressArray = address.split('/');
      let name = addressArray[addressArray.length - 1];

      while (name.indexOf('_') !== -1){
        name = name.replace('_', ' ');
      }
      return name;
    }

    var artName = getPaintingName(currentPainting['url'] + ''); // DO NOT SWITCH TO DOT NOTATION, doesn't work in this case

    return (
      <div className="carImg">
        <h1>{artName}</h1>
        <img src={currentPainting.url} />
      </div>
    );
  }

}

const mapState = (state, ownProps) => {
  return {
    paintingsCollection: state.paintings.paintingsCollection,
  };
};

export default connect(mapState)(SinglePainting);
