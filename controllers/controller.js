const db = require("../db/query.js");
const storage = require("../storage/storage.js")
const { uuid } = require('uuidv4');
const mime = require('mime-types');
const byteSize = require('byte-size')


const getIndex = async (req, res) => {
  if(!req.user){
    res.redirect("/login")
  }
  const folders = await db.getFolders();
  res.render("index.ejs",{user: req.user,folders});
};

const getFolder = async (req, res) => {
  if(!req.user){
    res.redirect("/")
  }
  const folder = await db.getFolder(req.params.id);
  const files = await db.getFiles(req.params.id)
  const filesWithConvertedSizes = files.map(file => {
    return {
        ...file,  
        size: byteSize(file.size) 
    };
});
  req.session.folderId = folder.id
  console.log(files[0])
  res.render("folder.ejs", { folder, files:filesWithConvertedSizes,user: req.user });
};

const getCreateFile = async(req,res)=>{
  if(!req.user){
    res.redirect("/")
  }
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
  if(fileType === false){
    return res.status(400).send('Wrong file extension');
    
  }
  const url = await storage.getFileUrl(name)
  // storage.downloadFile(url.publicUrl)
  await storage.fileUpload(name,file,file.mimetype)
  await db.createFile(name,folderId,url,file.size,fileType)
  res.redirect("/");
}
const getFile = async (req, res) => {
  if(!req.user){
    res.redirect("/")
  }
  const file = await db.getFile(req.params.id);
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

const deleteFile = async(req,res)=>{
  const id = req.body.fileId
  const type = req.body.fileType
  await storage.deleteFile(id,type)
  await db.deleteFile(id)
  res.redirect(`/`)
}

const deleteFolder = async(req,res)=>{
  const folderId = req.body.id
  console.log(folderId)
  await db.deleteFolder(folderId)
  res.redirect("/")
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
