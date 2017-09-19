const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../server/app');
const request = require('supertest');

chai.use(chaiHttp);
const should = chai.should();

describe('Create Group', () => {
  const groupName = 'Armyof';
  const userName = 'Ebuka';
  it('It returns status 400 when the Group Name is Invalid', (done) => {
    request(app)
      .post('/group')
      .send({ userName, groupName: '' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('The Username or Groupname field is invalid');
        if (err) return done(err);
        done();
      });
  });

  it('It returns status 400 when the User Name is Invalid', (done) => {
    request(app)
      .post('/group')
      .send({ groupName, userName: '' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('The Username or Groupname field is invalid');
        if (err) return done(err);
        done();
      });
  });

  it('It returns status 409 when the group already exist', (done) => {
    request(app)
      .post('/group')
      .send({ groupName, userName })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('Group already exists');
        if (err) return done(err);
        done();
      });
  });
});

describe('Add User to a Group', () => {
  const groupName = 'Games';
  const user = 'Ebuka';

  it('It returns status 400 when the User field is Undefined', (done) => {
    request(app)
      .post('/group/groupName/user')
      .send({ groupName, user: '' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('The Username or Groupname field is invalid');
        if (err) return done(err);
        done();
      });
  });

  it('It returns status 400 when the Group Name field is Undefined', (done) => {
    request(app)
      .post('/group/groupName/user')
      .send({ user, groupName: '' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('The Username or Groupname field is invalid');
        if (err) return done(err);
        done();
      });
  });

  it('It returns status 403 If the User dosent Exist', (done) => {
    request(app)
      .post('/group/groupName/user')
      .send({ groupName, user: 'Exist' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql("The User dosen't exist");
        if (err) return done(err);
        done();
      });
  });

  it('It returns status 403 If the Group dosent Exist', (done) => {
    request(app)
      .post('/group/groupName/user')
      .send({ user, groupName: 'Exist' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        if (err) return done(err);
        done();
      });
  });
});


describe('EndPoint: It returns every users and message when a group is clicked',
() => {
  it('It returns status 200 when the all users and messages are retrived',
  (done) => {
    request(app)
      .get('/groups/:groupName/:user')
      .send({ groupName: 'FILE', user: 'Hh' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('Getting Messages and Users in :groupName database');
        if (err) return done(err);
        done();
      });
  });
});

describe('EndPoint: Get all Groups of a User', () => {
  it('It returns status 200 when all groups of a user is received', (done) => {
    request(app)
      .get('/group/:userName')
      .send('Hh')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('array');
        if (err) return done(err);
        done();
      });
  });
});
