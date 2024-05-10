import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../utils/api'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
export default function Requests() {
  const {employeeToken}=useSelector((state)=>state.employee)
  const [userRequest,setUserRequest]=useState(null);
  async function getRequests(){
    const result=await axios.get(`${BASE_URL}/employees/getRequests`,{headers:{token:employeeToken}});
    setUserRequest(result?.data)
    console.log(result.data);
  }
  useEffect(()=>{
    getRequests()
  },[])
  return (
    <div className='min-vh-100'>
        <div className="container">
            <div className='p-4'>
              {userRequest?.requests!=0? <div className="row g-4">
                {
                  userRequest?.requests.map((user)=><div className="col-md-12 col-lg-5 col-xl-4" key={user?.id}>
                      <div className='bg-white shadow   rounded-2 p-2 h-100'>
                          <div className='border-bottom px-1 border-2 d-flex align-items-center gap-3'>
                              <div >
                                      {user?.profilePicture?.secure_url === undefined ? (<div className='text-center p-2 bg-secondary bg-opacity-10 rounded-circle' style={{width:50,height:50}}><i className="fa-solid fa-user fs-3"></i></div>) : (<img src={user?.profilePicture.secure_url} style={{width:50,height:50}} className='rounded-circle' alt={user?.parentName} />)}                              
                              </div>
                              <div className='mt-3'>
                                  <p className=''>{user?.parentName}</p>
                                  <p className=''>{user?.location}</p>
                              </div>
                          </div>
                          <div className='position-relative'>
                            <div className='p-2'>
                                <i className="fa-solid fa-envelope"></i>
                                <span className='ms-3'>{user?.email}</span>
                            </div>
                            <div className='p-2'>
                                <i className="fa-solid fa-square-phone-flip"></i>
                                <span className='ms-3'>{user?.phone}</span>
                            </div>
                            <div className='p-2'>
                                <i className="fa-solid fa-location-dot"></i>
                                <span className='ms-3'>{user?.location}</span>
                            </div>
                            <div className='p-2'>
                                <i className="fa-solid fa-calendar text-night"></i>
                                <span className='ms-3'>{user?.birthDate.slice(0,10)}</span>
                            </div>
                            <Link to={`/employees.panal/SpicificRequest/${user.id}`}  className='position-absolute bottom-0 end-0 cursor-pointer bg-secondary bg-opacity-10 p-3 rounded-2'>
                                    <i className="fa-solid fa-arrow-right text-night" ></i>                            
                            </Link>
                          </div>
                      </div>
                    </div>
                  )
                }
                </div>
           :<div className='d-flex justify-content-center align-items-center' style={{height:500}}>
                <h3>No Request Now</h3>
            </div>}
            </div>
        </div>
    </div>
  )
}
