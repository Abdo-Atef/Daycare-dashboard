import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import child from "../../../assets/avatar.jpg"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { setParentToken } from '../../../redux/parents_Slices/parent_slices'
import { useFormik } from 'formik'
import * as yup from "Yup"
import { BASE_URL } from '../../../utils/api'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
export default function ParentRequest() {
  const { parentToken } = useSelector((state) => state.parent);
  const dispatch=useDispatch();
  const [request, setRequest] = useState(null);
  const navigate=useNavigate();
  const [fileLoading,setFileLoading]=useState(false);
  const [info,setInfo]=useState(null);
  const [showPage,setShowPage]=useState("MyData");
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
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  async function changeProfilePic(value){

    const formData = new FormData();
    for (const key in value) {
      formData.append(key, value[key]);
    }
    setFileLoading(true)
    const result = await axios.patch(`${BASE_URL}/requests/addProfilePhoto`,formData,{
        headers: {
          token: parentToken,
        },
      },
    );
    setFileLoading(false)
    if(result.data.sucess){
      toast.success("The Profile picture is changed sucessfully ")
      getProfilePic();
    }
  }
  async function getProfilePic(){
    setFileLoading(true)
    const result=await axios.get(`${BASE_URL}/requests/getProfileUser`,{headers:{token:parentToken}});
    setInfo(result.data)
    setFileLoading(false)
  }
  const formikImage=useFormik({
      initialValues:{
        profilePicture:null,
      },
      onSubmit:changeProfilePic,
  })
  const handleChangeProfile = (event) => {
    const { name, files } = event.currentTarget;
    formikImage.setFieldValue(name,files[0])
  };
  useEffect(() => {
    getRequest();
    getProfilePic();
  }, []);
  if(!parentToken) return <Navigate to="/parent.login"/>
  return (
        <div className={`${style.request}`}>
            <NavRequest FirstLetter="K" TextLogo="inderLink" LogOut={()=>logOut()}/>
            <div className="container p-5">
              {request && (
                <div className="row pt-5">
                  <div className="col-xl-4 col-md-5">
                    <div className={`${style.bgCard} p-4 rounded-3 shadow mt-4`}>
                      <div>
                        {
                          !fileLoading?<img src={info?.user.profilePicture?.secure_url || child} style={{height:350,objectFit:'fill'}} alt="avatar" className="w-100 rounded-4 " />
                          :<div className={`${style.bgDownload} p-4 d-flex justify-content-center align-items-center rounded-4`} style={{height:350}}>
                              <i className="fa-solid fa-spinner fa-spin-pulse fs-3"></i>
                          </div>
                        }
                      </div>
                      <div className="mt-2">
                        <p className="text-center fs-5">{request?.resulsts?.childName}</p>
                      </div>
                      <form action="" className="d-flex flex-column justify-content-center" onSubmit={formikImage.handleSubmit}>
                        <label htmlFor="photo" className={`d-flex flex-column align-items-center  ${style.bgDownload} rounded-3 shadow p-3 ${style.cursor}`}>
                          <i className={`fa-solid fa-arrow-up-from-bracket fs-3  ${style.textColor} `}></i>
                          {fileLoading?<button className={`${style.changeAvatar} mt-3 border-0 shadow `} disabled ><i className="fa-solid fa-spinner fa-spin-pulse"></i></button>
                          :<button type='submit' className={`mt-3  border-0  px-4 rounded-3 ${style.changeAvatar}`} disabled={!(formikImage.dirty&&formikImage.isValid)} >change</button>
                          }
                        </label>
                        <input type="file" id="photo" className="text-white d-none" name="profilePicture" onChange={handleChangeProfile} />
                      </form>
                    </div>
                  </div>
                  <div className="col-xl-8 col-md-7">
                    <div className={`${style.bgCard} p-4 d-flex justify-content-between align-items-center shadow rounded mt-2 `}>
                        <p  className={`${style.cursor} h6 ${showPage=="MyData"?'text-danger border-bottom border-danger-subtle  border-3 p-1':''}`} onClick={()=>setShowPage("MyData")}>My Data</p>
                        <p className={`${style.cursor} h6 ${showPage=="ChangePassword"?'text-danger border-bottom border-danger-subtle  border-3 p-1':''}` } onClick={()=>setShowPage("ChangePassword")}>Change Password</p>
                        <p className={`${style.cursor} h6 ${showPage=="ChangeData"?'text-danger border-bottom border-danger-subtle  border-3 p-1':''}`} onClick={()=>setShowPage("ChangeData")}>Change Data</p>
                    </div>
                    
                      {showPage == "MyData"&&<MyData/>}
                      {showPage == "ChangePassword"&&<ChangePassword/>}
                      {showPage == "ChangeData"&&<ChangeData/>}
                    
                  </div>
                </div>
              )}
              {
                request?.resulsts.state == "refused"?<div className={`${style.bgRefusedRequest}  mt-4 p-5 text-center rounded-3`}>
                  <p className='mt-3 mt-3 fs-5 text-white '>{request?.resulsts.condition}</p>
                </div>:""
              }
              {
                request?.resulsts.state == "accepted"?<div className={`${style.bgAcceptedRequest} mt-4 p-5 text-center rounded-3`}>
                  <p className='mt-3 fs-5 text-white'> <span className={``}>🎉 Congratulations</span>. You can use the mobile application to enjoy new features and communicate with us 🎉</p>
                </div>:""
              }

            </div>
        </div>
  );
}

function MyData(){
  const { parentToken } = useSelector((state) => state.parent);
  const [request, setRequest] = useState(null);
  const [fileLoading,setFileLoading]=useState(false);
  const [info,setInfo]=useState(null);
  function DeleteRequest(){
    Swal.fire({
      title: "بعتني بكام يصحبي?",
      showCancelButton: true,
      confirmButtonText: "Delete Request",
    }).then(async (result) => { 
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${BASE_URL}/requests/deleteRequest`, { headers: { token: parentToken } });
          logOut();
          Swal.fire("مشفش وشك تاني", "", "success");
        } catch (error) {
          Swal.fire("Error", "An error occurred while deleting the request", "error");
        }
      } 
    });
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
  async function getProfilePic(){
    setFileLoading(true)
    const result=await axios.get(`${BASE_URL}/requests/getProfileUser`,{headers:{token:parentToken}});
    setInfo(result.data)
    setFileLoading(false)
  }
  useEffect(() => {
    getRequest();
    getProfilePic();
  }, []);
  return <>
        <div className='py-3 d-flex justify-content-between align-items-center'>
            <h4 className='m-0'>My Data</h4>
            <div>
              <button className={`${style.cancel} shadow rounded-3 text-white`} onClick={DeleteRequest}>Cancel Submission</button>
            </div>
        </div>
            <InputFieldDis label="Parent Name" value={request?.resulsts.parentName} IconType="solid"  IconName="person"/>
            <InputFieldDis label="Email" value={request?.resulsts.email} IconType="regular" IconName="envelope"/>
            <InputFieldDis label="Phone" value={request?.resulsts.phone} IconType="solid" IconName="square-phone-flip"/>
            <InputFieldDis label="Job" value={info?.user.job} IconType="solid" IconName="briefcase"/>
            <InputFieldDis label="location" value={info?.user.location} IconType="solid" IconName="map"/>
            <InputFieldDis label="State" value={request?.resulsts.state} IconType="solid" IconName="clock"/>
  </>
}
function ChangePassword(){
  const { parentToken } = useSelector((state) => state.parent);
  const [request, setRequest] = useState(null);
  const [loading,setLoading]=useState(false);
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
    setLoading(true)
    const result=await axios.patch("http://localhost:3000/requests/updatePassword",value,{headers:{token:parentToken}})
    if(result.data.sucess){
      logOut()
      toast.success("password updated successfully,login again ")
    }else{
      toast.error(result.data.error)
    }
    setLoading(false)
  }
 
  const updatePasswordSchema=yup.object({
    oldPassword:yup.string(),
    newPassword:yup.string().min(8,"min length 8").max(20,"max length 20"),
    rePass:yup.string().oneOf([yup.ref('newPassword')], "confirm password not matches password"),
  });
 
  const formik=useFormik({
    initialValues:{
      oldPassword:'',
      newPassword:'',
      rePass:''
    },
    onSubmit:updatePassword,
    validationSchema:updatePasswordSchema,
  })
 
  useEffect(() => {
    getRequest();
  }, []);
  return<>
      
        <div className="row flex-row-reverse justify-content-center ">
          <div className="col-md-8 ">
            <form action="" onSubmit={formik.handleSubmit} className={`${style.bgCard} p-4 mt-4 rounded-3 shadow `}>
              <p className='text-center'>When the password is modified, you will log out of the system</p>
              <InputField typeInput="password" label="password" placeholder="Enter your password" value={formik.values.oldPassword} name="oldPassword" onblur={formik.handleBlur} onchange={formik.handleChange}  IconType="solid"  IconName="lock"/>
              {formik.errors.oldPassword?<p className='text-danger'>{formik.errors.oldPassword}</p>:""}
              <InputField typeInput="password" label="new password" placeholder="Enter your new password"  value={formik.values.newPassword} name="newPassword" onblur={formik.handleBlur} onchange={formik.handleChange}  IconType="solid"  IconName="lock"/>
              {formik.errors.newPassword?<p className='text-danger'>{formik.errors.newPassword}</p>:""}
              <InputField typeInput="password" label="confirm password" placeholder="Confirm password"  value={formik.values.rePass} name="rePass" onblur={formik.handleBlur} onchange={formik.handleChange}  IconType="solid"  IconName="lock"/>
              {formik.errors.rePass?<p className='text-danger'>{formik.errors.rePass}</p>:""}
              {
                loading?<button className={`${style.changeAvatar} mt-3 border-0 shadow `} disabled ><i className="fa-solid fa-spinner fa-spin-pulse"></i></button>
                :<button className={`${style.changeAvatar} mt-3 border-0 shadow `} disabled={!(formik.dirty&&formik.isValid)}>Change Password</button>
              }
            </form>
        </div>
        </div>
  </>
}
function ChangeData(){
  const { parentToken } = useSelector((state) => state.parent);
  const dispatch=useDispatch();
  const [request, setRequest] = useState(null);
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);
  const [cirtificateLoading,setCirtificateLoading]=useState(false);
  const [NationLoading,setNationalLoading]=useState(false);
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
  async function updateUserData(fieldName, fieldValue){
    const updatedData = { [fieldName]: fieldValue };
    setLoading(true)
    const result =await axios.patch(`${BASE_URL}/requests/updateRequetsData`,updatedData,{
      headers:{
        token:parentToken,
      }
    }).catch((err)=>{
      console.log(err);
    })
    if(result.data.sucess==true){
      toast.success(result.data.message)
      if(fieldName == "emaill"){
        logOut();
      }
    }
    setLoading(false)
  }
  async function UpdateFile(value){
    const formData = new FormData();
    for (const key in value) {
      formData.append(key, value[key]);
    }
    setCirtificateLoading(true)
    const result=await axios.patch(`${BASE_URL}/requests/updateBirthCertificate`,formData,{headers:{token:parentToken}})
    if(result.data.sucess==true){
      toast.success(result.data.message)
    }
    setCirtificateLoading(false)
  }
  async function UpdateNationalId(values){
    const formData = new FormData();
    values.nationalId.forEach((file, index) => {
      formData.append(`nationalId`, file);
    });
    setNationalLoading(true)
    const result=await axios.patch(`${BASE_URL}/requests/updateNationalId`,formData,{headers:{token:parentToken}})
    setNationalLoading(false)
    if(result.data.sucess == true){
      toast.success(result.data.message)
    }else{
      toast.error("You must upload Two front & back National Id")
    }
  }
  const updateUserDataSchema=yup.object({
      job:yup.string().min(10,"min length 10").max(100,"max length is 100"),
      location:yup.string().min(10,"min length 10").max(100,"max length is 100"),
      emaill:yup.string(),
  })
  const formikData=useFormik({
    initialValues:{
      job:'',
      location:'',
      emaill:'',
    },
    onSubmit:(values)=>{
        for (const fieldName in values) {
          if (values[fieldName]) {
            updateUserData(fieldName, values[fieldName]);
            break;
          }
        }
    },
    validationSchema:updateUserDataSchema,
  })
  const formikUpdateFile=useFormik({
    initialValues:{
      birthCertificate:null
    },
    onSubmit:UpdateFile,
  })
  const formikNational=useFormik({
    initialValues:{
      nationalId:[]
    },
    onSubmit:UpdateNationalId,
  })
  const handleChangeFile = (event) => {
    const { name, files } = event.currentTarget;
    formikUpdateFile.setFieldValue(name, files[0]);
  };
  const handleChangeNationId = (event) => {
    const { name, files } = event.currentTarget;
    formikNational.setFieldValue(name, Array.from(files));
  };
  useEffect(() => {
    getRequest();
  }, []);
  return <>
      <div className="row flex-row-reverse g-4 mt-2 justify-content-center ">
                    {
                      request?.resulsts.evaluatedBy==null?<>
                        <div className="col-md-6">
                            <form className={`${style.bgCard} p-4 rounded-3 shadow d-flex flex-column  justify-content-center align-items-center`} onSubmit={formikUpdateFile.handleSubmit}>
                              <label htmlFor="birthCertificate" className={`${style.bgDownload} w-100 p-5 rounded-3 shadow ${style.cursor}`}>
                                <i className={`fa-solid fa-cloud-arrow-up fs-1 d-flex justify-content-center ${style.textColor} p-4 `}></i>
                                <h4 className={`text-center fs-5 ${style.textColor} `}>Birth Certificate</h4>
                                {
                                  cirtificateLoading?<button className={`${style.changeAvatar} mt-3 border-0 shadow `} disabled ><i className="fa-solid fa-spinner fa-spin-pulse"></i></button>
                                  :<button type='submit' className={`${style.changeAvatar} mt-2 border-0 shadow`} disabled={!(formikUpdateFile.dirty&&formikUpdateFile.isValid)} >Change Certificate</button>
                                }
                              </label>
                              <input type="file" id='birthCertificate' className='d-none' name="birthCertificate" onChange={handleChangeFile} />
                            </form>
                        </div>
                        
                      </>:""
                    }
                    {
                      request?.resulsts.evaluatedBy==null?<>
                        <div className="col-md-6">
                            <form className={`${style.bgCard} p-4 rounded-3 shadow d-flex flex-column  justify-content-center align-items-center`} onSubmit={formikNational.handleSubmit}>
                              <label htmlFor="nationalId" className={`${style.bgDownload} w-100 p-5 rounded-3 shadow ${style.cursor}`}>
                                <i className={`fa-solid fa-cloud-arrow-up fs-1 d-flex justify-content-center ${style.textColor} p-4 `}></i>
                                <h4 className={`text-center fs-5 ${style.textColor} `}>Front & Back national Id</h4>
                                {
                                  NationLoading?<button className={`${style.changeAvatar} mt-3 border-0 shadow `} disabled ><i className="fa-solid fa-spinner fa-spin-pulse"></i></button>
                                  :<button type='submit' className={`${style.changeAvatar} mt-2 border-0 shadow`} disabled={!(formikNational.dirty&&formikNational.isValid)} >Change National Id</button>
                                }
                              </label>
                              <input  type="file" id='nationalId' className='d-none' name="nationalId" onChange={handleChangeNationId} multiple />
                            </form>
                        </div>
                        
                      </>:""
                    }
                    <div className="col-md-6">
                        <form action="" onSubmit={formikData.handleSubmit} className={`${style.bgCard} p-4  rounded-3 shadow `}>
                            {request?.resulsts.evaluatedBy==null?<p className='text-center'>Please when update your email check your email to active new email</p>:""}
                            <InputField typeInput="text" label="Job" placeholder="Enter your Job" value={formikData.values.job} name="job" onblur={formikData.handleBlur} onchange={formikData.handleChange}  IconType="solid"  IconName="briefcase"/>
                            {formikData.errors.job?<p className='text-danger'>{formikData.errors.job}</p>:""}
                            <InputField typeInput="text" label="Location" placeholder="Enter your Location"  value={formikData.values.location} name="location" onblur={formikData.handleBlur} onchange={formikData.handleChange}  IconType="solid"  IconName="map"/>
                            {formikData.errors.location?<p className='text-danger'>{formikData.errors.location}</p>:""}
                            {request?.resulsts.evaluatedBy==null?<>
                            <InputField typeInput="email" label="Email" placeholder="Enter your email "  value={formikData.values.emaill} name="emaill" onblur={formikData.handleBlur} onchange={formikData.handleChange}  IconType="solid"  IconName="envelope"/>
                            {formikData.errors.emaill?<p className='text-danger'>{formikData.errors.emaill}</p>:""}
                            </>:""}
                            {
                                loading?<button className={`${style.changeAvatar} mt-3 border-0 shadow `} disabled ><i className="fa-solid fa-spinner fa-spin-pulse"></i></button>
                                :<button className={`${style.changeAvatar} mt-3 border-0 shadow `} disabled={!(formikData.dirty&&formikData.isValid)}>Change Data</button>
                            }
                        </form>
                    </div>
      </div>
  </>
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
        <nav className={`navbar navbar-expand-lg ${style.bgCard} shadow position-fixed fixed-top `}>
        <div className="container">
          <Link className="navbar-brand" to="">
            <h5 className={`${style.textSpacing}`}><span className={`fs-2 ${style.textColor} ${style.textShadow}`}>{FirstLetter}</span>{TextLogo}</h5>
          </Link>
          <div className="">
            <ul className="navbar-nav ms-auto ">
              <li >
                <button onClick={LogOut} className={`${style.cancel} px-4 py-2 rounded-2 border-0 text-white`}>logOut</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

