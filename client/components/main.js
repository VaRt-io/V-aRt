import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {LandingPage,  OurNavbar, AllArtists, SingleArtist, AllGalleries, SingleGallery, VRNightScene, VRCube, CanvasWrapper, GalleryCreate, SinglePainting, GalleryEdit} from './index';
import AframeVR from '../containers/wrapper';

import store, {getGalleriesThunk, fetchUsers, getPaintingsThunk} from '../store';

export default class Main extends Component{

  componentDidMount(){
    console.log('MAIN COMPONENT MOUNTED');
        // console.log(getGalleriesThunk)
    const galleryAction = getGalleriesThunk();
    const userAction = fetchUsers();     ///USERS = ARTISTS
    const paintingsAction = getPaintingsThunk();
    store.dispatch(galleryAction);
    store.dispatch(userAction);
    store.dispatch(paintingsAction);
  }

  render(){
    return (
      <div id="landingBackground">
        <OurNavbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/artists/:id" component={SingleArtist} />
          <Route exact path="/artists" component={AllArtists} />
          <Route exact path="/galleries" component={AllGalleries} />
          <Route exact path="/galleries/:id" component={SingleGallery} />
          <Route exact path="/galleries/:id/vr/nightscene" component={VRNightScene} />
          <Route exact path="/gallery-create" component={GalleryCreate} />
          <Route exact path="/gallery-edit/:id" component={GalleryEdit} />
          <Route exact path="/vr/cube" component={VRCube} />
          <Route exact path="/vr/nightscene" component={VRNightScene} />
          <Route exact path="/vr/:galleryId" component={AframeVR} />
          <Route exact path="/canvas" component={CanvasWrapper} />
          <Route exact path="/paintings/:id" component={SinglePainting} />

        </Switch>
      </div>
    );
  }
}
