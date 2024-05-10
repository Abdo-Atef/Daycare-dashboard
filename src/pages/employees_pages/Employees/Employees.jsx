import React, { useEffect, useState } from 'react'
import { getAllemployees, searchForEmployees } from '../../../redux/employees_Slices/employeeSlice'
import { useDispatch, useSelector } from 'react-redux'
import NewEmployeeModal from '../../../components/NewEmployeeModal/NewEmployeeModal';
import EmployeeRow_Table from '../../../components/EmployeeRow_Table/EmployeeRow_Table';
import styles from './styles.module.css'


export default function Employees() {
  const [modalShow, setModalShow] = useState(false);

  const {employees} = useSelector(state => state.employee) 

  const handleRole = (role) => {
    dispatch(getAllemployees(role))
  }
  const handleSearch = (term) => {
    term.length > 0 ? dispatch(searchForEmployees(term)) : dispatch(getAllemployees());
    if (totalPages <= currentPage) {
      setCurrentPage(1)
    }
  }

  let dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllemployees())
  }, [])

    /* -------------------------------- Pagination-------------------------------- */
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setnumberOfPages] = useState(5);
    const totalPages = Math.ceil(employees?.length / parseInt(numberOfPages));
    
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
        <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == 1 || employees?.length == 0} onClick={() => setCurrentPage(currentPage - 1)}>
          <i className="fa-solid fa-angles-left"></i>
          </button></li>
        {pageNumbers}
        <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == totalPages || employees?.length == 0} onClick={() => setCurrentPage(currentPage + 1)}>
          <i className="fa-solid fa-angles-right"></i></button>
          </li>
        </ul>;
    };
    /* ---------------------------------------------------------------- */
  
  return (
    <div className='min-vh-100 container mx-auto py-3 px-lg-4 pb-5'>
      <h1 className='h4'>Employees Management</h1>
      <div className='justify-content-between align-items-center mt-4 pt-2 row row-cols-2'>
        <div className='d-flex flex-lg-row flex-column gap-3 align-items-lg-center'>
          <select onChange={(e)=> handleRole(e.target.value)} className='form-select shadow-none mt-1' name='role' style={{width:'fit-content'}}>
            <option value="undefined">All</option>
            <option value="admin">Admins</option>
            <option value="evaluator">Evaluators</option>
            <option value="interviewer">Interviewers</option>
            <option value="supervisor">Supervisors</option>
            <option value="socialSpecialist">SocialSpecialists</option>
            <option value="busSupervisor">BusSupervisors</option>
          </select>
          <input onKeyUp={(e)=> handleSearch(e.target.value)} type="text" placeholder='Search By Name' className='form-control shadow-none'/>
        </div>
        <button onClick={() => setModalShow(true)}  className='btn btn-night shadow-lg fs-15 me-2' style={{width:'fit-content'}}><i className="fa-solid fa-plus fs-13"></i> New Employee</button>
      </div>
      <NewEmployeeModal modalShow={modalShow} setModalShow={setModalShow} />
      <div className="tableContainer overflow-x-auto pb-5">
        <table className='table mt-4 w-100' style={{minWidth:'1070px'}}>
          <thead>
            <tr>
            <td className='bg-night2 text-white fw-semibold ps-4'>Full Name</td>
            <td className='bg-night2 text-white fw-semibold'>Email Address</td>
            <td className='bg-night2 text-white fw-semibold'>Location</td>
            <td className='bg-night2 text-white fw-semibold'>Salary</td>
            <td className='bg-night2 text-white fw-semibold'>Permissions</td>
            <td className='bg-night2 text-white fw-semibold'>Edit</td>
            </tr>
          </thead>
          <tbody>
          {employees && employees.length > 0 ? <>
            {employees.slice(start, end).map((employee)=> <EmployeeRow_Table employee = {employee} key={employee.id}/>) }
          </> 
          : 
          <tr>
            <td colSpan={6} className='text-center py-3 fw-semibold'>There Are No Employees !!</td>
          </tr>}
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
