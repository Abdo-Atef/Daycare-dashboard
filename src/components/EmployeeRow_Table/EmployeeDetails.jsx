import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { BASE_URL } from "../../utils/api";

export default function EmployeeDetails({employee, setModalShow}) {
  
  const [Data, setData] = useState(false)
  
  const fetchEmployeeData = async () => {
    const headers = {
      token:localStorage.getItem('employeeToken')
    }
    const response = await axios.get(`${BASE_URL}/employees/getSpEmployee/${employee.id}`, {headers})
    console.log(response.data.employee);
    setData(response.data.employee);
  }
  const handleClose = () => {
    setModalShow(false);
  };

  useEffect(() => {
    
  fetchEmployeeData();
    
  }, [])
  

  return (
    <Modal
      show={true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose}
    >
      <Modal.Header className="mx-2">
        <Modal.Title id="contained-modal-title-vcenter">
          <h2 className="h4 mt-2">{employee.name}</h2>
        </Modal.Title>
        <button
          onClick={() => setModalShow(false)}
          className="btn btn-close"
        ></button>
      </Modal.Header>
      <Modal.Body>
      <figure className='text-center mb-0 '>
        <img className='border' style={{borderRadius:'50%'}} width={160} height={160} src={Data?.profilePicture?.secure_url?.replace(/.*https:\/\//, 'https://')} alt="user image" />
      </figure>
      <div className='pb-1 rounded px-3 pt-4 text-night'>
        <p className='border-bottom py-3 mb-0 fw-medium '> <i className="fa-solid fa-user me-1"></i> Name : {Data?.name}</p>
        <p className='border-bottom py-3 mb-0 fw-medium '> <i className="fa-solid fa-envelope me-1"></i> Email : {Data?.email}</p>
        <p className='border-bottom py-3 mb-0 fw-medium text-capitalize'> <i className="fa-solid fa-user-tie me-1"></i> Role : {Data?.role}</p>
        <p className='border-bottom py-3 mb-0 fw-medium '> <i className="fa-solid fa-phone me-1"></i> Phone : {Data?.phone}</p>
        <p className='border-bottom py-3 mb-0 fw-medium text-capitalize'> <i className="fa-solid fa-location-dot me-1"></i> Address : {Data?.address}</p>
        <p className='py-3 mb-0 fw-medium '> <i className="fa-solid fa-dollar-sign me-1"></i> Salary : {Data?.salary}</p>
      </div>
      </Modal.Body>
    </Modal>
  );
}
