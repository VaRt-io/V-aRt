import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {OurCarousel} from './index'

export default class Main extends Component{


    render(){
        return(
          <div>
           <h1>HELLO FROM NAVPAGE</h1>
           <OurCarousel />
           </div>
        )
    }
}

