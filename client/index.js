import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import Main from './components/main';
// import store from './store'


ReactDOM.render(
        <Router>
            <Main />
        </Router>,
    document.getElementById('mainView')
)