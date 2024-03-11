import React, { useEffect, useState } from 'react'
import ProductsMain from '../../components/ProductsMain/ProductsMain'
import Loader from '../../components/Loader/Loader';

function Products() {
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSpin(false)
    }, 3000)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  return (
    <>
    {
      spin ? <Loader/>
      :
      <ProductsMain/>
    }
        
    </>
  )
}

export default Products