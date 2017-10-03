import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {LandingPage, Canvas, OurNavbar, AllArtists, SingleArtist, AllGalleries, SingleGallery, VR} from './index';

export default class Main extends Component{


    render(){
        return(
            <div id="landingBackground">
            <OurNavbar/>
            <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route exact path='/vr' component={VR} />
            <Route exact path='/canvas' component={Canvas}/>
            <Route exact path='/artists/:id' component={SingleArtist} />
            <Route exact path='/artists' component={AllArtists} />
            <Route exact path='/galleries' component={AllGalleries} />
            <Route exact path='/galleries/:galleryId' component={SingleGallery} />
            
            </Switch>
        </div>
        )
    }
}