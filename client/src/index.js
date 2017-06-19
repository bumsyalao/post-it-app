//This is the entry file for react and webpack

import React from 'react';
import ReactDOM from 'react-dom';


import {BrowserRouter} from 'react-router-dom';

import App from "./js/components/App";
import DashBoard from "./js/components/Dashboard/Dashboard";

ReactDOM.render(
  <BrowserRouter>
  <DashBoard/>
</BrowserRouter>, document.getElementById('root'));