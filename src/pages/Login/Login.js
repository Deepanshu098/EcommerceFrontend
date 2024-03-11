import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {AiFillEye , AiFillEyeInvisible} from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { UserLogin } from '../../redux/slice/UserAuthSlice/UserAuthSlice';

function Login() {
    const dispatch  = useDispatch();
    const navigate = useNavigate();
    const[showPassword,setShowPassword]=useState(false);
    const showPass =()=>{
        setShowPassword(true)
    }
    const hidePass = ()=>{
        setShowPassword(false)
    }

    const[inputvalue,setInputValue]=useState({email:"",password:""})

    const handleChange=(e)=>{
        setInputValue({...inputvalue,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const {email,password} = inputvalue;
        if(email === ""){
            toast.error("EMail is required");
        }
        else if(!email.includes('@')){
            toast.error("Please enter valid Email")
        }
        else if(password === ""){
            toast.error("Password is required")
        }
        else{
            dispatch(UserLogin(inputvalue)).then((res)=>{
               if(res.payload){
                setInputValue({...inputvalue,email:"",password:""})
                navigate('/')
               }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

  return (
    <>
        <div className='py-5' style={{background:"lightblue",minHeight:"100vh"}}>
            <div className='mt-2 bg-white rounded-3 mx-auto p-4' style={{width:'500px'}}>
            <h3 className='text-center text-success'>Login</h3>
            <p className='text-center fs-5'>Login to your account to continue.</p>
            <form action='' onSubmit={handleSubmit}>
                <input type='email' placeholder='Email Address' name='email' onChange={handleChange} className='my-2 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0px'}} />
                <input type={showPassword ? "text" :"password"}  placeholder='Password' name='password' onChange={handleChange} className='mt-3 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0'}} />
                {
                    showPassword ?
                    <AiFillEye className='fs-4' style={{position:'absolute',top:'52%',right:'38%',cursor:'pointer'}}  onClick={()=>hidePass()}/>
                    :
                    <AiFillEyeInvisible className='fs-4' style={{position:'absolute',top:'52%',right:'38%',cursor:'pointer'}}   onClick={()=>showPass()}/>

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
    </>
  )
}

export default Login