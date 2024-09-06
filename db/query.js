const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getFolders = async () => {
  const folders = await prisma.folder.findMany();
  return folders;
};
const getFolder = async (id) => {
  const folders = await prisma.folder.findUnique({ where: { id: id } });
  return folders[0];
};
const getFiles = async () => {
  const file = await prisma.file.findMany();
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
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    return user[0];
  }
};
module.exports = {
  getFolders,
  getFolder,
  getFiles,
  getFile,
  getUser,
};
