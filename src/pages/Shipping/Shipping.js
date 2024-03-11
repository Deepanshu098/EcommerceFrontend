import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import {Country, State} from 'country-state-city'
import toast from 'react-hot-toast';

function Shipping() {
  const location = useLocation();
  const naviagte = useNavigate();
  // console.log(location)

  const[country,setCountry]=useState([])
  const[countrycode,setCountryCode]=useState("")

  const[state,setState]=useState([])
  const[finalstate,setFinalState]=useState("")

  

  const[inputvalue,setInputValue]=useState({
    mobile:"",
    city:"",
    pincode:"",
    address:""
  })

  const handleChange=(e)=>{
    setInputValue({...inputvalue,[e.target.name]:e.target.value})
  }

  var shippingPricce = 40;

  const handleSubmit=(e)=>{
    e.preventDefault();
    const{mobile,city,pincode,address} = inputvalue;
    if(mobile === ""){
      toast.error("Mobile is required!!")
    }
    else if(mobile.length !== 10){
      toast.error("Enter a valid mobile Number")
    }
    else if(city === ""){
      toast.error("City is required")
    }
    else if(pincode === ""){
      toast.error("Pincode is required")
    }
    else if(address === ""){
      toast.error("Address is required")
    }
    else if(countrycode === ""){
      toast.error("Country is required")
    }
    else if(finalstate === ""){
      toast.error("State is required")
    }
    else{
      const data ={
        mobile,
        city,
        pincode,
        address,
        country:countrycode,
        state:finalstate,
        itemPrice:location.state,
        shippingPrice:shippingPricce,
        totalPrice:location.state  + shippingPricce
      }
      naviagte('/checkout',{state:data})
    }
  }

 
  useEffect(()=>{
    let countries = Country.getAllCountries();
    let arr=[];
    for(let i=0;i<countries?.length;i++){
      let storedata={value:countries[i]?.isoCode , label:countries[i]?.name}
      arr.push(storedata)
    }
    setCountry(arr)

    if(countrycode){
      let state=State.getStatesOfCountry(countrycode);
      let arr2=[];
      for(let i=0;i<state?.length;i++){
        let storestatedata={value:state[i]?.isoCode , label:state[i]?.name}
        arr2.push(storestatedata)
      }
      setState(arr2)
    }
  },[countrycode])

  // console.log(countrycode)

  return (
    <div className='py-5' style={{background:"lightblue",minHeight:"100vh"}}>
            <div className='mt-3 bg-white rounded-3 mx-auto p-4' style={{width:'600px'}}>
            <h3 className='text-center text-success mb-3'>Shipping Details</h3>
            <form action=''  style={{marginTop:'-40px'}} onSubmit={handleSubmit}>
                <input type='text' placeholder='Enter your Mobile' name='mobile' onChange={handleChange}  className='mb-2 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0'}} />
                <div className='mt-3 mb-3' >
                <Select options={country} placeholder="Select Your Country" onChange={(e)=>setCountryCode(e.value)} />
                </div>
                <div className='mt-3'>
                <Select options={state} placeholder="Select Your State" onChange={(e)=>setFinalState(e.label)}/>
                </div>
                <input type='text' placeholder='Enter Your City' name='city' onChange={handleChange}  className='mb-0 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0'}} />
                <input type='text' placeholder='Enter Your Pincode' name='pincode' onChange={handleChange} className='mb-4 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0'}} />
                <textarea placeholder='description' name='address' onChange={handleChange} rows="2" className='mb-0 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0'}}></textarea>
                <button className='border-0 rounded-5 px-3 py-2 text-white w-100 mt-4 fw-bold fs-5 bg-primary'  type='submit'>
                Send
                </button>
            </form>
            </div>
        </div>
  )
}

export default Shipping