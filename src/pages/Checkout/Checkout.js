import React from 'react'
import { Card, Row,Col,Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'

function Checkout() {
    const {state} = useLocation();
    // console.log(state)
    const {usercartData} = useSelector((state)=>state.User)
    // console.log(usercartData);
    const naviagte = useNavigate();

    // delivery date
    const dateAfter2days = moment().add(2,'days').format('YYYY-MM-DD');

    const finaldata={
        ...state,
        orderItems:usercartData
    }

    const CheckoutPage=()=>{
        naviagte('/payment',{state:finaldata})
    }

  return (
    <div className='container'>
        <Card style={{width:'22rem',border:'2px solid #32a675'}} className='my-5'>
            <Card.Body>
                <Card.Title className='mb-3'>Shipping Details</Card.Title>
                <Card.Text>
                    <span className='fw-bold text-black mb-0'>Address:</span>{state?.address}
                </Card.Text>
                <Card.Text>
                    <span className='fw-bold text-black'>City:</span>{state?.city}
                </Card.Text>
                <Card.Text>
                    <span className='fw-bold text-black'>State:</span>{state?.state}
                </Card.Text>
                <Card.Text>
                    <span className='fw-bold text-black'>Country:</span>{state?.country}
                </Card.Text>
                <Card.Text>
                    <span className='fw-bold text-black'>Pincode:</span>{state?.pincode}
                </Card.Text>
                <Card.Text>
                    <span className='fw-bold text-black'>Mobile:</span>{state?.mobile}
                </Card.Text>
                <Card.Text>
                    <span className='fw-bold text-black'>Shipping Price:</span>₹{state?.shippingPrice}
                </Card.Text>
                <Card.Text>
                    <span className='fw-bold text-black'>Total Price:</span>₹{state?.totalPrice}
                </Card.Text>
            </Card.Body>
        </Card>

        {/* Order Details  */}

        <Card className=' mt-3 mb-4' style={{border:'2px solid #32a675'}}>
                <Card.Title>Your Orders</Card.Title>
                <div className='mt-2 store-item bottom-line pb-3'>
                                <Row>
                                    <Col lg={2}>
                                        <img src={usercartData[0]?.productDetails?.productimage} alt='' style={{height:'200px',width:'180px'}}/>
                                    </Col>
                                    <Col lg={9} className='ms-2'>
                                        <div className='mt-3 mt-lg-0 d-flex align-items-center justify-content-between'>
                                            <h4>{usercartData[0]?.productDetails?.productname}</h4>
                                        </div>
                                        <div className='d-flex list_store'>
                                            <p>Discount : {usercartData[0]?.productDetails?.discount}%</p>
                                        </div>
                                        <div className=' d-flex list_store'>
                                            <p>Price : ₹{usercartData[0]?.productDetails?.price}</p>
                                        </div>
                                        <div className='d-flex'>
                                            <p>Delivery Date : {dateAfter2days}</p>
                                        </div>
                                        <div className='d-flex'>
                                            <div className='d-flex mt-2'>
                                                <h5>Total : ₹{usercartData[0]?.productDetails?.price * usercartData[0]?.quantity}</h5>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <hr/>
                            </div>
        </Card>
        <button className='btn btn-primary mt-2 mb-3 p-3' onClick={CheckoutPage}>Proceed to Checkout</button>
    </div>
  )
}

export default Checkout