const { uuid } = require("uuidv4");
const db = require("../db/query.js");
const multer = require('multer');
const upload = multer().single('file');
const getIndex = async (req, res) => {
  const folders = await db.getFolders();
  res.render("index.ejs",{user: req.user,folders});
};
const getFolder = async (req, res) => {
  // Take files using db.getFiles / db.getFolder id
  const folder = await db.getFolder(req.params.id);
  const files = await db.getFiles(req.params.id)
  res.render("folder.ejs", { folder, files });
};
const getCreateFile = async(req,res)=>{
  res.render("createFile.ejs")
}
const postCreateFile = async(req,res)=>{
  
}
// const file = {id:uuid(),url:req.body.url,}
const getFile = async (req, res) => {
  const file = await db.getFile(req.params.id);
  res.render("file.ejs", {
    id: file.id,
    name: file.name,
    size: file.size,
    upload: file.upload,
    filetype: file.filetype,
    download: file.url,
  });
};
const getLogin = async (req, res) => {
  res.render("login.ejs", { user: req.user });
};
const getSignup = async (req, res, next) => {
  res.render("signup.ejs");
};
const postSignup = async (req, res) => {
  // try {
  //   res.status(200).json({
  //     message: "successfuly registered",
  //     code: 200,
  //     timestamp: Date.now(),
  //   });
    await db.createUser(req.body.username,req.body.password,req.body.email,req.body.secret)
    res.redirect("/")
  // } catch (e) {
  //   throw new Error() * e;
  // }
};

const createFolder = async (req,res)=>{
 await db.createFolder(req.body.name,req.user.id)
 res.redirect("/")
}
const postLogin = async (req, res) => {
  try {
    res.status(200).json({
      message: "successfuly registered",
      code: 200,
      timestamp: Date.now(),
    });
  } catch (e) {
    throw new Error() * e;
  }
};
const postLogout = async (req, res) => {
  try {
    res.status(200).json({
      message: "successfuly registered",
      code: 200,
      timestamp: Date.now(),
    });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getIndex,
  getFile,
  getLogin,
  getSignup,
  getFolder,
  postSignup,
  createFolder,getCreateFile,postCreateFile
};
