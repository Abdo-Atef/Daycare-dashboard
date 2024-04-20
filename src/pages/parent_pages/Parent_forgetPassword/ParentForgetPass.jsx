import React, { useEffect, useState } from 'react'
import style from "./forgetPass.module.css"
import image from "../../../assets/pass.jpg"
import { useFormik } from 'formik'
import * as yup from "Yup"
import { updateDataFromApi } from '../../../utils/api'
import { Link, useNavigate } from 'react-router-dom'
export default function ParentForgetPass() {
  const [showMsg,setShowMsg]=useState(null);
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false)
  async function senEmail(value){
    console.log(value);
    setLoading(true)
    const result=await updateDataFromApi("/requests/forgetPassword",value)
    if(result.sucess ==true){
      setShowMsg(result.message)
          document.querySelector("#send-email").classList.add('d-none');
          document.querySelector("#verify-code").classList.remove('d-none')
    }else{
      setShowMsg(result.error)
    }
    setLoading(false)
  }
  async function resetPassword(value){
    setLoading(true)
    const result=await updateDataFromApi("/requests/setCode",value)
    if(result.sucess ==true){
      setShowMsg(result.message)
      setTimeout(()=>{
        navigate("/parent.login")
      },3000)
    }else{
      setShowMsg(result.error)
    }
    setLoading(false)
  }
  const emailValidation=yup.object({
    email:yup.string().email("email invalid").required("email is required"),
  })
  const resetPassValidation=yup.object({
      email:yup.string().email("email invalid").required("email is required"),
      password:yup.string().min(8,"min length for password is 8").max(20,"max length for password is 20").required("password is required"),
      rePass:yup.string().oneOf([yup.ref('password')], "confirm password not matches password").required("confirm password is required"),
      code:yup.string().length(5,"length for code mus be 5").required("code is required"),
    })
  const formikEmail=useFormik({
    initialValues:{
      email:''
    },
    onSubmit:senEmail,
    validationSchema:emailValidation,
  })
  const formikResetPass=useFormik({
    initialValues:{
      email:'',
      password:'',
      rePass:'',
      code:''
    },
    onSubmit:resetPassword,
    validationSchema:resetPassValidation,
  })

  useEffect(()=>{
    const timer=setTimeout(()=>{
      setShowMsg(null)
    },3000)
    return ()=>clearTimeout(timer);
  },[showMsg])
  return (
    <div className={style.bgForgetPass}>
        <div className="container">
            <div className='p-5 vh-100 d-flex align-items-center'>
                <div className="row g-0 bg-white shadow rounded-2 ">
                  <div className="col-md-5">
                      <div className='shadow-sm'>
                        <img src={image} alt="image" className='w-100 h-100 '/>
                      </div>
                  </div>
                  <div className="col-md-7 position-relative">
                          <div className='p-4'>
                              <h3>Forget your password?</h3>
                              <p className='p-0 m-0'>To reset password,please enter the email of your todoist account</p>
                              {showMsg?<p className='text-center mt-4 m-0 p-0'>{showMsg}</p>:""}
                          </div>
                          <div className='d-flex flex-column align-items-center '>
                            <div className=' w-100' id="send-email">
                                <form action="" className='p-4  w-100 ' onSubmit={formikEmail.handleSubmit}>
                                  <input type="email"  className={`${style.inputForgetPassParent} mt-1 shadow-sm`} placeholder="Enter your email" name="email" value={formikEmail.values.email} onBlur={formikEmail.handleBlur} onChange={formikEmail.handleChange}/>
                                  {formikEmail.errors.email&&formikEmail.touched.email?<p className='text-danger mt-1'>{formikEmail.errors.email}</p>:""}
                                  <div className='d-flex justify-content-center'>
                                    {loading?<button className={`btn ${style.btnlogin} w-50 border-0 shadow-sm`} disabled ><i className="fa-solid fa-spinner fa-spin-pulse"></i></button>:<button className={`${style.btnPassParent} shadow-sm`}>Send Email</button>}
                                  </div>
                                </form>
                            </div>
                            <div className=' d-none w-100' id="verify-code">
                                  <form action="" className='p-4  w-100 ' onSubmit={formikResetPass.handleSubmit}>
                                    <input type="email"  className={`shadow-sm ${style.inputForgetPassParent} mt-2`} placeholder="Enter your email" name="email" value={formikResetPass.values.email} onBlur={formikResetPass.handleBlur} onChange={formikResetPass.handleChange}/>
                                    {formikResetPass.errors.email&&formikResetPass.touched.email?<p className='text-danger m-0 p-0'>{formikResetPass.errors.email}</p>:""}
                                    <input type="password"  className={`shadow-sm ${style.inputForgetPassParent} mt-2`} placeholder="Enter your password" name="password" value={formikResetPass.values.password} onBlur={formikResetPass.handleBlur} onChange={formikResetPass.handleChange}/>
                                    {formikResetPass.errors.password&&formikResetPass.touched.password?<p className='text-danger m-0 p-0'>{formikResetPass.errors.password}</p>:""}
                                    <input type="password"  className={`shadow-sm ${style.inputForgetPassParent} mt-2`} placeholder="Enter your confirm password" name="rePass" value={formikResetPass.values.rePass} onBlur={formikResetPass.handleBlur} onChange={formikResetPass.handleChange}/>
                                    {formikResetPass.errors.rePass&&formikResetPass.touched.rePass?<p className='text-danger m-0 p-0'>{formikResetPass.errors.rePass}</p>:""}
                                    <input type="text"  className={`shadow-sm ${style.inputForgetPassParent} mt-2`} placeholder="Enter your code" name="code" value={formikResetPass.values.code} onBlur={formikResetPass.handleBlur} onChange={formikResetPass.handleChange}/>
                                    {formikResetPass.errors.code&&formikResetPass.touched.code?<p className='text-danger m-0 p-0'>{formikResetPass.errors.code}</p>:""}
                                    <div className='d-flex justify-content-center'>
                                    {loading?<button className={`btn ${style.btnlogin} w-50 border-0 shadow-sm`} disabled ><i className="fa-solid fa-spinner fa-spin-pulse"></i></button>:<button className={`${style.btnPassParent} shadow-sm`}>Reset password</button>}
                                    </div>
                                  </form>
                            </div>
                          </div>
                          <div className='position-absolute bottom-0 end-0 p-4 '>
                                <Link to="/parent.login" className='text-black '>login <i class="fa-solid fa-arrow-right"></i></Link>
                          </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}
