import React, { useEffect, useState } from 'react'
import ProfileDetails from './ProfileDetails'
import ChangePassword from './ChangePassword'
import ChangeData from './ChangeData'
import { BASE_URL } from '../../../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from "Yup";
import { getEmployeeProfile } from '../../../redux/employees_Slices/employeeSlice'

export default function EmployeeProfile() {
  let dispatch = useDispatch();
  const [ActiveSection, setActiveSection] = useState('myProfile');
  const {employeeToken, employeeProfileData}= useSelector(state => state.employee);
  // console.log(employeeToken);
  /* -------------------------------- Image Uplaod ------------------------------ */

  let fileValidation = Yup.object({
    profilePicture: Yup.string().required('file is required')
  });

  const formik = useFormik({
    initialValues: {
      profilePicture: null
    },

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append('profilePicture', values.profilePicture);
        // console.log(values.file);
        // Send a POST request using Axios
        const response = await axios.patch(`${BASE_URL}/employees/updateProfilePhoto`, formData, {
          headers: {
            token:employeeToken,
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('File uploaded successfully:', response.data);
        dispatch(getEmployeeProfile())
      } catch (error) {
        console.error('Error uploading file:', error);
      }
      setSubmitting(false);
    },
    validationSchema:fileValidation
  });
  
  // console.log(ProfileData?.employee.profilePicture.secure_url.replace(/.*https:\/\//, 'https://'));
  
  useEffect(() => {
    dispatch(getEmployeeProfile())
  }, [])
  

  return (
    <div className='container pt-2 px-md-5 px-2 min-vh-100 '>
      <h2 className='h4 mt-3'>My Profile</h2>
      {employeeProfileData && <div className="pageContent py-4">
        <div className="row g-4">
          <div className='col-lg-3'>
            <section className='bg-milk shadow p-3 py-4 rounded-2'>
              <figure className='text-center'>
                <img className='border' style={{borderRadius:'50%'}} width={140} height={140} src={employeeProfileData.employee.profilePicture.secure_url.replace(/.*https:\/\//, 'https://')} alt="user image" />
              </figure>
              <h4 className='text-center fs-17 text-capitalize'>Mr. {employeeProfileData.employee.name}</h4>
              <h5 className='text-center h6 text-secondary text-capitalize'>{employeeProfileData.employee.role}</h5>
              <form className='text-center my-3 d-flex justify-content-center gap-2 align-items-center' onSubmit={formik.handleSubmit}>
                <label htmlFor="uploadImage" className={`btn btn-night fs-13 rounded-1 mt-1`}>
                  <i className="fa-solid fa-pen fs-13 me-1"></i>Change Image
                </label>
                <input id='uploadImage' name='profilePicture' className='d-none' type="file" 
                  onChange={(event) => {formik.setFieldValue("profilePicture", event.currentTarget.files[0]);}}
                />
                {formik.values.profilePicture && 
                <button type="submit" className={`btn bg-night text-white fs-13 mt-1`}>
                  {formik.isSubmitting ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-check"></i>}
                </button>}
              </form>
              <p className='text-danger'>{formik.errors.profilePicture}</p>
              <div className="contact mt-3 pt-2 text-center">
                <p className='mb-1 mb-2 '><i className="fa-solid fa-envelope"></i> : {employeeProfileData.employee.email}</p>
                <p><i className="fa-solid fa-phone"></i> : {employeeProfileData.employee.phone}</p>
              </div>
            </section>
          </div>
          <div className='col-lg-9'>
            <section className='bg-milk shadow p-3 py-4 rounded-2'>
              <nav className={`shadow d-flex justify-content-center align-items-center gap-md-4 gap-2 py-3 rounded border`}>
                <span onClick={ ()=>setActiveSection('myProfile')} className={` ${ActiveSection == 'myProfile' ? 'text-nile borderBottom-nile':'text-secondary'} fs-15 px-2 fw-semibold cursor-pointer pb-1 `}>My Profile</span>
                <span onClick={ ()=>setActiveSection('changePassword')} className={` ${ActiveSection == 'changePassword' ? 'text-nile borderBottom-nile':'text-secondary'} fs-15 px-2 fw-semibold cursor-pointer pb-1`}>Change Password</span>
                <span onClick={ ()=>setActiveSection('changeData')} className={` ${ActiveSection == 'changeData' ? 'text-nile borderBottom-nile':'text-secondary'} fs-15 px-2 fw-semibold cursor-pointer pb-1`}>Change Data</span>
              </nav>
              {ActiveSection == 'myProfile' && <ProfileDetails ProfileData={employeeProfileData}/>}
              {ActiveSection == 'changePassword' && <ChangePassword />}
              {ActiveSection == 'changeData' && <ChangeData UserId={employeeProfileData.employee.id} />}
            </section>
          </div>
        </div>
      </div>}
      
    </div>
  )
}
