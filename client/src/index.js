//This is the entry file for react and webpack

import React from 'react';
import ReactDOM from 'react-dom';
import AppAPI from './js/utils/appAPI'


import {BrowserRouter} from 'react-router-dom';

import App from "./js/components/App";


AppAPI.getContacts();

ReactDOM.render(
  <BrowserRouter>
  <App />
</BrowserRouter>, document.getElementById('root'));