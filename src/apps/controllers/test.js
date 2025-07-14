const User = require("../models/User");
const categoryModel = require("../models/Category");
const productModel = require("../models/Product");
exports.test = (req, res) => {
  const product = productModel
    .find({})
    .populate("cat_id")
    .exec((err, docs) => {
      console.log(docs);
    });

  res.send(product);
  // const user = new User({
  //   email: "test@gmail.com",
  //   password: "123456",
  // });
  // user.save();
  // res.send(user);
  // User.updateOne({ email: "lorrd@gmail.com" }, { password: "123456" }).exec(
  //   (err, docs) => {
  //     console.log(err);
  //     console.log(docs);
  //   }
  // );
  // res.send("ok");
  // User.deleteOne({ email: "lorrd@gmail.com" }).exec((err, docs) => {
  //   console.log(err);
  //   console.log(docs);
  // });
  // res.send("like");
};
