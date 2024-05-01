import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { BASE_URL } from '../../utils/api';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getAllInterview } from '../../redux/interviewer_Slices/interviewerSlice';
import { DayPicker } from 'react-day-picker';

export default function ModelInterview({show,onHide,interviewData}) {
    const {employeeToken}=useSelector((state)=>state.employee);
    const dispatch=useDispatch()
    const [selected, setSelected] = useState();
    const [timeValue, setTimeValue] = useState('00:00');

  const handleTimeChange = (e) => {
    const time = e.target.value;
    if (!selected) {
      setTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(':').map((str) => parseInt(str, 10));
    const newSelectedDate = new Date(
      selected.getFullYear(),
      selected.getMonth(),
      selected.getDate(),
      hours,
      minutes
    );
    setSelected(newSelectedDate);
    setTimeValue(time);
    formik.setFieldValue("interviewTime",newSelectedDate)
    formikUpdate.setFieldValue("interviewTime",newSelectedDate)

  };

  const handleDaySelect = (date) => {
    if (!timeValue || !date) {
      setSelected(date);
      return;
    }
    const [hours, minutes] = timeValue
      .split(':')
      .map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    );
    setSelected(newDate);

  };

  async function setTimeInterview(value){
        const result=await axios.patch(`${BASE_URL}/employees/reviewRequest/setInterviewTime/${interviewData.id}`,value,{headers:{token:employeeToken}})
        console.log(result);
        if(result.data.sucess==true){
        toast.success(result.data.messsage)
        }else{
            toast.error(result.data.error)
        }
        dispatch(getAllInterview())
  }
  async function updateTimeInterview(value){
    const result=await axios.patch(`${BASE_URL}/employees/reviewRequest/upadteTimeInterview/${interviewData.id}`,value,{headers:{token:employeeToken}})
    console.log(result);
    if(result.data.sucess==true){
      toast.success(result.data.messsage)
      }else{
          toast.error(result.data.error)
      }
    dispatch(getAllInterview())
  }
    const formik=useFormik({
        initialValues:{
            interviewTime:''
        },
        onSubmit:setTimeInterview,
    })
    const formikUpdate=useFormik({
      initialValues:{
          interviewTime:''
      },
      onSubmit:updateTimeInterview,
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
            <Modal.Header className='border-0' closeButton  style={{backgroundColor:"#1b1b1d",color:'#fff'}}>
                
                        <Modal.Title id="example-modal-sizes-title-lg">
                                {interviewData.dateOfInterviewing == null ?"Add Time for interview":"Update Time for interview"}
                        </Modal.Title>
            </Modal.Header>
            <Modal.Body  style={{backgroundColor:"#1b1b1d"}}>
              {   
                  interviewData.dateOfInterviewing == null?
                <form onSubmit={formik.handleSubmit}className='position-relative'>
                    <DayPicker style={{backgroundColor:"#1b1b1d",color:'#fff',borderRadius:'10px', padding:'20px' ,display:'flex',justifyContent:'center'}}
                        mode="single"
                        selected={selected}
                        onSelect={handleDaySelect}
                        footer={
                            <>
                            <p>
                                Pick a time:{' '}
                                <input
                                    type="time"
                                    value={timeValue}
                                    onChange={handleTimeChange}
                                    className={`border-0 mt-3 text-white rounded-2`}
                                    style={{outline:0,backgroundColor:'#3b3b3b',padding:'7px'}}
                                    
                                />
                            </p>
                            <input type="text" value={selected ? selected.toLocaleString() : 'none'} className='border-0 rounded-2 text-white' style={{padding:'10px',backgroundColor:'hsla(227, 25%, 25%,.35)',outline:0}}  />
                            </>
                        }
                    />
                    <button className='btn position-absolute p-3 bottom-0 m-3 end-0' style={{backgroundColor:'hsla(178, 79%, 39%,.45)'}}><i className="fa-regular fa-paper-plane text-white"></i></button>
                </form>
                :
                <form onSubmit={formikUpdate.handleSubmit}className='position-relative'>
                    <DayPicker style={{backgroundColor:"#1b1b1d",color:'#fff',borderRadius:'10px', padding:'20px' ,display:'flex',justifyContent:'center'}}
                        mode="single"
                        selected={selected}
                        onSelect={handleDaySelect}
                        footer={
                            <>
                            <p>
                                Pick a time:{' '}
                                <input
                                    type="time"
                                    value={timeValue}
                                    onChange={handleTimeChange}
                                    className={`border-0 mt-3 text-white rounded-2`}
                                    style={{outline:0,backgroundColor:'#3b3b3b',padding:'7px'}}
                                    
                                />
                            </p>
                            <input type="text" value={selected ? selected.toLocaleString() : 'none'} className='border-0 rounded-2 text-white' style={{padding:'10px',backgroundColor:'hsla(227, 25%, 25%,.35)',outline:0}}  />
                            </>
                        }
                    />
                    <button className='btn position-absolute p-3 bottom-0 m-3 end-0' style={{backgroundColor:'hsla(178, 79%, 39%,.45)'}}><i className="fa-regular fa-pen-to-square text-white"></i></button>
                </form>
              }
            </Modal.Body>
        </Modal>
    </>
  )
}
