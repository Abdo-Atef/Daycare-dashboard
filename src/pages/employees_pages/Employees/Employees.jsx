import React, { useEffect, useState } from 'react'
import { getAllemployees, searchForEmployees } from '../../../redux/employees_Slices/employeeSlice'
import { useDispatch, useSelector } from 'react-redux'
import NewEmployeeModal from '../../../components/NewEmployeeModal/NewEmployeeModal';
import EmployeeRow_Table from '../../../components/EmployeeRow_Table/EmployeeRow_Table';



export default function Employees() {
  const [modalShow, setModalShow] = useState(false);

  const {employees} = useSelector(state => state.employee) 

  const handleRole = (role) => {
    dispatch(getAllemployees(role))
  }
  const handleSearch = (term) => {
    term.length > 0 ? dispatch(searchForEmployees(term)) : dispatch(getAllemployees());
  }

  let dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllemployees())
  }, [])
  
  return (
    <div className='vh-100 container mx-auto py-3 px-lg-4'>
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
            <td className='bg-night text-white fw-semibold ps-4'>Full Name</td>
            <td className='bg-night text-white fw-semibold'>Email Address</td>
            <td className='bg-night text-white fw-semibold'>Location</td>
            <td className='bg-night text-white fw-semibold'>Salary</td>
            <td className='bg-night text-white fw-semibold'>Permissions</td>
            <td className='bg-night text-white fw-semibold'>Edit</td>
            </tr>
          </thead>
          <tbody>
          {employees && employees.employees.length > 0 ? <>
            {employees.employees.map((employee)=> <EmployeeRow_Table employee = {employee} key={employee.id}/>) }
          </> 
          : 
          <tr>
            <td colSpan={6} className='text-center py-3 fw-semibold'>There Are No Employees !!</td>
          </tr>}
          </tbody>
        </table>
      </div>
      

    </div>
  )
}
