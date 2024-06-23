import { useFormik } from 'formik'
import React, { Fragment, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBus, getAllFreeSupervisor, getBusFilter, setFilterBusSupervisor } from '../../../redux/BusSupervisor_slice/SupervisorSlice';
import * as yup from 'Yup'
import axios from 'axios';
import { BASE_URL } from '../../../utils/api';
import { toast } from 'react-toastify';
import AssignChildModel from './Assign Child Model/AssignChildModel';
import UpdateBus from './UpdateBus/UpdateBus';
import Swal from 'sweetalert2';
import RemoveChild from './removeChildFromBus/RemoveChild';
import { Link } from 'react-router-dom';
import styles from './Busses.module.css'
export default function Busses() {
  const [showbusModel,setShowBusModel]=useState(false);
  const [showChildModel,setShowChildModel]=useState(false);
  const [showUpdateBusModel,setShowUpdateBusModel]=useState(false);
  const [showChildDetailsModel,setShowChildDetailsModel]=useState(false);
  const [ChildDetails,setChildDetails]=useState(null);
  const [showRemoveChildModel,setRemoveChildModel]=useState(false);
  const [BusData,setBusData]=useState(null)
  const [ChildData,setChildData]=useState(null)
  const {freeSupervisor,Busses,filterBus}=useSelector((state)=>state.supervisor)
  const {employeeToken}=useSelector((state)=>state.employee)
  const [popOver,setPopOver]=useState(false);
  const [Popindex,setIndex]=useState(0);
  const [minCapacity, setMinCapacity] = useState(10);
  const [maxCapacity, setMaxCapacity] = useState(100);
  const [filterToggle,setFilterToggle]=useState(false)
  const dispatch=useDispatch()
  function handleChildDetails(data){
    setShowChildDetailsModel(true)
    setChildDetails(data)
  }
  function togglePopHover(value){
    setPopOver(!popOver)
    setIndex(value)
    
  }
  function toggleFilter(){
    setFilterToggle(!filterToggle)
  }
  async function addBus(value){
    try {
      const result=await axios.post(`${BASE_URL}/bus/createBus`,value,{headers:{token:employeeToken}})
      if(result.success==true){
        toast.success(result.data.message)
      }else{
        toast.warning(result.data.error)
      }
      dispatch(getAllBus())
      dispatch(getBusFilter())

    } catch (error) {
      console.log(error);
    }    
  }
  function handleAssignChild(data){
    setBusData(data)
    setShowChildModel(true)
  }
  function handleUpdateBus(data){
      setShowUpdateBusModel(true)
      setBusData(data)
  }
  function handleRemoveChild({BusData,ChildData}){
    setRemoveChildModel(true)
    setBusData(BusData)
    setChildData(ChildData)
  }
  async function deleteBus(id){
    Swal.fire({
      title: "Are you sure Delete Bus?",
      showCancelButton: true,
      confirmButtonText: "Delete Bus",
    }).then(async (result) => { 
      if (result.isConfirmed) {
        try {
          const result=await axios.delete(`${BASE_URL}/bus/deleteSpBus/${id}`,{headers:{token:employeeToken}})
          if(result.data.success==true){
            toast.success(result.data.message)
          }else{
            toast.error(result.data.error)
          }
          Swal.fire("Delete Bus successfully", "", "success");
          dispatch(getAllBus())
          dispatch(getBusFilter())
        } catch (error) {
          Swal.fire("Error", "An error occurred while deleting the request", "error");
        }
      } 
    });
  }
  async function removeSupervisor(id){
    const result=await axios.patch(`${BASE_URL}/bus/removeBusSupervisor/${id}`,{},{headers:{token:employeeToken}})
    console.log(result);
    if(result.data.success==true){
      toast.success(result.data.message)
    }else{
      toast.error(result.data.error)
    }
    dispatch(getAllBus())
    dispatch(getBusFilter())

  }
  async function filterCapacity(min, max) {
    let { payload } = await dispatch(getAllBus());
    const data = payload?.allbuses.filter((bus) => bus?.capacity >= min && bus?.capacity <= max);
    dispatch(setFilterBusSupervisor(data));
  }
  async function search(value) {
    let { payload } = await dispatch(getAllBus());
    const data = payload?.allbuses.filter((bus) => bus?.busSupervisor.name.toLowerCase().includes(value.toLowerCase()) ||bus?.busSupervisor.email.toLowerCase().includes(value.toLowerCase()) );
    dispatch(setFilterBusSupervisor(data));
  }
  const validationSchema=yup.object({
    busName:yup.string().min(2,'min length is 2 character').max(50,'max length is 50 character').required("Bus name is required"),
    busNumber:yup.string().min(6,'min length is 6 character').max(8,'max length is 8 character').required("Bus Number is required"),
    capacity:yup.number().min(10,'min capacity is 10 ').max(100,'max capacity is 100').required("Capacity is required"),
  })
  const formik=useFormik({
    initialValues:{
      busName:'',
      capacity:'',
      busSupervisor:'',
      busNumber:''
    },
    onSubmit:addBus,
    validationSchema,
  })

  // =============> Pagination <==================
  const [currentPage,setCurrentPage]=useState(1);
  const [numberPage,setnumberOfPages]=useState(5);
  const totalPages=Math.ceil(Busses?.allbuses?.length/parseInt(numberPage))
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
      <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == 1 || Busses?.allbuses?.length == 0} onClick={() => setCurrentPage(currentPage - 1)}>
          <i className="fa-solid fa-angles-left"></i>
          </button></li>
      {pageNumbers}
      <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == totalPages || Busses?.allbuses?.length == 0} onClick={() => setCurrentPage(currentPage + 1)}>
          <i className="fa-solid fa-angles-right"></i></button>
          </li>
      </ul>;
  }

  useEffect(()=>{
    dispatch(getAllFreeSupervisor())
    dispatch(getAllBus())
    dispatch(getBusFilter())
    filterCapacity(minCapacity, maxCapacity);
    
    const handleClickOutside = (event) => {
      if (!event.target.closest('.popover-content')) {
        setPopOver(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  },[minCapacity, maxCapacity])
  return (
    <div className='vh-100'>
          <div className="container">
            <div className=' d-flex justify-content-between flex-wrap gap-3 pt-5 position-relative'>
                <div className='cursor-pointer btn bg-night text-white  px-4 py-2' onClick={()=>toggleFilter()}>
                    filter <i className="fa-solid fa-filter fs-5"></i>
                </div>
                <div style={{width:450}}>
                  <input type="text" placeholder='Search By supervisor name Or Email' className='form-control' onChange={(e)=>search(e.target.value)} />
                </div>
                <button onClick={()=>setShowBusModel(true)} className='btn bg-night text-white px-4 py-2'>Add Bus <i className="fa-solid fa-plus"></i></button>
            </div>
              {filterToggle&&<div className='bg-white p-3 rounded-3 position-absolute z-3 shadow my-3' style={{width:300}}>
                  <label htmlFor="minCapacity" className="form-label">Min Bus Capacity</label>
                  <input type="range" className="form-range" min="10" max="100" id="minCapacity" value={minCapacity} onChange={(e) => setMinCapacity(parseInt(e.target.value))}/>
                  <div className="d-flex justify-content-between mt-2">
                    {[...Array(10).keys()].map(num => (
                      <span key={num} style={{ fontSize: '0.75rem' }}>{(num + 1) * 10}</span>
                    ))}
                  </div>
                <label htmlFor="maxCapacity" className="form-label mt-3">Max Bus Capacity</label>
                <input type="range" className="form-range" min="10" max="100" id="maxCapacity" value={maxCapacity} onChange={(e) => setMaxCapacity(parseInt(e.target.value))}/>
                <div className="d-flex justify-content-between mt-2">
                  {[...Array(10).keys()].map(num => (
                    <span key={num} style={{ fontSize: '0.75rem' }}>{(num + 1) * 10}</span>
                  ))}
                </div>
              </div>}
              <div className='position-relative mt-5'>
              <div className='overflow-x-auto  rounded-2'>
                <table className='table table-hover ' style={{minWidth:1070}}>
                  <thead >
                      <tr >
                        <th className='bg-night2 text-white p-3'>Bus Name</th>
                        <th className='bg-night2 text-white p-3'>Bus Number</th>
                        <th className='bg-night2 text-white p-3'>Number of seat</th>
                        <th className='bg-night2 text-white p-3'>Number of child</th>
                        <th className='bg-night2 text-white p-3'>children</th>
                        <th className='bg-night2 text-white p-3'>Bus supervisor</th>
                        <th className='bg-night2 text-white p-3 text-center' >Edit</th>
                      </tr>
                  </thead>
                  <tbody>
  {filterBus && filterBus?.length > 0 ? (
    filterBus?.slice(start, end).map((bus, index) => (
      <tr key={bus.id}>
        <td className='p-3'><i className="fa-solid fa-bus fs-4 text-night"></i> {bus.busName}</td>
        <td className='p-3'>{bus.busNumber}</td>
        <td className='p-3'><i className="fa-solid fa-chair text-night fs-4 ms-5"></i> {bus.capacity}</td>
        <td className='p-3'><i className="fa-solid fa-child text-night fs-4 ms-5"></i> {Busses.busSeatsInformation[index].numberOfChildrenInBus}</td>
        <td>
          <div className='d-flex position-relative'>
            {Busses.busSeatsInformation[index].children.slice(0, 3).map((child) => (
              <div key={child.id} style={{ marginRight: 15, marginTop: 10 }}>
                {child?.profilePicture?.secure_url === undefined ? (
                  <div className='text-center p-2 bg-secondary bg-opacity-10 rounded-circle position-absolute cursor-pointer' onClick={() => setShowChildDetailsModel(true)} style={{ width: 40, height: 40 }}>
                    <i className="fa-solid fa-user fs-4"></i>
                  </div>
                ) : (
                  <img src={child?.profilePicture.secure_url} onClick={() => handleChildDetails(Busses?.busSeatsInformation[index])} style={{ width: 35, height: 35 }} className='rounded-circle position-absolute cursor-pointer' alt={child?.parentName} />
                )}
              </div>
            ))}
          </div>
        </td>
        <td className='p-3'>{bus?.busSupervisor === null ? "No Supervisor" : bus?.busSupervisor?.name}</td>
        <td className='p-3 cursor-pointer text-center' onClick={(e) => { e.stopPropagation(); togglePopHover(index) }}>
          <button onClick={() => togglePopHover(index)} className='btn'><i className="fa-solid fa-ellipsis-vertical"></i></button>
          {(popOver && Popindex === index) && (
            <ul className='rounded-2 p-3 list-unstyled position-absolute bg-white shadow-sm end-0 bottom-0 d-flex flex-column' style={{ transform: 'translate(-60px,-40px)' }}>
              <li className='border-bottom d-flex align-items-center gap-2 p-2' onClick={() => handleAssignChild(bus)}>
                <i className="fa-solid fa-plus"></i> <span>add child</span>
              </li>
              <li className='border-bottom d-flex align-items-center gap-2 p-2' onClick={() => handleRemoveChild({ ChildData: Busses.busSeatsInformation[index], BusData: bus.id })}>
                <i className="fa-solid fa-ban"></i> <span>remove child</span>
              </li>
              <li className='border-bottom d-flex align-items-center gap-2 p-2' onClick={() => handleUpdateBus(bus)}>
                <i className="fa-solid fa-square-pen"></i> <span>update Bus</span>
              </li>
              <li className='border-bottom d-flex align-items-center gap-2 p-2' onClick={() => deleteBus(bus.id)}>
                <i className="fa-solid fa-ban"></i> <span>delete Bus</span>
              </li>
              <li className='d-flex align-items-center gap-2 p-2 border-bottom' onClick={() => removeSupervisor(bus.id)}>
                <i className="fa-solid fa-ban"></i> <span>remove supervisor</span>
              </li>
              <li className='d-flex align-items-center gap-2 p-2'>
                <Link className='text-black' to={`/employees.panal/busses/SpBus/${bus.id}`}>
                  <i className="fa-solid fa-eye"></i> <span>View Bus</span>
                </Link>
              </li>
            </ul>
          )}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7" className="text-center">No Bus Now</td>
    </tr>
  )}
                  </tbody>

                </table>
              </div>
              </div>
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
        
        {/* Add child */}
        {showChildModel&&<AssignChildModel show={showChildModel} hide={()=>setShowChildModel(false)} data={BusData}/>}
        {/* Remove child from Bus */}
        {showRemoveChildModel&&<RemoveChild show={showRemoveChildModel} hide={()=>setRemoveChildModel(false)} BusId={BusData} ChildData={ChildData} />}
        {/* =============== craete Bus =========== */}
          <Modal
                size="lg"
                show={showbusModel}
                onHide={()=>setShowBusModel(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
                >
            <Modal.Header className='border-0' closeButton  style={{backgroundColor:"#1b1b1d",color:'#fff'}}>
                
                        <Modal.Title id="example-modal-sizes-title-lg">
                          Add Bus
                        </Modal.Title>
            </Modal.Header>
            <Modal.Body  style={{backgroundColor:"#1b1b1d"}}>
            <form action="" className='text-white' onSubmit={formik.handleSubmit}>
                    <label htmlFor="busName" className='fs-5 my-2'>Bus Name</label>
                    <input   type="text" name="busName" value={formik.values.busName} onBlur={formik.handleBlur} onChange={formik.handleChange} id='busName' placeholder='Bus name' className='w-100 border-0 text-white rounded-2' style={{outline:0,padding:10,backgroundColor:'hsla(227, 25%, 25%,.35)'}} />
                    {formik.errors.busName&&formik.touched.busName?<p className='text-danger'>{formik.errors.busName}</p>:""}
                    <label htmlFor="capacity" className='fs-5 my-2'>Capacity</label>
                    <input  type="number" name="capacity" value={formik.values.capacity} onBlur={formik.handleBlur} onChange={formik.handleChange} id='capacity' placeholder='Capacity' className='w-100 border-0 text-white rounded-2' style={{outline:0,padding:10,backgroundColor:'hsla(227, 25%, 25%,.35)'}} />
                    {formik.errors.capacity&&formik.touched.capacity?<p className='text-danger'>{formik.errors.capacity}</p>:""}
                    <label htmlFor="busSupervisor" className='fs-5 my-2'>Bus supervisor</label>
                    <select name='busSupervisor'     value={formik.values.busSupervisor } id='busSupervisor'  onChange={formik.handleChange} className='w-100 border-0 text-white rounded-2' style={{outline:0,padding:10,backgroundColor:'hsla(227, 25%, 25%,.35)'}}>
                      {freeSupervisor?.busSuperviosors.map((supervisor)=><option   key={supervisor?.id} value={supervisor?.id}>{supervisor?.name}</option>)}
                    </select>
                    <label htmlFor="busNumber" className='fs-5 my-2'>Bus number</label>
                    <input  type="text" name="busNumber" value={formik.values.busNumber} onBlur={formik.handleBlur} onChange={formik.handleChange} id='busNumber' placeholder='Bus number' className='w-100 border-0 text-white rounded-2' style={{outline:0,padding:10,backgroundColor:'hsla(227, 25%, 25%,.35)'}} />
                    {formik.errors.busNumber&&formik.touched.busNumber?<p className='text-danger'>{formik.errors.busNumber}</p>:""}
                    <button className='btn float-end text-white mt-2 px-5' style={{backgroundColor:'hsla(178, 79%, 39%,.45)'}}>add Bus</button>
                </form>
            </Modal.Body>
        </Modal>
        {/* Child Details */}
        <Modal
                size="xl"
                show={showChildDetailsModel}
                onHide={()=>setShowChildDetailsModel(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
                >
            <Modal.Header className='border-0' closeButton  style={{backgroundColor:"#1b1b1d",color:'#fff'}}>
            </Modal.Header>
            <Modal.Body  style={{backgroundColor:"#1b1b1d"}}>
                  <div className='overflow-x-auto shadow-sm rounded-3'>
                    <table className='table  text-white  table-dark table-hover' style={{minWidth:1070}}>
                        <thead>
                          <tr >
                            <th className='p-3'></th>
                            <th className='p-3'>Child</th>
                            <th className='p-3'>Parent</th>
                            <th className='p-3'>Email</th>
                            <th className='p-3'>Phone</th>
                            <th className='p-3'>Region</th>
                          </tr>
                        </thead>
                        <tbody>
                        {ChildDetails?.children.map((child,index)=><tr  key={child.id} >
                            <td className={index%2==0?'greenStyle ':'orangeStyle  '}>{child?.profilePicture?.secure_url == undefined ? (<div className='text-center p-2 bg-secondary bg-opacity-10 rounded-circle ms-2' style={{width:50,height:50}}><i className="fa-solid fa-user fs-3"></i></div>) : (<img src={child?.profilePicture.secure_url} onClick={()=>window.open(user?.profilePicture?.secure_url,"_blank")} style={{width:50,height:50}} className='rounded-circle cursor-pointer ms-3' alt={child?.parentName} />)}                              </td>
                            <td className={index%2==0?'greenStyle ':'orangeStyle '}>{child.childName}</td>
                            <td className={index%2==0?'greenStyle ':'orangeStyle '}>{child.parentName}</td>
                            <td className={index%2==0?'greenStyle ':'orangeStyle '}>{child.email}</td>
                            <td className={index%2==0?'greenStyle ':'orangeStyle '}>{child.phone}</td>
                            <td className={index%2==0?'greenStyle ':'orangeStyle '}>{child.region}</td>
                          </tr>
                        )}
                        </tbody>
                    </table>
                  </div>
            </Modal.Body>
        </Modal>
        {/* Update Bus */}
        {showUpdateBusModel&&<UpdateBus show={showUpdateBusModel} hide={()=>setShowUpdateBusModel(false)} data={BusData}/>}
    </div>
  )
}
