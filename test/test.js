const request = require('supertest');
const app = require('../server/app');

describe('Home Page', () => {
    //  Unit test for the App Homepage route
        it('welcome user`s to its page', (done) => {
            request(app)
                .get('/')
                .set('Accept', 'application/json')
                 .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});


describe('EndPoint: signUp', () => {
 const username = 'Hohn';
  const secondUser = 'Mark';
  const thirdUser = 'Ese';
  const password = 'ebuka12345';
  const email = 'asss@gmail.com';
  const secondEmail = 'ebukao70@gmail.com';


it('should return an error message if username is undefined', (done) => {
    request(app)
      .post('/user/signup')
      .send({password, email})
      .set('Accept', 'application/json')
      .expect({ message: 'You need to provide username, password and email' })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should return an error message if password is undefined', (done) => {
    request(app)
      .post('/user/signup')
      .send({username, email})
      .set('Accept', 'application/json')
      .expect({ message: 'You need to provide username, password and email' })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should return an error message if email is undefined', (done) => {
    request(app)
      .post('/user/signup')
      .send({username, password})
      .set('Accept', 'application/json')
      .expect({ message: 'You need to provide username, password and email' })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should return an error message if username is empty', (done) => {
    request(app)
      .post('/user/signup')
      .send({username: '', password, email})
      .set('Accept', 'application/json')
      .expect({ message: 'Username, password or email cannot be empty' })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should return an error message if email is empty', (done) => {
    request(app)
      .post('/user/signup')
      .send({username, password, email: ''})
      .set('Accept', 'application/json')
      .expect({ message: 'Username, password or email cannot be empty' })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should return an error message if password is empty', (done) => {
    request(app)
      .post('/user/signup')
      .send({username, password: '', email})
      .set('Accept', 'application/json')
      .expect({ message: 'Username, password or email cannot be empty' })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should return a success message if username, password and email are supplied', (done) => {
   
    setTimeout(done, 15000);
    request(app)
      .post('/user/signup')
      .send({username, password, email})
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should return an error message if a user has already registered', (done) => {
    request(app)
      .post('/user/signup')
      .send({username, password, secondEmail})
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });


});

// describe('Google SignUp Route', () => {
//   it('This user should signup with Google', (done) => {
//     request(app)
//       .post('/user/google')
//       .send({
//         googleUser: 'Test',
//         username: 'Test',
//         email: 'Test',
//         uid: 'Test',
//       })
//       .set('Accept', 'application/json')
//       .expect(200)
//       .end((err) => {
//         if (err) return done(err);
//         done();
//       });
//   });
// });

// describe('SignIn Route', () => {
//   it('The user should be able to signin', (done) => {
//     request(app)
//       .post('/user/signin')
//       .send(userSignIn)
//       .set('Accept', 'application/json')
//       .expect(200)
//       .end((err) => {
//         if (err) return done(err);
//         done();
//       });
//   });
// });

// describe('SignOut Route', () => {
//   it('The user should be able to signout', (done) => {
//     request(app)
//       .post('/user/signout')
//       .set('Accept', 'application/json')
//       .expect(200)
//       .end((err) => {
//         if (err) return done(err);
//         done();
//       });
//   });
// });

// describe('Create Group', () => {
//   it('The user should be able to create a group', (done) => {
//     request(app)
//       .post('/group')
//       .send({     
//           groupName: "Andela",
//           userName: 'Ebuka'
//       })
//       .set('Accept', 'application/json')
//       .expect(200)
//       .end((err) => {
//         if (err) return done(err);
//         done();
//       });
//   });
// });


// // describe('Add User to the Group', () => {
// //   it('The user should add other users to the group', (done) => {
// //     request(app)
// //       .post('/group/:groupName/:user')
// //       .set('Accept', 'application/json')
// //       .expect(200)
// //       .end((err) => {
// //         if (err) return done(err);
// //         done();
// //       });
// //   });
// // });
