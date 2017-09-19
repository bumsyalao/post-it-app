const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../server/app');
const request = require('supertest');

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;

describe('EndPoint: SignUp', () => {
  const userName = 'Cemb';
  const password = 'emeka5612345';
  const email = 'emekasmithyu@gmal.com';
  const number = '2348066098146';

  it('It should return status 400 for missing username', (done) => {
    request(app)
      .post('/user/signup')
      .send({ email, password, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('You need to provide userName, password, number and email');
        if (err) return done(err);
        done();
      });
  });

  it('It should return status 400 for missing phone number', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, email, password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('You need to provide userName, password, number and email');
        if (err) return done(err);
        done();
      });
  });

  it('It should return status 400 for missing email', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, password, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('You need to provide userName, password, number and email');
        if (err) return done(err);
        done();
      });
  });

  it('It should return status 400 for badly formatted email', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, password, number, email: 'ebuka@' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('The email address is badly formatted.');
        if (err) return done(err);
        done();
      });
  });

  it('It should return status 409 for existing email', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, password, number, email })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('The email address is already in use by another account.');
        if (err) return done(err);
        done();
      });
  });

  it('It should return status 400 for missing password', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, email, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('You need to provide userName, password, number and email');
        if (err) return done(err);
        done();
      });
  });

  it('It should return status 400 for a weak password', (done) => {
    request(app)
      .post('/user/signup')
      .send({ userName, email, number, password: '1234' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Password should be at least 6 characters');
        if (err) return done(err);
        done();
      });
  });
});


describe('SignIn Route', () => {
  const email = 'hh@gmail.com';
  const password = '123456';

  it('It returns status 200 for when all parameters are complete', (done) => {
    request(app)
      .post('/user/signin')
      .send({ email, password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        if (err) return done(err);
        done();
      });
  });

  it('It returns status 400 for missing email', (done) => {
    request(app)
      .post('/user/signin')
      .send({ password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('You need to provide password and email');
        if (err) return done(err);
        done();
      });
  });

  it('It returns status 400 for badly fomatted email', (done) => {
    request(app)
      .post('/user/signin')
      .send({ password, email: 'ebuka@' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('The email address is badly formatted.');
        if (err) return done(err);
        done();
      });
  });

  it('It returns status 401 if a email/user dose not exist', (done) => {
    request(app)
      .post('/user/signin')
      .send({ password, email: 'hhd@gmail.com' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('There is no user record corresponding to this identifier. The user may have been deleted.');
        if (err) return done(err);
        done();
      });
  });

  it('It returns status 400 for missing password', (done) => {
    request(app)
      .post('/user/signin')
      .send({ email })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('You need to provide password and email');
        if (err) return done(err);
        done();
      });
  });

  it('It returns status 401 for Invalid Password', (done) => {
    request(app)
      .post('/user/signin')
      .send({ email, password: '123456ggh' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('The password is invalid or the user does not have a password.');
        if (err) return done(err);
        done();
      });
  });
});

describe('Google SignUp Route', () => {
  const userName = 'Gideon';
  const email = 'emekasmithyu@gmal.com';
  const number = '2348066098146';
  const uid = 'rbjxWT5b4AfHirNE4IDlS0ELk882'

  it('It should return status 400 for missing username', (done) => {
    request(app)
      .post('/google/signup')
      .send({ email, uid, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('You need to provide userName, uid, number and email');
        if (err) return done(err);
        done();
      });
  });

  it('It should return status 400 for missing phone number', (done) => {
    request(app)
      .post('/google/signup')
      .send({ userName, email, uid })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('You need to provide userName, uid, number and email');
        if (err) return done(err);
        done();
      });
  });

  it('It should return status 400 for missing email', (done) => {
    request(app)
      .post('/google/signup')
      .send({ userName, uid, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('You need to provide userName, uid, number and email');
        if (err) return done(err);
        done();
      });
  });


  it('It should return status 400 for missing uid', (done) => {
    request(app)
      .post('/google/signup')
      .send({ userName, email, number, uid: '' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('userName, uid, number or email cannot be empty');
        if (err) return done(err);
        done();
      });
  });

  it('It should return status 400 for undefined uid', (done) => {
    request(app)
      .post('/google/signup')
      .send({ userName, email, number })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('You need to provide userName, uid, number and email');
        if (err) return done(err);
        done();
      });
  });

  it('It should return status 409 for existing Username', (done) => {
    request(app)
      .post('/google/signup')
      .send({ userName, email, number, uid })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('Username already exist');
        if (err) return done(err);
        done();
      });
  });
});


describe('Home Page', () => {
  it('It returns a status of 200 on the home page', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('It returns a status of 200 when a random route is used ', (done) => {
    request(app)
      .get('/test')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});


describe('SignOut Route', () => {
  it('It returns status 200 when the user sign out', (done) => {
    request(app)
      .post('/user/signout')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('You have successfully signed out');
        if (err) return done(err);
        done();
      });
  });
});

describe('EndPoint: Reset Password', () => {
  const validEmail = 'wesumeh@gmail.com';
  const invalidEmail = 'gfhr@gmail.com';

  it('It returns status 205 when the email is valid', (done) => {
    request(app)
      .post('/user/reset')
      .send({ email: validEmail })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(205);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('An email has been sent for password reset.');
        if (err) return done(err);
        done();
      });
  });


  it('It returns status 401 if a email/user dose not exist', (done) => {
    request(app)
      .post('/user/reset')
      .send({ email: invalidEmail })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message')
        .eql('There is no user record corresponding to this identifier. The user may have been deleted.');
        if (err) return done(err);
        done();
      });
  });

  it('It should return status 400 for badly formatted email', (done) => {
    request(app)
      .post('/user/reset')
      .send({ email: 'ebuka@' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be
        .eql('The email address is badly formatted.');
        if (err) return done(err);
        done();
      });
  });
});

describe('EndPoint: Get all Phone Numbers from the database', () => {
  it('It returns status 200 when the email is valid', (done) => {
    request(app)
      .get('/users/allNumbers')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('array');
        if (err) return done(err);
        done();
      });
  });
});

describe('EndPoint: Get all Users from the Database', () => {
  it('It returns status 200 when the email is valid', (done) => {
    request(app)
      .get('/users/allusers')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('array');
        if (err) return done(err);
        done();
      });
  });
});

describe('EndPoint: Get all Emails from the Database', () => {
  it('It returns status 200 when the email is valid', (done) => {
    request(app)
      .get('/users/allemails')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('array');
        if (err) return done(err);
        done();
      });
  });
});


describe('EndPoint: Get all Notification for a User', () => {
  it('It returns status 200 when the all notification is received', (done) => {
    request(app)
      .get('/user/notification/:user')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('array');
        if (err) return done(err);
        done();
      });
  });
});
