import React, { useEffect, useState } from 'react'
import HomeMain from '../../components/Homemain/HomeMain'
import HomeProducts from '../../components/HomeProducts/HomeProducts'
import HomeContacts from '../../components/HomeContacts/HomeContacts'
import { useDispatch, useSelector } from 'react-redux'
import { GetLatestProductsSlice, GetProductsSlice } from '../../redux/slice/ProductSlice/ProductSlice'
import Loader from '../../components/Loader/Loader'

function Home() {
  const dispatch =useDispatch();
  const[page,setPage]=useState(1);

  const {getProducts} = useSelector((state)=>state.Product)
  const {latestProducts} = useSelector((state)=>state.Product)


  const [spin, setSpin] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSpin(false)
    }, 3000)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const getAllProducts = ()=>{
    const data = {
        selectedcategory: "all",
        page
    }
    dispatch(GetProductsSlice(data)).then((res)=>{
        // console.log("Ree",res)
       })
    .catch((err)=>{
        console.log(err)
    })
    dispatch(GetLatestProductsSlice())
}


  useEffect(()=>{
    getAllProducts();
  },[page])

  return (
    <>
    {
      spin?
      <Loader/>
      :
      <>
      <HomeMain/>
        <HomeProducts getProducts={getProducts.data} latestProducts={latestProducts} />
        <HomeContacts/>
        </>
    }
        
    </>
  )
}

export default Home