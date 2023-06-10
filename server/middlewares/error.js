
const ErrorHandler = require("../utils/errorHandler");
module.exports= (err,req,res,next)=>
{
    err.statusCode = err.statusCode||500
    err.message= err.message||"internal server error";
    //wrong mongo id error
    if(err.name==="CastError")
    {
        const message=`resource not found:${err.path}`
        err= new ErrorHandler(message,400);
    }
    //duplicate field
    if(err.code===11000)
    {
        const message=`duplicate ${Object.keys(err.keyValue)} Entered`;
        err= new ErrorHandler(message,400);
    }
    //json web token error
    if(err.name==="JsonwebTokenError")
    {
        const message=`invalid jwt token ,try again`
        err= new ErrorHandler(message,400);
    }
    //json web token expire
    if(err.name==="TokenExpiredError")
    {
        const message=` jwt has been expired,try again`
        err= new ErrorHandler(message,400);
    }
    res.status(err.statusCode).json({
     success:false,
     message:err.message,
    })
}