const mongoose = require("mongoose");
mongoose.set("strictQuery",true);
const connectDB = async()=>
{
  
       const {connection}= await mongoose.connect(process.env.MONGODB_URL);
       console.log(`mongodb is connected at:${connection.host}`.blue.underline.bold);
   
   
};
module.exports=connectDB;