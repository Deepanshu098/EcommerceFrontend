import React, { useEffect, useState } from 'react'
import AdminUserTable from './AdminUserTable'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { GetProductsSlice } from '../../redux/slice/ProductSlice/ProductSlice';
import { getAllUsersSlice } from '../../redux/slice/UserAuthSlice/UserAuthSlice';
import { OrdersAdmin } from '../../redux/slice/AdminAuthSlice/AdminAuthSlice';

function AdminDashboard() {
    const[page,setPage]=useState(1);
    const {getProducts} = useSelector((state)=>state.Product)
    const {allusers} = useSelector((state)=>state.User)
    const {deleteuser} = useSelector((state)=>state.User)
    const {adminOrdersData} = useSelector((state)=>state.Admin)

    // console.log("Prooo",allusers)

    const [allusercount,setAllusercount] = useState(0);
    const [pagecount,setPageCount] = useState(0);



    const dispatch = useDispatch();
    const getAllProducts = ()=>{
        const data = {
            selectedcategory: "all",
            page
        }
        dispatch(GetProductsSlice(data)).then((res)=>{

           })
        .catch((err)=>{
            console.log(err)
        })
    }

    const getAdminOrders=()=>{
        dispatch(OrdersAdmin())
    }

    //handle Next 
    const handleNext = ()=>{
        setPage(()=>{
            if(page === pagecount) return page;
            return page + 1;
        })
    }

    //handle Previous
    const handlePrevious = ()=>{
        setPage(()=>{
            if(page === 1) return page;
            return page -1 ;
        })
    }

    //Get all USers
    const getAllUsers=()=>{
        const data={
            page
        }
        dispatch(getAllUsersSlice(data)).then((res)=>{
            // console.log(res)
            if(res?.payload){
                setAllusercount(res?.payload?.Pagination?.count)
                setPageCount(res?.payload?.Pagination?.pagecount)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    
      useEffect(()=>{
        getAllProducts();
        getAdminOrders();
        getAllUsers();
      },[page,deleteuser])


  return (
    <>
    <div className='overview-boxes'>
        <div className='box'>
            <div className='right-side'>
                <div className='box-topic'>Total Order</div>
                <div className='number'>{adminOrdersData?.length}</div>
                <div className='indicator'>
                    <span style={{backgroundColor:'lightblue',borderRadius:'50%',width:'15px',height:'15px'}} className='me-2'></span>
                    <span className='text'>Up from Yesterday</span>
                </div>
            </div>
            <span className='cart ms-5 mt-1'></span>
        </div>

        <div className='box'>
            <div className='right-side'>
                <div className='box-topic'>Total Products</div>
                <div className='number'>{getProducts?.Pagination?.totalProducts}</div>
                <div className='indicator'>
                    <span style={{backgroundColor:'lightblue',borderRadius:'50%',width:'15px',height:'15px'}} className='me-2'></span>
                    <span className='text'>Up from Yesterday</span>
                </div>
            </div>
            <span className='cart two ms-5 mt-1'></span>
        </div>

        <div className='box'>
            <div className='right-side'>
                <div className='box-topic'>User</div>
                <div className='number'>{allusercount}</div>
                <div className='indicator'>
                    <span style={{backgroundColor:'lightblue',borderRadius:'50%',width:'15px',height:'15px'}} className='me-2'></span>
                    <span className='text'>Up from Yesterday</span>
                </div>
            </div>
            <span className='cart three ms-5 mt-1'></span>
        </div>

        <div className='box'>
            <div className='right-side'>
                <div className='box-topic'>Total Return</div>
                <div className='number'>11,806</div>
                <div className='indicator'>
                    <span style={{backgroundColor:'lightblue',borderRadius:'50%',width:'15px',height:'15px'}} className='me-2'></span>
                    <span className='text'>Down From Today</span>
                </div>
            </div>
            <span className='cart four ms-5 mt-1'></span>
        </div>
    </div>

    <div className='sales-boxes'>
        <div className='recent-sales box'>
            <div className='title'>
                Recent Sales
            </div>
            <div className='sales-details'>
                <AdminUserTable allusers={allusers} page={page} setPage={setPage} pagecount={pagecount} handleNext={handleNext} handlePrevious={handlePrevious}/>
            </div>
        </div>

        <div className='top-sales box'>
            <div className='title'>Top Selling Product</div>
            <ul className='top-sales-details'>
                <li>
                    <Link to=''>
                        <img src='/images/shoes.png' alt=''/>
                        <span className='product'>Nike Shoes</span>
                    </Link>
                        <span className='price'>₹400</span>
                </li>
                <li>
                    <Link to=''>
                        <img src='/images/shoes.png' alt=''/>
                        <span className='product'>Nike Shoes</span>
                    </Link>
                        <span className='price'>₹400</span>
                </li>
                <li>
                    <Link to=''>
                        <img src='/images/shoes.png' alt=''/>
                        <span className='product'>Nike Shoes</span>
                    </Link>
                        <span className='price'>₹400</span>
                </li>
                <li>
                    <Link to=''>
                        <img src='/images/shoes.png' alt=''/>
                        <span className='product'>Nike Shoes</span>
                    </Link>
                        <span className='price'>₹400</span>
                </li>
            </ul>
        </div>
    </div>

    </> 
  )
}

export default AdminDashboard