const app = require('../api/routes/index');
const chai = require('chai');
const {expect} = chai;
const chaiHttp = require('chai-http');
const {randomString, registerRequest} = require('../functions');


chai.use(chaiHttp);

describe('test route /register', () => {
  describe('Successfully tests a registration case', () => {
    let response;
    beforeEach(async () => {
      response = await registerRequest(randomString());
    });
    it('Returns status 201 on successfully registering user', async () => {
      expect(response).to.have.status(201);
    });
    it('Returns a token on successful registration of user', async () => {
      expect(response.body).to.have.property('token');
    });
  });
});

describe('Test error cases', () => {
  it('Error when registering the same user more than once', async () => {
    const string = randomString();
    await registerRequest(string);
    const response = await registerRequest(string);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equals('User already registered');
  });

  it('Error when trying to register user without email', async () => {
    const response = await chai.request(app)
        .post('/register')
        .send({
          name: 'ciclano',
          password: '123456',
        });
    expect(response.body).to.have.property('message');
    expect(response).to.have.status(400);
    expect(response.body.message).to.be.equals('"email" is required');
  });

  it('Error when trying to register user with invalid email', async () => {
    const string = randomString();
    const response = await chai.request(app)
        .post('/register')
        .send({
          name: string,
          email: `${string}.com`,
          password: '123456',
        });
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.equals('"email" must be a valid email');
  });
});
