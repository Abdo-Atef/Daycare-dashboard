import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import * as yup from 'Yup'
import { BASE_URL } from '../../utils/api';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getAllInterview } from '../../redux/interviewer_Slices/interviewerSlice';
// import ReactDatePicker from 'react-datepicker';
export default function ModelInterview({show,onHide,interviewData}) {
    const {employeeToken}=useSelector((state)=>state.employee);
    const dispatch=useDispatch()
    const [startDate, setStartDate] = useState(new Date());

    async function setTimeInterview(value){
        const result=await axios.patch(`${BASE_URL}/employees/reviewRequest/setInterviewTime/${interviewId}`,value,{headers:{token:employeeToken}})
        console.log(result);
        if(result.data.success==true){
        toast.success(result.data.messsage)
        dispatch(getAllInterview)
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
                centered
            >
            <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                                {interviewData.dateOfInterviewing == null ?"Add Time for interview":"Update Time for interview"}
                        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='' onSubmit={formik.handleSubmit}>
                    {/* <ReactDatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeInput
                        className='form-control'
                        onYearChange={formik.handleChange}
                        onMonthChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    /> */}
                    <button className='btn btn-dark mt-3 float-end'>Confirm Time</button>
                </form>

            </Modal.Body>
        </Modal>
    </>
  )
}
