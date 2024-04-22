import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "Yup";
import { postDataToApi } from "../../../utils/api";
import { Link, Navigate } from "react-router-dom";
import { setEmployeeToken } from "../../../redux/employees_Slices/employeeSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Employees_login() {
  const { employeeToken } = useSelector((state) => state.employee);

  const [Error, setError] = useState(false);
  let dispatch = useDispatch();

  async function loginSubmit(values) {
    const data = await postDataToApi("/employees/login", values);
    if (data.error) {
      console.log(data.error);
      setError(data.error);
    } else if (data.message == "the user is logged in sucessfully") {
      const Token = "ahmed__" + data.token
      localStorage.setItem("employeeToken", Token);
      dispatch(setEmployeeToken(Token));
      setError(false);
    }
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
      <div className="bg-dark w-100 h-100 bg-opacity-50 position-absolute row g-0 justify-content-center align-items-center ">
        <div className="bg-body-secondary shadow px-md-5 py-5 px-4 bg-white rounded col-11 col-md-7 col-lg-6 mx-auto ">
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
                className="mt-1 form-control "
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
                className="mt-1 form-control "
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
                className="mt-1 form-control "
              />
              {formik.errors.pinCode && formik.touched.pinCode ? (
                <p className=" text-danger fs-14 my-1">
                  {formik.errors.pinCode}
                </p>
              ) : (
                ""
              )}
            </div>
            {Error && <p className="text-danger text-center my-3 ">{Error}</p>}
            <button
              type="submit"
              className="btn btn-warning fw-semibold w-100 mt-4"
            >
              Login
            </button>
          </form>
          <Link
            to={"/employees.ForgetPassword"}
            className="text-dark text-decoration-underline mt-4 d-block text-center"
          >
            Forget password ?
          </Link>
        </div>
      </div>
    </>
  );
}
