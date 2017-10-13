import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {OurCarousel} from './index';

export default class Main extends Component{


  render(){
    return (
          <div >
            <div id="landingPageHeader" style={{marginLeft:'27vw'}}>
              <h3 style={{margin: '30px 0px 0px 30px'}}>V-aRt is  a virtual art experience,</h3>
              <h3 style={{margin: '0px 0px 0px 50px'}}>merging the technology of virtual reality</h3>
              <h3 style={{margin: '0px 0px 0px 70px'}}>with the talent of artists arcoss the Globe.</h3>
              <h3 style={{margin: '0px 0px 50px 90px'}}>Enjoy browsing our virtual galleries and museums.</h3>
    
            </div>
            <OurCarousel />

           

            <div id="landingPageDescriptors">
              <div className="col-md-4">
              <h3>Paint <span class="glyphicon glyphicon-pencil"></span></h3>
              <h3>Create beautiful masterpieces on our canvas or drag and drop your own images</h3>
              </div>
              <div className="col-md-4">
              <h3>Browse<span class="glyphicon glyphicon-bookmark"></span></h3>
              <h3>Discover and follow new artists and browse through their galleries for inspiration</h3>
              </div>
              <div className="col-md-4">
              <h3>View In VR <span class="glyphicon glyphicon-sunglasses"></span></h3>
              <h3>See artworks come to life in surrealistic three dimensional environments</h3>
              </div>
            </div>

            <div className="col-md-12" 
            style={{backgroundColor:'black', 
            color:'white', 
            height:'100px', 
            textAlign:'center',
            margin: 'auto',
            marginTop:'50px'
          }}>
            <h5 style={{margin:'45px'}}>
            By Tawsif Ahmed, Jason Rosso, Alex Press, James Dooley
            </h5>
            </div>

           </div>


           
    );
  }
}
