import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './style.module.css'
import { getAllRequest, setRequestAdmin } from '../../../redux/admin_slice/adminSlice'
import requestImage from './../../../assets/request.png'
export default function Requests() {
    const {requests}=useSelector((state)=>state.admin)
    const dispatch=useDispatch();
    const region=["Zamalek", "Maadi", "Mohandessin", "Garden City", "Dokki", "Heliopolis", "Nasr City", "Downtown Cairo Wust El Balad", "Agouza", "Manial", "El Rehab City", "New Cairo", "Ain Shams", "Shubra", "Helwan", "Sayeda Zeinab", "Abbassiya", "Rod El-Farag", "Shorouk City", "Darb al-Ahmar", "Bab al-Louq", "Giza Square", "Giza Corniche", "Imbaba", "El Marg", "El Basatin", "El Matareya", "El Zaher", "El Tebeen", "El Salam City", "El Sayeda Zainab", "El Khalifa", "El Nozha", "El Masara", "El Sahel", "El Khanka", "El Manyal", "El Darassa", "El Sahel", "El Basateen", "El Waily", "El Waili", "El Tebeen", "El Kholafaa El Rashedeen", "El Mosheer", "El Katameya", "El Qahira", "El Maasara", "Bulaq", "Dar El Salam", "El Omraneya", "El Agouzah", "El Matariya", "El Warraq", "El Zawya El Hamra", "Hadayek El Ahram", "Hadayek Helwan", "Hadayek El Kobba", "Hadayek El Maadi", "Helwan City", "Mokattam", "El Sharabeya", "El Marg", "El Zeitoun", "El Khalifa", "El Gamaliya", "El Moski", "El Khalifa", "El Sawah", "El Darb El Ahmar"]
    async function filterState(value){
        const {payload}=await dispatch(getAllRequest());
        const state=payload?.filter((request)=>request?.state.toLowerCase().includes(value.toLowerCase()))
         dispatch(setRequestAdmin(state))
    }
    async function searchData(value){
        const {payload}=await dispatch(getAllRequest());
        const data=payload?.filter((request)=>request?.email.toLowerCase().includes(value.toLowerCase()) ||request?.parentName.toLowerCase().includes(value.toLowerCase())||request?.childName.toLowerCase().includes(value.toLowerCase()))
        dispatch(setRequestAdmin(data))
    }
    async function filterRegion(value){
        const {payload}=await dispatch(getAllRequest());
        const region=payload?.filter((request)=>request?.region.toLowerCase().includes(value.toLowerCase()))
         dispatch(setRequestAdmin(region))
    }
  // pagination
  const [currentPage,setCurrentPage]=useState(1);
  const [numberPage,setnumberOfPages]=useState(5);
  const totalPages=Math.ceil(requests?.length/parseInt(numberPage))
  const handleClick=(page)=>{
      setCurrentPage(page)
  }
  const start =(currentPage - 1) * parseInt(numberPage);
  const end=start + parseInt(numberPage)

  const renderPagination=()=>{
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(
              <li className={`btn ${ currentPage == i ? 'btn-warning  ' : 'btn-night'} px-3 mx-1`} key={i} onClick={() => handleClick(i)}>
                  {i}
              </li>
          );
      }
      return <ul className={`${styles.paginationStyles} m-0 p-0 list-unstyled d-flex`}>
      <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == 1 || requests?.length == 0} onClick={() => setCurrentPage(currentPage - 1)}>
          <i className="fa-solid fa-angles-left"></i>
          </button></li>
      {pageNumbers}
      <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == totalPages || requests?.length == 0} onClick={() => setCurrentPage(currentPage + 1)}>
          <i className="fa-solid fa-angles-right"></i></button>
          </li>
      </ul>;
  }
  useEffect(()=>{
    dispatch(getAllRequest());
  },[])
  return (
    <div className={`${requests?.length > 3 ?'':'vh-100'}`}>
        <div className="container">
            <div className='p-4'>
            <div className='py-4 d-flex justify-content-between flex-wrap'>
                        <div className='' style={{width:400}}>
                            <input type="text" onChange={(e)=>searchData(e.target.value)}  placeholder='Search By email or child name or parent name' className='form-control shadow'  />
                        </div>
                        <select   className='p-2  rounded-2 border-0' onChange={(e)=>filterState(e.target.value)} style={{outline:0}} >
                            <option value="interviewing" className='orangeStyle ' >interviewing</option>
                            <option value="accepted" className='greenStyle'>accepted</option>
                            <option value="finalRefused" className='dangerStyle'>finalRefused</option>
                        </select>
                        <select className='p-2  rounded-2 border-0 ' onChange={(e)=>filterRegion(e.target.value)} style={{outline:0}} >
                            {region.map((re)=><option value={re}>{re}</option>)}
                        </select>
            </div>
              {requests!=0? <div className="row g-4">
                {
                requests?.slice(start,end).map((user)=><div className="col-md-12 col-lg-5 col-xl-4" key={user?.id}>
                    <div className='bg-white shadow   rounded-2 p-2 h-100'>
                        <div className='border-bottom px-1 border-2 d-flex align-items-center gap-3'>
                            <div >
                                    {user?.profilePicture?.secure_url === undefined ? (<div className='text-center p-2 bg-secondary bg-opacity-10 rounded-circle' style={{width:50,height:50}}><i className="fa-solid fa-user fs-3"></i></div>) : (<img src={user?.profilePicture.secure_url} onClick={()=>window.open(user?.profilePicture?.secure_url,"_blank")} style={{width:50,height:50}} className='rounded-circle cursor-pointer' alt={user?.parentName} />)}                              
                              </div>
                              <div className='mt-3'>
                                  <p className=''>{user?.parentName}</p>
                                  <p className=''>{user?.location}</p>
                              </div>
                          </div>
                          <div className='position-relative'>
                            <div className='p-2'>
                                <i className="fa-solid fa-envelope"></i>
                                <span className='ms-3'>{user?.email}</span>
                            </div>
                            <div className='p-2'>
                                <i className="fa-solid fa-square-phone-flip"></i>
                                <span className='ms-3'>{user?.phone}</span>
                            </div>
                            <div className='p-2'>
                                <i className="fa-solid fa-square-poll-vertical"></i>
                                <span className={`ms-3 ${user.state=="accepted"?"greenStyle p-1 rounded-2":user.state=="interviewing"?"orangeStyle p-1 rounded-2":"dangerStyle p-1 rounded-2"}`}>{user?.state}</span>
                            </div>
                            <div className='p-2'>
                                <i className="fa-solid fa-location-dot"></i>
                                <span className='ms-3'>{user?.region}</span>
                            </div>
                            <div className='p-2'>
                                <i className="fa-solid fa-calendar text-night"></i>
                                <span className='ms-3'>{user?.birthDate.slice(0,10)}</span>
                            </div>
                            <Link to={`/employees.panal/SpicificRequest/${user.id}`}  className='position-absolute bottom-0 end-0 cursor-pointer bg-secondary bg-opacity-10 p-3 rounded-2'>
                                    <i className="fa-solid fa-arrow-right text-night" ></i>                            
                            </Link>
                          </div>
                      </div>
                    </div>
                  )
                }
                </div>
           :<div className='d-flex justify-content-center align-items-center p-5'>
                <img src={requestImage} alt="request" />
            </div>}
            <div className="d-flex align-items-center my-5  justify-content-between position-relative w-100 ">
                    <div className="d-flex align-items-center">
                        <span className="fs-13 fw-medium  me-1">Show:</span>
                        <select onChange={(e)=> setnumberOfPages(e.target.value)} className='form-select shadow-none fs-14' style={{width:'130px'}}>
                                <option value="5">5 Rows</option>
                                <option value="10">10 Rows</option>
                                <option value="20">20 Rows</option>
                                <option value="50">50 Rows</option>
                        </select>
                    </div>
                    {renderPagination()}
            </div>
            </div>
        </div>
    </div>
  )
}
