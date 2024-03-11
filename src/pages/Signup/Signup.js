import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { UserRegister } from '../../redux/slice/UserAuthSlice/UserAuthSlice';


function Signup() {
    const[passShow,setpassShow] = useState(false);
    const[confirmpassShow,setconfirmpassShow] = useState(false);
    const[formdata,setFormData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const[image,setImage]=useState("");
    const[preview,setPreview]=useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange=(e)=>{
        setFormData({...formdata,[e.target.name]:e.target.value})
    }

    const setUserImage=(e)=>{
        setImage(e.target.files[0])
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const{firstName,lastName,email,password,confirmPassword}=formdata;

        if(firstName === ""){
            toast.error("First Name is required!!")
        }
        else if(lastName === ""){
            toast.error("Last Name is required!!")
        }
        else if(!email.includes('@')){
            toast.error("Enter valid Email")
        }
        else if(email === ""){
            toast.error("Email is required!")
        }
        else if(password === ""){
            toast.error("Password is required!")
        }
        else if(confirmPassword === ""){
            toast.error("Confirm Password is required")
        }
        else if(password !== confirmPassword){
            toast.error("Password should match Confirm Password")
        }
        else{
            const data = new FormData();
            data.append("firstName",firstName);
            data.append("lastName",lastName);
            data.append("email",email);
            data.append("password",password);
            data.append("confirmPassword",confirmPassword);
            data.append("userimage",image);

            const config = {
                "Content-Type": "multipart/form-data"
            }

            const datasend={
                data,
                config
            }

            dispatch(UserRegister(datasend)).then((res)=>{
                if(res.payload){
                    setFormData({...formdata,firstName:"",
                    lastName:"",
                    email:"",
                    password:"",
                    confirmPassword:""})
                    setImage("")
                    navigate('/login')
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    useEffect(()=>{
        if(image){
            setPreview(URL.createObjectURL(image))
        }
    },[image])

  return (
    <div className='py-5' style={{background:"lightblue",minHeight:"100vh"}}>
            <div className='mt-3 bg-white rounded-3 mx-auto p-4' style={{width:'600px'}}>
            <h3 className='text-center text-success'>Signup</h3>
            <p className='text-center fs-5 mb-0'>Create your new account.</p>
            <div className='text-center mb-2'>
            <img src={preview ? preview : "/logo192.png"} alt='' style={{width:'90px'}}/>
            </div>
            <form action='' onSubmit={handleSubmit}  style={{marginTop:'-40px'}}>
                <input type='text' placeholder='First Name' name='firstName' onChange={handleChange}  className='mb-2 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0'}} />
                <input type='text' placeholder='Last Name' name='lastName' onChange={handleChange} className='mb-2 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0'}} />
                <input type='text' placeholder='Email Address' name='email' onChange={handleChange} className='mb-2 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0'}} />
                <input type='file' name='userimage' onChange={setUserImage} className='mb-2 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0'}} />
                <input type={!passShow ? "password":"text"} placeholder='Password' name='password' onChange={handleChange} className='mb-2 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0'}} />
                <div onClick={()=> setpassShow(!passShow)} style={{cursor:'pointer',position:'relative'}}>
                {
                    !passShow ? <AiFillEye style={{position:'absolute',top:'-35px',right:'4%',fontSize:'20px'}} /> : <AiFillEyeInvisible style={{position:'absolute',top:'-35px',right:'4%',fontSize:'20px'}}/>
                }
                </div>
                <input type={!confirmpassShow ? "password":"text"} placeholder='Confirm Password' name='confirmPassword' onChange={handleChange} className='mb-2 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0'}} />
                <div onClick={()=> setconfirmpassShow(!confirmpassShow)} style={{position:'relative',cursor:'pointer'}}>
                {
                    !confirmpassShow ? <AiFillEye style={{position:'absolute',top:'-35px',right:'4%',fontSize:'20px'}} /> : <AiFillEyeInvisible style={{position:'absolute',top:'-35px',right:'4%',fontSize:'20px'}} />
                }
                </div>
                <p className='text-center mt-2 fs-5 mt-3'>Already have a account? <Link to="/login" className='text-primary mt-1 text-decoration-none fs-5'>Login</Link></p>
                <button className='border-0 rounded-5 px-3 py-2 text-white w-100 mt-4 fw-bold fs-5 bg-primary'  type='submit'>
                SignUp
                </button>
            </form>
            </div>
        </div>
  )
}

export default Signup