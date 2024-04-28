import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../../utils/api'
import { useSelector } from 'react-redux'
import ModelInterview from '../../../components/modelInterview/ModelInterview';

export default function Interview() {
    const {employeeToken}=useSelector((state)=>state.employee);
    const [interviews,setInterviews]=useState(null)
    const [model,setModel]=useState(false)
    async function getAllInterView(){
        const result=await axios.get(`${BASE_URL}/employees/reviewRequest/allIntervieweingStageForInterviewer`,{headers:{token:employeeToken}});
        setInterviews(result?.data)
        console.log(result.data);
    }
   
    useEffect(()=>{
        getAllInterView()
    },[])
  return (
    <div className='vh-100'>
        <div className="container">
            <div className="p-4">
                <div className="row g-4">
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
                                    <i className="fa-solid fa-calendar text-night"></i>
                                    <span className='ms-3'>{interview?.birthDate.slice(0,10)}</span>
                                </div>
                                <div className='p-2'>
                                    <i className="fa-solid fa-clock text-night"></i>
                                    <span className='ms-3 text-success'>{interview?.dateOfInterviewing!=null?interview.dateOfInterviewing:<span className='text-danger'>The interview time has not been set</span>}</span>
                                </div>
                        </div>
                        <div onClick={()=>setModel(true)} className='position-absolute top-0 end-0 p-2 m-2 cursor bg-secondary-subtle cursor-pointer rounded-2' title="add time">
                            <i className="fa-solid fa-calendar-plus fs-4"></i>
                        </div>
                        {
                            model&&<ModelInterview show={model} interviewId={interview.id} onHide={()=>setModel(false)}/>
                        }
                    </div>
                    </div>)}
                </div>
            </div>
           
        </div>
    </div>
  )
}


