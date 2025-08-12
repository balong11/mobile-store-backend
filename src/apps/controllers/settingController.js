const fs = require("fs");
const config = require("../../../config/default");
const SettingModel = require("../models/Setting");

// Ensure a singleton settings document exists
async function ensureSettingsDoc() {
  let setting = await SettingModel.findOne();
  if (!setting) {
    setting = await new SettingModel({}).save();
  }
  return setting;
}

exports.edit = async (req, res) => {
  const setting = await ensureSettingsDoc();
  return res.render("admin/settings/edit", { setting, currentPage: "settings" });
};

exports.update = async (req, res) => {
  const body = req.body;
  const file = req.file;

  const setting = await ensureSettingsDoc();

  const updates = {
    site_name: body.site_name || setting.site_name,
    footer_text: body.footer_text || setting.footer_text,
  };

  if (file) {
    const originalname = file.originalname;
    const dir = `${config.uploads}/logos`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const logoPath = `logos/${originalname}`;
    fs.renameSync(file.path, `${config.uploads}/${logoPath}`);
    updates.logo = logoPath;
  }

  await SettingModel.updateOne({ _id: setting._id }, updates);
  return res.redirect("/admin/settings");
};

exports.deleteLogo = async (req, res) => {
  const setting = await ensureSettingsDoc();
  try {
    if (setting.logo) {
      const filePath = `${config.uploads}/${setting.logo}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      await SettingModel.updateOne({ _id: setting._id }, { $set: { logo: "" } });
    }
  } catch (err) {
    console.error("Failed to delete logo:", err);
  }
  return res.redirect("/admin/settings");
};


