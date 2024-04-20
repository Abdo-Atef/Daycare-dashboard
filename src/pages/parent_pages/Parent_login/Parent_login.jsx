import React from 'react'
import style from './style.module.css'
import child from '../../../assets/login.jpg'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'Yup'
import axios from 'axios'
import { postDataToApi } from '../../../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setParentToken } from '../../../redux/parents_Slices/parent_slices'
export default function Parent_login() {
  const {parentToken}=useSelector((state)=>state.parent);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [errorMsg,setErrorMsg]=useState(null);
  async function login(value){
    setLoading(true)
    const  result=await postDataToApi("/requests/login",value)
    if(result.sucess ==true){
      navigate("/parentRequest")
      localStorage.setItem("parentToken",`ahmed__${result.token}`)
      dispatch(setParentToken(localStorage.getItem("parentToken")))
    }else{
      setErrorMsg(result.error)
    }
    setLoading(false)
  }
  const loginSchema=yup.object({
    email:yup.string().email().required("email is required"),
    password:yup.string().min(8).max(30).required("password is required"),
  })
  const formik=useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    onSubmit:login,
    validationSchema:loginSchema
  })

  if(parentToken) return <Navigate to="/parentRequest"/>
  return (
    <div className={style.login}>
      <div className="container">
        <div className=' d-flex justify-content-center align-items-center vh-100'>
            <div className={` bg-white shadow  rounded-3`}>
                <div className="row g-3">
                  <div className="col-md-5">
                    <div >
                      <img src={child} alt="child" className={`w-100 rounded-3 `} style={{height:400}}  />
                    </div>
                  </div>
                  <div className=" col-md-7 my-auto ">
                      <div className='p-sm-3 p-md-4 p-xl-0'>
                        <h1 className={`${style.heading} ${style.spacing10} `}>Login</h1>
                      </div>
                        {errorMsg?<p className='text-danger'>{errorMsg}</p>:""}
                      <form action="" className='p-3' onSubmit={formik.handleSubmit}>
                        <input type="email"  className={`${style.input} mt-1 shadow-sm `} placeholder="Enter your email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.email&&formik.touched.email?<p className='text-danger mt-1'>{formik.errors.email}</p>:""}
                        <input type="password"  className={`${style.input} mt-3 shadow-sm`} placeholder="Enter your password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
                        {formik.errors.password&&formik.touched.password?<p className='text-danger mt-1'>{formik.errors.password}</p>:""}
                        <div className='d-flex justify-content-center  my-1'>
                          {
                            loading?<button className={`btn ${style.btnlogin} w-50 border-0 shadow-sm`} disabled ><i className="fa-solid fa-spinner fa-spin-pulse"></i></button>
                            :<button type='submit' className={`btn ${style.btnlogin} w-50 shadow-sm`}> Login</button>
                          }
                        </div>
                        <div className='d-flex justify-content-between align-items-center '>
                          <p>Don't have account? <Link to="/Registration" className={style.textColor2}>Sign Up</Link> </p>
                          <p><Link to="/parentForgetPassword"  className={style.textColor2}>Forget Password?</Link> </p> 
                        </div>
                      </form>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
