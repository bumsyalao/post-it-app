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
           loading: true,
           contacts: AppStore.getContacts()
           
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
        <NavDash/>         
        <Grid>
          <Row className="show-grid">
            <Col md={3} id='lhs'> <LHS contact={this.state.contacts}/> </Col>

            <Col sm={12} md={9}> <MessageBoard /></Col>

          </Row>
        </Grid>
      </div>

    )
  }
    _onChange(){
        this.setState({contacts: AppStore.getContacts()});
      
    }  
}

 