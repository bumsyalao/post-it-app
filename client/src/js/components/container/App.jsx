import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import moment from 'moment';

import Footer from '../presentation/Footer';
import Routes from '../presentation/Routes'
import AppStore from '../../stores/AppStore'
import { firebaseAuth, firebase } from '../../../../../server/config'
import Navigation from '../presentation/Navigation'
import Dashboard from './Dashboard'
import AppActions from './../../actions/AppActions'




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
            isAuthenticated: false,
            userName: '',
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
        this.setState({ 
            isAuthenticated: AppStore.getAuthenticatedState(),
            userName: AppStore.getLoggedInUser(),
        });
    }

    /**
       * @method render
       * 
       * @description Render react component
       * 
       * @memberof App
       */
    render() {
        if (this.state.isAuthenticated === true) {
            localStorage.setItem('user', JSON.stringify(this.state.userName[0]));
        }
        let componentToMount;
        if (localStorage.getItem('user') == null) {
            componentToMount =
                <div className="row">
                    <Navigation />
                    <div className="row">
                        <Routes
                            isAuthenticated={this.state.isAuthenticated}
                        />
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