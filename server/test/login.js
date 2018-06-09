const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
const httpMocks = require('node-mocks-http');
const app = require('../index');
const jwt = require('jsonwebtoken');
const loginController = require('../controllers/login');
chai.use(chaiHTTP);

describe('Login Suite', function() {
  it('Should generate a valid token', done => {
    let req = httpMocks.createRequest();
    let res = httpMocks.createResponse();
    req.body.fb = true;
    req.body.id = 1234;
    loginController.generateToken(req, res, function(err) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('Should authorize a new token', done => {
    let req = httpMocks.createRequest();
    let res = httpMocks.createResponse();
    const token =
      'Bearer ' +
      jwt.sign(
        {
          id: 1234
        },
        process.env.jwtSecret,
        {
          expiresIn: 40
        }
      );
    req.headers.authorization = token;
    loginController.authorize(req, res, function(err, next) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
  it('Should verify a fb user', () => {
    return chai
      .request(app)
      .post('/api/login/facebook')
      .send({
        fb: true,
        username: 'John',
        id: 1234
      })
      .then(res => {
        expect(res.statusCode).to.equal(200);
      });
  });
});
