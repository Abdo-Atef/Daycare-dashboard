import React, { useEffect, useState } from 'react'
import { getAllemployees, searchForEmployees } from '../../../redux/employees_Slices/employeeSlice'
import { useDispatch, useSelector } from 'react-redux'
import NewEmployeeModal from '../../../components/NewEmployeeModal/NewEmployeeModal';
import EmployeeRow_Table from '../../../components/EmployeeRow_Table/EmployeeRow_Table';
import { getAllGroups } from '../../../redux/employees_Slices/groupSlice';
import styles from './styles.module.css'
import dayjs from 'dayjs';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Groups() {
  const [modalShow, setModalShow] = useState(false);

  const {employees} = useSelector(state => state.employee) 
  const {allGroups} = useSelector(state => state.group) 

  const handleRole = (role) => {
    dispatch(getAllemployees(role))
  }
  const handleSearch = (term) => {
    term.length > 0 ? dispatch(searchForEmployees(term)) : dispatch(getAllemployees());
  }

  let dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllemployees())
    dispatch(getAllGroups())
  }, [])

    /* -------------------------------- Pagination-------------------------------- */
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setnumberOfPages] = useState(5);
    const totalPages = Math.ceil(allGroups?.length / parseInt(numberOfPages));
    
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
        <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == 1 || allGroups?.length == 0} onClick={() => setCurrentPage(currentPage - 1)}>
          <i className="fa-solid fa-angles-left"></i>
          </button></li>
        {pageNumbers}
        <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == totalPages || allGroups?.length == 0} onClick={() => setCurrentPage(currentPage + 1)}>
          <i className="fa-solid fa-angles-right"></i></button>
          </li>
        </ul>;
    };
    /* ---------------------------------------------------------------- */
  
  return (
    <div className='vh-100 container mx-auto py-3 px-lg-4'>
      <h1 className='h4'>Groups Management</h1>
      <div className='justify-content-between align-items-center mt-4 pt-2 row row-cols-2'>
        <div className='d-flex flex-lg-row flex-column gap-3 align-items-lg-center'>
          <select onChange={(e)=> handleRole(e.target.value)} className='form-select shadow-none mt-1' name='role' style={{width:'fit-content'}}>
            <option value="undefined">All</option>
            <option value="admin">Admins</option>
            <option value="evaluator">Evaluators</option>
            <option value="interviewer">Interviewers</option>
          </select>
          <input onKeyUp={(e)=> handleSearch(e.target.value)} type="text" placeholder='Search By Name' className='form-control shadow-none'/>
        </div>
        <button onClick={() => setModalShow(true)}  className='btn btn-night shadow-lg fs-15 me-2' style={{width:'fit-content'}}><i className="fa-solid fa-plus fs-13"></i> New Group</button>
      </div>
      <div className="tableContainer overflow-x-auto pb-5">
        <table className='table mt-4 w-100' style={{minWidth:'1070px'}}>
          <thead>
            <tr>
            <td className='bg-night2 text-white fw-semibold ps-5'>Group Name</td>
            <td className='bg-night2 text-white fw-semibold'>Supervisor</td>
            <td className='bg-night2 text-white fw-semibold'>Students</td>
            <td className='bg-night2 text-white fw-semibold'>Created Date</td>
            <td className='bg-night2 text-white fw-semibold'>Edit</td>
            </tr>
          </thead>
          <tbody>
              {allGroups?.length > 0 ? (
                <>
                  {allGroups.slice(start, end).map((group) => (
                    <tr key={group.id}>
                      <td className="text-capitalize ps-5">{group.groupName}</td>
                      <td>Supervisor</td>
                      <td className="text-capitalize">Students Number</td>
                      <td>{dayjs(group.createdAt).format('YYYY-MMM-D / h:m A')}</td>
                      <td>
                        <DropdownButton 
                          align='end' 
                          className={`${styles.dropDownStyle} position-relative  z-3 `} 
                          variant='white' 
                          id="dropdown-basic-button" 
                          title={ <i className="fa-solid fa-ellipsis-vertical"></i> }
                        >
                          <Dropdown.Item onClick={()=> console.log('dadsa')} href="#/action-1">Action</Dropdown.Item>
                          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        </DropdownButton>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-3 fw-semibold">
                    There Are No Evaluated Requests !!
                  </td>
                </tr>
              )}
            </tbody>
        </table>
      </div>
        
        <div className="d-flex align-items-center justify-content-between position-relative w-100">
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
  )
}
