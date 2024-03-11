import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteProductSlice, GetProductsSlice } from '../../redux/slice/ProductSlice/ProductSlice'
import Paginations from '../../components/Pagination/Paginations'
// import Paginations from '../../components/Pagination/Paginations'



function AdminProductsPage() {
    const {getProducts } = useSelector((state)=>state.Product);
    const {deletedProduct} = useSelector((state)=>state.Product)
    // console.log("DDD",deletee)


    const dispatch = useDispatch();

    const[page,setPage]=useState(1);
    const[pagecount,setPageCount]=useState(0);

    const getAllProducts = ()=>{
        const data = {
            selectedcategory: "all",
            page
        }
        dispatch(GetProductsSlice(data)).then((res)=>{
            setPageCount(res.payload.Pagination.pageCount)
            // console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
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


    // delete Product
    const deleteProduct=(id)=>{
        const data={
            productid:id
        }
        dispatch(DeleteProductSlice(data))
    }

    useEffect(()=>{
        getAllProducts();
    },[page,deletedProduct])


  return (
    <>
        <section className='p-5'>
            <div className='container'>
                    <div className='d-flex justify-content-between align-items-center'>
                    <h2>Products</h2>
                    </div>
                    <div className='products mt-3'>
                        {
                            getProducts?.data?.map((ele,index)=>{
                                return(
                                    <>
                                        <div className='product_seller mb-5 me-4'>
                                        <img src={ele.productimage} alt='' style={{width:'330px',height:'350px'}} />
                                        <div className='products_data'>
                                        <div >
                                            <p className='fs-4 mt-2'>{ele.productname}</p>
                                        </div>
                                        <div style={{marginTop:'-30px'}}>
                                            Rs. {ele.price}
                                            <Button variant='none' onClick={()=>{deleteProduct(ele._id)}} style={{marginLeft:'220px',marginTop:'-40px'}}>
                                                <MdDelete className='text-danger fs-3'/>
                                            </Button>
                                        </div>
                                        </div>
                                    </div>
                                    </>
                                )
                            })
                        } 
                    </div>
                <Paginations pagecount={pagecount} page={page} handleNext={handleNext} handlePrevious={handlePrevious} setPage={setPage} />
            </div>
        </section>
    </>
  )
}

export default AdminProductsPage