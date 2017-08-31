const request = require('supertest');
const app = require('../server/app');

xdescribe('Home Page', () => {
  it('It returns a status of 200 and welcomes user`s to the home page', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
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


describe('EndPoint: signUp', () => {
  const userName = 'Hohn';
  const password = 'ebuka12345';
  const email = 'ebuka@gmail.com';
  const phoneNumber = '2348066098146';
  const secondUserName = 'Mark';
  const secondEmail = 'ebukao70@gmail.com';
  const secondPhoneNumber = '2348066098189';
  it('It returns status 201 for when all parameters are complete', (done) => {

    // setTimeout(() => {
    //     console.log('waiting over.');
    //     done();
    // }, 3000)
    // setTimeout(done, 150000);
    request(app)
      .post('/user/signup')
      .send({
        userName: 'Hohn',
        password: 'ebuka12345',
        email: 'ebuka12o1h2@gmail.com',
        number: '2348066098763'
      })
      .set('Accept', 'application/json')
      .expect(201, done);
  }).timeout(150000);
//   it('It should return status 400 for missing username', (done) => {
//     request(app)
//       .post('/user/signup')
//       .send({ password, email, phoneNumber })
//       .set('Accept', 'application/json')
//       .expect('Content-Type', 'application/json; charset=utf-8')
//       .expect(400)
//       .expect({ message: 'You need to provide a username' })
//       .end((err, res) => {  
//         if (err) return done(err);
//         done();
//       });
// });
  it('It should return status 400 for missing password', (done) => {
    request(app)
      .post('/user/signup')
      .send({ username, email, phoneNumber })
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.be('You need to provide a password');
        expect(res.body).to.be.a('object');
        done();
      });
  }); 
  // it('It should return status 400 for missing email', (done) => {
  //   request(app)
  //     .post('/user/signup')
  //     .send({ username, password, phoneNumber })
  //     .set('Accept', 'application/json')
  //     .expect({ message: 'You need to provide an email' })
  //     .end((err, res) => {
  //       res.status.should.equal(400);
  //       res.body.should.be.a('object');
  //       if (err) return done(err);
  //       done();
  //     });
  // });
  // it('It should return status 400 for missing phone number', (done) => {
  //   request(app)
  //     .post('/user/signup')
  //     .send({ username, password, email })
  //     .set('Accept', 'application/json')
  //     .expect({ message: 'You need to provide a phone number' })
  //     .end((err, res) => {
  //       res.status.should.equal(400);
  //       res.body.should.be.a('object');
  //       if (err) return done(err);
  //       done();
  //     });
  // });
  // it('It should return 400 if username is an empty string', (done) => {
  //   request(app)
  //     .post('/user/signup')
  //     .send({ password, email, phoneNumber, username: '' })
  //     .set('Accept', 'application/json')
  //     .expect({ message: 'Username cannot be empty' })
  //     .end((err, res) => {
  //       res.status.should.equal(400);
  //       res.body.should.be.a('object');
  //       if (err) return done(err);
  //       done();
  //     });
  // });
  
  // it('It should return 400 if email is an empty string', (done) => {
  //   request(app)
  //     .post('/user/signup')
  //     .send({ username, password, phoneNumber, email: ''})
  //     .set('Accept', 'application/json')
  //     .expect({ message: 'Email cannot be empty' })
  //     .end((err, res) => {
  //       res.status.should.equal(400);
  //       res.body.should.be.a('object');
  //       if (err) return done(err);
  //       done();
  //     });
  // });
  // it('It should return 400 for incorrect email syntax', (done) => {
  //   request(app)
  //     .post('/user/signup')
  //     .send({ username, password, phoneNumber, email: 'ebuka@gmail'})
  //     .set('Accept', 'application/json')
  //     .expect({ message: 'Invalid Email' })
  //     .end((err, res) => {
  //       res.status.should.equal(400);
  //       res.body.should.be.a('object');
  //       if (err) return done(err);
  //       done();
  //     });
  // });
  // it('It should return 400 if password is an empty string', (done) => {
  //   request(app)
  //     .post('/user/signup')
  //     .send({ username, email, phoneNumber, password: '', })
  //     .set('Accept', 'application/json')
  //     .expect({ message: 'Password cannot be empty' })
  //     .end((err, res) => {
  //       res.status.should.equal(400);
  //       res.body.should.be.a('object');
  //       if (err) return done(err);
  //       done();
  //     });
  // });
  // it('It should return 400 if phone number is an empty string', (done) => {
  //   request(app)
  //     .post('/user/signup')
  //     .send({ username, password, email, phoneNumber: '' })
  //     .set('Accept', 'application/json')
  //     .expect({ message: 'Phone number cannot be empty' })
  //     .end((err, res) => {
  //       res.status.should.equal(400);
  //       res.body.should.be.a('object');
  //       if (err) return done(err);
  //       done();
  //     });
  // });
  // it('It should return status 409 for existing username', (done) => {
  //   request(app)
  //     .post('/user/signup')
  //     .send({ username, password, secondEmail, secondPhoneNumber })
  //     .set('Accept', 'application/json')
  //     .expect({ message: 'Username already exist' })
  //     .end((err, res) => {
  //       res.status.should.equal(409);
  //       res.body.should.be.a('object');
  //       if (err) return done(err);
  //       done();
  //     });
  // });
  // it('It should return status 409 for existing email', (done) => {
  //   request(app)
  //     .post('/user/signup')
  //     .send({ secondUserName, password, email, secondPhoneNumber })
  //     .set('Accept', 'application/json')
  //     .expect({ message: 'Email already exist' })
  //     .end((err, res) => {
  //       res.status.should.equal(409);
  //       res.body.should.be.a('object');
  //       if (err) return done(err);
  //       done();
  //     });
  // });
  // it('It should return status 409 for existing phone Number', (done) => {
  //   request(app)
  //     .post('/user/signup')
  //     .send({ secondUserName, password, secondEmail, phoneNumber })
  //     .set('Accept', 'application/json')
  //     .expect({ message: 'Email already exist' })
  //     .end((err, res) => {
  //       res.status.should.equal(409);
  //       res.body.should.be.a('object');
  //       if (err) return done(err);
  //       done();
  //     });
  // });
  // it('It should return status 400 when all required fields are missing', (done) => {
  //   request(app)
  //     .post('/user/signup')
  //     .send({ username: '', password: '', email: '', phoneNumber: '' })
  //     .set('Accept', 'application/json')
  //     .end((err, res) => {
  //       res.status.should.equal(400);
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('username').eql('This field is required');
  //       res.body.should.have.property('email').eql('This field is required');
  //       res.body.should.have.property('phoneNumber').eql('This field is required');
  //       res.body.should.have.property('password').eql('This field is required');
  //       if (err) return done(err);
  //       done();
  //     });
   //});
});
// describe('SignIn Route', () => {
  
//   const email = 'ebuka@gmail.com';
//   const password = 'ebuka12345';
//   const secondEmail = 'nani@gmail.com'
//   const secondPassword = '233334'
//   it('It returns status 201 for when all parameters are complete', (done) => {
//     request(app)
//       .post('/user/signin')
//       .send({ email, password })
//       .set('Accept', 'application/json')
//       .expect(201)
//       .end((err, res) => {
//         res.status.should.equal(201);
//         res.body.should.be.a('object');
//         if (err) return done(err);
//         done();
//       });
//   });
//   it('It returns status 401 for invalid email', (done) => {
//     request(app)
//       .post('/user/signin')
//       .send({ secondEmail, password })
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(401);
//         res.body.should.be.a('object');
//         res.body.should.have.property('email').eql('Invalid Email');
//         if (err) return done(err);
//         done();
//       });
//   });
//   it('It returns status 401 for invalid password', (done) => {
//     request(app)
//       .post('/user/signin')
//       .send({ email, secondPassword })
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(401);
//         res.body.should.be.a('object');
//         res.body.should.have.property('email').eql('Invalid Password');
//         if (err) return done(err);
//         done();
//       });
//   });
//   it('It returns status 400 for invalid no identifier email or password', (done) => {
//     request(app)
//       .post('/user/signin')
//       .send({ email:'', password:'' })
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(400);
//         res.body.should.be.a('object');
//         res.body.should.have.property('email').eql('This field is required');
//         res.body.should.have.property('password').eql('This field is required');
//         if (err) return done(err);
//         done();
//       });
//   });
// });
// describe('SignOut Route', () => {
//   it('It returns status 201 when the user sign out', (done) => {
//     request(app)
//       .post('/user/signout')
//       .set('Accept', 'application/json')
//       .expect(201)
//       .end((err, res) => {
//         if (err) return done(err);
//         done();
//       });
//   });
// });
// describe('Reset Password Route', () => {
//   it('It returns status 400 for missing email', (done) => {
//     request(app)
//       .post('/user/signout')
//       .send()
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(400);
//         res.body.should.be.a('object');
//         if (err) return done(err);
//         done();
//       });
//   });
//   it('It returns status 401 for invalid email', (done) => {
//     request(app)
//       .post('/user/signout')
//       .send({email: 'xyz'})
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(401);
//         res.body.should.be.a('object');
//         if (err) return done(err);
//         done();
//       });
//   });
// });
// describe('Create Group', () => {
//   it('It returns status 201 when the user creates group', (done) => {
//     request(app)
//       .post('/group')
//       .send({
//         groupName: 'Andela',
//         userName: 'Ebuka'
//       })
//       .set('Accept', 'application/json')
//       .expect(201)
//       .end((err, res) => {
//         res.status.should.equal(201);
//         res.body.should.be.a('object');
//         if (err) return done(err);
//         done();
//       });
//   });
// });
// describe('Add User to the Group', () => {
//   const groupName = 'ebuka@gmail.com';
//   const userName = 'ebuka12345';
//   it('It returns status 201 when the user add other users to the group', (done) => {
//     request(app)
//       .post('/group/groupName/user')
//       .send({ groupName, userName })
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(201);
//         res.body.should.be.a('object');
//         if (err) return done(err);
//         done();
//       });
//   });
//   it('It should return status 400 for missing username', (done) => {
//     request(app)
//       .post('/group/groupName/user')
//       .send({ groupName })
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(400);
//         res.body.should.be.a('object');
//         if (err) return done(err);
//         done();
//       });
//   });
//   it('It should return status 400 for missing group name', (done) => {
//     request(app)
//       .post('/group/groupName/user')
//       .send({ userName })
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(400);
//         res.body.should.be.a('object');
//         if (err) return done(err);
//         done();
//       });
//   });
//   it('It returns status 400 for invalid no identifier groupName or username', (done) => {
//     request(app)
//       .post('/group/groupName/user')
//       .send({ groupName:'', userName:'' })
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         res.status.should.equal(400);
//         res.body.should.be.a('object');
//         res.body.should.have.property('groupName').eql('This field is required');
//         res.body.should.have.property('userName').eql('This field is required');
//         if (err) return done(err);
//         done();
//       });
//   });
// });