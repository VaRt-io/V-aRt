import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {LandingPage, Canvas, OurNavbar, AllArtists, SingleArtist, AllGalleries} from './index';

export default class Main extends Component{


    render(){
        return(
            <div>
            <OurNavbar/>
            <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route exact path='/canvas' component={Canvas}/>
            <Route exact path='/artists' component={AllArtists} />
            <Route exact path='/Galleries' component={AllGalleries} />
            <Route exact path='/allArtists/:artistId' component={SingleArtist} />
            </Switch>
        </div>
        )
    }
}