import noRequestsImg from '../../../assets/noRequests.webp'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRequestsToEvaluator, setEvaluatorRequests } from "../../../redux/employees_Slices/evaluatorSlice";
import styles from './styles.module.css';
import { Link } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import dayjs from 'dayjs';

export default function EvaluatorRequests() {
  let dispatch = useDispatch();
  const { allRequests } = useSelector((state) => state.evaluator);
  console.log(allRequests);
  const handleSearch = async (value) => {
    if (totalPages <= currentPage) {
      setCurrentPage(1)
    }
    const {payload} = await dispatch(getAllRequestsToEvaluator());
    const data = payload.filter((request) => request.parentName.toLowerCase().includes(value.toLowerCase()))
    dispatch(setEvaluatorRequests(data))
  }
  const handleFilter = async (value) => {
    console.log(value);
    const {payload} = await dispatch(getAllRequestsToEvaluator());
    let data = payload.toSorted((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    })
    if (value == 'new') {
      data = payload.toReversed((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      })
    }
    dispatch(setEvaluatorRequests(data));
    if (totalPages <= currentPage) {
      setCurrentPage(1)
    }
  }

  useEffect(() => {
    dispatch(getAllRequestsToEvaluator());
  }, []);

  /* -------------------------------- Pagination-------------------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setnumberOfPages] = useState(5);
  const totalPages = Math.ceil(allRequests?.length / parseInt(numberOfPages));
  
  const handleClick = (page) => {
    setCurrentPage(page);
  };
  const start = (currentPage - 1) * parseInt(numberOfPages);
  const end = start + parseInt(numberOfPages);
  
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li className={`btn ${ currentPage == i ? 'btn-primary ' : 'btn-night'} px-3 mx-1`} key={i} onClick={() => handleClick(i)}>
          {i}
        </li>
      );
    }
    return <ul className={`${styles.paginationStyles} m-0 p-0 list-unstyled d-flex`}>
      <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == 1 || allRequests?.length == 0} onClick={() => setCurrentPage(currentPage - 1)}>
        <i className="fa-solid fa-angles-left"></i>
        </button></li>
      {pageNumbers}
      <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == totalPages || allRequests?.length == 0} onClick={() => setCurrentPage(currentPage + 1)}>
        <i className="fa-solid fa-angles-right"></i></button>
        </li>
      </ul>;
  };
  /* ---------------------------------------------------------------- */
  

  return (
    <div className="min-vh-100 pb-5">
      <div className="container">
        <div className="h4 p-lg-4 pb-4 mt-1">The New Requests</div>
        <div className="row px-lg-4">
          <div className='col-md-6 col-8'>
            <input onKeyUp={(e)=> handleSearch(e.target.value)} type="text" placeholder='Search By Name' className='form-control shadow-none'/>
          </div>
          <div className='col-md-6 col-4 text-end'>
          <Dropdown onSelect={handleFilter}>
            <Dropdown.Toggle className='bg-white border text-black px-3' id="dropdown-basic">
              Sort By
            </Dropdown.Toggle> 
            <Dropdown.Menu>
              <Dropdown.Item className='border-bottom' eventKey="new">Most Recent</Dropdown.Item>
              <Dropdown.Item eventKey="last">Last Requests</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
        </div>
        <div className='bg-white p-3 p-sm-4 pt-4 mx-lg-4 my-4 rounded'>
          <div className='py-3'>
            {allRequests?.length > 0 ? <div className="row g-4 row-cols-xl-3 row-cols-md-2 ">
              {
                allRequests?.slice(start, end).map((user)=> 
                <div key={user?.id}>
                  <Link to={`/employees.panal/EvaluatorRequests/${user.email}`} className={`${styles.requestStyles} text-black`}>
                    <div className='shadow border rounded-2 p-3 h-100'>
                        <div className='border-bottom px-1 border-2 d-flex align-items-center gap-3'>
                            {user.profilePicture ? (
                              <img
                                src={user.profilePicture.secure_url}
                                alt="profile image"
                                width={50}
                                height={50}
                                className="rounded-circle me-2"
                              />
                            ) : (
                            <div className='d-flex justify-content-center align-items-center p-2 bg-primary bg-opacity-10 rounded-circle' style={{width:50,height:50}}>
                                <i className="fa-solid fa-user fs-4"></i>
                            </div>
                            )}
                            <div className='mt-3'>
                                <p className='mb-1 text-capitalize'>Parent: {user?.parentName}</p>
                                <p className='text-secondary'>{user?.location}</p>
                            </div>
                        </div>
                        <div className='position-relative'>
                          <div className='p-2'>
                              <i className="fa-solid fa-envelope"></i>
                              <span className='ms-3'>Email: {user?.email}</span>
                          </div>
                          <div className='p-2'>
                              <i className="fa-solid fa-phone"></i>
                              <span className='ms-3'>Phone: {user?.phone}</span>
                          </div>
                          <div className='p-2'>
                              <i className="fa-solid fa-user"></i>
                              <span className='ms-3'>Child: {user?.childName}</span>
                          </div>
                          <div className='p-2'>
                              <i className="fa-solid fa-calendar text-night"></i>
                              <span className='ms-3'>Create Date: {dayjs(user?.createdAt).format('MMM DD - h:m A')}</span>
                          </div>
                        </div>
                        <span className={`${styles.reviewSpan} bg-night text-white rounded-1 p-2 px-3 position-absolute`}>Review Now</span>
                    </div>
                  </Link>
                </div>
                )
              }
              </div>
            :<div className='d-flex flex-column justify-content-center align-items-center bg-white pt-2'>
              <h3 className='h5'>There are no new requests !!</h3>
              <img src={noRequestsImg} className='w-100' alt="noRequestsImg" style={{maxWidth:'400px'}} />
          </div>}
          </div>
          {allRequests?.length > 0 && 
          <div className="my-4 d-flex align-items-center justify-content-between position-relative w-100">
            <div className="d-flex align-items-center">
              <span className="fs-13 fw-medium  me-1">Show:</span>
              <select onChange={(e)=> setnumberOfPages(e.target.value)} className='form-select shadow-none fs-14' style={{width:'130px'}}>
                <option value="5">5 Requests</option>
                <option value="10">10 Requests</option>
                <option value="20">20 Requests</option>
                <option value="50">50 Requests</option>
              </select>
            </div>
            {renderPagination()}
          </div>}
        </div>
      </div>
    </div>
  );
}