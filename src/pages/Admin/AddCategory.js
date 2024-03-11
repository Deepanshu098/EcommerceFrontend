import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {useDispatch} from 'react-redux'
import { AdminAddCategory } from '../../redux/slice/ProductSlice/ProductSlice';

function AddCategory() {
  const dispatch = useDispatch();
  const[inputvalue,setInputValue]=useState({
    categoryName:"",
    description:""
  })

  const handleChange=(e)=>{
    setInputValue({...inputvalue,[e.target.name]:e.target.value})
  }

  const addCategory=(e)=>{
    e.preventDefault();
    const {categoryName , description} = inputvalue
    if(categoryName === ""){
      toast.error("Category Name is required!!")
    }
    else if(description === ""){
      toast.error("Description is required!!")
    }
    else{
        dispatch(AdminAddCategory(inputvalue)).then((res)=>{
            setInputValue({...inputvalue,categoryName:"",description:""})
        })
        .catch((err)=>{
          throw err;  
        })
    }
  }


  return (
    <>
         <div className='py-5' style={{background:"lightblue",minHeight:"100vh"}}>
            <div className='mt-3 bg-white rounded-3 mx-auto p-4' style={{width:'600px'}}>
            <h3 className='text-center text-success mb-4'>Add Category</h3>
            <form action='' onSubmit={addCategory} style={{marginTop:'-40px'}}>
                <div>
                <input type='text' placeholder='Category Name'  name='categoryName' value={inputvalue.categoryName}  onChange={handleChange} className='mb-0 w-100 p-2 border-1 rounded-3 text-black' style={{outline:'none',marginLeft:'0'}} />
                </div>
                <textarea name='description' placeholder='Description' value={inputvalue.description} onChange={handleChange}  cols={68} rows={4} className='mt-4 p-2' style={{marginLeft:'0'}}></textarea>
                <button className='border-0 rounded-5 px-3 py-2 text-white w-100 mt-4 fw-bold fs-5 bg-primary'  type='submit'>
                Submit
                </button>
            </form>
            </div>
        </div>
    </>
  )
}

export default AddCategory