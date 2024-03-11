import React, { useState } from 'react'
import './HomeContacts.css'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { UserContact } from '../../redux/slice/UserAuthSlice/UserAuthSlice'

function HomeContacts() {
  const[inputvalue,setInputValue]=useState({
      name:"",email:"",message:""
  })


  const dispatch = useDispatch();


  const handleChange=(e)=>{
    setInputValue({...inputvalue,[e.target.name]:e.target.value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    const{name,email,message}=inputvalue;
    if(name=== ""){
      toast.error("Name is required")
    }
    else if(!email.includes("@")){
      toast.error("Enter valid Email")
    }
    else if(message === ""){
      toast.error("Message is required")
    }
    else{
      dispatch(UserContact(inputvalue)).then((res)=>{
        if(res?.payload){
          setInputValue({...inputvalue,name:"",email:"",message:""})
        }
      })
      .catch((err)=>{
        console.log("Err",err)
      })
    }
  }


  return (
    <>
      <section className='mt-5'>
          <div className='contact container'>
            <div className='map'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28022.0014834439!2d76.95961881368035!3d28.607270270138194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0fdcb4d53a21%3A0x8800d482f7f39fc0!2sNajafgarh%2C%20Delhi!5e0!3m2!1sen!2sin!4v1707846802152!5m2!1sen!2sin" width="100%" height="450" 
            style={{border:0}}   allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <form action='' onSubmit={handleSubmit} className='mt-5' style={{display:'flex',justifyContent:'space-between',margin:'80px 0'}}>
              <div className='form'>
                <h4>INFORMATION</h4>
                <h1>Contact Us</h1>
                <span>As you might expect of a company that begin as a high-end interiors contractor , we pay strict attention</span>
                <h3 className='mt-3'>USA</h3>
                <p>432 Times New Square , New York City D-091 +72 543 234 5642</p>
                <h3>INDIA</h3>
                <p>Najafgarh , NewDelhi-110043 </p>
              </div>
              <div className='form-details'>
                <input type='text' placeholder='Name' name='name' value={inputvalue.name} onChange={handleChange} className='textinp'/>
                <input type='email' placeholder='Email' name='email' value={inputvalue.email} onChange={handleChange} className='emailinp'/>
                <textarea cols="50" rows="8" placeholder='Message' name='message' value={inputvalue.message} onChange={handleChange} className='textareainp'></textarea>
                <button className='bg-primary px-3 mt-3 ms-3  rounded-5' style={{letterSpacing:'0'}} >Send Message</button>
              </div>
            </form>
          </div>
      </section>
    </>
    
  )
}

export default HomeContacts