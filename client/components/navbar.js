import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {deAuthenticateUser} from '../store';

class OurNavbar extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    const currentUser = this.props.currentUser;
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
              </Nav>
              <Nav pullRight>
                {currentUser.isLoggedIn ? <NavItem onClick={() => this.props.history.push(`/artists/${currentUser.id}`)}>Dashboard </NavItem> : <NavItem onClick={() => this.props.history.push('/signup')}>Sign Up</NavItem>}
                {currentUser.isLoggedIn ? <NavItem onClick={() => this.props.signUserOut(this.props.history)} eventKey={1} >Sign Out </NavItem> : <NavItem eventKey={1} onClick={() => {this.props.history.push('/signin')} }>Sign In</NavItem> }              </Nav>
            </Navbar.Collapse>
          </Navbar>
    );
  }
}

const mapStateToProps = ({currentUser}) => ({currentUser});

const mapDispatchToProps = (dispatch) => {
return {
  signUserOut: (history) => {
    dispatch(deAuthenticateUser());
      localStorage.removeItem('email');
      localStorage.removeItem('jwt');
      history.push('/');
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OurNavbar));
