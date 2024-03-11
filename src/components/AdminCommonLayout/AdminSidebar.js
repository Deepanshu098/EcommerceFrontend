import React, { useEffect, useState } from 'react'
import './Admin.css'
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { FaTruckFast } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { FaShoppingBag } from "react-icons/fa";
import { FaCertificate } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { Dropdown } from 'react-bootstrap';
import { IoLogOutOutline } from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import { AdminLogOut, AdminLoggedIn } from '../../redux/slice/AdminAuthSlice/AdminAuthSlice';


function AdminSidebar({children}) {
    const[sidebarActive,setSidebarActive] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {AdminLoggedInData} = useSelector((state)=>state.Admin);
    // console.log("AdminLoggedInData",AdminLoggedInData[0].message.name)

    //Admin Verify

    const AdminVerify = ()=>{
        dispatch(AdminLoggedIn())
    }

    useEffect(()=>{
        AdminVerify()
    },[])


    //Admin Logout
    const handleLogout = ()=>{
        dispatch(AdminLogOut()).then((res)=>{
            navigate('/admin/login')
        })
        .catch((err)=>{
            navigate('/admin/login')
        })
    }

    const toggleSidebar =()=>{
        setSidebarActive(!sidebarActive)
    }

  return (
    <>
        <div className={`sidebar ${sidebarActive ? 'active':''}`}>
            <div className='logo-details p-3'>
                <Link to='/' className='text-decoration-none'>
                <FaUser className='fs-4 text-light'/>
                <span className='logo_name ms-3'>{AdminLoggedInData[0]?.message?.name}</span>
                </Link>
            </div>
            <ul className='nav-links'>
                <li>
                    <Link to='/admin/dashboard' className='active'>
                        <span className='logo_name px-5'>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to='/admin/addproducts' >
                        <FaTruckFast className='fs-4 text-light ms-3'/>
                        <span className='logo_name px-4'>Add Products</span>
                    </Link>
                </li>
                <li>
                    <Link to='/admin/addcategory' >
                        <FaCertificate className='fs-4 text-light ms-3'/>
                        <span className='logo_name px-4'>Add Category</span>
                    </Link>
                </li>
                <li>
                    <Link to='/admin/products' >
                    <FaCertificate className='fs-4 text-light ms-3'/>
                        <span className='logo_name px-4'>Products</span>
                    </Link>
                </li>
                <li>
                    <Link to='/admin/orders'>
                        <FaShoppingBag className='fs-4 text-light ms-3'/>
                        <span className='logo_name px-4'>Orders</span>
                    </Link>
                </li>
                <li>
                    <Link to='/admin/dashboard' >
                        <IoMdSettings className='fs-4 text-light ms-3'/>
                        <span className='logo_name px-4'>Settings</span>
                    </Link>
                </li>
            </ul>
        </div>


        {/* Header */}

        <section className='home-section'>
            <nav>
                <div className='sidebar-button'>
                    <IoMenu className='fs-2 me-1' onClick={toggleSidebar}/>
                    <span className='dashboard'>Dashboard</span>
                </div>
                <div className='search-box'>
                    <input type='text' placeholder='Search...'/>
                    <IoSearch className='bx-search'/>
                </div>
                <div className='profile-details'>
                    <span className='admin_name'>Deepanshu</span>
                    <Dropdown className='text-center'>
                            <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                                <img src={AdminLoggedInData[0]?.message?.image}  alt=''/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleLogout}>
                                    <Link to='' className='text-dark text-decoration-none'>
                                        <IoLogOutOutline className='me-3 fs-3'/><span className='fs-5 text-primary'>Logout</span>
                                    </Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                            </Dropdown>
                </div>
            </nav>


            <div className='home-content'>
                {children}
            </div>

        </section>
    </>
  )
}

export default AdminSidebar