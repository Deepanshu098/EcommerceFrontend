import React, { useEffect } from 'react'
import {CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { processPaymentSlice,OrderSlice } from '../../redux/slice/PaymentSlice/PaymentSlice';
import toast from 'react-hot-toast';
import { Deletecartdata } from '../../redux/slice/UserAuthSlice/UserAuthSlice';

function Payment() {
  const {state} = useLocation();
  const {payment} = useSelector((state)=>state.Payment)
  const {userverify} = useSelector((state)=>state.User)
  // console.log("payment",state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const order = {
      ...state
  }

  const handleSubmit=(e)=>{
    e.preventDefault();

    const paymentamount={
      totalamount : state.itemPrice * 100
    }
      dispatch(processPaymentSlice(paymentamount))
  }



  const finalPayment=async()=>{
      const result = await stripe.confirmCardPayment(payment,{
        payment_method:{
            card : elements.getElement(CardNumberElement),
            billing_details:{
              name:userverify[0]?.message?.firstName,
              email:userverify[0]?.message?.email,
              phone:state.mobile,
              address:{
                line1:state?.address,
                city:state?.city,
                state:state?.state,
                postal_code:state?.pincode,
                country:state?.country
              }
            }
        }
      })
      if(result.paymentIntent?.status === "succeeded"){
        order.paymentdetails={
          paymentid:result.paymentIntent?.id,
          status:result.paymentIntent?.status
        }
        dispatch(OrderSlice(order)).then((res)=>{
            if(res?.payload){
              dispatch(Deletecartdata())
              navigate('/userorders')
            }
        })
        .catch((err)=>{
          console.log("err",err)
        })
      }
      else {
        toast.error("Enter All Details")
      }
  }

  useEffect(()=>{
    if(payment.length > 0){
      finalPayment()
    }
  },[payment])

  return (
    <>
    <div className='form_data mt-3'>
              <div className="form_heading">
                <h1>Enter Card Details</h1>
                <form action='' onSubmit={handleSubmit}>
                  <div style={{border:'1px solid gray',borderRadius:'10px',padding:'10px',marginBottom:'10px'}}>
                  <CardNumberElement/>
                  </div>
                  <div style={{border:'1px solid gray',borderRadius:'10px',padding:'10px',marginBottom:'10px'}}>
                  <CardExpiryElement/>
                  </div>
                  <div style={{border:'1px solid gray',borderRadius:'10px',padding:'10px',marginBottom:'10px'}}>
                  <CardCvcElement/>
                  </div>
                  <button className='btn btn-primary' >Send</button>
                </form>
              </div>
    </div>
    </>
  )
}

export default Payment