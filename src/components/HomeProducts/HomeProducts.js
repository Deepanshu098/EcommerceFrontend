import React from 'react'
import './HomeProducts.css'
import { Link } from 'react-router-dom';

function HomeProducts({getProducts,latestProducts}) {
  // console.log("GET",getProducts)
  return (
    <>
      <section>
        <div className='container'>
          <h2 className='my-3'>Products</h2>
          <div className='products'>
            
              {
                getProducts?.length > 0 ?
                getProducts.slice(0,4).map((ele,index)=>{
                  return(
                    <>
                    <div className='product_seller' key={index}>
                      <img src={ele.productimage} alt='' style={{width:'280px',height:'300px'}} />
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
                }):"No Products Vailable"
              }
          </div>



          <h2 className='mt-5 mb-0'>New Arrivals</h2>
          <div className='products'>
            {
              latestProducts?.length > 0
              ?
              latestProducts.slice(0,4).map((ele,index)=>{
                return(
                  <>
                          <div className='product_seller'>
                          <img src={ele.productimage} alt='' style={{width:'280px',height:'300px'}} />
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
              }):"No Products Available"
            }
            
          </div>
        </div>
      </section>
    </>
  )
}

export default HomeProducts