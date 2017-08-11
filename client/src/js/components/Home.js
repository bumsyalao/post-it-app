import React, {Component} from 'react';


/**
 * The Index page 
 * 
 * @class Home
 * @extends {Component}
 */
class Home extends Component {
  render() {
    return (
      <div>
        <section>
        <div className="centralize">
        <h1>Welcome to PostIt</h1>
        <p>PostIt is a simple application that allows friends and colleagues create groups for notifications.</p>
        <img src="http://www.affiliateprograms.com/blog/wp-content/uploads/2012/05/Group-Chat.jpg" height={342} width={442} />
      </div>

        </section>

      </div>
    )
  }
}

export default Home;