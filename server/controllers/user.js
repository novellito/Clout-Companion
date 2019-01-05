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
    let user = await UserModel.findOneAndUpdate(
      { userId: req.body.userId },
      { $push: { items: item } },
      { new: true }
    ).exec();
    return res.status(200).send(JSON.stringify(user));
  } catch (err) {
    res.send(500, { message: err });
  }
};

module.exports = UserController;
