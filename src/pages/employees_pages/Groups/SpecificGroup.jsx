import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.css'
import Modal from 'react-bootstrap/Modal';
import dayjs from 'dayjs';
import * as Yup from "Yup";
import { useFormik } from "formik";
import Select from 'react-select'
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteGroup, getAllFreeSupervisors, getAllGroups, getSpecificGroupData, removeChildrenFromGroup, removeSupervisorOfGroup, setSpecificGroupData, updateGroup, updateGroupSupervisor } from '../../../redux/employees_Slices/groupSlice';
import Dropdown from 'react-bootstrap/Dropdown';
import WarningModel from '../../../components/WarningModel/WarningModel';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../constants/firebase_config';

export default function SpecificGroup() {
  const {id} = useParams();
  let navigate = useNavigate()
  let dispatch = useDispatch();
  const {spGroupData, allFreeSupervisors} = useSelector(state => state.group) 
  const [checkArray, setcheckArray] = useState([])
  
  const handleSearch = async (value) => {
    if (totalPages <= currentPage) {
      setCurrentPage(1)
    }
    const {payload} = await dispatch(getSpecificGroupData(id));
    console.log(payload);
    // const data = payload.childrenGroup.filter((child) => child.parentName.toLowerCase().includes(value.toLowerCase()))
    // console.log(data);
    // dispatch(setSpecificGroupData(data))
  }
  
  /* -------------------------------- Update Group -------------------------------- */
  
  const [UpdateGroupModalShow, setUpdateGroupModalShow] = useState(false);
  const [UpdateGroupModalShowApiResult, setUpdateGroupModalShowApiResult] = useState(null)
  const [UpdateGroupLoading, setUpdateGroupLoading] = useState(false)

async function UpdateGroup(values, {resetForm}) {
  let params = {
    id : id,
    groupName: values.groupName,
    capacity: values.capacity,
  }
  setUpdateGroupLoading(true)
  let {payload} = await dispatch(updateGroup(params))
  console.log(payload);
  if (payload.sucess) {
    dispatch(setSpecificGroupData(payload.group))
    toast.success("The group is updated sucessfully", {
      position:'bottom-right'
    })
    resetForm();
    setUpdateGroupModalShow(false)
    setcheckArray([])
  }
  else{
    setUpdateGroupModalShowApiResult(payload.error)
  }
  setUpdateGroupLoading(false)
}
let UpdateGroupvalidation = Yup.object({
  groupName: Yup.string().min(4, "minimum length is 4 characters").max(30, "maximum length is 25 characters").required("GroupName is Required"),
  capacity: Yup.string().matches('^[0-9]{1,3}$','Not Valid Capacity').required("Capacity is Required"),
});

const formik1 = useFormik({
  initialValues: {
    groupName:"",
    capacity:""
},
  validationSchema: UpdateGroupvalidation,
  onSubmit: UpdateGroup,
});
  /* -------------------------------- Update Supervisor -------------------------------- */
  
  const [modalShow, setModalShow] = useState(false);
  const [apiResult, setapiResult] = useState(null)
  const [Isloading, setIsloading] = useState(false)

async function updateSupervisor(values, {resetForm}) {
  let params = {
    id : id,
    supervisorId: values.groupSupervisor
  }
  console.log(params);
  setIsloading(true)
  let {payload} = await dispatch(updateGroupSupervisor(params))
  console.log(payload);
  if (payload.sucess) {
    dispatch(getAllFreeSupervisors())
    toast.success("The Supervisor is updated sucessfully", {
      position:'bottom-right'
    })
    resetForm();
    setModalShow(false)
    setcheckArray([])
  }
  else{
    setapiResult(payload.error)
  }
    setIsloading(false)
}
let validation = Yup.object({
  groupSupervisor: Yup.string().required("GroupName is Required"),
});

const formik = useFormik({
  initialValues: {
    groupSupervisor: "",
  },
  validationSchema: validation,
  onSubmit: updateSupervisor,
});

    /* --------------------------------Start Pagination-------------------------------- */
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setnumberOfPages] = useState(5);
    const totalPages = Math.ceil(spGroupData?.childrenGroup?.length / parseInt(numberOfPages));
    
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
        <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == 1 || spGroupData?.childrenGroup?.length == 0} onClick={() => setCurrentPage(currentPage - 1)}>
          <i className="fa-solid fa-angles-left"></i>
          </button></li>
        {pageNumbers}
        <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == totalPages || spGroupData?.childrenGroup?.length == 0} onClick={() => setCurrentPage(currentPage + 1)}>
          <i className="fa-solid fa-angles-right"></i></button>
          </li>
        </ul>;
    };
    /* ---------------------------------End Pagination------------------------------- */
    

    const handleCheck = (value) => {
      for (let i = 0; i < checkArray.length; i++) {
        if (value == checkArray[i]) {
          let data = checkArray.filter(ele => ele != value)
          setcheckArray(data)
          return true;
        }
      }
      const updatedArray = [...checkArray, value];
      setcheckArray(updatedArray);
    }


    const [DeleteModalShow, setDeleteModalShow] = useState(false);
    async function handleDeleteGroup() {
      let {payload} = await dispatch(deleteGroup(id))
      if (payload.sucess) {
        toast.success("The group is deleted sucessfully",{position:'bottom-right'})
        deleteGroupfromFirebase(id)
        dispatch(getAllGroups())
        setDeleteModalShow(false)
        navigate('/employees.panal/groups')
      }
    }

    const deleteGroupfromFirebase = async (id) => {
      try {
        const docRef = doc(db, "chattingGroups", id);
        await deleteDoc(docRef);
      } catch (error) {
        console.log(error);
      }
    };
    
    const [DeleteSelectedModalShow, setDeleteSelectedModalShow] = useState(false);
    async function handleDeleteSelected() {
      const params = {
        childrenIds:checkArray,
        id:id
      }
      let {payload} = await dispatch(removeChildrenFromGroup(params))
      // console.log(payload);
      if (payload.sucess) {
        toast.success("The children is sucessfully removed from the group",{position:'bottom-right'})
        dispatch(setSpecificGroupData(payload.group))
        setDeleteSelectedModalShow(false)
        setcheckArray([])
      }else{
        toast.error(payload.error, {
          position:'bottom-right'
        })
      }
    }
    const [RemoveSVModalShow, setRemoveSVModalShow] = useState(false);
    async function handleRemoveSupervisor() {
      let {payload} = await dispatch(removeSupervisorOfGroup(id))
      console.log(payload);
      if (payload.sucess) {
        toast.success("The Supervisor is removed sucessfully", {
          position:'bottom-right'
        })
        setRemoveSVModalShow(false)
      }
      else{
        toast.error(payload.error, {
          position:'bottom-right'
        })
      }
    }
    /* ---------------------------------------------------------------- */

    useEffect(() => {
      dispatch(getSpecificGroupData(id))
      dispatch(getAllFreeSupervisors())
    }, [])
  
  return (
    <div className='container mx-auto py-3 pt-4 px-lg-4 min-vh-100 '>
      <div>
        <Link to={'/employees.panal/groups'} className='fw-semibold text-dark'>Groups</Link>
        <i className='fa-solid fa-angle-right text-secondary mx-2 fs-13'></i>
        <span className='fw-semibold text-danger text-capitalize'>{spGroupData?.groupName} Group</span>
      </div>
      <div className='justify-content-between align-items-center mt-4 pt-2 row row-cols-md-2 my-4 pt-2'>
        <div className='d-flex flex-lg-row flex-column gap-3 align-items-lg-center'>
          {/* <input onKeyUp={(e)=> handleSearch(e.target.value)} type="text" placeholder='Search By Name' className='form-control shadow-none'/> */}
        </div>
        <div className='d-flex flex-column flex-column-reverse align-items-end'>
          {checkArray.length > 0 && <div className='d-flex align-items-center mt-3'>
          <p className='bg-primary text-white bg-opacity-75  rounded-1 p-1 px-2 mb-0 me-3 fs-13'>{checkArray.length} rows is selected</p>
          <button disabled = {checkArray.length > 0 ? false : true} onClick={() => setDeleteSelectedModalShow(true)} 
          className='btn btn-danger shadow-lg fs-15'><i className="fa-solid fa-trash fs-14 me-2"></i> Delete selected</button>
          </div>}
          <div className='d-flex gap-2'>
            <Dropdown align={'end'}>
              <Dropdown.Toggle 
              className={`${styles.dropDownStyle} btn btn-night shadow-lg fs-15`} variant="success" id="dropdown-basic">
                <i className="fa-solid fa-ellipsis-vertical fs-14 px-1"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setRemoveSVModalShow(true)} className='fs-14 border-bottom'>Remove Supervisor</Dropdown.Item>
                <Dropdown.Item onClick={() => setDeleteModalShow(true)} className='fs-14'>Delete the group</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle className={`${styles.dropDownStyle} btn btn-night shadow-lg fs-15`} variant="success" id="dropdown-basic">
                <i className="fa-solid fa-pen-to-square fs-14 me-2"></i>
                Edit Group
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item className='fs-14 border-bottom' onClick={() => setUpdateGroupModalShow(true)}>Update Group</Dropdown.Item>
                <Dropdown.Item className='fs-14' onClick={() => setModalShow(true)}>Update Supervisor</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="tableContainer overflow-x-auto pb-5">
        <table className='table mt-4 w-100' style={{minWidth:'1070px'}}>
          <thead>
            <tr className=''>
              <td className='bg-night2 text-white fw-semibold'></td>
            <td className='bg-night2 text-white fw-semibold'>Child Name</td>
            <td className='bg-night2 text-white fw-semibold'>Parent Name</td>
            <td className='bg-night2 text-white fw-semibold'>Email Address</td>
            <td className='bg-night2 text-white fw-semibold'>Location</td>
            <td className='bg-night2 text-white fw-semibold'>Joined</td>
            <td className='bg-night2 text-white fw-semibold'>Phone</td>
            </tr>
          </thead>
          <tbody>
            {spGroupData?.childrenGroup?.length > 0 ? (
              <>
                {spGroupData?.childrenGroup.slice(start, end).map((child) => (
                  <tr key={child.id}>
                    <td className='text-center py-2'>
                      <input 
                        onChange={()=> handleCheck(child.id)}
                        type="checkbox"
                        style={{width:'20px', height:'20px'}} 
                        className='cursor-pointer form-check-input' />
                    </td>
                    <td className="text-capitalize py-2 text-capitalize">
                    {child.profilePicture ? (
                        <img
                          src={child.profilePicture.secure_url}
                          alt="profile image"
                          width={30}
                          height={30}
                          className="rounded-circle me-2"
                        />
                      ) : (
                        <i className="fa-solid fa-user fs-14 p-2 bg-secondary bg-opacity-10 rounded-circle me-2"></i>
                      )}
                      {child.childName}
                    </td>
                    <td className='py-2 text-capitalize'>{child.parentName}</td>
                    <td className='py-2'>{child.email}</td>
                    <td className="py-2 text-capitalize">{child.location}</td>
                    <td className='py-2'>{dayjs(child.createdAt).format('MMM D, YYYY')}</td>
                    <td className='py-2 text-capitalize'>{child.phone}</td>
                    
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-3 fw-semibold">
                  There are no children !!
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
      
      {/*------------------ Start update group model ------------------*/}
        <Modal
          show={UpdateGroupModalShow}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={() => setUpdateGroupModalShow (false)}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Update the Group
            </Modal.Title>
          </Modal.Header>
          <form onSubmit={formik1.handleSubmit}>
            <Modal.Body>
              <div className="d-flex flex-column gap-3 pb-3">
                <div>
                  <label htmlFor="groupName" className='mb-1'>Group Name:</label>
                  <input onChange={formik1.handleChange} onBlur={formik1.handleBlur} value={formik1.values.groupName} className='form-control shadow-none mt-1' name='groupName' type="text" id='groupName' />
                  {formik1.errors.groupName && formik1.touched.groupName && 
                    <p className=" text-danger fs-14 my-1"> 
                      {formik1.errors.groupName} 
                    </p>
                  }
                </div>
                <div>
                  <label htmlFor="capacity" className='mb-1'>Capacity:</label>
                  <input onChange={formik1.handleChange} onBlur={formik1.handleBlur} value={formik1.values.capacity} className='form-control shadow-none mt-1' name='capacity' type="text" id='capacity' />
                  {formik1.errors.capacity && formik1.touched.capacity && 
                    <p className=" text-danger fs-14 my-1"> 
                      {formik1.errors.capacity} 
                    </p>
                  }
                </div>
              </div>
              
              {UpdateGroupModalShowApiResult && <p className="text-danger text-center mt-2 text-capitalize">{UpdateGroupModalShowApiResult}</p>}
            </Modal.Body>
            <Modal.Footer>
              <span onClick={()=> setUpdateGroupModalShow(false)} className="btn btn-secondary fs-14 px-3">Cancel</span>
              {!UpdateGroupLoading? 
              <button type="submit" className="btn btn-night fs-14 px-3">Update</button>
              :
              <button className="btn btn-night fs-14 px-3"><i className="fa-solid fa-spinner fa-spin me-1"></i> Update</button>
              }
            </Modal.Footer>
          </form>
        </Modal>
      {/*------------------ End update group model ------------------*/}
      
      {/*------------------ Start update supervisor model ------------------*/}
        <Modal
          show={modalShow}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={() => setModalShow (false)}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Update the supervisor
            </Modal.Title>
          </Modal.Header>
          <form onSubmit={formik.handleSubmit}>
            <Modal.Body>
              <div className="d-flex flex-column gap-3 pb-3">
                <div>
                  <label htmlFor="groupSupervisor" className='mb-1'>Group Supervisor:</label>
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
              <button type="submit" className="btn btn-night fs-14 px-4">Update</button>
              :
              <button className="btn btn-night fs-14 px-3"><i className="fa-solid fa-spinner fa-spin me-1"></i> Update</button>
              }
            </Modal.Footer>
          </form>
        </Modal>
      {/*------------------ end update supervisor model ------------------*/}
      
      {/*------------------ Start WarningModels ------------------*/}

        <WarningModel 
          modelShow={DeleteModalShow} 
          setModelShow={setDeleteModalShow}
          header={'Delete The group'} 
          content={'Are you sure you want to delete the group really ?'}
          saveBtnName={'Delete'}
          saveBtnClasses={'btn btn-danger px-3 fs-14'}
          requiredFn={handleDeleteGroup}
        />

        <WarningModel 
          modelShow={DeleteSelectedModalShow} 
          setModelShow={setDeleteSelectedModalShow}
          header={'Delete The Selected Children'} 
          content={'Are you sure you want to delete the selected children from the group?'}
          saveBtnName={'Delete'}
          saveBtnClasses={'btn btn-danger px-3 fs-14'}
          requiredFn={handleDeleteSelected}
        />

        <WarningModel 
          modelShow={RemoveSVModalShow} 
          setModelShow={setRemoveSVModalShow}
          header={'Remove The Supervisor'} 
          content={'Are you sure you want to remove the supervisor of group really ?'}
          saveBtnName={'Remove'}
          saveBtnClasses={'btn btn-danger px-3 fs-14'}
          requiredFn={handleRemoveSupervisor}
        />
        
      {/*------------------ End WarningModel ------------------*/}
    </div>
  )
}

