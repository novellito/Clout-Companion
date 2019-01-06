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
  console.log(req.body.payload);
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
    const user = await UserModel.update(
      {
        userId: '263983797'
      },
      { $pull: { items: req.body.id } }
    );

    const item = await ItemsModel.remove(
      //   { _id: '5c317b9df6d90e83e75b4278' }
      { _id: req.body.id }
      //   { new: true } // return the updated document bc mongoose defaults to returning og one
    ).exec();
    // console.log(item);
    // item.remove(263983797);
    res.status(200).send(JSON.stringify(item));
  } catch (err) {
    console.log(err);
    res.status(500).send(JSON.stringify({ message: err }));
  }
};

module.exports = UserController;
