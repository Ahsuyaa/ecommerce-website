const express = require("express");
const { register,
     login, 
     profileUpdate,
      changePassword, 
      singleUser, 
      getAllUsers, 
      getSingleUserByAdmin, 
      deleteSingleUser,
      updateUserRole} = require("../controller/userController");
const { auth, isAuthAdmin } = require("../middlewares/auth");
const singleUpload = require("../middlewares/multer");
const router = express.Router()

//register
router.route("/register").post(singleUpload,register);
//login 
router.route("/login").post(login);
//update profile
router.route("/profile/update").put(auth,singleUpload,profileUpdate);
//change password
router.route("/change/password").put(auth,changePassword);
//get logged user
router.route("/me").get(auth,singleUser);
//for admin route
router.route("/all/users").get(auth,isAuthAdmin,getAllUsers);
//for single user only admin can access
router.route("/single/user/:id").get(auth,isAuthAdmin,getSingleUserByAdmin);
//delete singleuser by admin only
router.route("/delete/user/:id").delete(auth,isAuthAdmin,deleteSingleUser);
//update user role by admin only
router.route("/update/role/:id").put(auth,isAuthAdmin,updateUserRole);
module.exports = router;
