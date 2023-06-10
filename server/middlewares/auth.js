const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
// authentications 
exports.auth = catchAsyncErrors(async(req,res,next)=>
{
    
        let token = req?.headers?.authorization?.replace("Bearer ","");
        if(!token)
         return next(new ErrorHandler("please login first",401));
        const decodedData= jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decodedData.id);
        if(!user)
        return next(new ErrorHandler("user not found",401));
        req.user= user;
        next() 
        
} );
//authorize

exports.isAuthAdmin =(req,res,next)=>
{
    if(!req.user)
     return next(new ErrorHandler(`you must be authenticate tp access this resource`,401));
    if(req.user.role!=="admin")
    return next(new ErrorHandler(`${req.user.role} is not authorize to accesss this role`,403));
    next()
}