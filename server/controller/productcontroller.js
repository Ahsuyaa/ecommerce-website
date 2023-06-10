const Product = require("../models/product");
const getDataUri = require("../utils/DataUri");
const cloudinary= require("cloudinary");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
exports.createProduct=catchAsyncErrors(async(req,res,next)=>
{
   
        const {
          productName,
          description,
          category,
          SKU,
          manufacturer,
          ratings,
          IsInStock,
          price,
        } = req.body;
        //const file =req.file.filename;
        let file;
        if(req.file){
          file = req.file;
        }else
        return next(new ErrorHandler(  "file was not upload!",400));
        // console.log(file);
        if (
          !productName ||
          !description ||
          !category ||
          !SKU ||
          !manufacturer ||
          !ratings ||
          !IsInStock ||
          !price
        ) {
          return next(new ErrorHandler(  "filled must be filled!",400));
        
        }
        const fileUrl= getDataUri(file)
        const mycloud= await cloudinary.v2.uploader.upload(fileUrl.content,
          {
            folder:"productImg"
          });
        const product = await Product.create({
          productName,
          description,
          category,
          SKU,
          manufacturer,
          ratings,
          IsInStock,
          price,
          productImg:
          {
            public_id:mycloud.public_id,
            url:mycloud.secure_url
          }

          // productImg:file,
        });
        
        res.status(200).json({
          success: true,
          message: "products created successfully!",
          product,
        });
    
})
     

exports.getAllProduct=catchAsyncErrors(async(req,res,next)=>
{
      const resultPerPage= 8;
      const apifeatures =new ApiFeatures(Product.find(),req.query).search().
      filter().
      pagination(resultPerPage);
      const products= await apifeatures.query;
       
        if (!products)
        return next(new ErrorHandler( "product not found!",404)); 
        res.status(200).json({
          success: true,
          message: "products get successfully!",
          data:products,
          resultPerPage,
        });
       
      
 
});
//get single product (basis of id)
exports.singleProduct =catchAsyncErrors(async(req,res,next)=>
{
 
    const product = await Product.findById(req.params.id);
    if(!product)
    return next(new ErrorHandler("product not found",404));
   
    res.status(200).json({
      success: true,
      message: "single product get successfully!",
      data:product,
    });
  
 
});
exports.updateProduct =catchAsyncErrors( async (req, res,next) => {
  
  const {
    productName,
    description,
    category,
    SKU,
    manufacturer,
    ratings,
    IsInStock,
    price,
    numOfReviews,
  } = req.body;
  let file;
  if (req.file) {
    file = req.file;
  } else 
  return next(new ErrorHandler(  "file was not upload!",400));
  const productId = req.params.id;
  let product = await Product.findById(productId);
  if (!product)
  return next(new ErrorHandler(  "Product not found!",404)); 
  
  
  if (
    !productName ||
    !description ||
    !category ||
    !SKU ||
    !manufacturer ||
    !ratings ||
    !IsInStock ||
    !price
  ) {
    return next(new ErrorHandler(  "Fields must be filled!",400));
  
  }
  let myCloud;
  if (file) {
    if (product.productImg.public_id) {
      await cloudinary.v2.uploader.destroy(product.productImg.public_id, {
        folder: "productImg",
      });
    }
    const fileUri = getDataUri(file);
    myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
      folder: "productImg",
    });
  }
  product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      productName,
      description,
      category,
      SKU,
      manufacturer,
      ratings,
      IsInStock,
      price,
      numOfReviews,
      productImg: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      // productImg: file,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res.status(200).json({
    success: true,
    message: "products updated successfully!",
    product,
  });


});
exports.deleteProduct =catchAsyncErrors( async (req, res,next) => {
  
  const product = await Product.findById(req.params.id);
  if (!product) 
  return next(new ErrorHandler(  "product not found!",404));

  const productImageId= product.productImg.public_id;
  if(productImageId)
  {
    await cloudinary.v2.uploader.destroy(productImageId,
      {
        folder:"productImg"
      });
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "products deleted successfully!",
    product,
  });


});