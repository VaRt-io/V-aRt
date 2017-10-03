import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {OurCarousel} from './index'

export default class Main extends Component{


    render(){
        return(
          <div>
           <h3 style={{margin:"30px 0px 50px 30px"}}>
           V-aRt is virtual art expeierence mergring the technology of virtual reality
           <br/>    with the talent of artists arcoss the world. 
           <br/>Enjoy browsing our virtual galleries and museums.
           </h3>
           <OurCarousel />
           </div>
        )
    }
}

