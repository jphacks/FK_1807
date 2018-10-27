import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Product from './product';
import webclient from 'request';

const app = express();
const port = 3000;
const dbUrl = 'mongodb://localhost/fridgedb';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect(dbUrl, dbErr => {
  if (dbErr) throw new Error(dbErr);
  else console.log('db connected');

  const rurl = "https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?format=json&elements=large%2Cmedium&applicationId=1080324985558704372";
  webclient.get({
    url: rurl
  }, (err, res, body) => {
    // create 初期時に1回のみ
    JSON.parse(body)["result"].large.forEach((val, i) => {
      new Product({
        categoryId: val.categoryId,
        categoryName: val.categoryName,
        parentCategoryId: 0,
        num: 0
      }).save(err => {
        if (err) console.error(err);
      });
    });
    JSON.parse(body)["result"].medium.forEach((val, i) => {
      new Product({
        categoryId: val.categoryId,
        categoryName: val.categoryName,
        parentCategoryId: val.parentCategoryId,
        num: 0
      }).save(err => {
        if (err) console.error(err);
      });
    });
  });

  // read
  app.get('/api/fridgestatus', (req, res) => {
    Product.find({ num: { $gt: 0 } }, (err, productArray) => {
      if (err) res.status(500).send();
      else res.status(200).send(productArray);
    });
  });

  // update
  app.put('/api/fridgestatus', (req, res) => {
    // Product.update({}, { $set: { num: 0 } }, false, true);
    req.body.forEach((val) => {
      const { num, categoryName } = val;
      Product.findOneAndUpdate({ categoryName: categoryName }, { $set: { num: num } }, err => {
        if (err) res.status(500).send();
        else res.status(200).send();
      });
    });
  });

  app.listen(port, err => {
    if (err) throw new Error(err);
    else console.log(`listening on port ${port}`);
  });
});
