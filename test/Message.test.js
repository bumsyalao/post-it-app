const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../server/app');
const request = require('supertest');

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;


  // describe('Create Message', () => {
  //   const groupName = 'FILE';
  //   const messages = 'This is a test message';
  //   const notification = "Ebuka has posted in Andela group"
  //   const priority = 'Normal'
  //   it('It returns status 403 when the user is not logged in', (done) => {
  //     request(app)
  //       .post('/groupName/messages/notification/priority')
  //       .send({ groupName, messages, notification, priority })
  //       .set('Accept', 'application/json')
  //       .end((err, res) => {
  //         res.status.should.equal(403);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('message');
  //         if (err) return done(err);
  //         done();
  //       });
  //   });
  
  //   it('It returns status 400 when the Group Name or Message field is Invalid',
  //    (done) => {
  //     request(app)
  //       .post('/groupName/messages/notification/priority')
  //       .send({ notification, priority, groupName: '', messages: ''  })
  //       .set('Accept', 'application/json')
  //       .end((err, res) => {
  //         res.status.should.equal(400);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('message');
  //         res.body.should.have.property('message').eql('The Message or Groupname field is invalid')
  //         if (err) return done(err);
  //         done();
  //       });
  //   });

  //   it('It returns status 400 when the Notification or Priority field is Invalid',
  //   (done) => {
  //    request(app)
  //      .post('/groupName/messages/notification/priority')
  //      .send({ groupName, messages, notification: '', priority: ''  })
  //      .set('Accept', 'application/json')
  //      .end((err, res) => {
  //        res.status.should.equal(400);
  //        res.body.should.be.a('object');
  //        res.body.should.have.property('message');
  //        res.body.should.have.property('message').eql('The Notification or Priority field is invalid')
  //        if (err) return done(err);
  //        done();
  //      });
  //  });  
  // })