import React, {Component} from 'react';
import Signin from './Signin'
import Dashboard from "./Dashboard/Dashboard";
import AppStore from '../stores/AppStore'

/**
 * The Index page
 *
 * @class Home
 * @extends {Component}
 */
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: AppStore.getAuth()
    };
    this.onChange = this
      .onChange
      .bind(this)
  }

  /**
    * @method componentDidMount
    * Adds an event Listener to the Store and fires when the component is fully mounted.
    *
    * @return {void}
    * @memberof Home
    */
  componentDidMount() {
    AppStore.addChangeListener(this.onChange);
  }

  /**
* @method componentUnmount
* Removes event Listener from the Store
*
* @memberof Home
*/
  componentUnmount() {
    AppStore.removeChangeListener(this.onChange);
  }

  render() {
    return (
      <div>
        {!this.state.auth
          ? <section>
              <center>
                <div>
                  <h1>Welcome to PostIt</h1>
                  <p>PostIt is a simple application that allows friends and colleagues create
                    groups for notifications.</p>
                </div>
              </center>
              <div className=" col-md-5 col-sm-12 form-margin2">

                <img
                  src="http://www.affiliateprograms.com/blog/wp-content/uploads/2012/05/Group-Chat.jpg"
                  height={342}
                  width={442}/>
              </div>
              <div className="col-md-6 col-sm-12 form-margin">
                <Signin/>
              </div>
            </section>
          : <Dashboard/>}

      </div>
    )
  }

  /**
     * @method setApp
     * Monitors changes in the components and change the state
     *
     * @memberof Home
     */
  onChange() {
    this.setState({
      auth: AppStore.getAuth()
    });
  }
}

export default Home;