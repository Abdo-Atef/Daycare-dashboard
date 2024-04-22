import { useContext, useEffect, useState } from "react";
import { SideBarContext } from "../../context/SideBar";
import Style from "./navBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeProfile, setEmployeeToken } from "../../redux/employees_Slices/employeeSlice";
import userImage from '../../assets/userImage.png'
import { Link } from "react-router-dom";

export default function NavBar() {
  const { employeeProfileData}= useSelector(state => state.employee);
  const { SideBarToggle, setSideBarToggle } = useContext(SideBarContext);
  let dispatch = useDispatch();
  const [ProfileToggle, setProfileToggle] = useState(false)

  const signOut = () =>{
    localStorage.removeItem('employeeToken')
    dispatch(setEmployeeToken(null));
  }
  const toggleSideBar = () => {
    SideBarToggle ? setSideBarToggle(false) : setSideBarToggle(true);
  };
  useEffect(() => {
    dispatch(getEmployeeProfile());
  }, [])
  

  return <>
    <nav className={`${Style.navBar} navBar d-flex justify-content-between align-items-center bg-milk py-2`}>
      <button onClick={toggleSideBar}>
      {/* <i className="fa-solid fa-bars"></i> */}
      <svg width="25" height="25" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="burger">
        <path id="Shape" fillRule="evenodd" clipRule="evenodd" d="M0.366667 0.9H19.6333C19.836 0.9 20 1.06909 20 1.27754C20 1.48599 19.836 1.65486 19.6333 1.65486H0.366667C0.164 1.65486 0 1.48622 0 1.27754C0 1.06886 0.164 0.9 0.366667 0.9ZM5.36667 6.0483H19.6333C19.836 6.0483 20 6.2174 20 6.42585C20 6.6343 19.836 6.80316 19.6333 6.80316H5.36667C5.164 6.80316 5 6.6343 5 6.42585C5 6.2174 5.164 6.0483 5.36667 6.0483ZM19.6333 11.1966H0.366667C0.164 11.1966 0 11.3655 0 11.5742C0 11.7826 0.164 11.9517 0.366667 11.9517H19.6333C19.836 11.9517 20 11.7826 20 11.5742C20 11.3655 19.836 11.1966 19.6333 11.1966ZM5.36667 16.3447H19.6333C19.836 16.3447 20 16.5136 20 16.7222C20 16.9309 19.836 17.1 19.6333 17.1H5.36667C5.164 17.1 5 16.9309 5 16.7222C5 16.5136 5.164 16.3447 5.36667 16.3447Z" fill="#1F263E"/>
        </g>
        </svg>
      </button>
      <div className="me-md-5 me-2 position-relative rounded-5 rounded-end-3 shadow-lg bg-night ">
        <div onClick={()=>setProfileToggle(!ProfileToggle)} className="cursor-pointer d-flex justify-content-between align-items-center gap-3">
          <figure className="mb-0 rounded-5 border border-2 border-white">
            <img src={employeeProfileData?.employee.profilePicture.secure_url.replace(/.*https:\/\//, 'https://')} alt="user image" style={{borderRadius:'50%'}} width={40} height={40}/>
          </figure>
          <div className="pe-3 d-flex justify-content-between align-items-center gap-2 textMilk">
            <span className="fs-14 text-capitalize">{employeeProfileData?.employee.name.split(' ').splice(0,2).join(' ')}</span>
            <i className={`fa-solid ${ProfileToggle ? 'fa-angle-down': 'fa-angle-up' } fs-13`}></i>
          </div>
        </div>
        {ProfileToggle && <ul className="position-absolute">
          <li className="border-bottom border-white ">
            <Link onClick={()=> setProfileToggle(false)} to={'/employees.panal/EmployeeProfile'}><i className="fa-solid fa-user fs-14 me-2"></i>My Profile</Link>
          </li>
          <li>
            <a onClick={()=> setProfileToggle(false)} data-bs-toggle="modal" data-bs-target="#exampleModal" className=" cursor-pointer"><i className="fa-solid fa-arrow-right-from-bracket fs-14 me-2"></i> Sign out</a>
          </li>
        </ul>}
      </div>
    </nav>
    
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" style={{marginTop:'9rem'}}>
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Sign out</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body py-4">
            Are You Sure You Want To Sign out ?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-danger px-4" data-bs-dismiss="modal" onClick={signOut}>Yes</button>
          </div>
        </div>
      </div>
    </div>

  </>
}
