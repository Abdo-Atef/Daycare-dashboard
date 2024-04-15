import { NavLink } from "react-router-dom";
import Styles from "./sideBar.module.css";
import { useContext } from "react";
import { SideBarContext } from "../../context/SideBar";
// import Logo from '../../assets/logo.png'
// import { SideBarContext } from "../../context/SideBar";
// import { useSelector } from "react-redux";
export default function SideBar() {
  const { SideBarToggle } = useContext(SideBarContext);
  // const { userToken } = useSelector((state)=> state.user);

  return <>
    <ul className={`${Styles.sideBar} sideBar ${SideBarToggle ? "w-60" : "w-250"}`}>
      {/* <li className="user text-center mt-3 mb-0 pb-3" style={{borderBottom:'1px solid #ffffff30'}}>
        <img src={Logo} alt="Logo" style={{width:'40px'}} />
        {!SideBarToggle?<div className="text">
          <h3 className="h5 text-center main-color mb-1 mt-2 text-white">Admin</h3>
        </div>:''}
        
      </li> */}
      <li>
        <NavLink to={'/employees.panal'} end>
          <i className="me-2 fa-solid fa-gauge-high"></i>
          {SideBarToggle ? "" : "DashBoard"}
        </NavLink>
      </li>
      <li>
        <NavLink to={'/employees.panal/groups'} end>
        <i className="me-2 fa-solid fa-users-viewfinder"></i>
          {SideBarToggle ? "" : "Groups"}
        </NavLink>
      </li>
      <li>
        <NavLink to={'/employees.panal/requests'} end>
        <i className="me-2 fa-solid fa-envelope-open-text"></i>
          {SideBarToggle ? "" : "Requests"}
        </NavLink>
      </li>
      <li>
        <NavLink to={'/employees.panal/users'} end>
        <i className="me-2 fa-solid fa-users"></i>
          {SideBarToggle ? "" : "Users"}
        </NavLink>
      </li>
      <li>
        <NavLink to={'/employees.panal/employees'} end>
        <i className="me-2 fa-solid fa-user-tie"></i>
          {SideBarToggle ? "" : "Employees"}
        </NavLink>
      </li>
      <li>
        <NavLink to={'/employees.panal/busses'} end>
        <i className="me-2 fa-solid fa-bus-simple"></i>
          {SideBarToggle ? "" : "Busses"}
        </NavLink>
      </li>
    </ul>
  </>;
}
