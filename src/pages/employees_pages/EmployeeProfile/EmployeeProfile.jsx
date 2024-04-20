import React, { useEffect, useState } from 'react'
import image from '../../../assets/userImage.png'
import styles from './styles.module.css'
import ProfileDetails from './ProfileDetails'
import ChangePassword from './ChangePassword'
import ChangeData from './ChangeData'
import { BASE_URL } from '../../../utils/api'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function EmployeeProfile() {

  const [ActiveSection, setActiveSection] = useState('myProfile');
  const {employeeToken}= useSelector(state => state.employee);
  const [ProfileData, setProfileData] = useState(null)

  const getProfileData = async () => {
    let headers = {
      token : employeeToken
    }
    let data = await axios.get(`${BASE_URL}/employees/employeeProfile`, {headers} )
    setProfileData(data.data)
    console.log(data.data);
  }

  /* -------------------------------------------------------------- */

  
  
  
  useEffect(() => {
    getProfileData();
  }, [])
  

  return (
    <div className='container pt-2 px-md-5 px-2 min-vh-100 '>
      <h2 className='h4 mt-3'>My Profile</h2>
      {ProfileData && <div className="pageContent py-4">
        <div className="row g-4">
          <div className='col-lg-3'>
            <section className='bg-milk shadow p-3 py-4  rounded-2'>
              <figure className='text-center'>
                <img className='border' style={{borderRadius:'50%'}} width={140} src={image} alt="user image" />
              </figure>
              <h4 className='text-center fs-17 text-capitalize'>Mr. {ProfileData.employee.name}</h4>
              <h5 className='text-center h6 text-secondary text-capitalize'>{ProfileData.employee.role}</h5>
              <div className='text-center my-3'>
                <label htmlFor="uploadImage" className={`${styles.ImageInput} btn bg-night text-white fs-13 rounded-1 mt-1`}>
                  <i className="fa-solid fa-pen fs-13 me-1"></i>Change Image
                </label>
                <input id='uploadImage' className='d-none' type="file"/>
              </div>
              <div className="contact mt-3 pt-2 text-center">
                <p className='mb-1 mb-2 '><i className="fa-solid fa-envelope"></i> : {ProfileData.employee.email}</p>
                <p><i className="fa-solid fa-phone"></i> : {ProfileData.employee.phone}</p>
              </div>
            </section>
          </div>
          <div className='col-lg-9'>
            <section className='bg-milk shadow p-3 py-4 rounded-2'>
              <nav className={`${styles.NavTabs} shadow d-flex justify-content-center align-items-center gap-md-4 gap-2 py-3 rounded border`}>
                <span onClick={ ()=>setActiveSection('myProfile')} className={` ${ActiveSection == 'myProfile' ? 'text-nile borderBottom-nile':'text-secondary'} fs-15 px-2 fw-semibold cursor-pointer pb-1 `}>My Profile</span>
                <span onClick={ ()=>setActiveSection('changePassword')} className={` ${ActiveSection == 'changePassword' ? 'text-nile borderBottom-nile':'text-secondary'} fs-15 px-2 fw-semibold cursor-pointer pb-1`}>Change Password</span>
                <span onClick={ ()=>setActiveSection('changeData')} className={` ${ActiveSection == 'changeData' ? 'text-nile borderBottom-nile':'text-secondary'} fs-15 px-2 fw-semibold cursor-pointer pb-1`}>Change Data</span>
              </nav>
              {ActiveSection == 'myProfile' && <ProfileDetails ProfileData={ProfileData}/>}
              {ActiveSection == 'changePassword' && <ChangePassword />}
              {ActiveSection == 'changeData' && <ChangeData UserId={ProfileData.employee.id} />}
            </section>
          </div>
        </div>
      </div>}
      
    </div>
  )
}
