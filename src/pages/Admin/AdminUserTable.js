import React from 'react'
import { Card, Dropdown, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import Paginations from '../../components/Pagination/Paginations';
import { useDispatch } from 'react-redux';
import { deleteUserSlice } from '../../redux/slice/UserAuthSlice/UserAuthSlice';


function AdminUserTable({allusers,page,setPage,pagecount,handleNext,handlePrevious}) {
    // console.log(allusers)

    const dispatch = useDispatch();

    //Delete User
    const handlerdeleteUser=(id)=>{
        const data={userid:id}
        dispatch(deleteUserSlice(data))
    }


  return (
    <div className='container'>
        <h4>Users</h4>
        <Row>
            <div className='col mt-0 mb-3'>
                <Card className='shadow'>
                    <Table className='align-items-center mb-0'>
                        <thead className='thead-dark'>
                            <tr className='table-dark'>
                                <th>ID</th>
                                <th>FullName</th>
                                <th>Email</th>
                                <th>Profile</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allusers?.Users?.length > 0 ? allusers?.Users?.map((ele,index)=>{
                                    return(
                                        <>
                                                <tr>
                                                <td>{index + 1 + (page-1)*4}</td>
                                                <td>{ele?.firstName}</td>
                                                <td>{ele?.email}</td>
                                                <td className='img_parent'>
                                                    <img src={ele?.userimage} alt=''/>
                                                </td>
                                                <td>
                                                <Dropdown >
                                                    <Dropdown.Toggle variant='light' className="action" id="dropdown-basic">
                                                        <BsThreeDotsVertical style={{marginBottom:'5px'}} />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item >
                                                            <Link to='' className='text-dark text-decoration-none'>
                                                                <MdDelete className='me-3 fs-3 text-danger' onClick={()=>handlerdeleteUser(ele._id)}/><span className='fs-5 text-primary'>Delete</span>
                                                            </Link>
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>    
                                                </Dropdown>
                                                    </td>
                                                </tr>
                                        </>
                                    )
                                })
                                :
                                "No Users available"
                            }
                            
                        </tbody>
                    </Table>
                    <Paginations/>
                    <Paginations
                    pagecount={pagecount}
                    page={page}
                    handleNext={handleNext}
                    handlePrevious={handlePrevious}
                    setPage={setPage}
                    />
                </Card>
            </div>
        </Row>
    </div>
  )
}

export default AdminUserTable