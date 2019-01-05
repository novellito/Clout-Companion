const express = require('express');
const router = express.Router();
const ItemsModel = require('../models/item');

//List all items
router.get('/item', (req, res, next) => {
  let item = ItemsModel.findOne({});

  item.then(
    data => {
      res.json({ items: data.items });
    },
    e => {
      res.json({ msg: 'error!' });
    }
  );
});

//Add new item
router.post('/item', async (req, res, next) => {
  console.log(req.body);
  const z = {
    name: 'jawdans',
    buyPrice: '240',
    sellPrice: '500',
    buyDate: ['01', '21', '2019'],
    sellDate: ['01', '31', '2019']
  };

  let newItem = new ItemsModel(z);
  let item = await newItem.save();
  console.log(item);

  //need to return _id to client in response

  res.send('hi');
  // item.then((data)=>{

  //     data.items.push(req.body.item);
  //     data.save();
  //     res.json({msg:'Item Added!', data:data.items});

  // },(e)=> {
  //     console.log('saving error!');
  //     res.json({msg:'error!'});
  // });
});

//update an item
router.put('/item', (req, res, next) => {
  let item = ItemsModel.findOne({});

  item.then(
    data => {
      data.items.splice(req.body.key, 1, req.body.itemToUpdate);
      data.save();
      res.json({ msg: 'Item updated!', data: data.items });
    },
    e => {
      console.log('updating error!');
      res.json({ msg: 'error!' });
    }
  );
});

//delete an item
router.delete('/item', (req, res, next) => {
  let item = ItemsModel.findOne({});

  item.then(
    data => {
      data.items.splice(req.body.key, 1);
      data.save();
      res.json({ msg: 'Item deleted!', data: data.items });
    },
    e => {
      console.log('deleting error!');
      res.json({ msg: 'error!' });
    }
  );
});

module.exports = router;
