const app = require('../../../index.js');
const chai = require('chai');
const {expect} = chai;
const chaiHttp = require('chai-http');
const {randomString, createUser, loginRequest} = require('../functions');

chai.use(chaiHttp);

describe('test route /login', () => {
  describe('Successfully test login', () => {
    it('Returns a token when logging in an existing user', async () => {
      const name = randomString();
      await createUser(name, '123456');
      const response = await loginRequest(name);
      expect(response).to.have.status(200);
      expect(response.body).to.have.property('token');
    });
  });

  describe('Test error cases', () => {
    it('Error trying to login a non-existent user', async () => {
      const response = await loginRequest(randomString());
      expect(response).to.have.status(404);
      expect(response.body).to.have.property('message');
      expect(response.body.message).
          to.be.equals('Incorrect username or password');
    });
    it('Error trying to log in a user with the wrong password', async () => {
      const name = randomString();
      await createUser(name, '123456');
      const response = await loginRequest(name, '654321');
      expect(response).to.have.status(404);
      expect(response.body).to.have.property('message');
      expect(response.body.message).
          to.be.equals('Incorrect username or password');
    });
    it('Error when logging in a user without password', async () => {
      const name = randomString();
      await createUser(name, '123456');
      const response = await chai.request(app)
          .post('/login')
          .send({
            email: `${name}@gmail.com`,
          });
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equals('"password" is required');
    });
  });
});
