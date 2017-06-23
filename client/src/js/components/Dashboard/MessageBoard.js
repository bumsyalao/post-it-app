import React, {Component} from 'react'


export default class MessageBoard extends Component {

  render() {
    return (
       <div>
       <section id="showcase">
        <div id="messageArea" className="row">
             <div className="jumbotron">
              <ul style={{color: 'black', textAlign: 'left'}}>
                <li><strong>Ebuka  </strong> Hello i am First user</li>
                <li><strong>Frank  </strong>Welcome you all to Post it</li>
                <li><strong>Mike  </strong>Thanks Frank</li>
              </ul>
            </div>
       
          <div className="col-md-8">
            <div className="chat" id="chat" />

            <form id="messageForm">
              <div className="form-group">
                <label>Enter Message</label>
                <textarea className="form-control" id="message" placeholder="Enter Message"/>
                <br />
                <input type="submit" className="btn btn-primary" defaultValue="Send Message" />
              </div>
            </form>

         

          </div>
        </div>

      </section>


      </div>

    )
  }

}
 