import axios from "axios";
import jwt_decode from "jwt-decode";
export const API = axios.create({baseURL:"http://localhost:4000/api/v1"})
//use interceptors
API.interceptors.request.use((req)=>{
const token = 
localStorage.getItem("profile")&&
JSON.parse(localStorage.getItem("profile")).token;
try {
    if(token)
    {
        const decodedToken = jwt_decode(token)
        if(decodedToken.exp<Date.now()/1000)
        {
            throw new Error("session has been expired,please login first")
        }
        req.headers.Authorization=`Bearer ${token}`
    }
} catch (error) {
    console.log(error);

}
return req;
})
//user route
export const userLogin =(loginValue)=>API.post("/login",loginValue)
export const userRegister =(myForm)=>API.post("/register",myForm);
export const myProfile =()=>API.get("/me");

export const updateprofile=(updateForm)=>
API.put("/profile/update",updateForm);

export const updatepassword=(updateValue)=>
API.put("/change/password",updateValue);
//products route
export const allProducts= (keyword="")=>API.get(`/products?keyword=${keyword}`);
export const singleProduct =(id)=>API.get(`/single/product/${id}`)