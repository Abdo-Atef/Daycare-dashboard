import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardDetails from '../../../components/CardDetails/CardDetails'
import {  resultgetInterview, setInterviewerRequests } from '../../../redux/interviewer_Slices/interviewerSlice'
import interviewImage from '../../../assets/interview.png'
import styles from './ResultIntervew.module.css'
export default function ResultIntervew() {
    const [showCard,setShowCard]=useState(false)
    const {resultInterviews}=useSelector(state=>state.interviewer)
    const [interviewData,setInterviewData]=useState(null);
    const region=["Zamalek", "Maadi", "Mohandessin", "Garden City", "Dokki", "Heliopolis", "Nasr City", "Downtown Cairo Wust El Balad", "Agouza", "Manial", "El Rehab City", "New Cairo", "Ain Shams", "Shubra", "Helwan", "Sayeda Zeinab", "Abbassiya", "Rod El-Farag", "Shorouk City", "Darb al-Ahmar", "Bab al-Louq", "Giza Square", "Giza Corniche", "Imbaba", "El Marg", "El Basatin", "El Matareya", "El Zaher", "El Tebeen", "El Salam City", "El Sayeda Zainab", "El Khalifa", "El Nozha", "El Masara", "El Sahel", "El Khanka", "El Manyal", "El Darassa", "El Sahel", "El Basateen", "El Waily", "El Waili", "El Tebeen", "El Kholafaa El Rashedeen", "El Mosheer", "El Katameya", "El Qahira", "El Maasara", "Bulaq", "Dar El Salam", "El Omraneya", "El Agouzah", "El Matariya", "El Warraq", "El Zawya El Hamra", "Hadayek El Ahram", "Hadayek Helwan", "Hadayek El Kobba", "Hadayek El Maadi", "Helwan City", "Mokattam", "El Sharabeya", "El Marg", "El Zeitoun", "El Khalifa", "El Gamaliya", "El Moski", "El Khalifa", "El Sawah", "El Darb El Ahmar"]
    let dispatch=useDispatch();
    function handleCard(data){
        setShowCard(true)
        setInterviewData(data)
    }
    // filter state
    async function filterState(value){
        const {payload}=await dispatch(resultgetInterview());
        const state=payload?.filter((request)=>request?.state.toLowerCase().includes(value.toLowerCase()))
         dispatch(setInterviewerRequests(state))
    }
    async function filterRegion(value){
        const {payload}=await dispatch(resultgetInterview());
        const region=payload?.filter((request)=>request?.region.toLowerCase().includes(value.toLowerCase()))
         dispatch(setInterviewerRequests(region))
    }
    async function searchData(value){
        const {payload}=await dispatch(resultgetInterview());
            const data=payload?.filter((request)=>request?.email.toLowerCase().includes(value.toLowerCase()) ||request?.parentName.toLowerCase().includes(value.toLowerCase())||request?.childName.toLowerCase().includes(value.toLowerCase()))
            dispatch(setInterviewerRequests(data))
    }
    // pagination
    const [currentPage,setCurrentPage]=useState(1);
    const [numberPage,setnumberOfPages]=useState(5);
    const totalPages=Math.ceil(resultInterviews?.length/parseInt(numberPage))
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
        <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == 1 || resultInterviews?.length == 0} onClick={() => setCurrentPage(currentPage - 1)}>
            <i className="fa-solid fa-angles-left"></i>
            </button></li>
        {pageNumbers}
        <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == totalPages || resultInterviews?.length == 0} onClick={() => setCurrentPage(currentPage + 1)}>
            <i className="fa-solid fa-angles-right"></i></button>
            </li>
        </ul>;
    }
    useEffect(()=>{
        dispatch(resultgetInterview())
    },[])
  return (
        <div className={`${resultInterviews?.length > 3 ? "":"vh-100"}`}>
            <div className="container">
                <div className="p-4">
                    <div className='py-4 d-flex justify-content-between flex-wrap'>
                        <div className='' style={{width:400}}>
                            <input type="text" onChange={(e)=>searchData(e.target.value)}  placeholder='search By email or parent name or child name' className='form-control shadow'  />
                        </div>
                            <select className='p-2  rounded-2 border-0  ' style={{outline:0}} onChange={(e)=>filterState(e.target.value)}>
                                <option value="interviewing" className='orangeStyle ' >interviewing</option>
                                <option value="accepted" className='greenStyle'>accepted</option>
                                <option value="finalRefused" className='dangerStyle'>finalRefused</option>
                            </select>
                            <select className='p-2  rounded-2 border-0 ' onChange={(e)=>filterRegion(e.target.value)} style={{outline:0}} >
                                {region.map((re)=><option value={re}>{re}</option>)}
                            </select>
                    </div>
                    <div className="row g-4">
                
                    {resultInterviews&&resultInterviews?.length > 0?
                    <>
                        {resultInterviews?.slice(start,end).map((interview)=><div className='col-md-12 col-lg-5 col-xl-4' key={interview.id}>
                        <div className='bg-white shadow   rounded-2 p-2 h-100 position-relative'>
                            <div className='border-bottom px-1 border-2 d-flex align-items-center gap-3'>
                                <div >
                                    {interview?.profilePicture?.secure_url === undefined ? (<div className='text-center p-2 bg-secondary bg-opacity-10 rounded-circle' style={{width:50,height:50}}><i className="fa-solid fa-user fs-3"></i></div>) : (<img src={interview?.profilePicture.secure_url} style={{width:50,height:50}} className='rounded-circle' alt={interview?.parentName} />)}                              
                                </div>
                                <div className='mt-3'>
                                    <p className=''>{interview?.parentName}</p>
                                    <p className=''>{interview?.job}</p>
                                </div>
                            </div>
                            <div className=''>
                                    <div className='p-2'>
                                        <i className="fa-solid fa-person-breastfeeding text-night"></i>
                                        <span className='ms-3'>{interview?.childName}</span>
                                    </div>
                                    
                                    
                                    <div className='p-2'>
                                        <i className="fa-solid fa-inbox text-night"></i>
                                        <span className='px-3'>state<span className={`ms-3 ${interview.state == "accepted"?"greenStyle  p-1 rounded-2 ":interview.state == "interviewing"?"orangeStyle p-1 rounded-2 ":"dangerStyle  p-1 rounded-2"}`}>{interview?.state}</span> </span>
                                    </div>
                                    <div className='p-2'>
                                        <i className="fa-solid fa-calendar-days text-night"></i>
                                        <span className='ms-3'>{interview?.dateOfInterviewing!=null?"interview Day":""} {interview?.dateOfInterviewing!=null?interview.dateOfInterviewing?.slice(0,10):<span className='text-danger'>The interview time has not been set</span>}</span>
                                    </div>
                                    <div className='p-2'>
                                        <i className="fa-solid fa-clock text-night"></i>
                                        <span className='ms-3'>{interview?.dateOfInterviewing!=null?"interview Time":""} {interview?.dateOfInterviewing!=null?interview.dateOfInterviewing.slice(12,16):<span className='text-danger'>The interview time has not been set</span>}</span>
                                    </div>
                                    
                                    {interview.condition !== null?<div className='p-2'>
                                            <i className="fa-solid fa-registered text-night"></i>
                                            <span className='ms-3 '>cause: <span className='dangerStyle rounded-1 px-3'>{interview?.condition}</span> </span>
                                    </div>:""}
                                    <div className='mt-5'>
                                        <div className='position-absolute bottom-0 end-0 p-3 '>
                                            <button className='Btn' onClick={()=>handleCard(interview)} >show Details</button>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>)}
                    </>
                    :<div className='p-5'>
                            <div className='d-flex justify-content-center'>
                                <img src={interviewImage} alt="no-interview" />
                            </div>
                    </div>}
                    
                </div>
                <div className="d-flex align-items-center my-5 justify-content-between position-relative w-100">
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
                    {
                        showCard&&<CardDetails hide={()=>setShowCard(false)} interview={interviewData}/>
                    }
                </div>
            </div>
        </div>
  )
}
