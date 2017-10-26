import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import moment from 'moment';

import Footer from './Footer'
import Routes from './Routes'
import AppStore from '../stores/AppStore'
import { firebaseAuth, firebase } from '../../../../server/config'
import Navigation from './Navigation'
import Dashboard from './Dashboard/Dashboard'
import AppActions from './../actions/AppActions'




/**
 * @description Main App
 * 
 * @class App
 * 
 * @extends {Component}
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authentication: AppStore.getAuthenticatedState(),
            user: AppStore.getUser(),
            loggedInUser: AppStore.getLoggedInUser(),
            loggedInPicture: AppStore.getLoggedInPicture(),
            groups: AppStore.getGroups()
        };
        this.onChange = this.onChange.bind(this)
    }

    /**
     * @method componentDidMount
     * 
     * @description Adds an event Listener to the Store and fires when the component is fully mounted.
     *
     * @return {void}
     * 
     * @memberof App
     */
    componentDidMount() {
        AppStore.addChangeListener(this.onChange);
    }

    /**
    * @method componentUnmount
    *
    * @description Removes event Listener from the Store
    * 
    * @memberof App
    */
    componentUnmount() {
        AppStore.removeChangeListener(this.onChange);
    }

    /**
    * @method onChange
    * 
    * @description Monitors changes in the components and change the state
    * 
    * @memberof App
    */
    onChange() {
        this.setState({ user: AppStore.getUser() });
        this.setState({ authentication: AppStore.getAuthenticatedState() });
        this.setState({ loggedInUser: AppStore.getLoggedInUser() });
        this.setState({ groups: AppStore.getGroups() });
    }

    /**
       * @method render
       * 
       * @description Render react component
       * 
       * @memberof App
       */
    render() {
        let expireInOneDay = moment().hours() + 24;
        const todaysHour= moment().hours();
        
        if (todaysHour < expireInOneDay) {
            if (this.state.authentication === true) {            
                localStorage.setItem('user', JSON.stringify(this.state.loggedInUser[0]));
                localStorage.setItem('expirationTime', JSON.stringify(expireInOneDay));            
            }
        } else {
          localStorage.clear()        
        }

        let componentToMount;
        if (localStorage.getItem('user') == null) {
            componentToMount = <div className="row">
                                    <Navigation />
                                    <div className="row">
                                        <Routes isAuthenticated={this.state.authentication} />
                                    </div>
                                    <div className="row">
                                        <Footer />
                                    </div>
                                </div>
        } else {
            componentToMount = <Dashboard />;
        }
        return (
            <div>
                {componentToMount}
            </div>
        );
    }


}

export default App;