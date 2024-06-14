import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChildBusSupervisor, groupBusSupervisor, setBusSupervisor } from '../../../../redux/BusSupervisor_slice/SupervisorSlice';
import styles from './GroupBus.module.css'
export default function GroupBusSupervisor() {
    const {groupBus,childBus}=useSelector((state)=>state.supervisor)
    const dispatch=useDispatch();
    async function searchData(value){
        const {payload}=await dispatch(ChildBusSupervisor())
        console.log(payload);
        const data=payload?.filter((child)=>child?.email.toLowerCase().includes(value.toLowerCase()) ||child?.parentName.toLowerCase().includes(value.toLowerCase())||child?.childName.toLowerCase().includes(value.toLowerCase()))
        dispatch(setBusSupervisor(data))
        console.log(data);
    }

    // Pagination
    const [currentPage,setCurrentPage]=useState(1);
    const [numberPage,setnumberOfPages]=useState(5);
    const totalPages=Math.ceil(groupBus?.bus.children?.length/parseInt(numberPage))
    const handleClick=(page)=>{
        setCurrentPage(page)
    }
    const start =(currentPage - 1) * parseInt(numberPage);
    const end=start + parseInt(numberPage)
  
    const renderPagination=()=>{
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li className={`btn ${ currentPage == i ? 'btn-warning  ' : 'btn-night'} px-3 mx-1`} key={i} onClick={() => handleClick(i)}>
                    {i}
                </li>
            );
        }
        return <ul className={`${styles.paginationStyles} m-0 p-0 list-unstyled d-flex`}>
        <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == 1 || groupBus?.bus.children?.length == 0} onClick={() => setCurrentPage(currentPage - 1)}>
            <i className="fa-solid fa-angles-left"></i>
            </button></li>
        {pageNumbers}
        <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == totalPages || groupBus?.bus.children.length == 0} onClick={() => setCurrentPage(currentPage + 1)}>
            <i className="fa-solid fa-angles-right"></i></button>
            </li>
        </ul>;
    }
    useEffect(()=>{
        dispatch(groupBusSupervisor())
        dispatch(ChildBusSupervisor())
    },[])
  return (
    <div className='p-5'>
            <div className="container">
                <div>
                <h3>Bus Information</h3>
                    <div className='d-flex justify-content-center gap-3 mt-4 flex-wrap'>
                            <div className='bg-white p-5 rounded-3 shadow-sm'>
                                <span >Bus Name : </span>
                                <span className='greenStyle p-2 rounded-3 '>{groupBus?.bus.busName}</span>
                            </div>
                            <div className='bg-white p-5 rounded-3 shadow-sm'>
                                <span>Bus Number : </span>
                                <span className='orangeStyle p-2 rounded-3'>{groupBus?.bus.busNumber}</span>
                            </div>
                            <div className='bg-white p-5 rounded-3 shadow-sm'>
                                <span>Number of seat : </span>
                                <span className='dangerStyle p-2 rounded-3'>{groupBus?.bus.capacity} seat</span>
                            </div>
                            <div className='bg-white p-5 rounded-3 shadow-sm'>
                                <span>Remaining seats : </span>
                                <span className='blueStyle p-2 rounded-3'>{groupBus?.numberOfRestSeats} seat</span>
                            </div>
                            <div className='bg-white p-5 rounded-3 shadow-sm'>
                                <span>Full seats : </span>
                                <span className='orangeStyle p-2 rounded-3'>{groupBus?.numberOfSeatsReversed} seat</span>
                            </div>
                    </div>
                </div>
                <div className='mt-4'>
                    <h3>Children</h3>
                        <div className='p-3'>
                            <input type="text" placeholder='Search By email or child name or parent name' className='form-control p-3 shadow-sm' onChange={(e)=>{searchData(e.target.value)}} />
                        </div>
                        <div className="row p-4 g-4">
                            {childBus?.slice(start,end).map((child)=><div className="col-md-12 col-lg-5 col-xl-4" key={child?.id}>
                            <div className='bg-white shadow   rounded-2 p-2 h-100'>
                        <div className='border-bottom px-1 border-2 d-flex align-items-center gap-3'>
                            <div >
                                    {child?.profilePicture?.secure_url === undefined ? (<div className='text-center p-2 bg-secondary bg-opacity-10 rounded-circle' style={{width:50,height:50}}><i className="fa-solid fa-user fs-3"></i></div>) : (<img src={child?.profilePicture.secure_url} onClick={()=>window.open(user?.profilePicture?.secure_url,"_blank")} style={{width:50,height:50}} className='rounded-circle cursor-pointer' alt={child?.parentName} />)}                              
                              </div>
                              <div className='mt-3'>
                                  <p className=''>{child?.parentName}</p>
                                  <p className=''>{child?.location}</p>
                              </div>
                          </div>
                          <div className='position-relative'>
                          <div className='p-2'>
                                <i className="fa-solid fa-child "></i>
                                <span className='ms-3 '>{child?.childName}</span>
                            </div>
                            <div className='p-2'>
                                <i className="fa-solid fa-envelope "></i>
                                <span className='ms-3 '>{child?.email}</span>
                            </div>
                            
                            <div className='p-2'>
                                <i className="fa-solid fa-square-phone-flip h5"></i>
                                <span className='ms-3 '>{child?.phone}</span>
                            </div>
                            <div className='p-2'>
                                <i className="fa-solid fa-location-dot h5"></i>
                                <span className='ms-3'>{child?.region}</span>
                            </div>
                        </div>
                            </div>
                        </div>)}
                        <div className="d-flex align-items-center my-5  justify-content-between position-relative w-100 ">
                    <div className="d-flex align-items-center">
                        <span className="fs-13 fw-medium  me-1">Show:</span>
                        <select onChange={(e)=> setnumberOfPages(e.target.value)} className='form-select shadow-none fs-14' style={{width:'130px'}}>
                                <option value="5">5 Rows</option>
                                <option value="10">10 Rows</option>
                                <option value="20">20 Rows</option>
                                <option value="50">50 Rows</option>
                        </select>
                    </div>
                    {renderPagination()}
            </div>
                        </div>
                </div>
            </div>
    </div>
  )
}
