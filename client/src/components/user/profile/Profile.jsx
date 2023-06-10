import React, { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { clearError, profile } from "../../../redux/features/authSlice";
import {FaUserAlt,FaCartArrowDown,FaStar} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Profile.css"
const Profile = () => {
  const { loading, error, singleUser } = useSelector((state) => state.auth);
  console.log(singleUser);


  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, error]);
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  return (
    <>
     <div className='container'>
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
         
        <div className='row'>
          <div className='col-1'>
            <img style={{width:"200px",height:"200px",objectFit:"cover",borderRadius:"50%"}} src={singleUser?.avatar.url} alt="profile" />
            <button style={{width:"200px",textAlign:"center"}}><FaUserAlt/><Link to="/updateprofile">update profile</Link></button>
            <button style={{width:"200px",textAlign:"center"}} ><Link to="/changepassword">change password</Link></button>
            <button style={{width:"200px",textAlign:"center"}}><FaStar/>My reviews</button>
            <button style={{width:"200px",textAlign:"center"}}><FaCartArrowDown/>My Orders</button>
            </div>
            <div className='col-2 '>
             <label className="label">FullName</label> <br></br>
             <input type="text" name="fullName" value={singleUser?.fullName}/><br></br>
             <label>MobileNo</label>  <br></br>
             <input type="number" name="mobileNo" value={singleUser?.mobileNo}/><br></br>
             <label>Email</label> <input type="text" name="email" value={singleUser?.email}/><br></br>
             <label>Role</label> <input type="text" name="role" value={singleUser?.role}/><br></br>
            
            </div>
           </div>
                     </>
        )}
     </div>
    </>
  );
};

export default Profile;
