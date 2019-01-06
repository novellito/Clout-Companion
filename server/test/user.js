const chai = require('chai');
const expect = chai.expect;
const UserModel = require('../models/user');

describe('User Suite', function() {
  const userInfo = {
    id: 1234,
    username: 'john123'
  };

  let newUser;
  beforeEach(done => {
    UserModel.upsertNewUser(userInfo, (err, user) => {
      newUser = user;
      done();
    });
  });

  afterEach(async () => {
    await UserModel.remove({ userId: 1234 });
  });

  it('Should have a user with no items', () => {
    expect(newUser.items.length).to.equal(0);
  });
  it('Should have a user with no items', () => {
    expect(newUser.items.length).to.equal(0);
  });
});
