import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardDetails from '../../../components/CardDetails/CardDetails'
import {  resultgetInterview } from '../../../redux/interviewer_Slices/interviewerSlice'
import interviewImage from '../../../assets/interview.png'

export default function ResultIntervew() {
    const [showCard,setShowCard]=useState(false)
    const {resultInterviews}=useSelector(state=>state.interviewer)
    const [interviewData,setInterviewData]=useState(null)
    let dispatch=useDispatch();
    function handleCard(data){
        setShowCard(true)
        setInterviewData(data)
    }
   
    useEffect(()=>{
        dispatch(resultgetInterview())
    },[])
  return (
        <div className='vh-100'>
            <div className="container">
                    <div className="p-4">
                    <div className="row g-4">
                
                    {resultInterviews?.requests.length > 0?
                    <>
                        {resultInterviews?.requests?.map((interview)=><div className='col-md-12 col-lg-5 col-xl-4' key={interview.id}>
                        <div className='bg-white shadow   rounded-2 p-2 h-100 position-relative'>
                            <div className='border-bottom px-1 border-2 d-flex align-items-center gap-3'>
                                <div >
                                    {interview?.profilePicture?.secure_url === undefined ? (<div className='text-center p-2 bg-secondary bg-opacity-10 rounded-circle' style={{width:50,height:50}}><i className="fa-solid fa-user fs-3"></i></div>) : (<img src={interview?.profilePicture.secure_url} style={{width:50,height:50}} className='rounded-circle' alt={interview?.parentName} />)}                              
                                </div>
                                <div className='mt-3'>
                                    <p className=''>{interview?.parentName}</p>
                                    <p className=''>{interview?.job}</p>
                                </div>
                            </div>
                            <div className=''>
                                    <div className='p-2'>
                                        <i className="fa-solid fa-person-breastfeeding text-night"></i>
                                        <span className='ms-3'>{interview?.childName}</span>
                                    </div>
                                    
                                    
                                    <div className='p-2'>
                                        <i className="fa-solid fa-inbox text-night"></i>
                                        <span className='px-3'>state<span className={`ms-3 ${interview.state == "accepted"?"greenStyle rounded-1 ":"dangerStyle rounded-1"}`}>{interview?.state}</span> </span>
                                    </div>
                                    <div className='p-2'>
                                        <i className="fa-solid fa-calendar-days text-night"></i>
                                        <span className='ms-3'>{interview?.dateOfInterviewing!=null?"interview Day":""} {interview?.dateOfInterviewing!=null?interview.dateOfInterviewing?.slice(0,10):<span className='text-danger'>The interview time has not been set</span>}</span>
                                    </div>
                                    <div className='p-2'>
                                        <i className="fa-solid fa-clock text-night"></i>
                                        <span className='ms-3'>{interview?.dateOfInterviewing!=null?"interview Time":""} {interview?.dateOfInterviewing!=null?interview.dateOfInterviewing.slice(12,16):<span className='text-danger'>The interview time has not been set</span>}</span>
                                    </div>
                                    
                                    {interview.condition !== null?<div className='p-2'>
                                            <i className="fa-solid fa-registered text-night"></i>
                                            <span className='ms-3 '>cause: <span className='dangerStyle rounded-1 px-3'>{interview?.condition}</span> </span>
                                    </div>:""}
                                    <div className='mt-5'>
                                        <div className='position-absolute bottom-0 end-0 p-3 '>
                                            <button className='Btn' onClick={()=>handleCard(interview)} >show Details</button>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>)}
                    </>
                    :<div className='p-5'>
                            <div className='d-flex justify-content-center'>
                                <img src={interviewImage} alt="no-interview" />
                            </div>
                    </div>}
                    
                </div>
                    {
                        showCard&&<CardDetails hide={()=>setShowCard(false)} interview={interviewData}/>
                    }
                </div>
            </div>
        </div>
  )
}
