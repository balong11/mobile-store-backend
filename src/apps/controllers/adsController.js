const AdsModel = require("../models/Ads");
const paginate = require("../../commom/paginate");
const config = require("../../../config/default");
const fs = require("fs");

exports.index = async (req, res) => {
  const limit = config.limit;
  const page = parseInt(req.query.page) || 1;
  const skip = page * limit - limit;
  const totalRows = await AdsModel.countDocuments();
  const totalPage = Math.ceil(totalRows / limit);
  const ads = await AdsModel.find().sort({ _id: -1 }).skip(skip).limit(limit);
  
  return res.render("admin/ads/ads", { 
    ads,
    page,
    paginate: paginate(totalRows, page, limit), 
    prev: page - 1, 
    next: page + 1,
    totalPage: totalPage,
    currentPage: 'ads'
  });
}

exports.create = async (req, res) => {
  // Trả về giao diện tạo quảng cáo mới
  return res.render("admin/ads/add", { currentPage: 'ads' });
};

exports.store = async (req, res) => {
  const body = req.body;
  const file = req.file;
  
  if (!body) {
    return res.render("admin/ads/add", { error: "Không nhận được dữ liệu form!", currentPage: 'ads' });
  }
  
  const adsData = {
    title: body.title,
    description: body.description,
    link: body.link || '',
    type: body.type,
    status: body.status,
  };
  // xử lý ảnh nếu có
  if (file) {
    const destDir = `${config.uploads}/ads`;
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    const originalname = file.originalname;
    const relativePath = `ads/${originalname}`;
    fs.renameSync(file.path, `${config.uploads}/${relativePath}`);
    adsData.image = relativePath;
  }
  await new AdsModel(adsData).save();
  res.redirect("/admin/ads");
}

exports.edit = async (req, res) => {
  const id = req.params.id;
  const ads = await AdsModel.findById(id);
  if (!ads) {
    return res.status(404).send("Quảng cáo không tìm thấy");
  }
  
  return res.render("admin/ads/edit", { ads, currentPage: 'ads' });
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const file = req.file;
  
  const updateData = {
    title: body.title,
    description: body.description,
    link: body.link || '',
    type: body.type,
    status: body.status,
  };
  
  // Validate type
  if (!['slider', 'banner'].includes(updateData.type)) {
    return res.render("admin/ads/edit", { 
      ads: { ...body, _id: id }, 
      error: "Loại quảng cáo không hợp lệ!",
      currentPage: 'ads'
    });
  }
  
  // Validate status
  if (!['on', 'off'].includes(updateData.status)) {
    return res.render("admin/ads/edit", { 
      ads: { ...body, _id: id }, 
      error: "Trạng thái không hợp lệ!",
      currentPage: 'ads'
    });
  }
  
  // cập nhật ảnh nếu có upload mới
  if (file) {
    const destDir = `${config.uploads}/ads`;
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    const originalname = file.originalname;
    const relativePath = `ads/${originalname}`;
    fs.renameSync(file.path, `${config.uploads}/${relativePath}`);
    updateData.image = relativePath;
  }
  await AdsModel.findByIdAndUpdate(id, updateData);
  res.redirect("/admin/ads");
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  await AdsModel.deleteOne({ _id: id });
  res.redirect("/admin/ads");
};

// Thêm chức năng thống kê quảng cáo
exports.stats = async (req, res) => {
  const totalAds = await AdsModel.countDocuments();
  const activeAds = await AdsModel.countDocuments({ status: 'on' });
  const inactiveAds = await AdsModel.countDocuments({ status: 'off' });
  const sliderAds = await AdsModel.countDocuments({ type: 'slider' });
  const bannerAds = await AdsModel.countDocuments({ type: 'banner' });
  
  return res.render("admin/ads/stats", { 
    totalAds,
    activeAds,
    inactiveAds,
    sliderAds,
    bannerAds,
    currentPage: 'ads'
  });
};
