const { PrismaClient } = require("@prisma/client");
const { uuid } = require('uuidv4');
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs")

const getFolders = async (folderId) => {
  const folders = await prisma.folder.findMany({where:{authorId :folderId}});
  return folders;
};
const getFolder = async (id) => {
  const folders = await prisma.folder.findUnique({ where: { id: id } });
  return folders;
};
const getFiles = async (id) => {
  const file = await prisma.file.findMany({where:{folderId:id}});
  return file;
};
const getFile = async (fileId) => {
  const file = await prisma.file.findUnique({ where: { id: fileId } });
  return file[0];
};
const getUser = async (id, username) => {
  if (id !== null) {
    const username = await prisma.user.findUnique({
      where: { id: id },
    });
    return username[0];
  } else {
    const user = await prisma.user.findFirst({
      where: { username: username },
    });
    return user[0];
  }
};
const createUser = async(username,plainPassword,email,secret)=>{
  console.log(plainPassword)
  const hashedPassword = bcrypt.hashSync(plainPassword, 5);
  let isAdmin = (secret === process.env.roleCode);
 
  await prisma.user.create({
    data:{
      username,
      password:hashedPassword,
      email,
      role: isAdmin === true ? 'ADMIN' : "USER",
    }
  })

}
const getUserByName = async(name)=>{
 const user =  await prisma.user.findUnique({
    where:{username:name}
  })
  return user
}
const getUserById = async(id)=>{
  const user =  await prisma.user.findUnique({
    where:{id:id}
  })
  return user
}
const createFolder = async(title,authorId)=>{
  await prisma.folder.create({
    data:{
      title,
      authorId,
    }
  })
}
const createFile = async(title,folderId,url,uploaded)=>{
  await prisma.file.create({
    data:{
      id:uuid(),
      title,
      folderId,
      url,
      uploaded
    }
  })
}

module.exports = {
  getFolders,
  getFolder,
  getFiles,
  getFile,createFolder,
  getUser,createUser,getUserByName,getUserById,createFile
};
