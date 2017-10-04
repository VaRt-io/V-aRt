import React, { Component } from 'react';
import { NavLink, Link} from 'react-router-dom';


export default class SingleGallery extends Component{

  render(){
    return (
      <div>
        <h1>Gallery Name</h1>
        <Link to="/vr"><button className="btn btn-danger" style={{backgroundColor: 'red'}}>Enter VR</button></Link>
        <h3>map over images</h3>
        <a href="link to canvas"><button className="btn btn-success">Create an Image</button></a>
      </div>
    );
  }

}
