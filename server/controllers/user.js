const UserModel = require('../models/user');
const ItemsModel = require('../models/item');
let UserController = {};

UserController.getUserInfo = async (req, res) => {
  const user = await UserModel.findOne({ userId: req.params.id }).populate(
    'items'
  );
  user
    ? res.status(200).send(JSON.stringify(user.items))
    : res.status(500).send({ message: 'error retrieving user info' });
};

UserController.insertItem = async (req, res) => {
  try {
    const newItem = new ItemsModel(req.body.item);
    const item = await newItem.save();

    await UserModel.findOneAndUpdate(
      { userId: req.body.userId },
      { $push: { items: item._id } },
      { new: true } // return the updated document bc mongoose defaults to returning og one
    )
      .populate('items')
      .exec();
    res.status(200).send(JSON.stringify(item));
  } catch (err) {
    res.status(500).send(JSON.stringify({ message: err }));
  }
};

UserController.updateItem = async (req, res) => {
  try {
    const item = await ItemsModel.update(
      { _id: req.body.id },
      req.body.payload,
      { new: true } // return the updated document bc mongoose defaults to returning og one
    ).exec();
    res.status(200).send(JSON.stringify(item));
  } catch (err) {
    res.status(500).send(JSON.stringify({ message: err }));
  }
};
UserController.deleteItem = async (req, res) => {
  try {
    // Remove id from users items array
    await UserModel.update(
      {
        userId: req.body.userId
      },
      { $pull: { items: req.body.itemId } }
    );

    // Remove from Items collection
    const item = await ItemsModel.remove({ _id: req.body.itemId }).exec();
    res.status(200).send(JSON.stringify(item));
  } catch (err) {
    console.log(err);
    res.status(500).send(JSON.stringify({ message: err }));
  }
};

module.exports = UserController;
