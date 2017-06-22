//This is the entry file for react and webpack

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AppAPI from './js/utils/appAPI'
import App from "./js/components/App";
import {BrowserRouter} from 'react-router-dom';


// Display State
// AppAPI.getContacts();



ReactDOM.render(
  <BrowserRouter>
  <App/>
</BrowserRouter>, document.getElementById('root'));