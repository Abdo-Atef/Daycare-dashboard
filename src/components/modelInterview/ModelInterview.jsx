import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { Modal } from 'react-bootstrap';
import * as yup from 'Yup'
import { BASE_URL } from '../../utils/api';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
export default function ModelInterview({show,onHide,interviewId}) {
    const {employeeToken}=useSelector((state)=>state.employee);
    async function setTimeInterview(value){
        const result=await axios.patch(`${BASE_URL}/employees/reviewRequest/setInterviewTime/${interviewId}`,value,{headers:{token:employeeToken}})
        console.log(result);
        if(result.data.success==true){
        toast.success(result.data.messsage)
        }else{
            toast.error(result.data.error)
        }
    }
    const validationTimeSchema=yup.object({
        interviewTime:yup.date('Invalid date').required('date is required')
    })
    const formik=useFormik({
        initialValues:{
            interviewTime:''
        },
        onSubmit:setTimeInterview,
        validationSchema:validationTimeSchema,
    })
  return (
    <>
         <Modal
                            size="lg"
                            show={show}
                            onHide={onHide}
                            aria-labelledby="example-modal-sizes-title-lg"
                            >
                            <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                Add Time fo interview
                            </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form action="" onSubmit={formik.handleSubmit}>
                                    <input type="text" placeholder='Day and time' name='interviewTime' value={formik.values.interviewTime} className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur}  />
                                    {formik.errors.interviewTime&&formik.touched.interviewTime?<p className='text-danger mt-2'>{formik.errors.interviewTime}</p>:""}
                                    <button className='btn btn-dark mt-3 float-end '>Confirm the appointment</button>
                                </form>
                            </Modal.Body>
                        </Modal>
    </>
  )
}
