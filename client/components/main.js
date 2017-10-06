import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
<<<<<<< HEAD
import {LandingPage,  OurNavbar, AllArtists, SingleArtist, AllGalleries, SingleGallery} from './index';
import VRWrapper from "../containers/VRWrapper.js"
=======
import {LandingPage,  OurNavbar, AllArtists, SingleArtist, AllGalleries, SingleGallery, VR, VR2, CanvasWrapper, CreateGallery} from './index';
>>>>>>> master

import store, {getGalleriesThunk, fetchUsers, getImagesThunk} from '../store';

export default class Main extends Component{

  componentDidMount(){
    console.log('MAIN COMPONENT MOUNTED');
        // console.log(getGalleriesThunk)
    const galleryAction = getGalleriesThunk();
    const userAction = fetchUsers();     ///USERS = ARTISTS 
    const imageAction = getImagesThunk();
    store.dispatch(imageAction);
    store.dispatch(galleryAction);
    store.dispatch(userAction);
  }

  render(){
    return (
      <div id="landingBackground">
        <OurNavbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />>
          <Route exact path="/vr/:galleryId" component={VRWrapper} />
          <Route exact path="/artists/:id" component={SingleArtist} />
          <Route exact path="/artists" component={AllArtists} />
          <Route exact path="/galleries" component={AllGalleries} />
          <Route exact path="/galleries/:id" component={SingleGallery} />
          <Route exact path="/createGallery" component={CreateGallery} />
          <Route exact path="/canvas" component={CanvasWrapper} />

        </Switch>
      </div>
    );
  }
}
