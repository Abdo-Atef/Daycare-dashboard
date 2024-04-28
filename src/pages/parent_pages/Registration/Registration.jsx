import React, { useState } from 'react'
import style from './style.module.css'
import child from '../../../assets/form-child.jpg'
import { useFormik } from 'formik'
import * as yup from 'Yup'
import { useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { postDataToApi } from '../../../utils/api'
export default function Registration() {
  const {parentToken}=useSelector((state)=>state.parent);
  const [Msg,setMsg]=useState(null);
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate();

  async function signup(value) {
    const formData = new FormData();
    for (const key in value) {
      formData.append(key, value[key]);
    }
    setLoading(true)
    const result=await postDataToApi("/requests/makeRequest",formData);
    if(result.sucess == true){
        setMsg(result)
        setTimeout(()=>{
            setMsg(null)
        },5000)
        setTimeout(()=>{
          navigate("/parent.login");
        },4000)
        
    }else{
      setMsg(result)
      setTimeout(()=>{
        setMsg(null)
      },5000)
    }
      setLoading(false)

}

  const signUpSchema=yup.object({
      parentName:yup.string().min(5,'min length 5 character').max(30,'max length 30 character').required("Parent name is required"),
      email:yup.string().email().required("email is required"),
      password:yup.string().min(8).max(30).required("password is required"),
      rePassword:yup.string().oneOf([yup.ref('password')], "confirm password not matches password").required("confirm password is required"),
      phone:yup.string().matches(/^(010|011|012|015)(\d){8}$/,"phone invalid").required("phone is required"),
      job:yup.string().min(3).max(40).required("job is required"),
      childName:yup.string().min(5,"min length 5 character").max(40,"max length is 40 character").required("child name is required"),
      parentNationalId:yup.string().matches(/^(\d){14}$/,"parent national id is invalid").length(14).required("parent national is is required"),
      birthDate:yup.date().required(),
      childNationalId:yup.string().matches(/^(\d){14}$/,"parent national id is invalid").length(14).required("child national id is required"),
      location:yup.string().min(10,"min length 10 character").max(50,"max length is 50 character").required("location is required"),
  })
  const formik=useFormik({
    initialValues:{
      parentName:'',
      email:'',
      password:'',
      rePassword:'',
      phone:'',
      job:'',
      childName:"",
      parentNationalId:"",
      birthDate:"",
      childNationalId:"",
      location:"",
      frontNationalId:null,
      backNationalId:null,
      birthCertificate:null,
    },
    onSubmit:signup,
    validationSchema:signUpSchema,
  })
  const handleChangeFile = (event) => {
    const { name, files } = event.currentTarget;
    formik.setFieldValue(name, files[0]);

  };
  if(parentToken) return <Navigate to="/parentRequest"/>

  return (
    <div className={style.registeration}>
      <div className="container">
        <div className=' d-flex align-items-center justify-content-center  p-5 '>
            <div className={` rounded-3 shadow bg-white`}>
                <div className='d-flex justify-content-center mt-4 '>
                  <div >
                      {Msg?.sucess == true?<div className={`text-center p-4 ${style.BgGreenRegestration} shadow rounded-3`}><p className='text-success'>{Msg.message}</p></div>:Msg?.sucess == false ?<div className={`text-center p-4 ${style.BgGreenRegestration} shadow rounded-3`}><p className='text-danger'>{Msg?.error}</p></div>:""}
                  </div>
                  
                </div>
                <div className="row g-0">
                  <div className="col-lg-7   ">
                    <div className='p-4 '>
                        <h1 className={style.heading}>Registration</h1>
                        <div className='p-3'>
                          <p className={`${style.textColor} fs-4`}>Want to see your child better?</p>
                          <p className={`${style.textColor} fs-4`}>Apply with us now at <span className={`${style.spiecialText} fw-bold `}>Kinderlink</span></p>
                        </div>
                    </div>
                    <div >
                      <img src={child} alt="child" className={`${style.childImage} w-100   rounded-end-3 h-100 d-none d-md-block`}  />
                    </div>
                  </div>
                  <div className="col-lg-5">
                      
                      <form action="" className='p-4' onSubmit={formik.handleSubmit}>
                        <input type="text"  className={`${style.input} shadow-sm `} placeholder="parent name" name="parentName" value={formik.values.parentName} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.errors.parentName&&formik.touched.parentName?<p className='text-danger mt-1'>{formik.errors.parentName}</p>:""}
                        <input type="email" className={`${style.input} mt-3 shadow-sm`} placeholder="email"  name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange}  />
                        {formik.errors.email&&formik.touched.email?<p className='text-danger mt-1'>{formik.errors.email}</p>:""}
                        <input type="password"  className={`${style.input} mt-3 shadow-sm`} placeholder="password" name="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange}  />
                        {formik.errors.password&&formik.touched.password?<p className='text-danger mt-1'>{formik.errors.password}</p>:""}
                        <input type="password" id='rePassword' className={`${style.input} mt-3 shadow-sm`} placeholder="confirm password" name="rePassword" value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange}  />
                        {formik.errors.rePassword&&formik.touched.rePassword?<p className='text-danger mt-1'>{formik.errors.rePassword}</p>:""}
                        <input type="text"  className={`${style.input} mt-3 shadow-sm`} placeholder="phone" name="phone" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange}  />
                        {formik.errors.phone&&formik.touched.phone?<p className='text-danger mt-1'>{formik.errors.phone}</p>:""}
                        <input type="text"  className={`${style.input} mt-3 shadow-sm`} placeholder="job" name="job" value={formik.values.job} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.errors.job&&formik.touched.job?<p className='text-danger mt-1'>{formik.errors.job}</p>:""}
                        <input type="text"  className={`${style.input} mt-3 shadow-sm`} placeholder="child name"  name="childName" value={formik.values.childName} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                        {formik.errors.childName&&formik.touched.childName?<p className='text-danger mt-1'>{formik.errors.childName}</p>:""}
                        <input type="text"  className={`${style.input} mt-3 shadow-sm`} placeholder="Parent National Id" name="parentNationalId" value={formik.values.parentNationalId} onBlur={formik.handleBlur} onChange={formik.handleChange}  />
                        {formik.errors.parentNationalId&&formik.touched.parentNationalId?<p className='text-danger mt-1'>{formik.errors.parentNationalId}</p>:""}
                        <input type="date"  className={`${style.input} mt-3 shadow-sm`} placeholder='Birth Date' name="birthDate" value={formik.values.birthDate} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.errors.birthDate&&formik.touched.birthDate?<p className='text-danger mt-1'>{formik.errors.birthDate}</p>:""}
                        <input type="text" className={`${style.input} mt-3 shadow-sm`} placeholder="Child National Id" name="childNationalId" value={formik.values.childNationalId} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.errors.childNationalId&&formik.touched.childNationalId?<p className='text-danger mt-1'>{formik.errors.childNationalId}</p>:""}
                        <input type="text"  className={`${style.input} mt-3 shadow-sm`}placeholder='location' name="location" value={formik.values.location} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                        {formik.errors.location&&formik.touched.location?<p className='text-danger mt-3'>{formik.errors.location}</p>:""}
                        <label htmlFor="frontNationalId" className={`${style.cursor}  ${style.upload} shadow-sm py-3 mt-3 d-flex justify-content-between align-items-center `}>
                          <div><i className="fa-solid fa-cloud-arrow-up  fs-5"></i> frontNationalId</div>
                          <i className="fa-solid fa-circle-exclamation text-danger fs-5"></i>
                        </label>
                        <input type="file" id='frontNationalId' className='d-none' name="frontNationalId"  onChange={handleChangeFile} />
                        
                        <label htmlFor="backNationalId" className={`${style.cursor}  ${style.upload} shadow-sm py-3 mt-3 d-flex justify-content-between align-items-center `}>
                        <div><i className="fa-solid fa-cloud-arrow-up fs-5"></i> backNationalId</div>
                          <i className="fa-solid fa-circle-exclamation text-danger fs-5"></i>
                        </label>
                        <input type="file" id='backNationalId' className='d-none' name="backNationalId"  onChange={handleChangeFile} />
                        
                        <label htmlFor="birthCertificate" className={`${style.cursor} shadow-sm ${style.upload} py-3 mt-3 d-flex justify-content-between align-items-center `}>
                          <div><i className="fa-solid fa-cloud-arrow-up fs-5"></i> birthCertificate</div>
                          <i className="fa-solid fa-circle-exclamation text-danger fs-5"></i>
                        </label>
                        <input type="file" id='birthCertificate' className='d-none' name="birthCertificate"  onChange={handleChangeFile} />
                        
                        <div className='d-flex justify-content-center '>
                          
                          {
                                loading?<button className={`btn ${style.btnRegister} w-50 border-0 shadow-sm `} disabled ><i className="fa-solid fa-spinner fa-spin-pulse"></i></button>
                                : <button type='submit' className={`btn ${style.btnRegister} shadow-sm w-100 border-0 `} disabled={!(formik.dirty&&formik.isValid)} > Apply</button>
                          }
                        </div>
                        <p className='mt-1'>Do you have account? <Link to="/parent.login" className={`${style.textColor2}`}>Sign In</Link> </p>
                      </form>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}