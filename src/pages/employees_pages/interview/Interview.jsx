import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModelInterview from '../../../components/modelInterview/ModelInterview';
import { SearchInterviwByEmail, getAllInterview } from '../../../redux/interviewer_Slices/interviewerSlice';
import ModelConditionInterview from '../../../components/modelConditionInterview/ModelConditionInterview';
import { Link } from 'react-router-dom';

export default function Interview() {
    const {interviews}=useSelector(state=>state.interviewer)
    const [model,setModel]=useState(false)
    const [modelResult,setModelResult]=useState(false)
    const [interviewData,setInterviewData]=useState(null)
    let dispatch=useDispatch();
    function handleModel(data){
        setModel(true)
        setInterviewData(data)
    }
    function handleModelCondition(data){
        setModelResult(true)
        setInterviewData(data)
    }
    const handleEndPoint=(endPoint)=>{
        dispatch(getAllInterview(endPoint))
    }
    const SearchByEmail=(email)=>{
      email.length>0?dispatch(SearchInterviwByEmail(email)):dispatch(getAllInterview())
    }
    useEffect(()=>{
        dispatch(getAllInterview())
    },[])
  return (
    <div className='vh-100'>
        <div className="container">
            <div className="p-4">
                <div className='py-4 d-flex justify-content-between flex-wrap'>
                    <div className='' style={{width:400}}>
                        <input type="email" onChange={(e)=>SearchByEmail(e.target.value)} placeholder='email' className='form-control shadow'  />
                    </div>
                    <select className='p-2  rounded-2 border-0 shadow ' onChange={(e)=>handleEndPoint(e.target.value)}>
                        <option value="allIntervieweingStageForInterviewer">All</option>
                        <option value="getAllRequetsThatHaveTimeForInterviewer">interviewes have time</option>
                        <option value="notHaveTimeForInterviewer">interviewes have not time</option>
                    </select>
                    <Link className='btn btn-night' to="/employees.panal/interview/resultsInterview">show results interview</Link>
                </div>
                <div className="row g-4">
                    {interviews?.requests.length > 0?
                    <>
                        {interviews?.requests.map((interview)=><div className='col-md-12 col-lg-5 col-xl-4' key={interview.id}>
                        <div className='bg-white shadow   rounded-2 p-2 h-100 position-relative'>
                            <div className='border-bottom px-1 border-2 d-flex align-items-center gap-3'>
                                <div className='text-center p-2 bg-secondary bg-opacity-10 rounded-circle' style={{width:50,height:50}}>
                                    <i className="fa-solid fa-user fs-3"></i>
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
                                        <i className="fa-solid fa-envelope"></i>
                                        <span className='ms-3'>{interview?.email}</span>
                                    </div>
                                    <div className='p-2'>
                                        <i className="fa-solid fa-square-phone-flip"></i>
                                        <span className='ms-3'>{interview?.phone}</span>
                                    </div>
                                    <div className='p-2'>
                                        <i className="fa-solid fa-location-dot"></i>
                                        <span className='ms-3'>{interview?.location}</span>
                                    </div>
                                    <div className='p-2'>
                                        <i className="fa-solid fa-cake-candles text-night"></i>
                                        <span className='ms-3'>{interview?.birthDate.slice(0,10)}</span>
                                    </div>
                                    <div className='p-2'>
                                        <i className="fa-solid fa-inbox text-night"></i>
                                        <span className='ms-3'>{interview?.state}</span>
                                    </div>
                                    <div className='p-2'>
                                        <i className="fa-solid fa-calendar-days text-night"></i>
                                        <span className='ms-3 text-success'>{interview?.dateOfInterviewing!=null?"interview Day":""} {interview?.dateOfInterviewing!=null?interview.dateOfInterviewing?.slice(0,10):<span className='text-danger'>The interview time has not been set</span>}</span>
                                    </div>
                                    <div className='p-2'>
                                        <i className="fa-solid fa-clock text-night"></i>
                                        <span className='ms-3 text-success'>{interview?.dateOfInterviewing!=null?"interview Time":""} {interview?.dateOfInterviewing!=null?interview.dateOfInterviewing.slice(12,16):<span className='text-danger'>The interview time has not been set</span>}</span>
                                    </div>
                            </div>
                            {
                                interview.dateOfInterviewing==null?<div onClick={()=>handleModel(interview)} className='position-absolute top-0 end-0 m-2   cursor-pointer ' title="add time">
                                            <i className="fa-solid fa-calendar-plus fs-3"></i>
                                </div>:<div onClick={()=>handleModel(interview)} className='position-absolute top-0 end-0  m-2   cursor-pointer ' title="update time">
                                        {interview.state == "interviewing"?<i className="fa-solid fa-square-pen fs-3"></i>:""}
                                    </div>
                            }
                            {
                                interview?.state=="interviewing"?<div className='position-absolute top-0 end-0 mt-5 p-2' onClick={()=>handleModelCondition(interview)}>
                                    {interview.dateOfInterviewing==null?"":<i className="fa-solid fa-square-plus fs-3 cursor-pointer" title="add codition"></i>} 
                                </div>:""
                            }
                        </div>
                    </div>)}
                    </>
                    :<div className='p-5'>
                        <h3 className='text-center'>There is no interviews now</h3>
                    </div>}
                    {
                                model&&<ModelInterview show={model}  onHide={()=>setModel(false)} interviewData={interviewData}/>
                    }
                    {
                            modelResult&&<ModelConditionInterview show={modelResult} interviewData={interviewData} onHide={()=>setModelResult(false)}/>
                    }
                </div>
            </div>
           
        </div>
    </div>
  )
}


