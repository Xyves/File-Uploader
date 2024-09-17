const db = require("../db/query.js");
const storage = require("../storage/storage.js")
const { uuid } = require('uuidv4');
const mime = require('mime-types');


const getIndex = async (req, res) => {
  const folders = await db.getFolders();
  res.render("index.ejs",{user: req.user,folders});
};

const getFolder = async (req, res) => {
  const folder = await db.getFolder(req.params.id);
  const files = await db.getFiles(req.params.id)
  res.render("folder.ejs", { folder, files,user: req.user });
};

const getCreateFile = async(req,res)=>{
  const folderId = req.query.folderId;
  res.render("createFile.ejs",{user: req.user, folderId})
}

const postCreateFile = async(req,res)=>{
  const file = req.file
  const  {name,folderId}  = req.body;


  if (!file) {
    return res.status(400).send('No file uploaded');
  }
  let fileType = mime.extension(file.mimetype)
  console.log('File name:', file.name);
  console.log('File size:', file.size, 'bytes');
  console.log('File type mime:', file);
  console.log('File type:', fileType);
  const url = await storage.getFileUrl(name)
  await storage.fileUpload(name,file)
  await db.createFile(name,folderId,url,file.size,fileType)
  res.redirect("/");
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
    user: req.user
  });
};

const getLogin = async (req, res) => {
  if(req.user){
    res.redirect("/")
  }
  res.render("login.ejs", { user: req.user });
};

const getSignup = async (req, res, next) => {
  if(req.user){
    res.redirect("/")
  }
  res.render("signup.ejs",{user: req.user});
};

const postSignup = async (req, res) => {
    await db.createUser(req.body.username,req.body.password,req.body.email,req.body.secret)
    res.redirect("/")

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
