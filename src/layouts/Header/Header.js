import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaCartShopping } from "react-icons/fa6";
import { HiMiniBars3 } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import './Header.css'
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { CiShop } from "react-icons/ci";
import { IoLogInOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { UserVerify, userCartSlice, userlogoutSlice } from '../../redux/slice/UserAuthSlice/UserAuthSlice';



function Header() {
    const {userverify} = useSelector((state)=>state.User)
    const {loginuser} = useSelector((state)=>state.User)
    const {usercartData} = useSelector((state)=>state.User)
    const {cartData} = useSelector((state)=>state.User)
    const {removesinglecartData} = useSelector((state)=>state.User)
    const {removeCart} = useSelector((state)=>state.User)
    const {deleteCartData} = useSelector((state)=>state.User)
    // console.log("USerr",deleteCartData)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    const navigate =useNavigate()


  const userLoggedIn = ()=>{
    dispatch(UserVerify())
  }

  //Handle Logout
  const userlogout = ()=>{
    dispatch(userlogoutSlice()).then((res)=>{
        navigate('/')
        handleClose()
    })
    .catch((err)=>{
        navigate('/');
        handleClose()
        console.log(err)
    })
  }

  //Get Cart Details
  const handlecartDetails=()=>{
    dispatch(userCartSlice())
  }


  useEffect(()=>{
    handlecartDetails();
  },[cartData,loginuser,removesinglecartData,removeCart,deleteCartData])

  useEffect(()=>{
    userLoggedIn()
  },[loginuser])


  return (
        <>
            <header>
                <div className='container-fluid px-2'>
                    <nav>
                        <div className="left">
                            <div className="navlogo">   
                            <Link to='/' className='text-decoration-none'> 
                                <img src='/images/Logo.jpg' alt='logo' />
                                </Link>
                            </div>
                        </div>
                        <div className="right">
                            <div className='hamburgr'>
                                <HiMiniBars3 className='fs-3' onClick={handleShow}/>
                            </div>
                            <div className="nav_btn">
                                <Link to='/products' className='text-decoration-none'>Products</Link>
                            </div>
                            <div className="cartsicon">
                                <Link to='/carts' className='text-dark text-decoration-none ps-4 fs-2'>
                                    <span className='cart_item px-2'>{userverify?.length > 0 ? usercartData?.length : "0"}</span>
                                    <FaCartShopping className='fs-1'/>
                                </Link>
                            </div>
                            <div className='profile'>
                            <Dropdown>
                            <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                                <img src={userverify?.length > 0 ? userverify[0]?.message?.userimage : "/logo192.png"} className='profile_img' alt=''/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    userverify?.length > 0
                                    ?
                                    (
                                        <>
                                        <Dropdown.Item>
                                    <Link to='/userprofile' className='text-dark text-decoration-none d-flex align-items-center'>
                                        <FaUser className='me-3 fs-5'/><span className='fs-5 text-primary'>Profile</span>
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item >
                                    <Link to='/logout' style={{textDecoration:'none'}} onClick={userlogout}>
                                <FaUser className='me-3 fs-5'/><span className='fs-5 text-primary'>Logout</span>
                                </Link>
                                </Dropdown.Item>
                                </>
                                    )
                                :
                                (
                                <>
                                <Dropdown.Item >
                                    <Link to='/login' style={{textDecoration:'none'}}>
                                <FaUser className='me-3 fs-5'/><span className='fs-5'>LogIn</span>
                                </Link>
                                </Dropdown.Item>
                                    </>
                                )   
                                }
                                
                            </Dropdown.Menu>
                            </Dropdown>
                            </div>
                        </div>
                    </nav>
                </div>

                {/* Sidebar */}

                <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    <img src={userverify?.length > 0 ? userverify[0]?.message?.userimage : "/logo192.png"} className='profile_img' style={{width:'50px'}} alt=''/>
                </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body style={{backgroundColor:'black',display:'flex',flexDirection:'column'}}>
                <Link to='' className='text-decoration-none text-light mb-2 ps-1'>
                    <CiShop className='fs-3 me-3'/>Products
                </Link>
                {
                    userverify?.length > 0
                    ?
                    (
                        <>
                        <Link to='/userprofile' className='text-light ms-1 text-decoration-none d-flex align-items-center' onClick={handleClose}>
                            <FaUser className='me-3 fs-5'/><span className='fs-5 text-light'>Profile</span>
                        </Link>
                        <Link to='/logout' className='text-decoration-none text-light mb-2' onClick={userlogout}>
                            <IoLogInOutline className='fs-3 me-3'/>Logout
                        </Link>
                        </>
                    )
                    :
                    (
                        <>
                        <Link to='/login' className='text-decoration-none text-light mb-2' onClick={handleClose}>
                            <IoLogInOutline className='fs-3 me-3'/>LogIn
                        </Link>
                        </>
                    )
                }
                
                <div className="cartsicon">
                        <Link to='' className='text-dark text-decoration-none ps-3 fs-2' onClick={handleClose}>
                                    <span style={{position:'absolute',fontSize:'10px',backgroundColor:'red',borderRadius:'50%',padding:'5px',color:'white',left:'13%',textAlign:'center',lineHeight:'1em'}}>10</span>
                                    <FaCartShopping className='fs-1 text-light'/>
                        </Link>
                </div>
                </Offcanvas.Body>
                </Offcanvas>



            </header>
        </>
  )
}

export default Header