import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom';

function UserProtectedRoutes({Components}) {
    const navigate = useNavigate();

    const checkuservalid=()=>{
        let user = localStorage.getItem("usertoken")
        if(!user){
            navigate('/login')
        }
    }

    useEffect(()=>{
        checkuservalid()
    },[])

  return (
    <div>
        <Components/>
    </div>
  )
}

export default UserProtectedRoutes