const { createClient } = require('@supabase/supabase-js')
const { uuid } = require('uuidv4');
const multer = require("multer")
const supabase = createClient(process.env.supabase_url,process.env.anon_key)
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const getFileUrl = async (name)=>{
  const { data, error } =  supabase
  .storage
  .from('Files') 
  .getPublicUrl(name);
  console.log(data.publicUrl)
  return data.publicUrl
}
const fileUpload = async (name, file,fileType) => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    const { data, error } = await supabase.storage
      .from('Files') 
      .upload(name, file.buffer, {
        contentType: fileType, 
        cacheControl: '3600', 
        upsert: false 
      });   
    if (error) {
      console.error('File upload failed:', error.message);
      return { data: null, error };
    }
    // console.log('File uploaded successfully:', data);
    return { data, error };

  } catch (e) {
    console.error('An exception occurred during file upload:', e);
    return { data: null, error: e.message };
  }
};
const getFileMetadata = async(name)=>{
  const { data, error } = await supabase.storage.from("Files").download(name)
  if (error) {
    console.error('Error downloading file:', error)
    return
  }
  const fileSize = data.size
  const fileType = data.type 
  return {fileSize,fileType}
}
const getFileFromBucket =async (name)=>{
  const { data, error } = await supabase
  .storage
  .from('Files')
  .list(name, {
    limit: 100,
    offset: 0,
    search: name
  })
  return data
}
const downloadFile = async(url)=>{
  const {data} = await supabase.storage.from("Files").getPublicUrl(url)
  console.log(data)
  return data
}
module.exports = {
  getFileUrl,fileUpload,getFileFromBucket,getFileMetadata,downloadFile
}