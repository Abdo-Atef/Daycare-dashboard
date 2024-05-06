import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from 'Yup'
import { patchDataFromApi } from "../../../utils/api";
import styles from "./styles.module.css";
import forget_Img from '../../../assets/forgetPassword.png'
import { Link } from "react-router-dom";

export default function ForgetPassword() {
  const [EmailValid, setEmailValid] = useState(false)
  const [IsLoading, setIsLoading] = useState(false)
  
  /*------------------------------------------ Forget Password ------------------------------------------ */
  const [ApiResult, setApiResult] = useState(false)
  const [Error, setError] = useState(false)

    async function forgetSubmit(values){
      setIsLoading(true)
      const data = await patchDataFromApi('/employees/forgetPassword', values)
      console.log(data);
      if (data.success) {
        setApiResult("Check your Email to get the ResetCode")
        setError(false)
        setTimeout(() => {
          setEmailValid(true);
        }, 2500);
      }
      else if (data.error){
        setApiResult("The email is not correct")
        setError(true)
      }
      setIsLoading(false)
  }
  
  let validation = Yup.object({
    email:Yup.string().email('This Is InValid Email').required('Email is Required'),
  })
  
  let formik = useFormik({
    initialValues:{
      email:'',
    },
    validationSchema:validation,
    onSubmit:forgetSubmit
  })
  /*------------------------------------------ Reset Password ------------------------------------------ */

  const [ResetResult, setResetResult] = useState(false)
  const [ResetResultError, setResetResultError] = useState(false)

  async function resetSubmit(values, {resetForm}) {
    setIsLoading(true)
    const data = await patchDataFromApi('/employees/getCode', values);
    console.log(data);
    if (data.sucess) {
      setResetResult(data.message)
      setResetResultError(false)
      resetForm();
    }
    else if (data.error){
      setResetResult(data.error)
      setResetResultError(true)
    }
    setIsLoading(false)
  }

  let validation2 = Yup.object({
    email:Yup.string().email('This Is InValid Email').required('Email is Required'),
    password:Yup.string().min(8 ,'minimum length is 8 characters').max(12 ,'maximum length is 12 characters').required('Password is Required'),
    rePassword:Yup.string().oneOf([Yup.ref("password")],'Not Equal to password').required('Password is Required'),
    code:Yup.string().required('The code is Required'),
  })
  
  let formik2 = useFormik({
    initialValues:{
      email:'',
      password:'',
      rePassword:'',
      code:'',
    },
    validationSchema:validation2,
    onSubmit:resetSubmit
  })
  
  
  
    return (
      <>
        <div className={`${styles.containeroBg} w-100 h-100 position-absolute d-flex justify-content-center align-items-center `}>
          <div className="row w-100 justify-content-center g-0 mx-3">
            <div className={`${styles.ImgSection} rounded-start col-lg-4 col-sm-6 d-sm-block d-none shadow`}>
              <figure className="m-0 p-0 w-100 h-100 ">
                <img src={forget_Img} className="w-100 h-100 rounded-start" alt="" />
              </figure>
            </div>
            <div className={`${styles.formSection} shadow p-4 py-5 rounded-end col-lg-4 col-sm-6 text-white position-relative `}>
              {!EmailValid? <>
                <h1 className="text-center h3 mb-4">Forget Password</h1>
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <label htmlFor="email">Email:</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id="email" name="email" className="mt-1 form-control " />
                    {formik.errors.email && formik.touched.email?<p className=" text-danger fs-14 my-1">{formik.errors.email}</p>:''}
                  </div>
                  {ApiResult && <p className={`${Error? 'text-danger' : 'text-success'} text-center mt-3`}>{ApiResult}</p>}
                  {!IsLoading ? 
                  <button type="submit" className={`btn fw-semibold w-100 ${ApiResult? "mt-1" : "mt-5"} text-white`} style={{backgroundColor:'#9747ff'}} >Submit</button>
                  :
                  <button className='btn fw-semibold w-100 mt-5 text-white' style={{backgroundColor:'#9747ff'}} ><i className="fa-solid fa-spinner fa-spin me-1"></i> Submit</button>
                  }
                </form>
              </>
              :  
              <>
                <h1 className="text-center h3 pt-5 mb-4">Reset Password</h1>
                <form onSubmit={formik2.handleSubmit}>
                  <div>
                    <label htmlFor="email">Email:</label>
                    <input onChange={formik2.handleChange} onBlur={formik2.handleBlur} value={formik2.values.email} type="email" id="email" name="email" className="mt-1 form-control " />
                    {formik2.errors.email && formik2.touched.email?<p className=" text-danger fs-14 my-1">{formik2.errors.email}</p>:''}
                  </div>
                  <div className="my-3">
                    <label htmlFor="code">Code:</label>
                    <input onChange={formik2.handleChange} onBlur={formik2.handleBlur} value={formik2.values.code} type="text" id="code" name="code" className="mt-1 form-control "  />
                    {formik2.errors.code && formik2.touched.code?<p className=" text-danger fs-14 my-1">{formik2.errors.code}</p>:''}
                  </div>
                  <div className="my-3">
                    <label htmlFor="password">Password:</label>
                    <input onChange={formik2.handleChange} onBlur={formik2.handleBlur} value={formik2.values.password} type="password" id="password" name="password" className="mt-1 form-control " />
                    {formik2.errors.password && formik2.touched.password?<p className=" text-danger fs-14 my-1">{formik2.errors.password}</p>:''}
                  </div>
                  <div>
                    <label htmlFor="rePassword">Confirm Password:</label>
                    <input onChange={formik2.handleChange} onBlur={formik2.handleBlur} value={formik2.values.rePassword} type="password" id="rePassword" name="rePassword" className="mt-1 form-control " />
                    {formik2.errors.rePassword && formik2.touched.rePassword?<p className=" text-danger fs-14 my-1">{formik2.errors.rePassword}</p>:''}
                  </div>
                  {ResetResult && <p className={`${ResetResultError?'text-danger' : 'text-success'} text-center mt-3 text-capitalize `}>{ResetResult}</p>}
                  {!IsLoading?
                  <button type="submit" className={`btn fw-semibold w-100 ${ResetResult? "mt-1" : "mt-5"} text-white`} style={{backgroundColor:'#9747ff'}}>Submit</button>
                  :
                  <button className='btn fw-semibold w-100 mt-5 text-white' style={{backgroundColor:'#9747ff'}} ><i className="fa-solid fa-spinner fa-spin me-1"></i> Submit</button>
                  }
                </form>
              </>
            }
              <Link to={'/employees.login'} className="fs-14 position-absolute text-white start-0 top-0 m-3 border-bottom ">
                Back to Login
                <i className="fa-solid fa-arrow-right fs-13 ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  
}
