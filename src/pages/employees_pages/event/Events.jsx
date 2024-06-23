import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEvents } from '../../../redux/employees_Slices/EventSlice';
import { useFormik } from 'formik';
import { Modal } from 'react-bootstrap';
import * as yup from 'Yup';
import axios from 'axios';
import { BASE_URL } from '../../../utils/api';
import { toast } from 'react-toastify';
import styles from './event.module.css';
import eventImg from '../../../assets/event.png'
export default function Events() {
    const {events}=useSelector((state)=>state.events);
    const dispatch=useDispatch()
    const [showEvent,setShowEvent]=useState(false);
    const {employeeToken}=useSelector((state)=>state.employee)
    const [showEventUpdated,setShowEventUpdated]=useState(false)
    const [EventData,setEventData]=useState(null);
    function handleEventUpdated(data){
        setShowEventUpdated(true);
        setEventData(data)
    }
    async function addEvent(value){
        const formData = new FormData();
        for (const key in value) {
            formData.append(key, value[key]);
        }
        const result=await axios.post(`${BASE_URL}/employees/events/addEvent`,formData,{headers:{token:employeeToken}});
                if(result?.data.success===true){
                    toast.success(result.data.message)
                }else{
                    toast.error(result.data.error)
                }
                dispatch(getAllEvents())

    }
    async function deleteEvent(id){
        const result =await axios.delete(`${BASE_URL}/employees/events//deleteEvent/${id}`,{headers:{token:employeeToken}})
        if(result.data.success == true){
            toast.success(result.data.message)
        }else{
            toast.error(result.data.error)
        }
        dispatch(getAllEvents())

    }
    async function updateEvent(value){
        const result=await axios.patch(`${BASE_URL}/employees/events/updateEvent/${EventData}`,value,{headers:{token:employeeToken}})
        if(result.data.success == true){
            toast.success(result.data.message)
        }else{
            toast.error(result.data.error)
        }
        dispatch(getAllEvents())
    }
    const validationSchema=yup.object({
            eventName:yup.string().required(),
            eventPrice:yup.number().required(),
            eventDate:yup.date().required(),
            eventDescribtion:yup.string().required(),
            capacity:yup.number().required(),
    })
    const validationSchemaUpdate=yup.object({
        eventName:yup.string(),
        eventPrice:yup.number(),
        eventDate:yup.date(),
        eventDescribtion:yup.string(),
        capacity:yup.number(),
})
    const formik=useFormik({
        initialValues:{
            eventName:'',
            eventPrice:'',
            eventDate:'',
            eventDescribtion:'',
            capacity:'',
            eventImage:null,
        },
        onSubmit:addEvent,
        validationSchema
    })
    const formikUpdated=useFormik({
        initialValues:{
            eventName:'',
            eventPrice:'',
            eventDate:'',
            eventDescribtion:'',
            capacity:'',
        },
        onSubmit:(value)=>{
           const  updatedValue={}
            if(value.eventName){
                updatedValue.eventName=value.eventName;
            }
            if(value.capacity){
                updatedValue.capacity=value.capacity;
            }
            if(value.eventPrice){
                updatedValue.eventPrice=value.eventPrice;
            }
            if(value.eventDate){
                updatedValue.eventDate=value.eventDate;
            }
            if(value.eventDescribtion){
                updatedValue.eventDescribtion=value.eventDescribtion;
            }
            if (Object.keys(updatedValue).length > 0) {
                updateEvent(updatedValue);
            } else {
                updateEvent(value);
            }
        },
        validationSchema:validationSchemaUpdate,
    })
    const handleChangeFile = (event) => {
        const { name, files } = event.currentTarget;
        formik.setFieldValue(name, files[0]);
    };
    // =============> Pagination <==================
  const [currentPage,setCurrentPage]=useState(1);
  const [numberPage,setnumberOfPages]=useState(5);
  const totalPages=Math.ceil(events?.length/parseInt(numberPage))
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
      <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == 1 || events?.length == 0} onClick={() => setCurrentPage(currentPage - 1)}>
          <i className="fa-solid fa-angles-left"></i>
          </button></li>
      {pageNumbers}
      <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == totalPages || events?.length == 0} onClick={() => setCurrentPage(currentPage + 1)}>
          <i className="fa-solid fa-angles-right"></i></button>
          </li>
      </ul>;
  }
    useEffect(()=>{
        dispatch(getAllEvents())
    },[])
  return (
    <div className='container'>
                <div className="py-5">
                    <h3>Event Management</h3>
                </div>
                <div className="d-flex justify-content-between align-items-center gap-5">
                    <div style={{ width: '500px' }}>
                        <input type="text" className="form-control"  placeholder="Search About Event"/>
                    </div>
                    <div>
                        <button className="btn btn-night" onClick={()=>setShowEvent(true)}>Add Event</button>
                    </div>
                </div>
                <div>
                    <div className="row g-4 py-5">
                        {events&&events.length ==0?<div className='d-flex justify-content-center'>
                                <img src={eventImg} alt="" />
                        </div>: events?.slice(start,end).map((event)=><div className='col-lg-4 col-md-3  '>
                            <div className='bg-white rounded-2 shadow'>
                                <div className='p-2 '>
                                    {event.eventPhotos.map((imgs)=><img className='w-100 rounded-2' src={imgs.secure_url} alt={imgs.public_id} height={'270px'}/>)
                                    }
                                </div>
                                <div className='p-4'>
                                    <h5 className='text-center'><i className="fa-solid fa-route"></i> {event?.eventName}</h5>
                                    <p className='text-secondary text-center py-3'>{event.eventDescribtion.slice(0,100)}</p>
                                    <p><i className="fa-regular fa-clock"></i> {event.eventDate.slice(0,10)}</p>
                                    <div className='orangeStyle p-3 rounded-2 shadow d-flex align-items-center justify-content-between'>
                                        <span >price: {event.eventPrice}$</span>
                                        <span>capacity: {event.capacity}</span>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center gap-5 px-5 py-3'>
                                        <div className='text-center dangerStyle cursor-pointer rounded-2 shadow' onClick={()=>deleteEvent(event?.id)}>
                                            <i className="fa-regular fa-square-minus align-self-end h3 p-3"></i>
                                        </div>
                                        <div className='text-center orangeStyle cursor-pointer rounded-2 shadow' onClick={()=>handleEventUpdated(event?.id)}>
                                            <i className="fa-regular fa-pen-to-square h3 p-3"></i>
                                        </div>
                                </div>
                            </div>
                        </div>)}
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
                    {renderPagination()
                    
                    }
            </div>
                    </div>
                </div>
                {showEvent && (
                <Modal
                    size="lg"
                    show={showEvent}
                    onHide={() => setShowEvent(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                    centered
                >
                    <Modal.Header
                        className="border-0"
                        closeButton
                        style={{ backgroundColor: '#1b1b1d', color: '#fff' }}
                    >
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Add Event
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: '#1b1b1d' }}>
                        <form className="text-white" onSubmit={formik.handleSubmit}>
                            <label htmlFor="eventName" className="fs-5 my-2">Event Name</label>
                            <input type="text" name="eventName" value={formik.values.eventName} onBlur={formik.handleBlur} onChange={formik.handleChange} id="eventName" placeholder="Event Name" className="w-100 border-0 text-white rounded-2" style={{outline: 0,padding: 10,backgroundColor:'hsla(227, 25%, 25%,.35)',}}/>
                            {formik.errors.eventName &&formik.touched.eventName ? <p className="text-danger">{formik.errors.eventName}</p>:''}
                            <label htmlFor="eventDate" className="fs-5 my-2">Event Date</label>
                            <div className="d-flex">
                                <input type="date" value={formik.values.eventDate} name='eventDate' onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder="Event Date" className="form-control"/>
                            </div>
                            {formik.errors.eventDate &&formik.touched.eventDate ? <p className="text-danger">{formik.errors.eventDate}</p>: ''}
                            <label htmlFor="eventDescribtion" className="fs-5 my-2">Description</label>
                            <input type="text" name="eventDescribtion" value={formik.values.eventDescribtion} onBlur={formik.handleBlur} onChange={formik.handleChange} id="eventDescribtion" placeholder="Describtion" className="w-100 border-0 text-white rounded-2" style={{outline: 0, padding: 10,backgroundColor:'hsla(227, 25%, 25%,.35)',}}
                            />
                            {formik.errors.eventDescribtion && formik.touched.eventDescribtion ?<p className="text-danger">{formik.errors.eventDescribtion}</p>: ''}
                            <label htmlFor="eventPrice" className="fs-5 my-2">Price</label>
                            <input type="number" name="eventPrice" value={formik.values.eventPrice} onBlur={formik.handleBlur} onChange={formik.handleChange} id="eventPrice" placeholder="Price" className="w-100 border-0 text-white rounded-2" style={{outline: 0,padding: 10,backgroundColor:'hsla(227, 25%, 25%,.35)',}}/>
                            {formik.errors.eventPrice && formik.touched.eventPrice ? (
                                <p className="text-danger">
                                    {formik.errors.eventPrice}
                                </p>
                            ) : (
                                ''
                            )}
                             <label htmlFor="capacity" className="fs-5 my-2">Capacity</label>
                            <input type="number" name="capacity" value={formik.values.capacity} onBlur={formik.handleBlur} onChange={formik.handleChange} id="capacity" placeholder="capacity" className="w-100 border-0 text-white rounded-2" style={{outline: 0, padding: 10,backgroundColor:'hsla(227, 25%, 25%,.35)',}}
                            />
                            {formik.errors.capacity && formik.touched.capacity ?<p className="text-danger">{formik.errors.capacity}</p>: ''}
                            <label htmlFor="eventImage" className="fs-5 my-2">
                                Image Event
                            </label>
                            <input
                                type="file"
                                name="eventImage"
                                onChange={handleChangeFile}
                                id="eventImage"
                                placeholder="Image Event"
                                className="w-100 border-0 text-white rounded-2"
                                style={{
                                    outline: 0,
                                    padding: 10,
                                    backgroundColor:
                                        'hsla(227, 25%, 25%,.35)',
                                }}
                            />
                            <button
                                type="submit"
                                className="btn float-end text-white mt-2 px-5"
                                style={{
                                    backgroundColor:
                                        'hsla(178, 79%, 39%,.45)',
                                }}
                            >
                                Add Event
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
            )}
             {showEventUpdated && (
                <Modal
                    size="lg"
                    show={showEventUpdated}
                    onHide={() => setShowEventUpdated(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                    centered
                >
                    <Modal.Header
                        className="border-0"
                        closeButton
                        style={{ backgroundColor: '#1b1b1d', color: '#fff' }}
                    >
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Edit Event
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: '#1b1b1d' }}>
                        <form className="text-white" onSubmit={formikUpdated.handleSubmit}>
                            <label htmlFor="eventName" className="fs-5 my-2">Event Name</label>
                            <input type="text" name="eventName" value={formikUpdated.values.eventName} onBlur={formikUpdated.handleBlur} onChange={formikUpdated.handleChange} id="eventName" placeholder="Event Name" className="w-100 border-0 text-white rounded-2" style={{outline: 0,padding: 10,backgroundColor:'hsla(227, 25%, 25%,.35)',}}/>
                            {formikUpdated.errors.eventName &&formikUpdated.touched.eventName ? <p className="text-danger">{formikUpdated.errors.eventName}</p>:''}
                            <label htmlFor="eventDate" className="fs-5 my-2">Event Date</label>
                            <div className="d-flex">
                                <input type="date" value={formikUpdated.values.eventDate} name='eventDate' onBlur={formikUpdated.handleBlur} onChange={formikUpdated.handleChange} placeholder="Event Date" className="form-control"/>
                            </div>
                            {formikUpdated.errors.eventDate &&formikUpdated.touched.eventDate ? <p className="text-danger">{formikUpdated.errors.eventDate}</p>: ''}
                            <label htmlFor="eventDescribtion" className="fs-5 my-2">Description</label>
                            <input type="text" name="eventDescribtion" value={formikUpdated.values.eventDescribtion} onBlur={formikUpdated.handleBlur} onChange={formikUpdated.handleChange} id="eventDescribtion" placeholder="Describtion" className="w-100 border-0 text-white rounded-2" style={{outline: 0, padding: 10,backgroundColor:'hsla(227, 25%, 25%,.35)',}}
                            />
                            {formikUpdated.errors.eventDescribtion && formikUpdated.touched.eventDescribtion ?<p className="text-danger">{formikUpdated.errors.eventDescribtion}</p>: ''}
                            <label htmlFor="eventPrice" className="fs-5 my-2">Price</label>
                            <input type="number" name="eventPrice" value={formikUpdated.values.eventPrice} onBlur={formikUpdated.handleBlur} onChange={formikUpdated.handleChange} id="eventPrice" placeholder="Price" className="w-100 border-0 text-white rounded-2" style={{outline: 0,padding: 10,backgroundColor:'hsla(227, 25%, 25%,.35)',}}/>
                            {formikUpdated.errors.eventPrice && formikUpdated.touched.eventPrice ? (
                                <p className="text-danger">
                                    {formikUpdated.errors.eventPrice}
                                </p>
                            ) : (
                                ''
                            )}
                             <label htmlFor="capacity" className="fs-5 my-2">Capacity</label>
                            <input type="number" name="capacity" value={formikUpdated.values.capacity} onBlur={formikUpdated.handleBlur} onChange={formikUpdated.handleChange} id="capacity" placeholder="capacity" className="w-100 border-0 text-white rounded-2" style={{outline: 0, padding: 10,backgroundColor:'hsla(227, 25%, 25%,.35)',}}
                            />
                            {formikUpdated.errors.capacity && formikUpdated.touched.capacity ?<p className="text-danger">{formikUpdated.errors.capacity}</p>: ''}
                            
                            <button
                                type="submit"
                                className="btn float-end text-white mt-2 px-5"
                                style={{
                                    backgroundColor:
                                        'hsla(178, 79%, 39%,.45)',
                                }}
                            >
                                Edit Event
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
            )}
    </div>
  )
}
