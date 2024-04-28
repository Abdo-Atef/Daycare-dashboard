import axios from "axios";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../utils/api";
import { toast } from "react-toastify";
import { getAllemployees } from "../../redux/employees_Slices/employeeSlice";

export default function DeleteEmployeeModel({employee, setModalShow}) {
  let dispatch = useDispatch();

  const hadleDelete = async () => {
    let headers = {
      token: localStorage.getItem('employeeToken')
    }
    try {
      let data = await axios.delete(`${BASE_URL}/employees/deleteEmployee/${employee.id}`, {headers})
      if (data.data.message == "the employeee is deleted sucessfully") {
        dispatch(getAllemployees());
        toast.success('The employeee is deleted sucessfully', {
          position:'bottom-right'
        });
        setModalShow(false);
      }
    } catch (error) {
      console.log(error);
    }

  }
  
  const handleClose = () => {
    setModalShow(false);
  };

  return (
    <Modal
      show={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <h2 className="h5">Delete The Employee</h2>
        </Modal.Title>
        <button
          onClick={() => setModalShow(false)}
          className="btn btn-close"
        ></button>
      </Modal.Header>
      <Modal.Body>
        <p className="my-3 fw-medium">Are You Sure You Want To Delete <span className="text-danger">" {employee.name} "</span></p>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={()=> setModalShow(false)} className="btn btn-secondary fs-14 px-3">Cancel</button>
        <button onClick={()=> hadleDelete()} className="btn btn-danger fs-14 px-3">Delete</button>
      </Modal.Footer>
    </Modal>
  );
}
