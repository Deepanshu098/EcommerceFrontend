import React from 'react'
import  Pagination  from 'react-bootstrap/Pagination'


function Paginations({pagecount,page,handleNext,handlePrevious,setPage}) {
  return (
    <>
        <div className='mt-3'>
            {
                pagecount > 0 ?
                <div className='pagination_div d-flex justify-content-end mx-5'>
                <Pagination>
                <Pagination.Prev onClick={()=>handlePrevious()} />
                {
                    Array(pagecount).fill(null).map((ele,index)=>{
                        return(
                            <>
                               <Pagination.Item active={page === index+1 ? true:false} onClick={()=>{setPage(index+1)}}>{index + 1}</Pagination.Item>
                            </>
                        )
                    })
                }
                <Pagination.Next onClick={()=>handleNext()} />
                </Pagination>
                 </div>
                :
                ""
            }
            
        </div>
    </>
  )
}

export default Paginations