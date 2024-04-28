import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "Yup";
import { BASE_URL } from "../../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setEmployeeToken } from "../../../redux/employees_Slices/employeeSlice";
import axios from "axios";

export default function ChangePassword() {
  const { employeeToken } = useSelector((state) => state.employee);

  const [Error, setError] = useState(false);
  const [Success, setSuccess] = useState(false);
  let dispatch = useDispatch();

  async function updateSubmit(values, {resetForm}) {
    let headers = {
      token: employeeToken,
    }
      const data = await axios.patch(`${BASE_URL}/employees/updatePassword`, values, {headers});
      console.log(data.data);
      if (data.data.error == "your old password is not please check your pass") {
        console.log(data.data.error);
        setError('Your old password is not correct');
        setSuccess(false)
      } else if (data.data.message == "the user updated his pass sucessfully") {
        setError(false);
        setSuccess(true)
        resetForm();
        setTimeout(() => {
          localStorage.removeItem('employeeToken')
          dispatch(setEmployeeToken(null));
        }, 3000);
      }
      else{
        setError(data.data.error);
        setSuccess(false)
      }
    }

  let validation = Yup.object({
    oldPassword: Yup.string()
      .min(3, "minimum length is 3 characters")
      .max(12, "maximum length is 12 characters")
      .required("Password is Required"),
    newPassword: Yup.string()
      .min(8, "minimum length is 8 characters")
      .max(12, "maximum length is 12 characters")
      .required("Password is Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Not Equal to password")
      .required("Password is Required"),
  });

  let formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      rePassword: "",
    },
    validationSchema: validation,
    onSubmit: updateSubmit,
  });
  return (
    <div className="py-5 px-3">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="oldPassword">Old Password:</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.oldPassword}
            type="password"
            id="oldPassword"
            name="oldPassword"
            className="mt-1 form-control "
          />
          {formik.errors.oldPassword && formik.touched.oldPassword ? (
            <p className=" text-danger fs-14 my-1">{formik.errors.oldPassword}</p>
          ) : (
            ""
          )}
        </div>
        <div className="my-3">
          <label htmlFor="newPassword">New Password:</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            type="password"
            id="newPassword"
            name="newPassword"
            className="mt-1 form-control "
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <p className=" text-danger fs-14 my-1">{formik.errors.newPassword}</p>
          ) : (
            ""
          )}
        </div>
        <div>
          <label htmlFor="rePassword">Confirm Password:</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            type="password"
            id="rePassword"
            name="rePassword"
            className="mt-1 form-control "
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <p className=" text-danger fs-14 my-1">{formik.errors.rePassword}</p>
          ) : (
            ""
          )}
        </div>
        {Error && <p className="text-danger text-center my-3 ">{Error}</p>}
        {Success && <p className="text-success text-center my-3 ">The password is updated successfully, please Login again</p>}
        <button
          type="submit"
          className={`btn btn-night fw-semibold w-100 mt-4`}
        >
          Update The Password
        </button>
      </form>
    </div>
  );
}
