const imageDownloader=require("image-downloader");
const fs=require('fs');
exports.upload_link=async(req,res)=>{
    const {link}=req.body;
    const newName='photo'+Date.now() + '.jpg';
    await imageDownloader.image(
        {
            url:link,
            dest:'/home/vishal_kuwar/Desktop/web-d/PROJECTS/VenueVista/api'+'/uploads/'+newName,
        }
    );
    res.json(newName);
    
}
exports.upload_image=async(req,res)=>{
    const uploadedFiles=[];
    for(let i=0;i<req.files.length;i++){
        const {path,originalname}=req.files[i];
        const parts=originalname.split('.');
        const ext=parts[parts.length-1];
        const newPath=path+"."+ext;
        fs.renameSync(path,newPath)
        uploadedFiles.push(newPath.replace('uploads/',''));
    }
    res.json(uploadedFiles);
}