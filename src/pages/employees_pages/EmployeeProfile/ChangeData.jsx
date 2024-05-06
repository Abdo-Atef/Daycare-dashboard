import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "Yup";
import { BASE_URL } from "../../../utils/api";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ChangeData({UserId}) {
  const { employeeToken } = useSelector((state) => state.employee);
  const [Error, setError] = useState(false);
  const [Success, setSuccess] = useState(false);
  const [Isloading, setIsloading] = useState(false)

  async function updateSubmit(values, { resetForm }) {
    setIsloading(true)
    let headers = {
      token: employeeToken,
    };
    const data = await axios.patch(
      `${BASE_URL}/employees/updateDataOfUser/${UserId}`,
      values,
      { headers }
    );
    console.log(data.data);
      if (data.data.message == "the employeeData is updated sucessfully") {
        setError(false);
        setSuccess(true)
        resetForm();
      }
      else{
        setError(data.data.error);
        setSuccess(false)
      }
      setIsloading(false)
  }

  let validation = Yup.object({
    phone: Yup.string()
      .matches('^01[0125][0-9]{8}$','Not Valid Egyptian Number')
      .required("Phone is Required"),
    address: Yup.string()
      .min(6, "minimum length is 6 characters")
      .max(35, "maximum length is 35 characters")
      .required("Address is Required"),
  });

  let formik = useFormik({
    initialValues: {
      phone: "",
      address: "",
    },
    validationSchema: validation,
    onSubmit: updateSubmit,
  });
  return (
    <div className="py-5 px-3">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="phone">New Phone:</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            type="text"
            id="phone"
            name="phone"
            className="mt-1 form-control "
          />
          {formik.errors.phone && formik.touched.phone ? (
            <p className=" text-danger fs-14 my-1">
              {formik.errors.phone}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="my-3">
          <label htmlFor="address">New Address:</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            type="text"
            id="address"
            name="address"
            className="mt-1 form-control "
          />
          {formik.errors.address && formik.touched.address ? (
            <p className=" text-danger fs-14 my-1">
              {formik.errors.address}
            </p>
          ) : (
            ""
          )}
        </div>
        {Error && <p className="text-danger text-center my-3 ">{Error}</p>}
        {Success && (
          <p className="text-success text-center my-3 ">
            The Data is updated successfully
          </p>
        )}
        {!Isloading ?
          <button type="submit" className={`btn btn-night fw-semibold py-2 w-100 mt-4`} >Update The Data</button>
          :
          <button className={`btn btn-night fw-semibold py-2 w-100 mt-4`} >
            <i className="fa-solid fa-spinner fa-spin me-1"></i>
            Update The Data
          </button>
        }
      </form>
    </div>
  );
}
