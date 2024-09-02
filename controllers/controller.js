const db = require("../db/query");
const getIndex = async (req, res) => {
  const folders = await db.getFolders();
  res.render("/index.ejs");
};
const getFolder = async (req, res) => {
  // Take files using db.getFiles / db.getFolder id
  const folder = await db.getFolder(req.params.id);
  res.render("/folder.ejs", { title: folder.title, files: folder.files });
};
const getFile = async (req, res) => {
  const file = await db.getFile(req.params.id);
  res.render("/file.ejs", {
    id: file.id,
    name: file.name,
    size: file.size,
    upload: file.upload,
    filetype: file.filetype,
    download: file.url,
  });
};
const getLogin = async (req, res) => {
  res.render("/login.ejs");
};
const getSignup = async (req, res) => {
  res.render("/sigunp.ejs");
};
module.exports = { getIndex, getFile, getLogin, getSignup, getFolder };
