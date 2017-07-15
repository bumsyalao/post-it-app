const request = require('supertest');
const app = require('../server/app');

const userSignUp = {
  username: 'Ebuka',
  password: '12345ebuka',
  email: 'ebuka@gmail.com'
};

const userSignIn = {
  email: 'ebuka@gmail.com',
  password: '12345ebuka'
};

const group = {
  groupName : "Andela"
}
 
describe('PostIt-app:', () => {
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


describe('SignUp Route', () => {
  it('This user should signup with his/her details', (done) => {
    request(app)
      .post('/user/signup')
      .send(userSignUp)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('SignIn Route', () => {
  it('The user should be able to signin', (done) => {
    request(app)
      .post('/user/signin')
      .send(userSignIn)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('SignOut Route', () => {
  it('The user should be able to signout', (done) => {
    request(app)
      .post('/user/signout')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('Create Group', () => {
  it('The user should be able to create a group', (done) => {
    request(app)
      .post('/group')
      .send({     
          groupName: "Andela",
          userName: 'Ebuka'
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});


// describe('Add User to the Group', () => {
//   it('The user should add other users to the group', (done) => {
//     request(app)
//       .post('/group/:groupName/:user')
//       .set('Accept', 'application/json')
//       .expect(200)
//       .end((err) => {
//         if (err) return done(err);
//         done();
//       });
//   });
// });
