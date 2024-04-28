import { Link, NavLink } from "react-router-dom";
import Styles from "./sideBar.module.css";
import { useContext } from "react";
import { SideBarContext } from "../../context/SideBar";
import Accordion from "../Accordion/Accordion";
export default function SideBar() {
  const { SideBarToggle } = useContext(SideBarContext);

  return (
    <>
      <ul
        className={`${Styles.sideBar} sideBar bg-night ${
          SideBarToggle ? "-start-250" : "start-0"
        }`}
      >

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
          <NavLink to={"/employees.panal/users"} end>
            <i className="me-2 fa-solid fa-users"></i>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to={"/employees.panal/employees"} end>
          <i className="me-2 fa-solid fa-user-tie fs-17"></i>
            Employees
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
        <li>
          <NavLink to={"/employees.panal/busses"} end>
            <i className="me-2 fa-solid fa-bus-simple"></i>
            Busses
          </NavLink>
        </li>
        <li>
          <NavLink to={"/employees.panal/interview"} end>
            <i className="fa-solid fa-clipboard-question me-2"></i>
              Interview
          </NavLink>
        </li>
        <li>
          <NavLink to={"/employees.panal/EmployeeProfile"} end>
            <i className="me-2 fa-solid fa-gear"></i>
            Settings
          </NavLink>
        </li>
      </ul>
    </>
  );
}
