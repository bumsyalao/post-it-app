import React, {Component} from 'react';
import AppStore from '../../stores/AppStore'
import NavDash from './NavDash';
import LHS from './Lhs';
import MessageBoard from './MessageBoard'


import {Grid, Row, Col, Clearfix} from 'react-bootstrap';

export default class DashBoard extends Component {
      constructor(props){
        super(props);
        this.state ={
           authed: false,
            user : AppStore.getUser(),      
            message : 'Hello World',
            contacts: AppStore.getContacts(),
            groups: AppStore.getGroups()        
        };
         this._onChange= this._onChange.bind(this)
    }

   componentWillMount ()  {
     AppStore.addChangeListener(this._onChange);
  }


  componentWillUnmount () {
    AppStore.removeChangeListener(this._onChange);
  } 


  // handlesubmit = (e) => {   e.preventDefault() }


  render() { 
    return (
      <div id='dash'>
        <NavDash contact={this.state.contacts} group={this.state.groups}/>         
        <Grid>
          <Row className="show-grid">
            <Col md={3} id='lhs'> <LHS contact={this.state.contacts} group={this.state.groups} user={this.state.user}/> </Col>

            <Col sm={12} md={9}> <MessageBoard /></Col>

          </Row>
        </Grid>
      </div>

    )
  }
    _onChange(){
        this.setState({contacts: AppStore.getContacts()});
        this.setState({groups: AppStore.getGroups()});
        this.setState({user: AppStore.getUser()});
      
    }  
}

 