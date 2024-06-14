import axios from 'axios';
import { useFormik } from 'formik';
import React, { Fragment, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { BASE_URL } from '../../../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllBus } from '../../../../redux/BusSupervisor_slice/SupervisorSlice';

export default function RemoveChild({show,BusId,ChildData,hide}) {
    const {employeeToken}=useSelector((state)=>state.employee)
    const dispatch=useDispatch()
    async function removeChild(value){
        const result=await axios.patch(`${BASE_URL}/bus/removeChildren/${BusId}`,value,{headers:{token:employeeToken}})
        console.log(result);
        if(result.data.success==true){
            toast.success(result.data.message)
        }else{
            toast.warning(result.data.error)
        }
        dispatch(getAllBus())

    }
    const formik=useFormik({
        initialValues:{
            children:[],
        },
        onSubmit:removeChild,
    })

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
        
                <Modal.Title id="example-modal-sizes-title-lg">
                    Remove child
                </Modal.Title>
    </Modal.Header>
    <Modal.Body  style={{backgroundColor:"#1b1b1d"}}>
    <form action="" className='text-white' onSubmit={formik.handleSubmit}>
            <label htmlFor="child" className='fs-5 my-2'>childrens</label>
            <select multiple name='children' value={formik.values.children} onChange={formik.handleChange}  id='child'   className='w-100 border-0 text-white rounded-2' style={{outline:0,padding:10,backgroundColor:'hsla(227, 25%, 25%,.35)'}}>
                {ChildData?.children.map((child)=><option value={child.id} key={child.id}>{child.childName}  ({child.region})</option>
                )}
            </select>
            <button className='btn float-end text-white mt-2 px-5' style={{backgroundColor:'hsla(178, 79%, 39%,.45)'}}>Remove Child</button>
        </form>
    </Modal.Body>
</Modal>
</>
  )
}
