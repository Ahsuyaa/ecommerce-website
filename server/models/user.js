const mongoose = require("mongoose");
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
    {
        fullName:
        {
            type:String,
            trim:true,
            maxlength:[30,"character must be at least 30"],
            minlength:[4,"name character must be 4"],
            required:[true,"please filled Name"],
        },
        email:
        {
            type:String,
            required:[true,"please filled Email"],
            unique:true
        },
        avatar:{
        public_id:
        {
        type:String
        },
        url:
        {
            type:String,
        }
        },
        role:
        {
          type:String,
          enum:["admin","user"],
          default:"user",
        },
        mobileNo:
        {
            type:Number,
            required:[true,"please filled contact"],
      
        },
        password:
        {
            type:String,
            select:false,
            minlength:[8,"password character must be 4"],
            required:[true,"please filled password"],
        },
    },{timestamps:true}
);

//hashed password
userSchema.pre("save",async function(next)
{
    if(!this.isModified) return next()
    this.password= await bcrypt.hash(this.password,10);
    next();

})
//generate token 
userSchema.methods.getJwtToken = function()
{
    return jwt.sign({id:this._id},process.env.JWT_SECRET,
        {
            expiresIn:"2h"
        })
}
//compare password
userSchema.methods.comparePassword = async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword,this.password);
}
const User = mongoose.model("user",userSchema);
module.exports=User;