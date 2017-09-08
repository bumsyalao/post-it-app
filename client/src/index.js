//This is the entry file for react and webpack
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AppAPI from './js/utils/appAPI'
import App from "./js/components/App.jsx";
import Dashboard from "./js/components/Dashboard/Dashboard";
import { BrowserRouter } from 'react-router-dom';
import main from './main.scss';
import bootstrap from './js/vendors/bootstrap'
import {firebaseAuth, firebase}from '../../server/config'



// Display State

//AppAPI.getGroups();
AppAPI.getNotifications();
// AppAPI.getMessages();
AppAPI.getContacts();
AppAPI.getNumbers();
AppAPI.searchUserMessage();
// AppAPI.removeMessage();



ReactDOM.render(
  <BrowserRouter basename="/#">
  <App/>
  </BrowserRouter>
, document.getElementById('root'));