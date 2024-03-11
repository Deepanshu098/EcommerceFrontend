import React, { useEffect, useState } from 'react'
import { AiFillEye , AiFillEyeInvisible} from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { forgotPasswordVerifySlice, resetPasswordSlice } from '../../redux/slice/UserAuthSlice/UserAuthSlice';
import toast from 'react-hot-toast';

function ResetPassword() {
    const[passShow,setpassShow] = useState(false);
    const[confirmpassShow,setconfirmpassShow] = useState(false);

    const[password,setPassword] = useState("");
    const[confirmpassword,setConfirmPassword] = useState("");


    const {id , token} = useParams();
    // console.log("Dataa",data)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userValid = ()=>{
        const data={
            id,
            token
        }
        dispatch(forgotPasswordVerifySlice(data)).then((res)=>{
            if(res?.payload){
                console.log("User valid");
            }
            else{
                navigate('*')
            }
        })
        .catch((err)=>{
            navigate('*')
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(password === ""){
            toast.error("Password is required")
        }
        else if(confirmpassword === ""){
            toast.error("Confirm Password is required")
        }
        else if(password !== confirmpassword){
            toast.error("Password should match confirm Password")
        }
        else{
            const passworddata = {password};
            const data ={
                passworddata,
                id,
                token
            }
            dispatch(resetPasswordSlice(data)).then((res)=>{
                if(res?.payload){
                    navigate('/login')
                }
                else{
                    navigate('*')
                }
            })
            .catch((err)=>{
                navigate('*')
            })
        }
    }

    useEffect(()=>{
        userValid()
    },[])


  return (
    <section>
                <div className="py-5" style={{background:"lightblue",minHeight:"100vh"}}>
                    <div className="my-5 bg-white mx-auto rounded p-4" style={{width:"500px"}}>
                        <h3 className='text-center mt-2'>Enter Your New Password</h3>
                    
                    <form onSubmit={handleSubmit}>
                            <input type={!passShow ? "password":"text"} name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password' className='my-2 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0'}} />
                            <div onClick={()=> setpassShow(!passShow)} style={{cursor:'pointer',position:'relative'}}>
                            {
                                !passShow ? <AiFillEye style={{position:'absolute',top:'-35px',right:'4%',fontSize:'20px'}} /> : <AiFillEyeInvisible style={{position:'absolute',top:'-35px',right:'4%',fontSize:'20px'}}/>
                            }
                            </div>
                            <input type={!confirmpassShow ? "password":"text"} name="password" value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Enter Your Confirm Password' className='my-2 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0'}}/>
                            <div onClick={()=> setconfirmpassShow(!confirmpassShow)} style={{cursor:'pointer',position:'relative'}}>
                            {
                                !confirmpassShow ? <AiFillEye style={{position:'absolute',top:'-35px',right:'4%',fontSize:'20px'}} /> : <AiFillEyeInvisible style={{position:'absolute',top:'-35px',right:'4%',fontSize:'20px'}}/>
                            }
                            </div>
                        <button className="btn btn-primary mt-3 text-center w-100" type='submit'>Update Password</button>
                    </form>
                    </div>
                </div>
            </section>
  )
}

export default ResetPassword