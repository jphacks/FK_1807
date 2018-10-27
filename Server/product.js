import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const ProductSchema = new mongoose.Schema({  
  categoryId: Number,
  categoryName: String,
  parentCategoryId: Number,
  num: Number
  // type: String, // 品目
  // nums: Number, // 品数
  // name: String, // 製品名
  // expd: Date // 賞味・消費期限
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;