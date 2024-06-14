import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "Yup";
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import { addNewEmployee, getAllemployees } from "../../redux/employees_Slices/employeeSlice";
import { toast } from "react-toastify";

export default function NewEmployeeModal({setModalShow, modalShow}) {
    const [apiResult, setapiResult] = useState(false)
    let dispatch = useDispatch();
    const [Isloading, setIsloading] = useState(false)

    let validation = Yup.object({
    name: Yup.string().min(6, "minimum length is 6 characters").max(30, "maximum length is 25 characters").required("Name is Required"),
    email: Yup.string().email("This Is InValid Email").required("Email is Required"),
    phone: Yup.string().matches('^01[0125][0-9]{8}$','Not Valid Egyptian Number').required("Phone is Required"),
    address: Yup.string().min(6, "minimum length is 6 characters").max(25, "maximum length is 25 characters").required("Address is Required"),
    role: Yup.string().required("Role is Required"),
    salary: Yup.string().matches('^[0-9]{3,6}$','Not Valid Salary').required("Salary is Required"),
  });

  async function addNewEm(values, {resetForm}) {
    setIsloading(true)
    let {payload} = await dispatch(addNewEmployee(values))
    console.log(payload);
    if (payload.error) {
      if (payload.error.includes('name')) {
        setapiResult('Name is already exist');
      }
      else if (payload.error.includes('email')) {
        setapiResult('Email is already exist');
      }
      else if (payload.error.includes('phone')) {
        setapiResult('Phone is already exist');
      }
    }
    else if (payload.sucess == true){
      toast.success('The account is created successfully and activation message sended to the Email');
      dispatch(getAllemployees());
      setModalShow(false);
      setapiResult(false);
      resetForm();
    }
    setIsloading(false)
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      role: "admin",
      salary: "",
    },
    validationSchema: validation,
    onSubmit: addNewEm,
  });

  const handleClose = () => {
    setModalShow(false);
  };
  
  return (
    <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            New Employee
          </Modal.Title>
          <button onClick={()=> setModalShow (false)} className='btn btn-close'></button>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className="row row-cols-sm-2 g-3">
              <div>
                <label htmlFor="name">Name</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} className='form-control shadow-none mt-1' name='name' type="text" id='name' />
                {formik.errors.name && formik.touched.name && 
                  <p className=" text-danger fs-14 my-1"> 
                    {formik.errors.name} 
                  </p>
                }
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className='form-control shadow-none mt-1' name='email' type="text" id='email' />
                {formik.errors.email && formik.touched.email && 
                  <p className=" text-danger fs-14 my-1"> 
                    {formik.errors.email} 
                  </p>
                }
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className='form-control shadow-none mt-1' name='phone' type="text" id='phone' />
                {formik.errors.phone && formik.touched.phone && 
                  <p className=" text-danger fs-14 my-1"> 
                    {formik.errors.phone} 
                  </p>
                }
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address} className='form-control shadow-none mt-1' name='address' type="text" id='address' />
                {formik.errors.address && formik.touched.address && 
                  <p className=" text-danger fs-14 my-1"> 
                    {formik.errors.address} 
                  </p>
                }
              </div>
              <div>
                <label htmlFor="role">Role</label>
                <select onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.role} className='form-select shadow-none mt-1' name='role' type="text" id='role'>
                  <option value="admin">Admin</option>
                  <option value="evaluator">Evaluator</option>
                  <option value="interviewer">Interviewer</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="socialSpecialist">SocialSpecialist</option>
                  <option value="busSupervisor">BusSupervisor</option>
                </select>
                {formik.errors.role && formik.touched.role && 
                  <p className=" text-danger fs-14 my-1"> 
                    {formik.errors.role} 
                  </p>
                }
              </div>
              <div>
                <label htmlFor="salary">Salary</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.salary} className='form-control shadow-none mt-1' name='salary' type="text" id='salary' />
                {formik.errors.salary && formik.touched.salary && 
                  <p className=" text-danger fs-14 my-1"> 
                    {formik.errors.salary} 
                  </p>
                }
              </div>
            </div>
            {apiResult && <p className="text-danger text-center mt-4  ">{apiResult}</p>}
          </Modal.Body>
          <Modal.Footer>
            <span onClick={()=> setModalShow(false)} className="btn btn-secondary fs-14 px-3">Cancel</span>
            {!Isloading? 
            <button type="submit" className="btn btn-night fs-14 px-3">Submit</button>
            :
            <button className="btn btn-night fs-14 px-3"><i className="fa-solid fa-spinner fa-spin me-1"></i> Submit</button>
            }
          </Modal.Footer>
        </form>
      </Modal>
  )
}
