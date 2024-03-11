import React, { useEffect } from 'react'
import { Card, Container ,Row , Col} from 'react-bootstrap'
import { userorders } from '../../redux/slice/UserAuthSlice/UserAuthSlice';
import { useDispatch, useSelector } from 'react-redux';

function UserOrders() {
    const {userOrdersData} = useSelector((state)=>state.User)
    // console.log("User",userOrdersData)
    const dispatch = useDispatch();


    const getOrdersdata = () => {
        dispatch(userorders());
    }

    useEffect(() => {
        getOrdersdata()
    }, [])
  return (
    <Container className='pt-4 pb-4'>
        <h2>Your Orders</h2>
        <Card>
            {
                userOrdersData?.length > 0 ? userOrdersData?.map((ele,index)=>{
                    return(
                        <>
                        <div key={index} className='mt-2 store-item bottom-line pb-3'>
                                <h5>Order Id: {ele._id}</h5>
                                {
                                    ele?.orderItems?.map((elem,index)=>{
                                        return(
                                            <>
                                            <Row>
                                            <Col lg={2}>
                                                <img src={elem?.productDetails?.productimage} alt='' style={{height:'140px'}}/>
                                            </Col>
                                            <Col lg={9} className='ms-2'>
                                                <div className='mt-3 mt-lg-0 d-flex align-items-center justify-content-between'>
                                                    <h4>{elem?.productDetails?.productname}</h4>
                                                </div>
                                                <div className='d-flex list_store'>
                                                    <p>Discount : {elem?.productDetails?.discount}%</p>
                                                </div>
                                                <div className=' d-flex list_store'>
                                                    <p>Price : ₹{elem?.productDetails?.price}</p>
                                                </div>
                                                <div className=' d-flex list_store'>
                                                    <p>Delivery Address : {ele?.address}</p>
                                                </div>
                                                <div className='d-flex'>
                                                    <p>Order Status : {ele?.orderstatus}</p>
                                                </div>
                                                <div className='d-flex'>
                                                    <div className='text-end mt-2 w-100'>
                                                        <h5>Total : ₹{elem?.productDetails?.price * elem?.quantity}</h5>
                                                    </div>
                                                </div>
                                            </Col>
                                            </Row>
                                            </>
                                        )
                                    })
                                }
                                
                                <hr/>
                            </div>
                        </>
                    )
                })
                :
                "No Orders"
            }
        
        </Card>
    </Container>
  )
}

export default UserOrders