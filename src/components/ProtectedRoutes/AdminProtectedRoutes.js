import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom';


function AdminProtectedRoutes({Components}) {
    const navigate = useNavigate();

    const checkadminvalid=()=>{
        let user = localStorage.getItem("admintoken")
        if(!user){
            navigate('/login')
        }
    }

    useEffect(()=>{
        checkadminvalid()
    },[])
  return (
    <div>
        <Components/>
    </div>
  )
}

export default AdminProtectedRoutes