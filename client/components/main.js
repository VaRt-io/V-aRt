import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import {LandingPage,  OurNavbar, AllArtists, SingleArtist, AllGalleries, SingleGallery, VR, VR2, CanvasWrapper, GalleryCreate, SinglePainting, GalleryEdit, Signup, Signin, ArtistDashboard, VRWrapper, VRHub} from './index';


import store, {getGalleriesThunk, fetchUsers, getPaintingsThunk, checkIfLoggedIn} from '../store';

export default class Main extends Component{

  componentDidMount(){
    console.log('MAIN COMPONENT MOUNTED');
        // console.log(getGalleriesThunk)
    const galleryAction = getGalleriesThunk();
    const userAction = fetchUsers();     ///USERS = ARTISTS
    const paintingsAction = getPaintingsThunk();
    const checkIfLoggedInThunk = checkIfLoggedIn();
    store.dispatch(galleryAction);
    store.dispatch(userAction);
    store.dispatch(paintingsAction);
    store.dispatch(checkIfLoggedInThunk);
  }

  render(){
    return (
      <div id="landingBackground">
        <OurNavbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/vr/:galleryId" component={VRWrapper} />
          <Route exact path="/vr/hub" component={VRHub} />
          <Route exact path="/artists/:id" component={SingleArtist} />
          <Route exact path="/artists" component={AllArtists} />
          <Route exact path="/galleries" component={AllGalleries} />
          <Route exact path="/galleries/:id" component={SingleGallery} />
          <Route exact path="/gallery-create" component={GalleryCreate} />
          <Route exact path="/gallery-edit" component={GalleryEdit} />
          <Route exact path="/vr" component={VR} />
          <Route exact path="/vr2" component={VR2} />
          <Route exact path="/canvas" component={CanvasWrapper} />
          <Route exact path="/paintings/:id" component={SinglePainting} />
          <Route exact path="/dashboard" component={ArtistDashboard} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
        </Switch>
      </div>
    );
  }
}
