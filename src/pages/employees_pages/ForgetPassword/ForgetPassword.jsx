import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from 'Yup'
import { patchDataFromApi } from "../../../utils/api";

export default function ForgetPassword() {
  const [EmailValid, setEmailValid] = useState(false)

  
  /*------------------------------------------ Forget Password ------------------------------------------ */
  const [ApiResult, setApiResult] = useState(false)
  const [Error, setError] = useState(false)

    async function forgetSubmit(values){
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
        <div className="bg-dark w-100 h-100 bg-opacity-50 position-absolute row g-0 justify-content-center align-items-center ">
          <div className="bg-body-secondary shadow px-md-5 py-5 px-4 bg-white rounded col-11 col-md-7 col-lg-6 mx-auto ">
            {!EmailValid? <>
              <h1 className="text-center h3 mb-4">Forget Password</h1>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id="email" name="email" className="mt-1 form-control " />
                  {formik.errors.email && formik.touched.email?<p className=" text-danger fs-14 my-1">{formik.errors.email}</p>:''}
                </div>
                {ApiResult && <p className={`${Error? 'text-danger' : 'text-success'} text-center mt-3`}>{ApiResult}</p>}
                <button type="submit" className="btn btn-warning fw-semibold w-100 mt-4">Submit</button>
              </form>
            </>
            :  
            <>
              <h1 className="text-center h3 mb-4">Reset Password</h1>
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
                {ResetResult && <p className={`${ResetResultError?'text-danger' : 'text-success'} text-center mt-3`}>{ResetResult}</p>}
                <button type="submit" className="btn btn-warning fw-semibold w-100 mt-4">Submit</button>
              </form>
            </>
          }
          </div>
        </div>
      </>
    );
  
}
