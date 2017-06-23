import React, {Component} from 'react';
import NavDash from './NavDash';
import LHS from './Lhs';
import MessageBoard from './MessageBoard'

import {Grid, Row, Col, Clearfix} from 'react-bootstrap';

export default class DashBoard extends Component {

  // handlesubmit = (e) => {   e.preventDefault() }


  render() {
    return (
      <div id='dashboard'>
        <NavDash/>
           
        <Grid>
          <Row className="show-grid">
            <Col md={3}> <LHS /> </Col>

            <Col sm={12} md={9}>
              <MessageBoard /></Col>

          </Row>
        </Grid>
      </div>

    )
  }
}

 