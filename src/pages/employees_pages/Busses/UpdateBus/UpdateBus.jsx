import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'Yup'
import {getAllFreeSupervisor, getBusFilter } from '../../../../redux/BusSupervisor_slice/SupervisorSlice';
import axios from 'axios';
import { BASE_URL } from '../../../../utils/api';
import { toast } from 'react-toastify';

export default function UpdateBus({show,hide,data}) {
    const {freeSupervisor}=useSelector((state)=>state.supervisor)
    const {employeeToken}=useSelector((state)=>state.employee)
    const dispatch=useDispatch()
    async function updateBus(value){
        const result=await axios.patch(`${BASE_URL}/bus/updateBus/${data.id}`,value,{headers:{token:employeeToken}}) 
        if(result.data.success==true){
            toast.success(result.data.message)
        }else{
            toast.warning(result.data.error)
        }
        dispatch(getBusFilter())
    }
    const validationSchema=yup.object({
        busName:yup.string().min(2,'min length is 2 character').max(50,'max length is 50 character'),
    })
    const formik=useFormik({
        initialValues:{
            busName:'',
            busSupervisor:''
        },
        onSubmit:(values)=>{
            const updatedValues = {};
                if (values.busName) {
                    updatedValues.busName = values.busName;
                }
                if (values.busSupervisor) {
                    updatedValues.busSupervisor = values.busSupervisor;
                }
                if (Object.keys(updatedValues).length > 0) {
                    updateBus(updatedValues);
                } else {
                    updateBus(values);
                }
        },
        validationSchema,
    })
    useEffect(()=>{
        dispatch(getAllFreeSupervisor())
    },[])
  return (
    <>
        <Modal
                size="lg"
                show={show}
                onHide={hide}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
                >
            <Modal.Header className='border-0' closeButton  style={{backgroundColor:"#1b1b1d",color:'#fff'}}>
                
                        <Modal.Title id="example-modal-sizes-title-lg" className=''>
                            <div className='d-flex align-items-center gap-5 ' >
                                <span>Update Bus</span>
                                <span>Former bus driver: <span className='h6'>{data?.busSupervisor=== null ?"No Supervisor":data?.busSupervisor?.name}</span></span>
                            </div>
                        </Modal.Title>
            </Modal.Header>
            <Modal.Body  style={{backgroundColor:"#1b1b1d"}}>
            <form action="" className='text-white' onSubmit={formik.handleSubmit}>
                    <label htmlFor="busName" className='fs-5 my-2'>Bus Name</label>
                    <input   type="text" name="busName" value={formik.values.busName} onBlur={formik.handleBlur} onChange={formik.handleChange} id='busName' placeholder='Bus name' className='w-100 border-0 text-white rounded-2' style={{outline:0,padding:10,backgroundColor:'hsla(227, 25%, 25%,.35)'}} />
                    {formik.errors.busName&&formik.touched.busName?<p className='text-danger'>{formik.errors.busName}</p>:""}
                    <label htmlFor="busSupervisor" className='fs-5 my-2'>Bus supervisor</label>
                    <select  name='busSupervisor'      value={formik.values.busSupervisor } id='busSupervisor'  onChange={formik.handleChange} className='w-100 border-0 text-white rounded-2' style={{outline:0,padding:10,backgroundColor:'hsla(227, 25%, 25%,.35)'}}>
                    <option value='' disabled selected>Select supervisor</option>
                        {freeSupervisor?.busSuperviosors.map((supervisor)=><option   key={supervisor.id} value={supervisor.id}>{supervisor.name}</option>)}
                    </select>
                    <button className='btn float-end text-white mt-2 px-5' style={{backgroundColor:'hsla(178, 79%, 39%,.45)'}}>update Bus</button>
                </form>
            </Modal.Body>
        </Modal>
    </>
  )
}
