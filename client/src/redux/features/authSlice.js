import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as api from "../Api";
//register
export const register = createAsyncThunk(
    "/auth/register",
async ({myForm,navigate,toast}, { rejectWithValue }) => {
      try {
        const response = await api.userRegister(myForm);
        toast.success(response.data.message||"register successfully");
        navigate("/login");
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
//login
export const login =createAsyncThunk("/auth/login",async({loginValue,navigate,toast},{rejectWithValue})=>
{
    try {
        const response= await api.userLogin(loginValue);
        toast.success(response.data.message|| "login successfully");
        if(response.data.user.role==="admin")
        {
          navigate("/admin/dashboard");
          return response.data;
        }
        else{
          navigate("/profile");
          return response.data;
        }
        

        
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}
)
export const profile = createAsyncThunk(
  "/auth/me",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.myProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const profileUpdate= createAsyncThunk(
  "/profile/update",
async ({updateForm,navigate,toast}, { rejectWithValue }) => {
    try {
      const response = await api.updateprofile(updateForm);
      toast.success(response.data.message||"updated successfully");
      navigate("/profile");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const passwordUpdate= createAsyncThunk(
  "/profile/update",
async ({updateValue,navigate,toast}, { rejectWithValue,dispatch }) => {
    try {
      const response = await api.updatepassword(updateValue);
      toast.success(response.data.message||"updated successfully");
      dispatch(setLogout())
      navigate("/login");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const authSlice = createSlice({
  name:"auth",
  initialState:{
    user:null,
    users:[],
    singleUser:null,
    loading:false,
    message:"",
     error:"",
  },
  reducers:{
    setUser:(state,action)=>
    {
      state.user=action.payload
    },
    setLogout:(state,action)=>
    {
      localStorage.clear();
      state.user=null;
    },
    clearError:(state,action)=>{
    state.error=null
    },
},
  extraReducers:{
    [register.pending]:(state,action)=>
    {
     state.loading=true;
 
    },
    [register.fulfilled]:(state,action)=>
    {
     state.loading=false;
     state.user=action.payload;
    },
    [register.rejected]:(state,action)=>{
        state.loading=false;
        state.error=action.payload?action.payload.message : "error not found"
       },
    [login.pending]:(state,action)=>
    {
     state.loading=true;
 
    },
 
    [login.fulfilled]:(state,action)=>
    {
     state.loading=false;
    //  localStorage.setItem("token",action.payload.token)
    localStorage.setItem("profile",JSON.stringify({...action.payload}))
     state.user=action.payload;
    },
  
    [login.rejected]:(state,action)=>{
     state.loading=false;
     state.error=action.payload.message;
    },
    [profile.pending]:(state,action)=>
    {
     state.loading=true;
    },
 
    [profile.fulfilled]:(state,action)=>
    {
     state.loading=false;
     state.singleUser=action.payload.user;
    },
  
    [profile.rejected]:(state,action)=>{
     state.loading=false;
     state.error=action.payload.message;
    },
    [profileUpdate.pending]:(state,action)=>
    {
     state.loading=true;
    },
 
    [profileUpdate.fulfilled]:(state,action)=>
    {
     state.loading=false;
     state.user={...state.user,...action.payload};
     localStorage.setItem(
      "profile",
      JSON.stringify({...state.user,token:state.user?.token})
     )
     
    },
  
    [profileUpdate.rejected]:(state,action)=>{
     state.loading=false;
     state.error=action.payload?.message;
    },
    [passwordUpdate.pending]:(state,action)=>
    {
     state.loading=true;
    },
 
    [passwordUpdate.fulfilled]:(state,action)=>
    {
     state.loading=false;
      state.user=action.payload;

     
    },
  
    [passwordUpdate.rejected]:(state,action)=>{
     state.loading=false;
     state.error=action.payload?.message;
    },


},

})
export const {clearError,setUser,setLogout} = authSlice.actions
export default authSlice.reducer;