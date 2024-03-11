import React, { useEffect } from 'react'
import './UserProfile.css'
import { useDispatch, useSelector } from 'react-redux'
import { userorders } from '../../redux/slice/UserAuthSlice/UserAuthSlice';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const {userverify} = useSelector((state)=>state.User)
    const {userOrdersData} = useSelector((state)=>state.User)
    // console.log("User",userOrdersData)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getOrderData=()=>{
        dispatch(userorders())
    }

    const handleOrders = ()=>{
        navigate('/userorders')
    }

    useEffect(()=>{
        getOrderData()
    },[])

     return (
    <>
        <div className='wrapper mt-5 mb-5'>
            <div className='left'>
                <img src='/logo192.png' alt='' width="100"/>
                <h4>{userverify[0]?.message?.firstName}</h4>
                <p>{userverify[0]?.message?.email}</p>
            </div>
            <div className='right'>
                <div className='info'>
                    <h3>Information</h3>
                    <div className='info_data'>
                        <div className='data'>
                            <h4>Email</h4>
                            <p>{userverify[0]?.message?.email}</p>
                        </div>
                    </div>
                </div>

                <div className='projects'>
                    <h3>Orders</h3>
                    <div className='projects_data'>
                        <div className='data'>
                            <h4>Total Orders</h4>
                            <p style={{fontSize:'20px'}}>{userOrdersData?.length}</p>
                        </div>
                        <div>
                            <button className='btn btn-primary p-2' onClick={handleOrders}>See Orders</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default UserProfile