const { createClient } = require('@supabase/supabase-js')
const { uuid } = require('uuidv4');

const supabase = createClient(process.env.supabase_url,process.env.anon_key)

const getFileUrl = async (name)=>{
  const { data, error } =  await supabase
  .storage
  .from('Files') // Same bucket name
  .getPublicUrl(name);
  return data.signedUrl
}
const fileUpload = async (name,file) =>{
try{
  const { data, error } = await supabase.storage
  .from('Files') 
  .upload(name, file);   
  return { data, error }
}catch(e){
  console.error(e)
}
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
module.exports = {
  getFileUrl,fileUpload,getFileFromBucket
}