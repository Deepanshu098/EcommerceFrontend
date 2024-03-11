import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {AiFillEye , AiFillEyeInvisible} from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { AdminAuthLogin } from '../../redux/slice/AdminAuthSlice/AdminAuthSlice';

function AdminLogin() {
    const[showPassword,setShowPassword]=useState(false);
    const[formData,setFormData]=useState({
        email:"",
        password:""
    })
    // console.log("email",formData.email)
    // console.log("password",formData.password)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    //Admin Login
    const adminLogin=(e)=>{
        e.preventDefault();
        const {email , password} = formData;
        console.log(email,password)
        if(email === ""){
            toast.error("Email is Required!!")
        }
        else if(!email.includes('@')){
            toast.error("Enter the valid Email!!")
        }
        else if(password === ""){
            toast.error("Password is required")
        }
        else{
            dispatch(AdminAuthLogin(formData)).then((res)=>{
                if(res.payload.data.token){
                    navigate('/admin/dashboard')
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
    }


    const showPass =()=>{
        setShowPassword(true)
    }
    const hidePass = ()=>{
        setShowPassword(false)
    }
  return (
        <div className='py-5' style={{background:"lightblue",minHeight:"100vh"}}>
            <div className='mt-2 bg-white rounded-3 mx-auto p-4' style={{width:'500px'}}>
            <h3 className='text-center text-success'>Admin Login</h3>
            <p className='text-center fs-5'>Login to your account to continue.</p>
            <form action='' onSubmit={adminLogin}>
                <input type='email' placeholder='Email Address' name='email' onChange={handleChange} className='my-2 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0px'}} />
                <input type={showPassword ? "text" :"password"}  placeholder='Password' name='password' onChange={handleChange} className='mt-3 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0'}} />
                {
                    showPassword ?
                    <AiFillEye className='fs-4' style={{position:'absolute',top:'46%',right:'38%',cursor:'pointer'}}  onClick={()=>hidePass()}/>
                    :
                    <AiFillEyeInvisible className='fs-4' style={{position:'absolute',top:'46%',right:'38%',cursor:'pointer'}}   onClick={()=>showPass()}/>

                }
                <button className='border-0 rounded-5 px-3 py-2 text-white w-100 mt-4 fw-bold fs-5 bg-primary' type='submit'>
                    Login
                </button>
            </form>
            </div>
            <div className='mt-3 bg-white rounded-3 mx-auto p-4' style={{width:"500px"}}>
                <span className='d-flex justify-content-center fs-5'>
                    Don't have an Account? 
                    <Link to="/signup" className='text-decoration-none ms-2'><span className='text-primary'>Sign up</span></Link>
                </span>
                <Link to='/forgotpassword' className='text-decoration-none'>
                 <p className='text-danger  mt-1 text-center fs-4 mb-0'>Forgot Password?</p>
                 </Link>
            </div>
           
        </div>
  )
}

export default AdminLogin