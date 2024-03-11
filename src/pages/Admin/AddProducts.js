import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { AddProductsSlice, GetCategory } from '../../redux/slice/ProductSlice/ProductSlice'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'

function AddProducts() {
  const dispatch = useDispatch()

  const {categoryData} = useSelector((state)=>state.Product)
  // console.log("ccc",categoryData)

  const[category,setCategory] = useState([])

  const[inputvalue,setInputValue]=useState({
      productname:"",price:"",discount:"",quantity:"",description:""
  })

  const[productimg,setProductImg] = useState("");
  const[categoryid,setCategoryId] = useState("");

  const handleChange=(e)=>{
    setInputValue({...inputvalue,[e.target.name]:e.target.value})
  }

  const handleSetCategory=(e)=>{
    const {value} =e;
    setCategoryId(value)
  }

  const handleProductImg = (e)=>{
    setProductImg(e.target.files[0])
  }

  const handleProducts=(e)=>{
    e.preventDefault();
    const{productname,price,description,quantity,discount} = inputvalue;
    if(productname === ""){
      toast.error("Product Name is required!!")
    }
    else if(price === ""){
      toast.error("Price is required!")
    }
    else if(discount === ""){
      toast.error("Discount is required!")
    }
    else if(quantity === ""){
      toast.error("Quantity is required!")
    }
    else if(description === ""){
      toast.error("Description is required");
    }
    else if(productimg === ""){
      toast.error("Image is required")
    }
    else if(categoryid === ""){
      toast.error("Category is required")
    }
    else{
      const data = new FormData();
      data.append("productname",productname)
      data.append("price",price)
      data.append("discount",discount)
      data.append("quantity",quantity)
      data.append("description",description)
      data.append("productimage",productimg)

      const config = {
        "Content-Type":"multipart/form-data"
      }

      const datasend={
        data,
        categoryid,
        config
      }

      dispatch(AddProductsSlice(datasend)).then((res)=>{
        if(res.payload){
          setInputValue({...inputvalue,productname:"",price:"",discount:"",quantity:"",description:""})
          setCategoryId("");
          setProductImg("");
      }
      })
      .catch((err)=>{
        console.log("err",err)
      })
    }
  }

  // console.log("Inp",inputvalue)
  // console.log("id",categoryid)
  // console.log("immagee",productimg)

  useEffect(()=>{
    dispatch(GetCategory());
  },[])

  useEffect(()=>{
    let arr =[];
    for(let i=0;i<categoryData.length;i++){
      let setCategoryValue = {value:categoryData[i]._id,label:categoryData[i].categoryName}
      arr.push(setCategoryValue)
      }
      setCategory(arr)
  },[categoryData])

  return (
    <>
      <div className='py-5' style={{background:"lightblue",minHeight:"100vh"}}>
            <div className='mt-3 bg-white rounded-3 mx-auto p-4' style={{width:'600px'}}>
            <h3 className='text-center text-success mb-2'>Add Products</h3>
            <form action='' onSubmit={handleProducts}  style={{marginTop:'-40px'}}>
                <input type='text' placeholder='Product Name' name='productname' value={inputvalue.productname}  onChange={handleChange}  className='mb-0 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0'}} />
                <Select options={category} placeholder="Products Category" onChange={handleSetCategory} className='mt-4' />
                <input type='text' placeholder='Price' name='price' value={inputvalue.price}  onChange={handleChange}  className='mb-0 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0'}} />
                <input type='text' placeholder='Discount' name='discount' value={inputvalue.discount} onChange={handleChange}  className='mb-0 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0'}} />
                <input type='file' name='productimage' onChange={handleProductImg} className='mb-0 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0'}} />
                <input type='text' placeholder='Quantity' name='quantity' value={inputvalue.quantity} onChange={handleChange}  className='mb-2 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0'}} />
                <textarea name='description' placeholder='Product Description' value={inputvalue.description}  onChange={handleChange} cols={68} rows={4} className='mt-4 p-2' style={{marginLeft:'0'}}></textarea>
                <button className='border-0 rounded-5 px-3 py-2 text-white w-100 mt-4 fw-bold fs-5 bg-primary'  type='submit'>
                Submit
                </button>
            </form>
            </div>
        </div>
    </>
  )
}

export default AddProducts