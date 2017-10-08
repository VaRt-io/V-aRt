import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {OurCarousel} from './index';

export default class Main extends Component{


  render(){
    return (
          <div>
           <h3 style={{margin: '30px 0px 0px 30px'}}>V-aRt is  a virtual art experience,</h3>
           <h3 style={{margin: '0px 0px 0px 50px'}}>merging the technology of virtual reality</h3>
           <h3 style={{margin: '0px 0px 0px 70px'}}>with the talent of artists arcoss the Globe.</h3>
           <h3 style={{margin: '0px 0px 50px 90px'}}>Enjoy browsing our virtual galleries and museums.</h3>
         
           <OurCarousel />
           </div>
    );
  }
}
