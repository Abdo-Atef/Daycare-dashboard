import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "Yup";
import { postDataToApi } from "../../../utils/api";
import { Link, Navigate } from "react-router-dom";
import { setEmployeeToken } from "../../../redux/employees_Slices/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import login_Img from '../../../assets/login_Img.webp'

export default function Employees_login() {
  const { employeeToken } = useSelector((state) => state.employee);
  const [IsLoading, setIsLoading] = useState(false)
  const [Error, setError] = useState(false);
  let dispatch = useDispatch();
  // const [HidePassword, setHidePassword] = useState(false);

  async function loginSubmit(values) {
    setIsLoading(true)
    const data = await postDataToApi("/employees/login", values);
    if (data.error) {
      console.log(data.error);
      setError(data.error);
    } else if (data.message == "the user is logged in sucessfully") {
      const Token = "ahmed__" + data.token;
      localStorage.setItem("employeeToken", Token);
      dispatch(setEmployeeToken(Token));
      setError(false);
    }
    setIsLoading(false)
  }

  let validation = Yup.object({
    email: Yup.string()
      .email("This Is InValid Email")
      .required("Email is Required"),
    password: Yup.string()
      .min(8, "minimum length is 8 characters")
      .max(12, "maximum length is 12 characters")
      .required("Password is Required"),
    pinCode: Yup.string().required("The code is Required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      pinCode: "",
    },
    validationSchema: validation,
    onSubmit: loginSubmit,
  });

  if (employeeToken) return <Navigate to={"/employees.panal"} />;

  return (
    <>
      <div
        className={`${styles.containeroBg} w-100 h-100 position-absolute d-flex justify-content-center align-items-center `}
      >
        <div className="row w-100 justify-content-center mx-3">
          <div className={`${styles.ImgSection} rounded-start col-lg-4 col-md-5 col-sm-6 d-sm-block d-none shadow`}>
          <figure className="m-0 p-0 w-100 p-5">
            <img src={login_Img} className="w-100 rounded-start" alt="" />
          </figure>
          </div>
          <div className={`${styles.formSection} shadow p-4 py-5 rounded-end col-lg-4 col-md-5 col-sm-6 text-white`}>
            <h1 className="text-center h3 mb-4">Employees Login</h1>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 form-control shadow-none "
                />
                {formik.errors.email && formik.touched.email ? (
                  <p className=" text-danger fs-14 my-1">{formik.errors.email}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="my-3">
                <label htmlFor="password">Password:</label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 form-control shadow-none "
                />
                {formik.errors.password && formik.touched.password ? (
                  <p className=" text-danger fs-14 my-1">
                    {formik.errors.password}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label htmlFor="pinCode">Code:</label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pinCode}
                  type="text"
                  id="pinCode"
                  name="pinCode"
                  className="mt-1 form-control shadow-none "
                />
                {formik.errors.pinCode && formik.touched.pinCode ? (
                  <p className=" text-danger fs-14 my-1">
                    {formik.errors.pinCode}
                  </p>
                ) : (
                  ""
                )}
              </div>
              {Error && <p className="text-danger text-center my-3 text-capitalize ">{Error}</p>}
              {!IsLoading?
              <button type="submit" className={`btn fw-semibold w-100 ${Error? "mt-1" : "mt-5"} text-white`} style={{backgroundColor:'#9747ff'}}>Login</button>
              :
              <button className='btn fw-semibold w-100 mt-5 text-white' style={{backgroundColor:'#9747ff'}} ><i className="fa-solid fa-spinner fa-spin me-1"></i> Login</button>
              }
            </form>
            <Link
              to={"/employees.ForgetPassword"}
              className={`textGray text-decoration-underline mt-3 d-block text-center`}
            >
              Forget password ?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
