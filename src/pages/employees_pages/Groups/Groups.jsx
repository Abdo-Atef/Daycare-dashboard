import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchForGroups, addNewGroup, getAllFreeSupervisors, getAllGroups, setAllGroups } from '../../../redux/employees_Slices/groupSlice';
import styles from './styles.module.css'
import Modal from 'react-bootstrap/Modal';
import dayjs from 'dayjs';
import * as Yup from "Yup";
import { useFormik } from "formik";
import Select from 'react-select'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import avatar1 from '../../../assets/group-01.png'
import avatar2 from '../../../assets/group-02.png'
import avatar3 from '../../../assets/group-03.png'
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../constants/firebase_config';

export default function Children() {
  let navigate = useNavigate()
  const [modalShow, setModalShow] = useState(false);
  const {allGroups, allFreeSupervisors} = useSelector(state => state.group) 

  const handleSearch = (term) => {
    dispatch(SearchForGroups(term))
  }

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllGroups())
    dispatch(getAllFreeSupervisors())
  }, [])

  /* -------------------------------- add new Group-------------------------------- */

  const [apiResult, setapiResult] = useState(null)
  const [Isloading, setIsloading] = useState(false)

  let validation = Yup.object({
  groupName: Yup.string().min(4, "minimum length is 4 characters").max(30, "maximum length is 25 characters").required("GroupName is Required"),
  capacity: Yup.string().matches('^[0-9]{1,3}$','Not Valid Capacity').required("Capacity is Required"),
  groupSupervisor: Yup.string().required("GroupSupervisor is Required"),
});

async function handleAddNewGroup(values, {resetForm}) {
  setIsloading(true)
  let {payload} = await dispatch(addNewGroup(values))
  console.log(payload);
  if (payload.sucess) {
    dispatch(getAllGroups())
    toast.success('The group is created sucessfully', {
      position:'bottom-right'
    })
    createGroupInFriebase(payload.newCreatedGroup)
    dispatch(getAllFreeSupervisors())
    resetForm();
    setIsloading(false)
    setapiResult(null)
    setModalShow(false)
  }
  else{
    setapiResult(payload.error)
    setIsloading(false)
  }
}

const createGroupInFriebase = async (values) => {
  try {
    await setDoc(doc(db, "chattingGroups", values.id), {
      groupId: values.id,
      groupName: values.groupName,
      createdAt: Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    console.log(error);
  }
};


const formik = useFormik({
  initialValues: {
    groupName: "",
    capacity: "",
    groupSupervisor: "",
  },
  validationSchema: validation,
  onSubmit: handleAddNewGroup,
});

    /* -------------------------------- Pagination-------------------------------- */
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setnumberOfPages] = useState(5);
    const totalPages = Math.ceil(allGroups?.groups.length / parseInt(numberOfPages));
    
    const handleClick = (page) => {
      setCurrentPage(page);
    };
    const start = (currentPage - 1) * parseInt(numberOfPages);
    const end = start + parseInt(numberOfPages);
    
    const renderPagination = () => {
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li className={`btn ${ currentPage == i ? 'btn-primary ' : 'btn-night'} px-3 mx-1`} key={i} onClick={() => handleClick(i)}>
            {i}
          </li>
        );
      }
      return <ul className={`${styles.paginationStyles} m-0 p-0 list-unstyled d-flex`}>
        <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == 1 || allGroups?.groups.length == 0} onClick={() => setCurrentPage(currentPage - 1)}>
          <i className="fa-solid fa-angles-left"></i>
          </button></li>
        {pageNumbers}
        <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == totalPages || allGroups?.groups.length == 0} onClick={() => setCurrentPage(currentPage + 1)}>
          <i className="fa-solid fa-angles-right"></i></button>
          </li>
        </ul>;
    };
    /* ---------------------------------------------------------------- */
  
  return (
    <div className='vh-100 container mx-auto py-3 px-lg-4'>
      <h1 className='h4'>Groups Management</h1>
      <div className='justify-content-between align-items-center mt-4 pt-2 row row-cols-2'>
        <div className='d-flex flex-lg-row flex-column gap-3 align-items-lg-center'>
          <input onKeyUp={(e)=> handleSearch(e.target.value)} type="text" placeholder='Search By Name' className='form-control shadow-none'/>
        </div>
        <button onClick={() => setModalShow(true)} className='btn btn-night shadow-lg fs-15 me-2' style={{width:'fit-content'}}><i className="fa-solid fa-plus fs-13"></i> New Group</button>
      </div>
      <div className="tableContainer overflow-x-auto pb-5">
        <table className='table mt-4 w-100 table-hover' style={{minWidth:'1070px'}}>
          <thead>
            <tr className=''>
            <td className='bg-night2 text-white fw-semibold text-start ps-5'>Group Name</td>
            <td className='bg-night2 text-white fw-semibold'>Supervisor</td>
            <td className='bg-night2 text-white fw-semibold'>Students</td>
            <td className='bg-night2 text-white fw-semibold'>Created Date</td>
            <td className='bg-night2 text-white fw-semibold'>Created By</td>
            </tr>
          </thead>
          <tbody>
              {allGroups?.groups.length > 0 ? (
                <>
                  {allGroups?.groups.slice(start, end).map((group, index) => (
                    <tr key={group.id} className='cursor-pointer' onClick={()=> navigate(group.id)}>
                      
                      <td className="text-capitalize py-3 text-start ps-4 text-capitalize">
                        <i className="fa-solid fa-folder fs-5 me-2 p-1" style={{color:'#1100c2'}}></i>
                        {group.groupName}
                      </td>
                      
                      {group.groupSupervisor ? 
                      <td className='py-3 text-capitalize'>{group.groupSupervisor?.name}</td> 
                      :
                      <td className='py-3 text-capitalize text-danger fw-semibold'>None</td> 
                      }
                      <td className="py-3 text-capitalize">
                        <div className='d-flex'>
                          <img src={avatar1} width={33} height={33} className='rounded-circle border border-white border-2' alt="avatar1" />
                          <img src={avatar2} width={33} height={33} className='rounded-circle border border-white border-2' alt="avatar2" style={{marginInlineStart:'-8px'}}/>
                          <img src={avatar3} width={33} height={33} className='rounded-circle border border-white border-2' alt="avatar3" style={{marginInlineStart:'-8px'}} />
                          <span className='rounded-circle border border-white border-2 fs-12 d-flex justify-content-center align-items-center fw-medium' 
                          style={{marginInlineStart:'-8px',width:'35px', height:"35px", backgroundColor:'#e5e7eb'}}>+{allGroups.informationAboutNumbersOfEachGroup[index].theNumberOfChildrnInGroup}</span>
                        </div>
                      </td>
                      <td className='py-3'>{dayjs(group.createdAt).format('MMM D, YYYY')}</td>
                      <td className='py-3 text-capitalize'>{group.createdBy.name}</td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-3 fw-semibold">
                    There Are No Groups !!
                  </td>
                </tr>
              )}
            </tbody>
        </table>
        <div className="d-flex align-items-center justify-content-between position-relative w-100 mt-4">
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
        
      <Modal
        show={modalShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setModalShow (false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            New Group
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className="d-flex flex-column gap-3 pb-3">
              <div>
                <label htmlFor="groupName" className='mb-1'>Group Name:</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.groupName} className='form-control shadow-none mt-1' name='groupName' type="text" id='groupName' />
                {formik.errors.groupName && formik.touched.groupName && 
                  <p className=" text-danger fs-14 my-1"> 
                    {formik.errors.groupName} 
                  </p>
                }
              </div>
              <div>
                <label htmlFor="capacity" className='mb-1'>Capacity:</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.capacity} className='form-control shadow-none mt-1' name='capacity' type="text" id='capacity' />
                {formik.errors.capacity && formik.touched.capacity && 
                  <p className=" text-danger fs-14 my-1"> 
                    {formik.errors.capacity} 
                  </p>
                }
              </div>
              <div>
                <label htmlFor="groupName" className='mb-1'>Supervisor:</label>
                <Select 
                  options={allFreeSupervisors} 
                  name="groupSupervisor"
                  onChange={value => formik.setFieldValue('groupSupervisor', value.value)}
                  onBlur={formik.handleBlur} 
                />
                {formik.errors.groupSupervisor && formik.touched.groupSupervisor && 
                  <p className=" text-danger fs-14 my-1"> 
                    {formik.errors.groupSupervisor} 
                  </p>
                }
              </div>
            </div>
            
            {apiResult && <p className="text-danger text-center mt-2 text-capitalize">{apiResult}</p>}
          </Modal.Body>
          <Modal.Footer>
            <span onClick={()=> setModalShow(false)} className="btn btn-secondary fs-14 px-3">Cancel</span>
            {!Isloading? 
            <button type="submit" className="btn btn-night fs-14 px-4">Add</button>
            :
            <button className="btn btn-night fs-14 px-3"><i className="fa-solid fa-spinner fa-spin me-1"></i> Add</button>
            }
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}
