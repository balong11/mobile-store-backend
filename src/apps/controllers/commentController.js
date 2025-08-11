const config = require("../../../config/default");
const Comment = require("../models/Comment");
const Product = require("../models/Product");
const paginate = require("../../commom/paginate");

exports.index = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = config.limit || 10;
  const skip = page * limit - limit;

  const totalRows = await Comment.countDocuments();
  const comments = await Comment.find()
    .populate({ path: "product_id", select: "name" })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);

  return res.render("admin/comments/comment", {
    comments,
    page,
    paginate: paginate(totalRows, page, limit),
    prev: page - 1,
    next: page + 1,
    totalPage: Math.ceil(totalRows / limit),
    currentPage: "comments",
  });
};

exports.toggleStatus = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findById(id).select("status");
  if (!comment) {
    return res.redirect("/admin/comments");
  }
  await Comment.findByIdAndUpdate(id, { $set: { status: !comment.status } }, { runValidators: false });
  return res.redirect("/admin/comments");
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Comment.findByIdAndDelete(id);
  return res.redirect("/admin/comments");
};


