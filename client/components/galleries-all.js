import React, { Component } from 'react';
import { NavLink, Link} from 'react-router-dom';


export default class AllGalleries extends Component{

  render(){
    return (
      <div>
        <h1>allGalleries </h1>
        <Link to="galleries/1">Gallery 1</Link>
      </div>
    );
  }


}
