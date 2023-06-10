const multer= require("multer");
const storage = multer.diskStorage({
    destination:function(req,res,cb)
    {
        cb(null,"./public/gallery")
    },
    filename:function(req,file,cb)
    {
        cb(null,Date.now()+file.originalname)
    }
    
})
const filefilter =(req,res,cb)=>
{
    if(file.mimetype=="image/jpeg"||file.minetype==="image/jpg"||file.minetype==="image/png"||file.mimetype==="image/gif")
    {
        cb(null,true); 
    }else{
        cb(null,false);
    }
};
const upload = multer({
    storage: storage
})
module.exports = upload