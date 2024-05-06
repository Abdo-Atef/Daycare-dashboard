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
  const [loading,setLoading]=useState(false);
  const [togglePass,setTogglePass]=useState(false)
  const [togglePass2,setTogglePass2]=useState(false)

  function handleToggle(){
    setTogglePass(!togglePass)
  }
  function handleToggle2(){
    setTogglePass2(!togglePass2)
  }
  const navigate=useNavigate();
  const RegionList=[
    "Abbassiya", "Agouza", "Ain Shams", "Bab al-Louq", "Bulaq", "Dar El Salam",
    "Darb al-Ahmar", "Dokki", "Downtown Cairo Wust El Balad", "El Agouzah", 
    "El Basatin", "El Basateen", "El Darassa", "El Gamaliya", "El Giza", 
    "El Khalifa", "El Katameya", "El Khalifa", "El Khanka", "El Maasara", 
    "El Marg", "El Matareya", "El Manyal", "El Masara", "El Matariya", 
    "El Mohandessin", "El Mosheer", "El Moski", "El Nasr City", "El Nozha", 
    "El Omraneya", "El Rehab City", "El Sahel", "El Salam City", "El Sayeda Zainab", 
    "El Sharabeya", "El Shorouk City", "El Tebeen", "El Waily", "El Waili", 
    "El Warraq", "El Zeitoun", "Garden City", "Giza Square", "Hadaiek Helwan", 
    "Hadayek El Ahram", "Hadayek El Kobba", "Hadayek El Maadi", "Hadayek El Kobba", 
    "Hadayek El Maadi", "Hadayek Helwan", "Heliopolis", "Helwan", "Helwan City", 
    "Imbaba", "Maadi", "Manial", "Mokattam", "Nasr City", "New Cairo", 
    "Rod El-Farag", "Sayeda Zeinab", "Shorouk City", "Shubra", "Wust El Balad", 
    "Zamalek"
  ]
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
      region: yup.string()
      .oneOf([
        "Abbassiya", "Agouza", "Ain Shams", "Bab al-Louq", "Bulaq", "Dar El Salam",
        "Darb al-Ahmar", "Dokki", "Downtown Cairo Wust El Balad", "El Agouzah", 
        "El Basatin", "El Basateen", "El Darassa", "El Gamaliya", "El Giza", 
        "El Khalifa", "El Katameya", "El Khalifa", "El Khanka", "El Maasara", 
        "El Marg", "El Matareya", "El Manyal", "El Masara", "El Matariya", 
        "El Mohandessin", "El Mosheer", "El Moski", "El Nasr City", "El Nozha", 
        "El Omraneya", "El Rehab City", "El Sahel", "El Salam City", "El Sayeda Zainab", 
        "El Sharabeya", "El Shorouk City", "El Tebeen", "El Waily", "El Waili", 
        "El Warraq", "El Zeitoun", "Garden City", "Giza Square", "Hadaiek Helwan", 
        "Hadayek El Ahram", "Hadayek El Kobba", "Hadayek El Maadi", "Hadayek El Kobba", 
        "Hadayek El Maadi", "Hadayek Helwan", "Heliopolis", "Helwan", "Helwan City", 
        "Imbaba", "Maadi", "Manial", "Mokattam", "Nasr City", "New Cairo", 
        "Rod El-Farag", "Sayeda Zeinab", "Shorouk City", "Shubra", "Wust El Balad", 
        "Zamalek"
      ],"This region is not available").required("Region is required"),
      
    })
  const formik=useFormik({
    initialValues:{
      parentName:'',
      email:'',
      password:'',
      rePassword:'',
      phone:'',
      job:'',
      childName:'',
      parentNationalId:'',
      birthDate:'',
      childNationalId:'',
      location:'',
      region:'',
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
        <div className='p-5'>
            <div className={` rounded-3 shadow bg-white `}>
                <div className="row g-2">
                  <div className="col-lg-7">
                    <div className='p-3'>
                        <h1 className={style.heading}>Registration</h1>
                        <div className='p-3'>
                          <p className={`${style.textColor} fs-4`}>Want to see your child better?</p>
                          <p className={`${style.textColor} fs-4`}>Apply with us now at <span className={`${style.spiecialText} fw-bold `}>Kinderlink</span></p>
                        </div>
                    </div>
                    <div >
                      <img src={child} alt="child" className={`${style.childImage} w-100   rounded-end-3  d-none d-md-block`} style={{height:900}}  />
                    </div>
                  </div>
                  <div className="col-lg-5">
                      
                      <form action="" className='p-3' onSubmit={formik.handleSubmit}>
                        <div className={`${style.input} mt-3 shadow-sm p-0 d-flex align-items-center `}>
                            <i className='fa-solid fa-user p-3 text-night '></i>
                            <input type="text"  className={`${style.input}`} placeholder="parent name" name="parentName" value={formik.values.parentName} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        </div>
                        {formik.errors.parentName&&formik.touched.parentName?<p className='text-danger mt-1'>{formik.errors.parentName}</p>:""}
                        <div className={`${style.input} mt-3 shadow-sm p-0 d-flex align-items-center `}>
                          <i className='fa-solid fa-envelope p-3 text-night '></i>
                          <input type="email" className={`${style.input}`} placeholder="Email"  name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange}  />
                        </div>
                        {formik.errors.email&&formik.touched.email?<p className='text-danger mt-1'>{formik.errors.email}</p>:""}
                        <div className={`${style.input} mt-3 p-0 shadow-sm d-flex  align-items-center   `}>
                            <i className='fa-solid fa-lock p-3 text-night '></i>
                            <input type={`${togglePass?"text":"password"}`}  className={`${style.input}`} placeholder="password" name="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange}  />
                            <i onClick={()=>handleToggle()} className={`fa-solid ${togglePass?'fa-eye':'fa-eye-slash'}  px-2 text-night`}></i>
                        </div>
                        {formik.errors.password&&formik.touched.password?<p className='text-danger mt-1'>{formik.errors.password}</p>:""}
                        
                        <div className={`${style.input} mt-3 p-0 shadow-sm d-flex  align-items-center   `}>
                            <i className='fa-solid fa-lock p-3 text-night '></i>
                            <input type={`${togglePass2?"text":"password"}`} id='rePassword' className={`${style.input}`} placeholder="confirm password" name="rePassword" value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange}  />
                            <i onClick={()=>handleToggle2()} className={`fa-solid ${togglePass2?'fa-eye':'fa-eye-slash'}  px-2 text-night`}></i>
                        </div>
                        {formik.errors.rePassword&&formik.touched.rePassword?<p className='text-danger mt-1'>{formik.errors.rePassword}</p>:""}
                        <div className={`${style.input} mt-3 shadow-sm p-0 d-flex align-items-center `}>
                          <i className='fa-solid fa-phone-flip  p-3 text-night  '></i>
                          <input type="text"  className={`${style.input}`} placeholder="Phone" name="phone" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange}  />
                        </div>
                        {formik.errors.phone&&formik.touched.phone?<p className='text-danger mt-1'>{formik.errors.phone}</p>:""}
                        <div className={`${style.input} mt-3 shadow-sm p-0 d-flex align-items-center `}>
                            <i className='fa-solid fa-briefcase p-3 text-night '></i>
                            <input type="text"  className={`${style.input}`} placeholder="Job" name="job" value={formik.values.job} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        </div>
                        {formik.errors.job&&formik.touched.job?<p className='text-danger mt-1'>{formik.errors.job}</p>:""}
                        <div className={`${style.input} mt-3 shadow-sm p-0 d-flex align-items-center `}>
                          <i className='fa-solid fa-child p-3 text-night '></i>
                          <input type="text"  className={`${style.input}`} placeholder="child name"  name="childName" value={formik.values.childName} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                        </div>
                        {formik.errors.childName&&formik.touched.childName?<p className='text-danger mt-1'>{formik.errors.childName}</p>:""}
                        <div className={`${style.input} mt-3 shadow-sm p-0 d-flex align-items-center `}>
                            <i className='fa-solid fa-id-card p-3 text-night '></i>
                            <input type="text"  className={`${style.input}`} placeholder="Parent National Id" name="parentNationalId" value={formik.values.parentNationalId} onBlur={formik.handleBlur} onChange={formik.handleChange}  />
                        </div>
                        {formik.errors.parentNationalId&&formik.touched.parentNationalId?<p className='text-danger mt-1'>{formik.errors.parentNationalId}</p>:""}
                        <div className={`${style.input} mt-3 shadow-sm p-0 d-flex align-items-center `}>
                            <i className='fa-solid fa-calendar p-3 text-night '></i>
                            <input type="date"  className={`${style.input} `} placeholder='Birth Date' name="birthDate" value={formik.values.birthDate} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        </div>
                        {formik.errors.birthDate&&formik.touched.birthDate?<p className='text-danger mt-1'>{formik.errors.birthDate}</p>:""}
                        <div className={`${style.input} mt-3 shadow-sm p-0 d-flex align-items-center `}>
                            <i className='fa-solid fa-id-card p-3 text-night '></i>
                            <input type="text" className={`${style.input}`} placeholder="Child National Id" name="childNationalId" value={formik.values.childNationalId} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        </div>
                        {formik.errors.childNationalId&&formik.touched.childNationalId?<p className='text-danger mt-1'>{formik.errors.childNationalId}</p>:""}
                        <div className={`${style.input} mt-3 shadow-sm p-0 d-flex align-items-center `}>
                          <i className='fa-solid fa-location-dot p-3 text-night '></i>
                          <input type="text"  className={`${style.input}`} placeholder='Location' name="location" value={formik.values.location} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                        </div>
                        {formik.errors.location&&formik.touched.location?<p className='text-danger mt-3'>{formik.errors.location}</p>:""}
                        <div className={`${style.input} mt-3 shadow-sm p-0 d-flex align-items-center `}>
                            <i className='fa-solid fa-city p-3 text-night '></i>
                            <input type="text"  className={`${style.input}`} list="region-list" placeholder='Region' name="region" value={formik.values.region} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                        </div>
                        {formik.errors.region&&formik.touched.region?<p className='text-danger mt-3'>{formik.errors.region}</p>:""}
                        <datalist id='region-list'>
                          {RegionList.map((region)=><option value={region}>{region}</option>)}
                        </datalist>
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
                        <div >
                            {Msg?.sucess == true?<div className={`text-center`}><p className='text-success'>{Msg.message}</p></div>:Msg?.sucess == false ?<div className={`text-center`}><p className='text-danger'>{Msg?.error}</p></div>:""}
                        </div>
                        <div className='d-flex justify-content-center mt-4'>
                          
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