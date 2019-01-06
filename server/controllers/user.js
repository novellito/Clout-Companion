const UserModel = require('../models/user');
const ItemsModel = require('../models/item');
let UserController = {};

UserController.getUserInfo = async (req, res) => {
  const user = await UserModel.findOne({ userId: req.params.id }).populate(
    'items'
  );
  user
    ? res.status(200).send(JSON.stringify(user))
    : // ? res.status(200).send(JSON.stringify(user.items))
      res.status(500).send({ message: 'error retrieving user info' });
  res.send(user);
};

UserController.insertItem = async (req, res) => {
  try {
    const newItem = new ItemsModel(req.body.item);
    const item = await newItem.save();

    const user = await UserModel.findOneAndUpdate(
      { userId: req.body.userId },
      { $push: { items: item._id } },
      { new: true } // return the updated document bc mongoose defaults to returning og one
    )
      .populate('items')
      .exec();
    return res.status(200).send(JSON.stringify(user.items));
  } catch (err) {
    res.status(500).send(JSON.stringify({ message: err }));
  }
};

UserController.updateItem = async (req, res) => {
  //req.body to hold elems to update!
  const item = {
    name: 'yazzerbost',
    buyPrice: '240',
    sellPrice: '500',
    buyDate: ['01', '21', '2019'],
    sellDate: ['01', '31', '2019']
  };

  try {
    const user = await ItemsModel.update(
      { _id: '5c3140a9ebbeaf5bb20597da' },
      { name: 'kith update' },
      { new: true } // return the updated document bc mongoose defaults to returning og one
    ).exec();
    return res.status(200).send(JSON.stringify(user));
  } catch (err) {
    res.send(500, { message: err });
  }
};

module.exports = UserController;
