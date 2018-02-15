import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import Home from './Home.js';
import City from './City.js';
import Activity from './Activity.js';

import CustomNavbar from "./CustomNavbar";
import CustomFooter from "./CustomFooter";

ReactDOM.render(
    <div className="page">
        <CustomNavbar/>
            <Router history={hashHistory}>
                <Route path="/" component={Home}/>
                <Route path="/city/:id" component={City}/>
                <Route path="/activity/:id" component={Activity}/>
                <Route path="*" component={() => <p>Page Not Found</p>}/>
            </Router>
        <CustomFooter/>
    </div>
    ,
    document.getElementById('root')
);

if (module.hot)
    module.hot.accept();

