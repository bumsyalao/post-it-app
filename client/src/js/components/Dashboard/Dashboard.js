import React, {Component} from 'react';
import NavDash from './NavDash';
import LHS from './Lhs';
import MessageBoard from './MessageBoard'
import {Grid, Row, Col, Clearfix} from 'react-bootstrap';

export default class DashBoard extends Component {

  // handlesubmit = (e) => {   e.preventDefault() }

  render() {

    const dummySentences = [
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'Donec hendrerit tempor tellus.', 'Donec pretium posuere tellus.', 'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus' +
          ' mus.',
      'Nulla posuere.',
      'Donec vitae dolor.',
      'Nullam tristique diam non turpis.',
      'Cras placerat accumsan nulla.',
      'Nullam rutrum.',
      'Nam vestibulum accumsan nisl.'
    ];
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

 