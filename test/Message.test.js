const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../server/app');
const request = require('supertest');

chai.use(chaiHttp);
const should = chai.should();

describe('Create Message', () => {
  const group = 'FILE';
  const user = 'Hh';
  const message = 'This is a test message';
  const notification = 'Ebuka has posted in FILE group';
  const priority = 'Normal';
  it('It returns status 401 when aa message is created', (done) => {
    request(app)
      .post('/group/user/message/notification/priority')
      .send({ group, user, message, notification, priority })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('Message posted successfully');
        if (err) return done(err);
        done();
      });
  });

  it('It returns status 400 when the Group Name or Message field is Invalid',
    (done) => {
      request(app)
      .post('/group/user/message/notification/priority')
      .send({ notification, priority, user, group: '', message: '' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('The Message or Groupname field is invalid');
        if (err) return done(err);
        done();
      });
    });

  it('It returns status 400 when the Notification or Priority field is Invalid',
  (done) => {
    request(app)
      .post('/group/user/message/notification/priority')
      .send({ group, user, message, notification: '', priority: '' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('The Notification or Priority field is invalid');
        if (err) return done(err);
        done();
      });
  });
});

describe('EndPoint: It returns every user who have seen a message', () => {
  it('It returns status 200 when the all notification is received', (done) => {
    const groupName = 'FILE';
    const messageID = '-KtnPBIB2vrb0t3znQNo';
    request(app)
      .get('/groups/:groupName/:messageID')
      .send(groupName, messageID)
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        if (err) return done(err);
        done();
      });
  });
});
