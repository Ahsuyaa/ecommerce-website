import React from 'react'
import { useSelector } from 'react-redux'
import LoadingToLogin from './LoadingToLogin'

const PrivateRoute = ({children,isAdmin}) => {
    const {user}= useSelector((state)=>state.auth)
    if(isAdmin=== true&& user.role!=="admin")
    {
        return user? children:<LoadingToLogin/>
    }
  return user? children:<LoadingToLogin/>
}

export default PrivateRoute