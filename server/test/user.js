const chai = require('chai');
const expect = chai.expect;
const jwt = require('jsonwebtoken');
const httpMocks = require('node-mocks-http');
const app = require('../index');
const UserModel = require('../models/user');
const ItemsModel = require('../models/item');
describe('User Suite', function() {
  const userInfo = {
    id: 1234,
    username: 'john123'
  };

  let newUser;
  let token;
  beforeEach(done => {
    UserModel.upsertNewUser(userInfo, (err, user) => {
      newUser = user;
      token = jwt.sign(
        {
          id: newUser.id,
          username: newUser.username
        },
        process.env.jwtSecret,
        {
          expiresIn: '1d'
        }
      );
      done();
    });
  });

  // insert an item for the user
  beforeEach(async () => {
    const newItem = new ItemsModel({
      name: 'default item',
      buyPrice: '240',
      sellPrice: '500',
      buyDate: ['01', '21', '2019'],
      sellDate: ['01', '31', '2019'],
      category: 'shoes'
    });

    const item = await newItem.save();
    newUser = await UserModel.findOneAndUpdate(
      { userId: newUser.userId },
      { $push: { items: item._id } },
      { new: true }
    );
  });

  afterEach(async () => {
    await UserModel.remove({ userId: 1234 });
  });

  it('Should have a user with one item', () => {
    expect(newUser.items.length).to.equal(1);
  });

  it('Should successfully add an item for the user', () => {
    const item = {
      name: 'yazzerbost',
      buyPrice: '240',
      sellPrice: '500',
      buyDate: ['01', '21', '2019'],
      sellDate: ['01', '31', '2019'],
      category: 'shoes'
    };

    return chai
      .request(app)
      .post('/api/user')
      .send({
        item,
        userId: newUser.userId
      })
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        expect(res.statusCode).to.equal(200);

        UserModel.findOne({ userId: newUser.userId })
          .populate('items')
          .then(user => {
            expect(user.items.length).to.equal(2);
          });
      });
  });

  it('Should successfully get the users info', () => {
    return chai
      .request(app)
      .get(`/api/user/${newUser.userId}`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        expect(res.statusCode).to.equal(200);
      });
  });

  it('Should fail get the users info with invalid token', () => {
    return chai
      .request(app)
      .get(`/api/user/${newUser.userId}`)
      .set('Authorization', `Bearer 1234absfafk`)
      .then(res => {
        expect(res.statusCode).to.equal(401); // unauthorized
      });
  });

  it('Should update an item', () => {
    return chai
      .request(app)
      .put(`/api/user/updateItem`)
      .send({ id: newUser.items[0], payload: { name: 'updated shoe' } })
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        expect(res.statusCode).to.equal(200);
      });
  });
});
