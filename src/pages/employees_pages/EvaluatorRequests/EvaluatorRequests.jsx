import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRequestsToEvaluator } from '../../../redux/employees_Slices/evaluatorSlice';
import { Link } from 'react-router-dom';
import styles from './styles.module.css'

export default function EvaluatorRequests() {

  let dispatch = useDispatch();
  const {allRequests}=useSelector((state)=>state.evaluator)
  
  useEffect(() => {
    dispatch(getAllRequestsToEvaluator());
  }, [])
  
  
  return (
  <div className='min-vh-100'>
    <div className="container">
        <div className="h4 p-sm-4 mt-4">New Requests</div>
        <div className='p-sm-4 pt-4'>
          {allRequests?.requests.length > 0 ? <div className="row g-4 row-cols-lg-3 row-cols-md-2 ">
            {
              allRequests?.requests.map((user)=><Link to={`/employees.panal/EvaluatorRequests/${user.email}`} className={`${styles.requestStyles} text-black`} key={user?.id}>
                  <div className='bg-white shadow rounded-2 p-3 h-100'>
                      <div className='border-bottom px-1 border-2 d-flex align-items-center gap-3'>
                          <div className='d-flex justify-content-center align-items-center p-2 bg-secondary bg-opacity-10 rounded-circle' style={{width:50,height:50}}>
                              <i className="fa-solid fa-user fs-4"></i>
                          </div>
                          <div className='mt-3'>
                              <p className='mb-1'>Parent: {user?.parentName}</p>
                              <p className='text-secondary'>{user?.location}</p>
                          </div>
                      </div>
                      <div className='position-relative'>
                        <div className='p-2'>
                            <i className="fa-solid fa-envelope"></i>
                            <span className='ms-3'>{user?.email}</span>
                        </div>
                        <div className='p-2'>
                            <i className="fa-solid fa-phone"></i>
                            <span className='ms-3'>{user?.phone}</span>
                        </div>
                        <div className='p-2'>
                            <i className="fa-solid fa-user"></i>
                            <span className='ms-3'>{user?.childName}</span>
                        </div>
                        <div className='p-2'>
                            <i className="fa-solid fa-calendar text-night"></i>
                            <span className='ms-3'>{user?.birthDate.slice(0,10)}</span>
                        </div>
                      </div>
                  </div>
                </Link>
              )
            }
            </div>
          :<div className='d-flex justify-content-center align-items-center bg-white shadow py-5 rounded'>
            <h3 className='h4'>There Are No New Requests Yet</h3>
        </div>}
        </div>
    </div>
  </div>
  )
}
