import React, { useEffect, useState } from 'react'
import './ProductDetails.css'
import {  FaStar } from "react-icons/fa6";
import Card from 'react-bootstrap/Card';
import { FaTrash } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
import Select from 'react-select'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddProductReviewSlice, DeleteReviewSlice, GetProductReviewSlice, GetSingleProductSlice } from '../../redux/slice/ProductSlice/ProductSlice';
import {AddToCartSlice} from '../../redux/slice/UserAuthSlice/UserAuthSlice'
import toast from 'react-hot-toast';

function ProductDetailsMain() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {singleProduct} = useSelector((state)=>state.Product)
    const {userverify} = useSelector((state)=>state.User)
    const {productReview} = useSelector((state)=>state.Product)
    const {getReviews} = useSelector((state)=>state.Product)
    const {DeleteReview} = useSelector((state)=>state.Product)
    const {usercartData} = useSelector((state)=>state.User)
    // console.log("Revv",DeleteReview)

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[description,setDescription] = useState("")
    const[rating,setRating] = useState("")
    const[showreview,setShowReview]=useState("")

    // console.log(rating,description)

    const handlesetRating=(e)=>{
        const {value,label} = e
        setRating(value)
    }

    //handle Review
    const addReview=(e)=>{
        e.preventDefault();
        if(rating === ""){
            toast.error("Rating is required")
        }
        else if(description === ""){
            toast.error("Description is required")
        }
        else{
            const data ={
                username:userverify.length > 0 ? userverify[0]?.message?.firstName : "",
                rating,
                description
            }
            const productreviewadddata={
                data,
                productid:singleProduct[0]?.data?._id
            }
            dispatch(AddProductReviewSlice(productreviewadddata)).then((res)=>{
                if(res?.payload){
                    setDescription("")
                    setRating("")
                    handleClose()
                }
            })
            .catch((err)=>{
                console.log(err)
                handleClose()
            })
        }
    }

    const getProductDetails = ()=>{
        const data={
            productid:id
        }
        dispatch(GetSingleProductSlice(data))
    }


    const options = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' }
      ]

    const handleOpenModal = ()=>{
            if(userverify?.length === 0){
                toast.error("Please login to write a Review")
                navigate('/login')
            }
            else{
                handleShow()
            }
    }  


    //handle Delete Review
    const deleteReview=(id)=>{
        const data ={
            reviewid:id
        }
        dispatch(DeleteReviewSlice(data))
    }

    //Add to cart
    const handleCart=(e)=>{
        dispatch(AddToCartSlice(e))
    }



    //Get Product review()
    const getProductReviews=()=>{
        const data={
            productid:singleProduct[0]?.data?._id
        }
        dispatch(GetProductReviewSlice(data))
    }


    //Total reviews and average
    useEffect(()=>{
        let totalRating = 0;
        getReviews?.map((ele,index)=>{
            totalRating = totalRating + parseInt(ele.rating)
        })
        setShowReview(Math.round(totalRating/getReviews.length))
        
    },[getReviews])


    useEffect(()=>{
            getProductDetails();
    },[id,productReview,usercartData])

    useEffect(()=>{
        getProductReviews()
    },[singleProduct,DeleteReview])


  return (
    <>
        <div className='cart_section'>
            <h2 className='text-center mt-3'>Product Details</h2>
            <div className="cart_container">
                <div className="left_cart">
                    <img src={singleProduct[0]?.data?.productimage} alt='' style={{width:'250px',height:'300px'}} />
                </div>
                <div className="right_cart">
                    <h3>{singleProduct[0]?.data?.productname}</h3>
                    {
                        showreview ? 
                        <div className="reviewicon">
                            {
                                        Array.from({length:showreview}).map((element,index)=>{
                                            return   <FaStar/>
                                        })
                            }
                        <span>&nbsp;{showreview}&nbsp; Rating </span>
                        </div>
                        :
                        "No Rating"
                    }
                    
                    <p className="mrp">M.R.P. : ₹{singleProduct[0]?.data?.price}</p>
                    <div className="discount_box">
                        <h4>Discount: <span style={{color:"#111"}}>{singleProduct[0]?.data?.discount}%</span></h4>
                        <p>Items Left: <span style={{color:"B12704"}}>{singleProduct[0]?.data?.quantity}</span></p>
                        <h4>Free Delivery: <span style={{color:"#111",fontWeight:"600"}}>Feb 09-17</span></h4>
                        <p>Fastest Delivery: <span style={{color:"#111",fontWeight:"600"}}>Tomorrow 11AM</span></p>
                    </div>
                    <p className="description">About Item: <span style={{color:"red",fontSize:'14px',fontWeight:"500"}}>{singleProduct[0]?.data?.description}</span></p>
                    <div className="add_to_cart">
                        <button className='btn btn-primary' onClick={()=>handleCart(singleProduct[0]?.data?._id)}>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>


        {/* Reviews Code */}

        <div className="container">
            <div className='d-flex justify-content-between mb-3'>
                <h3>Customer Reviews</h3>
                <button className='btn btn-primary' onClick={handleOpenModal}>Write a Review</button>
            </div>
            <div className='mt-2 mb-5 d-flex justify-content-between'>
                {
                    getReviews?.length > 0
                    ?
                    getReviews.map((ele,index)=>{
                        return(
                            <>
                             <Card style={{ width: '16rem' }} className='mb-3' key={index}>
                            <Card.Body>
                                <Card.Title>{ele.username}</Card.Title>
                                <Card.Text style={{color:"#f5d742",marginBottom:'0'}}>
                                    {
                                        Array.from({length:ele.rating}).map((ele,index)=>{
                                            return   <FaStar/>
                                        })
                                    }
                                </Card.Text>
                                <Card.Text className='text-black mb-0' style={{letterSpacing:'0',fontWeight:'normal'}}>
                                    {ele.description}
                                </Card.Text>
                                {
                                    userverify[0]?.message?._id === ele?.userid ?
                                    <button style={{background:"none",marginLeft:'-18px'}} onClick={()=>deleteReview(ele._id)}><FaTrash style={{color:"red"}}/></button>
                                    :
                                    ""
                                }
                            </Card.Body>
                            </Card>
                            </>
                        )
                    }):"No Reviews"
                }
            </div>

            {/* Review Modal */}
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Write Your Review Here</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='form_data'>
                    <form action='' onSubmit={addReview}>
                        <div>
                        <label htmlFor='username'>UserName</label>
                        <div>
                        <input type='text' name='username' placeholder='UserName' value={userverify?.length > 0 ? userverify[0]?.message?.firstName:""} disabled style={{borderRadius:'10px',marginLeft:'0px',marginTop:'5px'}} className='py-2 w-100'/>
                        </div>
                        </div>
                        <div>
                        <label htmlFor='ratings' className='mb-1'>Rating</label>
                        <Select options={options} onChange={handlesetRating}/>
                        </div>
                        <div>
                            <label htmlFor='description' className='mt-4 mb-3'>Description</label>
                            <textarea name='description' rows='5' cols='40' placeholder='Description' onChange={(e)=>setDescription(e.target.value)} style={{borderRadius:'10px',marginLeft:'0'}} className='w-100'></textarea>
                        </div>
                        <div className='text-center mt-2'>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
            </Modal.Footer> */}
        </Modal>

        </div>

    </>
  )
}

export default ProductDetailsMain