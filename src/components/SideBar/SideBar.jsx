import { Link, NavLink, useNavigate, useNavigation } from "react-router-dom";
import Styles from "./sideBar.module.css";
import { useContext, useEffect, useState } from "react";
import { SideBarContext } from "../../context/SideBar";
import Accordion from "../Accordion/Accordion";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
export default function SideBar() {
  let Navigation = useNavigate()
  const { SideBarToggle } = useContext(SideBarContext);
  const { employeeToken } = useSelector((state) => state.employee);
  const [User, setUser] = useState(null);

  const routeChecking = (userData) =>{
    if (userData?.role == "admin") {
      Navigation('/employees.panal')
    }
    if (userData?.role == "evaluator") {
      Navigation('/employees.panal/EvaluatorRequests')
    }
    if (userData?.role == "interviewer") {
      Navigation('/employees.panal/interview')
    }
  }
  
  useEffect(() => {
    const UserData = jwtDecode(employeeToken);
    routeChecking(UserData);
    setUser(UserData);
  }, []);

  return (
    <>
      <ul
        className={`${Styles.sideBar} sideBar bg-night ${
          SideBarToggle ? "-start-250" : "start-0"
        }`}
      >
        {/* ------------------------------------------ Admin Pages ----------------------------------------------- */}
        {User?.role == "admin" && (
          <>
            <li>
              <NavLink to={"/employees.panal"} end>
                <i className="me-2 fa-solid fa-gauge-high"></i>
                DashBoard
              </NavLink>
            </li>
            <li>
              <NavLink to={"/employees.panal/groups"} end>
                <i className="me-2 fa-solid fa-users-viewfinder"></i>
                Groups
              </NavLink>
            </li>
            <li>
              <NavLink to={"/employees.panal/requests"} end>
                <i className="me-2 fa-solid fa-envelope-open-text"></i>
                Requests
              </NavLink>
            </li>
            <li>
              <NavLink to={"/employees.panal/employees"} end>
                <i className="me-2 fa-solid fa-user-tie fs-17"></i>
                Employees
              </NavLink>
            </li>
            <li>
              <NavLink to={"/employees.panal/busses"} end>
                <i className="me-2 fa-solid fa-bus-simple"></i>
                Busses
              </NavLink>
            </li>
          </>
        )}

        {/* ------------------------------------------ Evaluator Pages ----------------------------------------------- */}

        {User?.role == "evaluator" && (
          <>
            <li>
              <NavLink to={"/employees.panal/EvaluatorRequests"}>
                <i className="me-2 fa-solid fa-envelope-open-text"></i>
                Requests
              </NavLink>
            </li>
            <li>
              <NavLink to={"/employees.panal/EvaluatedRequests"}>
              <i className="me-2 fa-solid fa-envelope-circle-check"></i>
                Evaluated Requests
              </NavLink>
            </li>
          </>
        )}

        {/* ------------------------------------------ Interviewer Pages ----------------------------------------------- */}

        {User?.role == "interviewer" && (
          <>
            <li>
              <NavLink to={"/employees.panal/interview"} end>
                <i className="fa-solid fa-clipboard-question me-2"></i>
                Interview
              </NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink to={"/employees.panal/EmployeeProfile"} end>
            <i className="me-2 fa-solid fa-gear"></i>
            Settings
          </NavLink>
        </li>

        {/* <li>
          <Accordion
            heading={
              <span style={{marginLeft:'-3px'}}>
                <i className="me-2 fa-solid fa-user-tie fs-17"></i> Employees
              </span>
            }
            content={
              <>
                <NavLink to={"/employees.panal/manageEmployees"} end>Manage Employees</NavLink>
                <NavLink to={"/employees.panal/addNewEmployees"} end>Add New Employee</NavLink>
                <NavLink to={"/employees.panal/searchForEmployess"} end>Search for Employees</NavLink>
              </>
            }
          />
        </li> */}
      </ul>
    </>
  );
}
