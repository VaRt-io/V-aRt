import React, { Component } from 'react';
import { NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import store from '../store';


class ArtistDashboard extends Component {

  constructor(props) {
    super(props);
  }

  render(){
    const currentUser = this.props.currentUser;
    if(currentUser.id) {
      return (
        <div>
          <h1>Welcome, {currentUser.name}</h1>
        </div>
      )
    } else {
      return (
        <div onClick={this.props.history.push('/signin')}>
          <h1>Welcome</h1>
        </div>
    );
    }
  }
}

const mapStateToProps = ({currentUser}) => ({currentUser});

export default connect(mapStateToProps)(ArtistDashboard);


