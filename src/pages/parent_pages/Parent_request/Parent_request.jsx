import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import child from "../../../assets/avatar.jpg"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { setParentToken } from '../../../redux/parents_Slices/parent_slices'
import { useFormik } from 'formik'
import * as yup from "yup"
export default function ParentRequest() {
  const { parentToken } = useSelector((state) => state.parent);
  const dispatch=useDispatch();
  const [request, setRequest] = useState(null);
  const navigate=useNavigate();
  const [msg,setMsg]=useState(null)
  function logOut(){
    localStorage.removeItem("parentToken");
    dispatch(setParentToken(null))
    navigate("/parent.login")
  }
  async function getRequest() {
    try {
      const result = await axios.get("http://localhost:3000/requests/requestResult", {
        headers: {
          token: parentToken,
        },
      });
      setRequest(result?.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function updatePassword(value){
    const result=await axios.patch("http://localhost:3000/requests/updatePassword",value,{headers:{token:parentToken}}).catch((err)=>{
      console.log(err);
      setMsg(err)
    })
    console.log(result);
    setMsg(result)
    if(result.data.sucess){
      localStorage.removeItem("parentToken");
      dispatch(setParentToken(null))
      navigate("/parent.login")
    }
  }

  async function changeProfilePic(value){
    const formData = new FormData();
    formData.append("profilePicture", value);

    const result = await axios.patch(`http://localhost:3000/requests/addProfilePhoto`,formData,{
        headers: {
          token: parentToken,
        },
      }
    );
      console.log(result);
    console.log(value);
  }
  const updatePasswordSchema=yup.object({
    oldPassword:yup.string().required("password is required"),
    newPassword:yup.string().min(8,"min length 8").max(20,"max length 20").required("new password is required"),
    rePass:yup.string().oneOf([yup.ref('newPassword')], "confirm password not matches password").required("confirm password is required"),
  })
  const formik=useFormik({
    initialValues:{
      oldPassword:'',
      newPassword:'',
      rePass:''
    },
    onSubmit:updatePassword,
    validationSchema:updatePasswordSchema,
  })
  const formikImage=useFormik({
      initialValues:{
        profilePicture:null,
      },
      onSubmit:changeProfilePic,
  })
  const handleChangeFile = (event) => {
    formikImage.setFieldValue("profilePicture", event.currentTarget.files[0]);
  };
  useEffect(() => {
    getRequest();
  }, []);
  if(!parentToken) return <Navigate to="/parent.login"/>
  return (
        <div className={`${style.request}`}>
            <NavRequest FirstLetter="K" TextLogo="inderLink" LogOut={()=>logOut()}/>
            <div className="container p-5">
              {request && (
                <div className="row">
                  <div className="col-xl-4 col-md-5">
                    <div className={`${style.bgCard} p-4 rounded-3 shadow `}>
                      <div>
                        <img src={child} alt="avatar" className="w-100 rounded-4" />
                      </div>
                      <div className="mt-2">
                        <p className="text-center fs-5">{request?.resulsts?.childName?.slice(0, 12)}</p>
                      </div>
                      {request?.resulsts.state == "accepted"?<form action="" className="d-flex flex-column justify-content-center" onSubmit={formikImage.handleSubmit}>
                        <label htmlFor="photo" className={`d-flex  justify-content-center  align-items-center ${style.changeAvatar} ${style.cursor}`}>Upload picture <i className="fa-solid fa-image ms-2 fs-4 "></i></label>
                        <input type="file" id="photo" className="text-white d-none" name="profilePicture" onChange={handleChangeFile} />
                        <button type='submit' className={`mt-2 m-auto border-0 shadow p-2 rounded-2 ${style.bgBtnReq}`} style={{width:150}}>change</button>
                      </form>:""}
                    </div>
                  </div>
                  <div className="col-xl-8 col-md-7">
                    <h4 className="py-3">My Data</h4>
                    <InputFieldDis label="Parent Name" value={request?.resulsts.parentName} IconType="solid"  IconName="person"/>
                    <InputFieldDis label="Email" value={request?.resulsts.email} IconType="regular" IconName="envelope"/>
                    <InputFieldDis label="Phone" value={request?.resulsts.phone} IconType="solid" IconName="square-phone-flip"/>
                    <InputFieldDis label="State" value={request?.resulsts.state} IconType="solid" IconName="clock"/>
                  </div>
                </div>
              )}
              {
                request?.resulsts.state == "accepted"?<div className='row'>
                    <div className="col-md-4">
                        <form action="" onSubmit={formik.handleSubmit} className={`${style.bgCard} p-4 mt-4 rounded-3 shadow `}>
                          <InputField typeInput="password" label="password" placeholder="Enter your password" value={formik.values.oldPassword} name="oldPassword" onblur={formik.handleBlur} onchange={formik.handleChange}  IconType="solid"  IconName="lock"/>
                          {formik.errors.oldPassword&&formik.touched.oldPassword?<p className='text-danger'>{formik.errors.oldPassword}</p>:""}
                          <InputField typeInput="password" label="new password" placeholder="Enter your new password"  value={formik.values.newPassword} name="newPassword" onblur={formik.handleBlur} onchange={formik.handleChange}  IconType="solid"  IconName="lock"/>
                          {formik.errors.newPassword&&formik.touched.newPassword?<p className='text-danger'>{formik.errors.newPassword}</p>:""}
                          <InputField typeInput="password" label="confirm password" placeholder="Confirm password"  value={formik.values.rePass} name="rePass" onblur={formik.handleBlur} onchange={formik.handleChange}  IconType="solid"  IconName="lock"/>
                          {formik.errors.rePass&&formik.touched.rePass?<p className='text-danger'>{formik.errors.rePass}</p>:""}
                          {msg?.data.sucess == false?<p className='text-danger'>{msg.data.error}</p>:""}
                          <button className={`${style.changeAvatar} mt-3 border-0 shadow `}>change password</button>
                        </form>
                    </div>
                </div>:""
              }
              {
                request?.resulsts.state == "accepted"?<div className={`${style.bgCard} ${style.textColor} mt-4 p-5 text-center rounded-3`}>
                  <p className='mt-3 '> <span className={`${style.textColor2}`}>🎉 Congratulations</span>. You can use the mobile application to enjoy new features and communicate with us 🎉</p>
                </div>:""
              }

            </div>
        </div>
  );
}

function InputFieldDis({ label, value,IconName,IconType }) {
  return (
    <>
      <h6 className="mt-2">{label}</h6>
      <div className={`${style.bgCard} mb-2  rounded-2 d-flex  align-items-center shadow `}>
        <input type="text" className={`${style.search} w-100 ${style.textColor} fw-bold `} value={value} disabled />
        <i className={`fa-${IconType} fa-${IconName}  ${style.textColor} p-3 fs-5`}></i>
      </div>
    </>
  );
}

function InputField({ label,typeInput, value,IconName,IconType,name,onchange,onblur,placeholder }) {
  return (
    <>
      <h6 className="mt-2">{label}</h6>
      <div className={`${style.bgCard} mb-2  rounded-2 d-flex  align-items-center shadow `}>
        <input type={typeInput}  className={`${style.search} w-100 ${style.textColor} `} placeholder={placeholder} value={value} name={name} onBlur={onblur} onChange={onchange} />
        <i className={`fa-${IconType} fa-${IconName}  ${style.textColor} p-3 fs-5`}></i>
      </div>
    </>
  );
}
function NavRequest({TextLogo,FirstLetter,LogOut}){
  
  return (
    <>
        <nav className={`navbar navbar-expand-lg ${style.bgCard} shadow `}>
        <div className="container">
          <Link className="navbar-brand" to="">
            <h5 className={`${style.textSpacing}`}><span className={`fs-2 ${style.textColor} ${style.textShadow}`}>{FirstLetter}</span>{TextLogo}</h5>
          </Link>
          <div className="">
            <ul className="navbar-nav ms-auto ">
              <li >
                <button onClick={LogOut} className={`${style.bgCard2} px-4 py-2 rounded-2 border-0`}>logOut</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

