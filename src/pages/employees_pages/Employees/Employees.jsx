import React, { useEffect, useState } from 'react'
import { getAllemployees } from '../../../redux/employees_Slices/employeeSlice'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export default function Employees() {
  const [modalShow, setModalShow] = useState(false);
  const {employees} = useSelector(state => state.employee) 
  let dispatch = useDispatch();
  
  console.log(employees);

  useEffect(() => {
    dispatch(getAllemployees())
  }, [])
  
  return (
    <div className='vh-100 container py-3 px-4'>
      <h1 className='h4 p-2'>Employees Management</h1>
      <div className='d-flex justify-content-end'>
        <button onClick={() => setModalShow(true)}  className='btn btn-primary  text-white fs-15'><i className="fa-solid fa-plus fs-13"></i> New Employee</button>
      </div>
      {/*  */}
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis 
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=> setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      {/*  */}
      {employees && <div className="tableContainer overflow-auto">
        <table className='table mt-4' style={{minWidth:'1070px'}}>
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
            {employees.employees.map((employee)=> 
              <tr key={employee.id}>
                <td className='ps-4'>
                  <img src={employee.profilePicture.secure_url.replace(/.*https:\/\//, 'https://')} alt="user image" className='rounded-full me-3' width={30} height={30} />{employee.name}
                </td>
                <td>{employee.email}</td>
                <td className='text-capitalize'><i className="fa-solid fa-location-dot me-2 textGray"></i>{employee.address}</td>
                <td>{employee.salary} EGP</td>
                <td  className='text-capitalize'><span>{employee.role}</span></td>
                <td>
                  <button className='btn py-0'><i className="fa-solid fa-ellipsis-vertical"></i></button>
                </td>
              </tr>)
            }
            
          </tbody>
        </table>
      </div>}
      

    </div>
  )
}
