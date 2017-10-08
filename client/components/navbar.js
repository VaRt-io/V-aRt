import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';


class OurNavbar extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    console.log('props here', this.props);
    return (
            <Navbar id="ourNavbar"inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <LinkContainer to="/"><a href="#">V-aRt</a></LinkContainer>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <LinkContainer to="/galleries"><NavItem >Galleries</NavItem></LinkContainer>
                <LinkContainer to="/artists"><NavItem >Artists</NavItem></LinkContainer>
                <NavDropdown eventKey={3} title="SearchBar" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1}>Action</MenuItem>
                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </NavDropdown>
              </Nav>
              <Nav pullRight>
{this.props.currentUser.isLoggedIn ? <NavItem href="#" eventKey={1} >Sign Out </NavItem> : <NavItem eventKey={1} href="/signin">Sign In</NavItem> }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
    );
  }
}

const mapStateToProps = ({currentUser}) => ({currentUser});

export default withRouter(connect(mapStateToProps)(OurNavbar));

