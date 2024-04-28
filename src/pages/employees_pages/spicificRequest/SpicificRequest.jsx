import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../../utils/api'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function SpicificRequest() {
  const {employeeToken}=useSelector((state)=>state.employee)
  const {id}=useParams()
  const [request,setRequest]=useState(null)
  async function spicificRequest(){
    const result=await axios.get(`${BASE_URL}/employees/getSpRequestForAdmin/${id}`,{headers:{token:employeeToken}})
    console.log(result);
    setRequest(result?.data.request);
  }
  useEffect(()=>{
    spicificRequest();
  },[])
  return (
    <div className=''>
        <div className="container">
            <div className='p-5'>
                <div className="row g-4 bg-white p-4 rounded-2 shadow">
                    <div className="col-lg-6" >
                        <div className='shadow p-3 rounded-3'>
                            <img src={request?.birthCertificateFile.secure_url} className='w-100 rounded-2 ' alt="certificate" style={{height:600}} />
                        </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="row g-4">
                          {request?.nationalIdFile.map((national)=><div className='col-lg-6' key={national?.public_id} >
                              <div className='shadow p-3 rounded-3 h-100'>
                                  <img src={national?.secure_url} className='w-100 rounded-2' alt="" />
                              </div>
                              
                          </div>)}
                      </div>
                      <div className="col-lg-12 mt-4 ">
                        <div className='bg-white shadow   rounded-3 p-2 '>
                            <div className='border-bottom h-100 px-1 border-2 d-flex align-items-center gap-3'>
                                <div className='text-center p-2 bg-secondary bg-opacity-10 rounded-circle' style={{width:50,height:50}}>
                                    <i className="fa-solid fa-user fs-3"></i>
                                </div>
                                <div className='mt-3'>
                                    <p className=''>{request?.parentName}</p>
                                    <p className=''>{request?.location}</p>
                                </div>
                            </div>
                            <div className=''>
                              <div className='p-2'>
                                  <i className="fa-solid fa-envelope"></i>
                                  <span className='ms-3'>{request?.email}</span>
                              </div>
                              <div className='p-2'>
                                  <i className="fa-solid fa-square-phone-flip"></i>
                                  <span className='ms-3'>{request?.phone}</span>
                              </div>
                              <div className='p-2'>
                                  <i className="fa-solid fa-location-dot"></i>
                                  <span className='ms-3'>{request?.location}</span>
                              </div>
                              <div className='p-2'>
                                  <i className="fa-solid fa-calendar text-night"></i>
                                  <span className='ms-3'>{request?.birthDate.slice(0,10)}</span>
                              </div>
                              <div className='p-2'>
                                  <i className="fa-solid fa-child fs-5"></i>
                                  <span className='ms-3'>{request?.childNationalId}</span>
                              </div>
                              <div className='p-2'>
                                  <i className="fa-solid fa-hourglass-half"></i>                                  
                                  <span className='ms-3'>{request?.state}</span>
                              </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
