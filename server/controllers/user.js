const UserModel = require('../models/user');
let UserController = {};

UserController.insertItem = async (req, res) => {
  const item = {
    name: 'yazzerbost',
    buyPrice: '240',
    sellPrice: '500',
    buyDate: ['01', '21', '2019'],
    sellDate: ['01', '31', '2019']
  };
  try {
    // TODO: will need to pass in the new items ObjectId here~
    let user = await UserModel.findOneAndUpdate(
      { userId: req.body.userId },
      { $push: { items: '5c3046034649cc58736fa5f8' } },
      { new: true } // return the updated document bc mongoose defaults to returning og one
    )
      .populate('items')
      .exec();
    return res.status(200).send(JSON.stringify(user));
  } catch (err) {
    console.log(err);
    res.status(500).send(JSON.stringify({ message: err }));
  }
};
UserController.updateItem = async (req, res) => {
  const item = {
    name: 'yazzerbost',
    buyPrice: '240',
    sellPrice: '500',
    buyDate: ['01', '21', '2019'],
    sellDate: ['01', '31', '2019']
  };
  try {
    let user = await UserModel.findOneAndUpdate(
      { $and: [{ userId: req.body.userId }, { items: { $size: 0 } }] },
      { $push: { items: item } },
      { new: true } // return the updated document bc mongoose defaults to returning og one
    )
      .populate('items')
      .exec();
    return res.status(200).send(JSON.stringify(user));
  } catch (err) {
    res.send(500, { message: err });
  }
};

module.exports = UserController;
