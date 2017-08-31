const chaiHttp = require('chai-http');
const chai = require('chai');
// const request = require('supertest');

const app = require('../server/app');


chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;
console.log(process.env.NODE_ENV);

describe('Home Page', () => {
  it('It returns a status of 200 and welcomes user`s to the home page', (done) => {
    chai.request(app)
      .get('/')   
      .end((err, res) => {        
        expect(res).to.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});