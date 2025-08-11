const Config = require("../models/Config");
const fs = require("fs");
const path = require("path");

// Lấy tất cả cấu hình
const getAllConfigs = async (req, res) => {
  try {
    const configs = await Config.find().sort({ createdAt: -1 });
    res.render("admin/configs/configs", { configs });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách cấu hình:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

// Hiển thị form thêm cấu hình
const showAddForm = (req, res) => {
  res.render("admin/configs/add");
};

// Thêm cấu hình mới
const addConfig = async (req, res) => {
  try {
    const configData = req.body;
    
    // Xử lý upload logo nếu có
    if (req.file) {
      configData.logo = `/uploads/configs/${req.file.filename}`;
    }

    const newConfig = new Config(configData);
    await newConfig.save();

    req.flash("success", "Thêm cấu hình thành công!");
    res.redirect("/admin/configs");
  } catch (error) {
    console.error("Lỗi khi thêm cấu hình:", error);
    req.flash("error", "Lỗi khi thêm cấu hình!");
    res.redirect("/admin/configs/add");
  }
};

// Hiển thị form chỉnh sửa
const showEditForm = async (req, res) => {
  try {
    const config = await Config.findById(req.params.id);
    if (!config) {
      req.flash("error", "Không tìm thấy cấu hình!");
      return res.redirect("/admin/configs");
    }
    res.render("admin/configs/edit", { config });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin cấu hình:", error);
    req.flash("error", "Lỗi server!");
    res.redirect("/admin/configs");
  }
};

// Cập nhật cấu hình
const updateConfig = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Xử lý upload logo mới nếu có
    if (req.file) {
      updateData.logo = `/uploads/configs/${req.file.filename}`;
      
      // Xóa logo cũ nếu có
      const oldConfig = await Config.findById(id);
      if (oldConfig && oldConfig.logo && oldConfig.logo !== '/images/default-logo.png') {
        const oldLogoPath = path.join(__dirname, "../../../public", oldConfig.logo);
        if (fs.existsSync(oldLogoPath)) {
          fs.unlinkSync(oldLogoPath);
        }
      }
    }

    const updatedConfig = await Config.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedConfig) {
      req.flash("error", "Không tìm thấy cấu hình!");
      return res.redirect("/admin/configs");
    }

    req.flash("success", "Cập nhật cấu hình thành công!");
    res.redirect("/admin/configs");
  } catch (error) {
    console.error("Lỗi khi cập nhật cấu hình:", error);
    req.flash("error", "Lỗi khi cập nhật cấu hình!");
    res.redirect(`/admin/configs/edit/${req.params.id}`);
  }
};

// Xóa cấu hình
const deleteConfig = async (req, res) => {
  try {
    const { id } = req.params;
    const config = await Config.findById(id);
    
    if (!config) {
      return res.status(404).json({ error: "Không tìm thấy cấu hình!" });
    }

    // Xóa logo nếu có
    if (config.logo && config.logo !== '/images/default-logo.png') {
      const logoPath = path.join(__dirname, "../../../public", config.logo);
      if (fs.existsSync(logoPath)) {
        fs.unlinkSync(logoPath);
      }
    }

    await Config.findByIdAndDelete(id);
    res.json({ success: true, message: "Xóa cấu hình thành công!" });
  } catch (error) {
    console.error("Lỗi khi xóa cấu hình:", error);
    res.status(500).json({ error: "Lỗi server!" });
  }
};

// Thay đổi trạng thái
const toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const config = await Config.findById(id);
    
    if (!config) {
      return res.status(404).json({ error: "Không tìm thấy cấu hình!" });
    }

    config.status = config.status === 'active' ? 'inactive' : 'active';
    await config.save();

    res.json({ 
      success: true, 
      message: "Thay đổi trạng thái thành công!",
      status: config.status 
    });
  } catch (error) {
    console.error("Lỗi khi thay đổi trạng thái:", error);
    res.status(500).json({ error: "Lỗi server!" });
  }
};

// Lấy cấu hình hiện tại (API)
const getCurrentConfig = async (req, res) => {
  try {
    const config = await Config.findOne({ status: 'active' });
    if (!config) {
      return res.status(404).json({ error: "Không có cấu hình nào được kích hoạt!" });
    }
    res.json(config);
  } catch (error) {
    console.error("Lỗi khi lấy cấu hình hiện tại:", error);
    res.status(500).json({ error: "Lỗi server!" });
  }
};

module.exports = {
  getAllConfigs,
  showAddForm,
  addConfig,
  showEditForm,
  updateConfig,
  deleteConfig,
  toggleStatus,
  getCurrentConfig
}; 