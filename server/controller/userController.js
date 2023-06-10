const User = require("../models/user");
const getDataUri = require("../utils/DataUri");
const cloudinary= require("cloudinary");
const { json } = require("express");
const { use } = require("../routes/productRoutes");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
//register
exports.register = catchAsyncErrors(async(req,res,next)=>
{
    
const{fullName,mobileNo,email,password}=req.body;


if(!fullName||! mobileNo||!email||!password)
return next(new ErrorHandler(  "please filled data",400));


if(!/^\d{10}$|^\d{1,9}$/.test(mobileNo))
return next(new ErrorHandler(  "number must be 10 digit",400));

else if(mobileNo.length<10)
return next(new ErrorHandler(  "mobileno cant be 10 digit long",400));

else if(mobileNo.length>10)
return next(new ErrorHandler(  "mobileno cant be less than 10 digit ",400));


if(!/\S+@\S+\.\S+/.test(email))
return next(new ErrorHandler( "email must be valid",400));

if(password.length<8)
return next(new ErrorHandler(  "password must be 8 digit long",400));

let file;
if(req.file)
{
 file= req.file;
}
else
return next(new ErrorHandler(  "file was not upload!",400));



 const exists= await User.findOne({email})
 if(exists)
 return next(new ErrorHandler(  "email already exist",400));

 const fileUri = getDataUri(file);
 const myCloud = await cloudinary.v2.uploader.upload(fileUri.content,
     {
         folder:"profileImg"
     })
 const user = await User.create({
     fullName,
     mobileNo,
     email,
     password,
     avatar:{
         public_id:myCloud.public_id,
         url:myCloud.secure_url
     }
 })
 res.status(200).json({
    success: true,
    message: "user register successfullly",
    user,
  });
});
    


//login
exports.login = catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email||!password)
    return next(new ErrorHandler( "fieild must be filled",500));
    
    if(!/\S+@\S+\.\S+/.test(email))
    return next(new ErrorHandler(  "email must be valid",500));
    
    
        const user = await User.findOne({email}).select("+password")
        if(!user)
        return next(new ErrorHandler( "user doesnot exit",404));
    
        const isMatch = await user.comparePassword(password)
        if(!isMatch)
        return next(new ErrorHandler(  "invalid credentials",400));
        
        const token = user.getJwtToken();
        res.status(200).json({
            success: true,
            message: "login successfull",
            user,
            token
          });
    
    });

//update profile
exports.profileUpdate =catchAsyncErrors( async(req,res)=>
{
    const {fullName,mobileNo,email}=  req.body;
    if(!fullName||!mobileNo||!email)
    return next(new ErrorHandler( "field must be filled",400));
   
    if(!/^\d{10}$|^\d{1,9}$/.test(mobileNo))
    return next(new ErrorHandler(  "number must be 10 digit",400));
  
    else if(mobileNo.length<10)
    return next(new ErrorHandler(  "mobileno cant be 10 digit long",400));
    
    else if(mobileNo.length>10)
    return next(new ErrorHandler(  "mobileno cant be less than 10 digit ",400));
   
    if(!/\S+@\S+\.\S+/.test(email))
    return next(new ErrorHandler(  "email must be valid",400));
   
    let file ;
    if(req.file)
    {
        file=req.file
    }
    else
    return next(new ErrorHandler(  "file was not upload",400));
  
    
        let user = await  User.findById(req.user.id)
        if(!user)
        return next(new ErrorHandler(  "user not found",404));
      
        let myCloud;
        if(file)
        
        {
           if(user.avatar.public_id)
           {
            await cloudinary.v2.uploader.destroy(user.avatar.public_id,
                {
                    folder:"profileImg"
                })
           }
         const fileUri = getDataUri(file);
         myCloud = await cloudinary.v2.uploader.upload(fileUri.content,
            {
                folder:"profileImg"
            });


        }
        user = await User.findByIdAndUpdate(req.user.id,{fullName,mobileNo,email,avatar:
            {
                public_id:myCloud.public_id,
                url:myCloud.secure_url,
            },
        },
        { new :true, runValidator:true, useFindAndModify:false}
        );
        res.status(200).json({
            success: true,
            message: "profile updated",
            user,
          });
       
        
    
});
//change password
exports.changePassword= catchAsyncErrors(async(req,res,next)=>
{
    const {oldPassword,newPassword,confirmPassword}= req.body;
    if(!oldPassword||!newPassword)
    return next(new ErrorHandler(  "field must be filled",400));
   
    if(newPassword!== confirmPassword)
    return next(new ErrorHandler("password must be match",400));
   

  
        const user = await User.findById(req.user.id).select("+password")
        if(!user)
        return next(new ErrorHandler(  "user not found",404));
       
        const isMatch = await user.comparePassword(oldPassword)
        if(!isMatch)
        return next(new ErrorHandler( "incorrect password",404));
       
        user.password= newPassword;
        await user.save();
       res.status(200).json({
        success:true,
        message:"password changed successfully"
       })
    } );
        
    

//logged in single user
exports.singleUser = catchAsyncErrors(async(req,res)=>
{
    
        const user = await User.findById(req.user.id)
        if(!user)
        return next(new ErrorHandler(  "user doesnot exit",404));
      
        res.status(200).json({
            success: true,
            message: "singleuser get successfullly",
            user,
          });;
       
    
    
});
//admin get all user
exports.getAllUsers=catchAsyncErrors( async(req,res)=>
{
    
        const users= await User.find()
        if(!users)
        return next(new ErrorHandler( "user not found",500));
     
        res.status(200).json({
            success: true,
            message: "successfullly user accessed",
            users,
          });
      
    
} )
//get single user by only admin 
exports.getSingleUserByAdmin =catchAsyncErrors( async(req,res)=>
{
    
        const user = await User.findById(req.params.id);
        if(!user)
        return next(new ErrorHandler( "user does not exits with this Id",404));
   
        res.status(200).json({
            success: true,
            message: "user get successfullly",
            user,
          });
      
 
});
//delete user from database(only admin can do)
exports.deleteSingleUser=catchAsyncErrors( async(req,res)=>{
   
    let user = await User.findById(req.params.id)
    if(!user)
    return next(new ErrorHandler( `user doesnot exist`,500));
  
    const imgId = user.avatar.public_id
    if(imgId)
    {
        await cloudinary.v2.uploader.destroy(imgId,
            {
                folder:"profileImg"
            })
    }
    await user.remove();
    res.status(200).json({
        success: true,
        message: "user deleted successfullly",
        user,
      });

})
//update user role by admin
exports.updateUserRole =catchAsyncErrors( async(req,res,next)=>
{
    
      const user = await User.findById(req.params.id)
      if(!user)
     return next(new ErrorHandler("user does not exits with this id",404));
      const newUserData =
      {
        fullName:req.body.fullName,
        mobileNo:req.body.mobileNo,
        email:req.body.email,
        role:req.body.role,
      } 
      user = await User.findByIdAndUpdate(req.params.id,newUserData,
        {
            new:true,
            runValidators:true,
            useFindAndModify:false,
        });
        res.status(200).json({
            success: true,
            message: "updated successfullly",
            user,
          });
      
      
    
});