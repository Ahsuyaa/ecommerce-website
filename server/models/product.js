const mongoose= require("mongoose");
const productionSchema = new mongoose.Schema({
    productName:
    {
        type:String,
        maxlength:[30,"character must be at least 30"],
        minlength:[4,"product character must be 4"],
        required:[true,"please filled productName"]
    },
    description :
    {
        type:String,
        required:[true,"description must be filled "]
    },
    productImg:
    {
        public_id:{
         type:String,
        },
        url:{
            type:String,
        },
    },
    category:
    {
        type:String,
        required:[true,"please select a category"],

    },
    SKU:
    {
        type:String,
        required:[true,"please provide a SKU for the product"],
    },
    manufacturer:
    {
        type:String,
        required:[true,"please specify the manufacture"],
    },
    ratings:
    {
        type:Number,
        min:[0,"rating ust be 0"],
        max:[5,"rating ust be 5"],
    },
    IsInStock:
    {
        type:Number,
        required:[true,"price must be filled"],
        maxlength:[4,"stock cannpt exceed 4 character"],
        default:1,
       
    },
    price:
    {
        type:Number,
        required:[true,"price must be filled"]

    },
    
},{timestamps:true}
);
 const Product =mongoose.model("product",productionSchema);
 module.exports= Product;
