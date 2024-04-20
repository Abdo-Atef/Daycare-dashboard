import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getAllemployees } from "../../../redux/employees_Slices/employeeSlice";

export default function ManageEmployees() {
  const { employeeToken } = useSelector((state) => state.employee);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllemployees());
  }, []);

  return <div className="vh-100">Employees</div>;
}
