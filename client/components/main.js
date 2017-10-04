import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {LandingPage,  OurNavbar, AllArtists, SingleArtist, AllGalleries, SingleGallery, VR, VR2} from './index';

import store, {getGalleriesThunk, fetchUsers} from '../store';

export default class Main extends Component{

  componentDidMount(){
    console.log('MAIN COMPONENT MOUNTED');
        // console.log(getGalleriesThunk)
    const galleryAction = getGalleriesThunk();
    const userAction= fetchUsers();     ///USERS = ARTISTS 
    store.dispatch(galleryAction);
    store.dispatch(userAction)
  }

  render(){
    return (
            <div id="landingBackground">
            <OurNavbar />
            <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/vr" component={VR} />
            
            <Route exact path="/artists/:id" component={SingleArtist} />
            <Route exact path="/artists" component={AllArtists} />
            <Route exact path="/galleries" component={AllGalleries} />
            <Route exact path="/galleries/:id" component={SingleGallery} />
            <Route exact path="/vr" component={VR} />
            <Route exact path="/vr2" component={VR2} />

            </Switch>
        </div>
    );
  }
}
