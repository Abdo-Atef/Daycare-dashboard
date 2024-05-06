import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import * as yup from 'Yup'
import { BASE_URL } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllInterview } from '../../redux/interviewer_Slices/interviewerSlice';
export default function ModelConditionInterview({show,onHide,interviewData}) {
    const {employeeToken}=useSelector((state)=>state.employee);
    const dispatch=useDispatch()
   async function confirmResult(values){
        const result=await axios.patch(`${BASE_URL}/employees/reviewRequest/setInterviewResult/${interviewData.id}`,values,{headers:{token:employeeToken}})
        console.log(result);
        if(result.data.sucess==true){
            toast.success(result.data.message)
        }else{
            toast.error(result.data.error)
        }
        dispatch(getAllInterview())
    }
    const validationSchema=yup.object({
        state:yup.string().required('state is required'),
        condition:yup.string().min(5).max(700),
    })
    const formik=useFormik({
        initialValues:{
            state:'',
            condition:''
        },
        onSubmit:(values)=>{
            confirmResult(values.state === "finalRefused" ? values : { state: values.state });
        },
        validationSchema,
    })
    function ToggleInput(){
        const state=document.getElementById('state');
        if(formik.values.state == "accepted"){
            state.classList.add('d-none')
        }else{
            state.classList.remove('d-none')
            state.classList.add('d-block')
        }
    }
    useEffect(()=>{
        ToggleInput()
    },[formik.values.state])
  return (
    <>
        <Modal
                size="lg"
                show={show}
                onHide={onHide}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
                >
            <Modal.Header className='border-0' closeButton  style={{backgroundColor:"#1b1b1d",color:'#fff'}}>
                
                        <Modal.Title id="example-modal-sizes-title-lg">
                                The result of interview
                        </Modal.Title>
            </Modal.Header>
            <Modal.Body  style={{backgroundColor:"#1b1b1d"}}>
                <form action="" className='text-white' onSubmit={formik.handleSubmit}>
                        <label htmlFor="result" className='fs-5 mb-2'>state</label>
                        <select  id="result" name='state' value={formik.values.state} onBlur={formik.handleBlur} onChange={formik.handleChange} className='w-100 border-0 text-white rounded-2' style={{outline:0,padding:10,backgroundColor:'hsla(227, 25%, 25%,.35)'}}>
                            <option value="accepted" className='p-3' style={{outline:0,padding:10,backgroundColor:'hsla(227, 25%, 25%,.35)'}}>accepted</option>
                            <option value="finalRefused" style={{outline:0,padding:10,backgroundColor:'hsla(227, 25%, 25%,.35)'}}>refused</option>
                        </select>
                        {formik.errors.state?<p className='text-danger mt-1'>{formik.errors.state}</p>:""}
                        <div  id='state'>
                            <label htmlFor="reason" className='fs-5 my-2'>reason</label>
                            <input  type="text" name="condition" value={formik.values.condition} onBlur={formik.handleBlur} onChange={formik.handleChange} id='reason' placeholder='reason' className='w-100 border-0 text-white rounded-2' style={{outline:0,padding:10,backgroundColor:'hsla(227, 25%, 25%,.35)'}} />
                        </div>
                        {formik.errors.condition&&formik.touched.condition?<p className='text-danger mt-1'>{formik.errors.condition}</p>:""}
                        <button className='btn float-end text-white mt-2 px-5' style={{backgroundColor:'hsla(178, 79%, 39%,.45)'}}>Confirm</button>
                </form>
            </Modal.Body>
        </Modal>
    </>
  )
}
