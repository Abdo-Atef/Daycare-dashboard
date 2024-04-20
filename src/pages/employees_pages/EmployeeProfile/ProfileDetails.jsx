import React from 'react'

export default function ProfileDetails({ProfileData}) {

  
  return (
    <>
      {ProfileData && <div className='my-3 rounded px-3 pt-4 text-night'>
        <p className='border-bottom py-3 mb-0 fw-medium '> <i className="fa-solid fa-user me-1"></i> Name : {ProfileData.employee.name}</p>
        <p className='border-bottom py-3 mb-0 fw-medium '> <i className="fa-solid fa-envelope me-1"></i> Email : {ProfileData.employee.email}</p>
        <p className='border-bottom py-3 mb-0 fw-medium text-capitalize'> <i className="fa-solid fa-user-tie me-1"></i> Role : {ProfileData.employee.role}</p>
        <p className='border-bottom py-3 mb-0 fw-medium '> <i className="fa-solid fa-phone me-1"></i> Phone : {ProfileData.employee.phone}</p>
        <p className='border-bottom py-3 mb-0 fw-medium text-capitalize'> <i className="fa-solid fa-location-dot me-1"></i> Address : {ProfileData.employee.address}</p>
        <p className='border-bottom py-3 mb-0 fw-medium '> <i className="fa-solid fa-dollar-sign me-1"></i> Salary : {ProfileData.employee.salary}</p>
        <p className='pt-3 mb-0 fw-medium '> <i className="fa-solid fa-code me-1"></i> Sign_In Code : {ProfileData.employee.pinCode}</p>
      </div>}
      
    </>
    
  )
}
