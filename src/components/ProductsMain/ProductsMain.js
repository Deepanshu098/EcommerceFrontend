import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { GetCategory, GetProductsSlice } from '../../redux/slice/ProductSlice/ProductSlice';
import Paginations from '../Pagination/Paginations';

function ProductsMain() {
    const {getProducts } = useSelector((state)=>state.Product);
    const {categoryData} = useSelector((state)=>state.Product)


    const dispatch = useDispatch();
    
      const[page,setPage]=useState(1);
      const[pagecount,setPageCount]=useState(0);
      const[selectedcategory,setSelectedCategory] = useState("")
      const[category,setCategory] = useState([])
    //   console.log("Cattt",category)

      const getAllProducts = ()=>{
        const data = {
            selectedcategory: selectedcategory,
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

    useEffect(()=>{
        dispatch(GetCategory());
      },[])

      useEffect(()=>{
        let arr =[{value:"all",label:"all"}];
        for(let i=0;i<categoryData.length;i++){
          let setCategoryValue = {value:categoryData[i]._id,label:categoryData[i].categoryName}
          arr.push(setCategoryValue)
          }
          setCategory(arr)
      },[categoryData])

      useEffect(()=>{
        getAllProducts();
    },[page,selectedcategory])


  return (
    <>
        <section className='mt-3'>
            <div className='container'>
                    <div className='d-flex justify-content-between align-items-center'>
                    <h2>Products</h2>
                    <div className='category-filter'>
                    <Select options={category} placeholder="Filter by Category" onChange={(e)=>{setSelectedCategory(e.value)}}/>
                    </div>
                    </div>
                    <div className='products my-3'>
                        {
                            getProducts?.data?.map((ele,index)=>{
                                return(
                                    <>
                                        <div className='product_seller mb-5 me-4'>
                                        <img src={ele.productimage} alt='' style={{width:'280px',height:'300px'}}/>
                                        <div className='products_data'>
                                        <div >
                                            <p className='fs-4 mt-2'>{ele.productname}</p>
                                        </div>
                                        <div style={{marginTop:'-30px'}}>
                                            Rs. {ele.price}
                                        </div>
                                        <button className='bg-primary px-3 py-2 my-2 mb-3 rounded-4'>
                                            <Link to={`/productdetails/${ele._id}`} className='text-decoration-none text-white '>Buy Now</Link>
                                        </button>
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

export default ProductsMain