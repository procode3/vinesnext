import cloudinary from 'cloudinary'

const destinationFolder = 'vines'

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


export async function handleUpload(file: any, name: string, tag: any = ["other"]) {
    const res = await cloudinary.v2.uploader.upload(file, {
      public_id: name,
      folder: destinationFolder,
      use_filename:true,
      resource_type: 'raw',
      tags: [tag],
      
    });
    return res;
  }

export default cloudinary

