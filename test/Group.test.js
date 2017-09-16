const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../server/app');
const request = require('supertest');

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;

describe('Create Group', () => {
  const groupName = 'BuggSo';
  const userName = 'Ebuka';
  it('It returns status 201 when the user creates group', (done) => {
    request(app)
      .post('/group')
      .send({ groupName, userName })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        if (err) return done(err);
        done();
      });
  });

  it('It returns status 400 when the Group Name is Invalid', (done) => {
    request(app)
      .post('/group')
      .send({ userName, groupName:'' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('The Username or Groupname field is invalid')
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
        res.body.should.have.property('message').eql('The Username or Groupname field is invalid')
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
        res.body.should.have.property('message').eql('Group already exists')
        if (err) return done(err);
        done();
      });
  });
})

  describe('Add User to a Group', () => {
    const groupName = 'BSer';
    const user = 'Hh';
    it('It returns status 201 when a user is added to a group', (done) => {
      request(app)
        .post('/group/groupName/user')
        .send({ groupName, user })
        .set('Accept', 'application/json')
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('User added successfully')
          if (err) return done(err);
          done();
        });
    });

    it('It returns status 400 when the User field is Undefined', (done) => {
      request(app)
        .post('/group/groupName/user')
        .send({ groupName, user: ''  })
        .set('Accept', 'application/json')
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('The Username or Groupname field is invalid')
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
          res.body.should.have.property('message').eql('The Username or Groupname field is invalid')
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
          res.body.should.have.property('message').eql("The User dosen't exist")
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
          res.body.should.have.property('message').eql("Group dosen't exists")
          if (err) return done(err);
          done();
        });
    });
  });


  describe('EndPoint: It returns every users and message when a group is clicked', () => {
    it('It returns status 200 when the all notification is received', (done) => {
      request(app)
        .get('/groups/:groupName')
        .send( 'FILE')
        .set('Accept', 'application/json')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.be.a('object');
          if (err) return done(err);
          done();
        });
    });
  })