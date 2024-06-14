import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.css'
import Modal from 'react-bootstrap/Modal';
import dayjs from 'dayjs';
import * as Yup from "Yup";
import { useFormik } from "formik";
import Select from 'react-select'
import { toast } from 'react-toastify';
import { addChildrenToGroup, getChildren, getGroupsToSetIn, setChildren } from '../../../redux/employees_Slices/childrenSlice';
import WarningModel from '../../../components/WarningModel/WarningModel';

export default function Groups() {
  const [modalShow, setModalShow] = useState(false);
  const {children, GroupsToSetIn} = useSelector(state => state.children) 
  // console.log(GroupsToSetIn);
  const [checkArray, setcheckArray] = useState([])

  const handleSearch = async (value) => {
    if (totalPages <= currentPage) {
      setCurrentPage(1)
    }
    const {payload} = await dispatch(getChildren());
    const data = payload.filter((child) => child.parentName.toLowerCase().includes(value.toLowerCase()))
    console.log(value);
    console.log(data);
    dispatch(setChildren(data))
  }

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChildren())
    dispatch(getGroupsToSetIn())
  }, [])

  /* -------------------------------- add new Group-------------------------------- */

  const [apiResult, setapiResult] = useState(null)
  const [Isloading, setIsloading] = useState(false)

async function handleAddToGroup(values, {resetForm}) {
  let param = {
    id : values.groupId,
    childrenIds: checkArray
  }
  console.log(param);
  setIsloading(true)
  // console.log(values);
  let {payload} = await dispatch(addChildrenToGroup(param))
  console.log(payload);
  if (payload.suces) {
    dispatch(getChildren())
    toast.success('The children is added to the group sucessfully', {
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
  groupId: Yup.string().required("GroupName is Required"),
});

const formik = useFormik({
  initialValues: {
    groupId: "",
  },
  validationSchema: validation,
  onSubmit: handleAddToGroup,
});

    /* -------------------------------- Pagination-------------------------------- */
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setnumberOfPages] = useState(5);
    const totalPages = Math.ceil(children?.length / parseInt(numberOfPages));
    
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
        <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == 1 || children?.length == 0} onClick={() => setCurrentPage(currentPage - 1)}>
          <i className="fa-solid fa-angles-left"></i>
          </button></li>
        {pageNumbers}
        <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == totalPages || children?.length == 0} onClick={() => setCurrentPage(currentPage + 1)}>
          <i className="fa-solid fa-angles-right"></i></button>
          </li>
        </ul>;
    };
    /* ---------------------------------------------------------------- */
    

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
    /* ---------------------------------------------------------------- */

  
  return (
    <div className='container mx-auto py-3 px-lg-4 min-vh-100 '>
      <h1 className='h4'>Children Without Groups</h1>
      <div className='justify-content-between align-items-center mt-4 pt-2 row row-cols-2'>
        <div className='d-flex flex-lg-row flex-column gap-3 align-items-lg-center'>
          <input onKeyUp={(e)=> handleSearch(e.target.value)} type="text" placeholder='Search By Name' className='form-control shadow-none'/>
        </div>
        <div className='d-flex justify-content-end align-items-center'>
          {checkArray.length > 0 && <>
            <p className='bg-primary text-white bg-opacity-75  rounded-1 p-1 px-2 mb-0 me-3 fs-13'>{checkArray.length} rows is selected</p>
          </>}
          <button disabled = {checkArray.length > 0 ? false : true} onClick={() => setModalShow(true)} className='btn btn-night shadow-lg fs-15'>Add the selected to group</button>
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
              {children?.length > 0 ? (
                <>
                  {children.slice(start, end).map((child) => (
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
                    There are no children without group !!
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
            Add to Group
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className="d-flex flex-column gap-3 pb-3">
              <div>
                <label htmlFor="groupId" className='mb-1'>Group Name:</label>
                <Select 
                  options={GroupsToSetIn} 
                  name="groupId"
                  onChange={value => formik.setFieldValue('groupId', value.value)}
                  onBlur={formik.handleBlur} 
                />
                {formik.errors.groupId && formik.touched.groupId && 
                  <p className=" text-danger fs-14 my-1"> 
                    {formik.errors.groupId} 
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
