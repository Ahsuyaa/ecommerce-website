 //core module
// const http = require("http");
// //thord party module
// const pokemon = require("pokemon");
// const data= require("./data")
// const fs = require("fs");
// const path = require("path");
// const dirPath = path.join(__dirname, "files");
// const filePath = `${dirPath}/file.text`;
// fs.writeFileSync(filePath, "Kina oralo lagyo share bazar!");
// fs.readFile(filePath, "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });
// const PORT = 5000;
// const hostname = "localhost";
// const home = fs.readFileSync("./home.html");
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.write(
//     JSON.stringify(data)
//   );
//   res.end();
  // if (req.url === "/") {
  //   return res.end(home);
  // } else {
  //   return res.end("<h1>page not found,404</h1>");
  // }
// });
// server.listen(PORT, hostname, () => {
//   console.log(`server is running at port: http://${hostname}:${PORT}`);
// });
// const express = require("express");
// const path = require("path");
// const bodyParser = require("body-parser");
// const app = express();
// const mongoose = require("mongoose");
// mongoose.set("strictQuery",true);
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// //database connect
// mongoose.connect("mongodb://127.0.0.1:27017/MYDatabase")
// .then((data)=>{
//   console.log(`mongo db connected:${data.connection.host}`);
// }
// ).catch((err)=>
// {
//   console.log(err);
// });
// const userSchema = new mongoose.Schema({
//   name:
//   {
//     type:String,
//     required:true
//   },
//   email:{
//     type:String,
//     required:true,
//     unique:true
//   },
//   age:
//   {
//     type:Number,
//     required:true
//   },
//   date:
//   {
//     type:Date,
//     default:Date.now()
//   }
// })
// const user= mongoose.model("user",userSchema);
// const adder =async()=>
// {
//   const mydata=new user(
//     {
//       name:"ram",
//       email:"ram@gmail.com",
//       age:22
//     }
//   )
// }
// await.mydataconst.save()
// adder();
// //http method
// app.get("/ ", (req, res) => {
//     res.sendFile(path.join(__dirname + "/home.html"));
// });
// app.post("/api/v1/login", (req, res) => {
//   const userName = req.body.name;
//   const userEmail = req.body.email;
//   const userPassword = req.body.password;
//   res.json({
//     success: true,
//     name: userName,
//     email: userEmail,
//     password: userPassword,
//   });
// });
// //port
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running at port: http://localhost:${PORT}`);
// });

const express = require("express");
//import express from "express";
const dotenv = require("dotenv");
const colors=require("colors");
const logger = require("morgan");
const connectDB = require("./config/db");
const cloudinary= require("cloudinary");
const errorMiddleware= require("./middlewares/error");
const cors = require("cors");
//configure
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use (logger("dev"));
app.use(cors());
//handle uncaught exception
process.on("uncaughtException",(err)=>
{
  console.log(`error:${err.message}`.red);
  console.log(`shutting down the server to handle oncaughtException`);
  process.exit(1);
})

//connect db
connectDB();
//cloudinary configuration
cloudinary.v2.config({
  cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
  api_key:process.env.CLOUDINARY_CLIENT_API,
  api_secret:process.env.CLOUDINARY_CLIENT_SECRET,
});
//routes
app.use("/api/v1/",require("./routes/productRoutes"));
app.use("/api/v1/", require("./routes/userRoute"));
app.use(express.static("public/gallery"));
app.get("/",(req, res)=>
{
  res.send("<h1>server is worling<h1>")
});
//middleware call
app.use(errorMiddleware);
//port
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server is running at port: http://localhost:${PORT}`.cyan.underline.bold);
});
// to handle promise rejection
process.on("unhandleRejection",(err)=>
{
 console.log( `error:${err.messsage}`.red)
 console.log(`shutting down the server to handled promise rejection`);
 server.close(()=>{
  process.exit(1);
 }
 );
})