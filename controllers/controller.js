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
  // console.log(folder)
  const files = await db.getFiles(req.params.id)
  req.session.folderId = folder.id
  console.log(files[0])
  res.render("folder.ejs", { folder, files,user: req.user });
};

const getCreateFile = async(req,res)=>{
  const folderId = req.session.folderId;
  // console.log(folderId)
  res.render("createFile.ejs",{user: req.user, folderId})
}

const postCreateFile = async(req,res)=>{
  const file = req.file
  const  {name,folderId}  = req.body;
  let fileType = mime.extension(file.mimetype)

  if (!file) {
    return res.status(400).send('No file uploaded');
  }
  const url = await storage.getFileUrl(name)
  // storage.downloadFile(url.publicUrl)
  await storage.fileUpload(name,file,file.mimetype)
  await db.createFile(name,folderId,url,file.size,fileType)
  res.redirect("/");
}
const getFile = async (req, res) => {
  const file = await db.getFile(req.params.id);
  console.log(req.params.id)
  console.log(file)
  console.log(req.user)
  res.render("file.ejs", {
    title:"File",
    id: file.id,
    name: file.title,
    size: file.size,
    uploaded: file.uploaded,
    filetype: file.filetype,
    url: file.url,
    filetype: file.filetype,
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
const deleteFile = async(req,res)=>{
  storage.deleteFile(id)
  db.deleteFile(id)
}
const deleteFolder = async(req,res)=>{
  db.deleteFolder(id)

}
module.exports = {
  getIndex,
  getFile,
  getLogin,
  getSignup,
  getFolder,
  postSignup,
  createFolder,getCreateFile,postCreateFile,deleteFolder,deleteFile
};
