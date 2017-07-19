import React, {Component} from 'react';
import AppStore from '../../stores/AppStore'
import NavDash from './NavDash';
import LHS from './Lhs';
import MessageBoard from './MessageBoard'
import DisplayMessage from './DisplayMessage'


import {Grid, Row, Col, Clearfix} from 'react-bootstrap';

export default class DashBoard extends Component {
      constructor(props){
        super(props);
        this.state ={
           authed: false,
            user : AppStore.getUser(),      
            contacts: AppStore.getGroupUsers(),
            emails: AppStore.getGroupEmails(),
            numbers:AppStore.getGroupNumbers(),
            groups: AppStore.getGroups(),
            currentGroup: AppStore.getCurrentGroup(),
            databaseUsers: AppStore.getdatabaseUsers(),
            notification: AppStore.getNotification(),
            displayArchives: AppStore.getOpenArchive()  
        };
         this._onChange= this._onChange.bind(this)
    }

   componentWillMount ()  {
     AppStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    AppStore.removeChangeListener(this._onChange);
  } 

  render() { 
    return (
      <div id='dash'>
        <NavDash contact={this.state.contacts} group={this.state.groups} user={this.state.user} databaseUsers={this.state.databaseUsers} notification={this.state.notification}/>  
        <button type='onClick' className='btn btn-primary'>Message Board</button>       
        <Grid>
          <Row className="show-grid">
            <Col md={3} id='lhs'> <LHS contact={this.state.contacts} group={this.state.groups} user={this.state.user} /></Col>

              <h4>Message</h4>
            <Col sm={12} md={9}> {!this.state.currentGroup ? <DisplayMessage /> : <MessageBoard contact={this.state.contacts} emails={this.state.emails} numbers={this.state.numbers}  displayArchives={this.state.displayArchives} />} </Col>
            
          </Row>
        </Grid>
      </div>

    )
  }
    _onChange(){
        this.setState({contacts: AppStore.getGroupUsers()});
        this.setState({groups: AppStore.getGroups()});
        this.setState({user: AppStore.getUser()});
        this.setState({currentGroup: AppStore.getCurrentGroup()});
        this.setState({databaseUsers: AppStore.getdatabaseUsers()});
        this.setState({emails: AppStore.getGroupEmails()});
        this.setState({numbers:AppStore.getGroupNumbers()});
        this.setState({notification: AppStore.getNotification()});
        this.setState({displayArchives: AppStore.getOpenArchive()  });
        
    }  
}

 