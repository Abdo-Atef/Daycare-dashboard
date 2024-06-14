import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAllBus, getAllChildWithoutBus, getBusFilter } from '../../../../redux/BusSupervisor_slice/SupervisorSlice'
import { Modal } from 'react-bootstrap'
import { useFormik } from 'formik'
import axios from 'axios'
import { BASE_URL } from '../../../../utils/api'
import { toast } from 'react-toastify'

export default function AssignChildModel({show,hide,data}) {
    const {childsWithoutBus}=useSelector((state)=>state.supervisor)
    const {employeeToken}=useSelector((state)=>state.employee)
    const dispatch=useDispatch()

    async function assignChild(value){
        console.log(value);
        const result=await axios.patch(`${BASE_URL}/bus/assignChildrenToBus/${data.id}`,value,{headers:{token:employeeToken}})
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
        onSubmit:assignChild,
    })
   
    useEffect(()=>{
        dispatch(getAllChildWithoutBus())
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
                
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Add child
                        </Modal.Title>
            </Modal.Header>
            <Modal.Body  style={{backgroundColor:"#1b1b1d"}}>
            <form action="" className='text-white' onSubmit={formik.handleSubmit}>
                    <label htmlFor="child" className='fs-5 my-2'>childrens</label>
                    <select multiple name='children'    id='child' onChange={formik.handleChange} value={formik.values.children}   className='w-100 border-0 text-white rounded-2' style={{outline:0,padding:10,backgroundColor:'hsla(227, 25%, 25%,.35)'}}>
                        {childsWithoutBus?.allChildren.map((child)=><option   key={child.id} value={child.id}>{child.childName}</option>)}
                    </select>
                    <button className='btn float-end text-white mt-2 px-5' style={{backgroundColor:'hsla(178, 79%, 39%,.45)'}}>Add Child</button>
                </form>
            </Modal.Body>
        </Modal>
    </>
  )
}
