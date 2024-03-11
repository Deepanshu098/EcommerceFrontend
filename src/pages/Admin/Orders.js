import React, { useEffect } from 'react'
import { Card, Dropdown, Row, Table } from 'react-bootstrap'
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { OrderUpdateSlice, OrdersAdmin } from '../../redux/slice/AdminAuthSlice/AdminAuthSlice';

function Orders() {
    const {adminOrdersData} = useSelector((state)=>state.Admin)
    const {OrdersStatusChange} = useSelector((state)=>state.Admin)
    // console.log("ad",OrdersStatusChange)

    const dispatch = useDispatch();

    const getAdminOrders=()=>{
        dispatch(OrdersAdmin())
    }

    const handleOrderChange=(orderdata,orderid)=>{
        const finaldata={
            orderStatus:orderdata,
            orderid:orderid
        }
        dispatch(OrderUpdateSlice(finaldata))
    }

    useEffect(()=>{
        getAdminOrders()
    },[OrdersStatusChange])

  return (
    <div className='container'>
        <h4 className='fw-bold ms-2 fs-3'>Orders</h4>
        <Row>
            <div className='col mt-0 mb-3'>
                <Card className='shadow'>
                    <Table className='align-items-center'>
                        <thead className='thead-dark'>
                            <tr className='table-dark'>
                                <th>ID</th>
                                <th>Total Price</th>
                                <th>Order Items</th>
                                <th>User Id</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                adminOrdersData?.length > 0 ? adminOrdersData?.map((element,index)=>{
                                    return(
                                        <>
                                        <tr>
                                        <td>{index + 1}</td>
                                        <td>{element?.totalPrice}</td>
                                        <td>{element?.orderItems?.length}</td>
                                        <td>{element?.userid}</td>
                                        <td>
                                        {
                                                 element.orderstatus == "Processing" ?
                                                                    <Dropdown>
                                                                        <Dropdown.Toggle id='dropdown-basic'>
                                                                            {element?.orderstatus}
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item onClick={() => handleOrderChange("Confirmed", element._id)}>Confirm</Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                    :
                                                                    element.orderstatus == "Confirmed" ?
                                                                        <Dropdown>
                                                                            <Dropdown.Toggle id='dropdown-basic'>
                                                                                {element?.orderstatus}
                                                                            </Dropdown.Toggle>
                                                                            <Dropdown.Menu>
                                                                                <Dropdown.Item onClick={() => handleOrderChange("Shipped", element._id)}>Shipped</Dropdown.Item>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown> :
                                                                        element.orderstatus == "Shipped" ?
                                                                            <Dropdown>
                                                                                <Dropdown.Toggle id='dropdown-basic'>
                                                                                    {element?.orderstatus}
                                                                                </Dropdown.Toggle>
                                                                                <Dropdown.Menu>
                                                                                    <Dropdown.Item onClick={() => handleOrderChange("Delivered", element._id)}>Deliverd</Dropdown.Item>
                                                                                </Dropdown.Menu>
                                                                            </Dropdown> : element?.orderstatus
                                                            }
                                        </td>
                                        <td>
                                            <MdDelete className='me-3 fs-3 text-danger'/>
                                        </td>
                                    </tr>
                                        </>
                                    )
                                }):"No Orders"
                            }
                            
                        </tbody>
                    </Table>
                </Card>
            </div>
        </Row>
    </div>
  )
}

export default Orders