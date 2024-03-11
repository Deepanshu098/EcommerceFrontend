import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import './CartsMain.css'
import { FaTrash } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { AddToCartSlice, removeItemsSlice, removeSingleSlice } from '../../redux/slice/UserAuthSlice/UserAuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import EmptyCart from '../EmptyCart/EmptyCart';
import moment from 'moment';

function CartsMain() {
    const {usercartData} = useSelector((state)=>state.User)
    
    // console.log("USer",usercartData)

    // delivery date
    const dateAfter2days = moment().add(2,'days').format('YYYY-MM-DD');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[price,setPrice] = useState("")

    const total=()=>{
        let totalPrice=0;
        usercartData.map((ele,index)=>{
            totalPrice = ele?.productDetails?.price * ele?.quantity + totalPrice;
        })
        setPrice(totalPrice)
    }

    //Add to cart
    const handleCart=(e)=>{
        dispatch(AddToCartSlice(e))
    }

    //quantity decrement
    const handleDecrement = (e)=>{
        dispatch(removeSingleSlice(e))
    }

    //Remove Items
    const handleRemoveItems=(e)=>{
        dispatch(removeItemsSlice(e))
    }

    //go to shipping page
    const navigateShipping=()=>{
        navigate('/shipping',{state:price})
    }

    useEffect(()=>{
        total()
    },[total])


  return (
    <>
        <Container className='pt-4 pb-4'>
                <h2 className='text-center'>Shopping Cart</h2>
                {
                    usercartData?.length > 0 
                    ?
                    <Row className='mt-5 gap-3 gap-md-0 gap-lg-0'>
                    <Col lg={8} md={7}>
                        <Card className='card'>
                            <Card.Title>
                                Cart({usercartData?.length})
                            </Card.Title>
                            {
                                usercartData?.map((ele,index)=>{
                                    return(
                                        <>
                                           <div className='mt-2 store-item bottom-line pb-3'>
                                            
                                            <Row>
                                    <Col lg={3}>
                                        <Link to={`/productdetails/${ele?.productDetails?._id}`} className='text-decoration-none'>
                                        <img src={ele?.productDetails?.productimage} alt='' className='image_store'/></Link>
                                    </Col>
                                    <Col lg={9}>
                                        <div className='mt-3 mt-lg-0 d-flex align-items-center justify-content-between'>
                                            <h4>{ele?.productDetails?.productname}</h4>
                                            <div>
                                                <div className='btn-qty-container d-flex align-items-center justify-content-between'>
                                                    <Button className='btn-qty' variant='light' onClick={()=>handleDecrement(ele?.productDetails?._id)}>&minus;</Button>
                                                    <span className='p-quantity'>&nbsp;{ele?.quantity}&nbsp;</span>
                                                    <Button className='btn-qty' variant='light' onClick={()=>handleCart(ele?.productDetails?._id)}>+</Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex list_store'>
                                            <p>Discount : {ele?.productDetails?.discount}%</p>
                                        </div>
                                        <div className=' d-flex list_store'>
                                            <p>Price : ₹{ele?.productDetails?.price}</p>
                                        </div>
                                        <div className='d-flex'>
                                            <p>Delivery Date : {dateAfter2days}</p>
                                        </div>
                                        <div className='d-flex'>
                                            <div className='d-flex gap-2'>
                                                <Button className='btn-list' variant='danger' onClick={()=>handleRemoveItems(ele?.productDetails?._id)}>
                                                    <FaTrash/>&nbsp;
                                                    <span>Remove Item</span>
                                                </Button>
                                                <Button className='btn-list' variant='secondary'>
                                                    <CiHeart className='fs-4'/>&nbsp;
                                                    <span>Move to Wish List</span>
                                                </Button>
                                            </div>
                                            <div className='d-flex ms-5 mt-2'>
                                                <h5>Total : ₹{ele?.productDetails?.price * ele?.quantity}</h5>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div> 
                            <hr/>
                             </>
                                    )
                                })
                            }   
                        </Card>
                    </Col>

                    {/* Right Part */}

                    <Col lg={4} md={5}>
                        <Row className='gap-3'>
                            <Col>
                                <Card className='card'>
                                    <Card.Title>The Total amount of</Card.Title>
                                    <Row>
                                        <Col>
                                        <div className='list_store d-flex justify-content-between align-items-center mt-3'>
                                            <p>Temporary Amount</p>
                                            <p>{price}</p>
                                        </div>
                                        <hr/>
                                        </Col>
                                        
                                    </Row>
                                    <Row className='mt-2 '>
                                        <Col className='col-6'>
                                            <p>The Total Amount of (Including VAT)</p>
                                        </Col>
                                        <Col className='col-6 text-end '>
                                            <p>{price}</p>
                                        </Col>
                                    </Row>
                                    <Row className='mt-1'>
                                        <Col className='col-12'>
                                            <Button className='w-100 py-2' variant='primary' onClick={navigateShipping}>Go to Checkout</Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Col>

                </Row>
                :
                <EmptyCart/>
                }
                
        </Container>
    </>
  )
}

export default CartsMain