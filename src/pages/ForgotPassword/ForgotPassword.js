import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { forgotPasswordSlice } from '../../redux/slice/UserAuthSlice/UserAuthSlice';

function ForgotPassword() {
  const[email,setEmail] = useState("");

  const dispatch = useDispatch();

  const handleChange=(e)=>{
    setEmail(e.target.value)
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(email === ""){
      toast.error("Email is required!!")
    }
    else if(!email.includes('@')){
      toast.error("Please enter valid Email")
    }
    else{
      const data={
        email:email
      }
      dispatch(forgotPasswordSlice(data)).then((res)=>{
        if(res?.payload){
          setEmail("")
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }

  return (
    <div className='py-5' style={{background:"lightblue",minHeight:"100vh"}}>
                <div className="my-5 bg-white mx-auto rounded p-4" style={{width:"500px"}}>
                    <h4 className="text-center text-danger  fs-2">Forgot Password</h4>
                    <label htmlFor="email" className="mt-4 fs-5">Email Address</label>
                    <input type="email" placeholder="Enter your Email Address" id='email' name="email" onChange={handleChange} className='my-2 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0'}}/>
                    <button className="border-0 rounded-5  p-1 mt-3 fs-3 bg-info w-50 text-light" style={{margin:'0px 100px',letterSpacing:'0'}} onClick={handleSubmit}>Send Link</button>
                    <Link to="/login" className="text-decoration-none fs-5">
                    <p className="text-center mt-4 fs-4" style={{letterSpacing:'0'}}>Go to Login Page</p>
                    </Link>
                </div>
            </div>
  )
}

export default ForgotPassword