import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RequestsThatEvaluatorReview, setEvaluatedRequests } from "../../../redux/employees_Slices/evaluatorSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import imagePlaceHolder from "../../../assets/imagePlaceHolder.svg";
import styles from './styles.module.css';

export default function EvaluatedRequests() {
  let dispatch = useDispatch();
  const { evaluatorRequests } = useSelector((state) => state.evaluator);

  const handleSearch = async (value) => {
    if (totalPages <= currentPage) {
      setCurrentPage(1)
    }
    const {payload} = await dispatch(RequestsThatEvaluatorReview());
    const data = payload.filter((request) => request.parentName.toLowerCase().includes(value.toLowerCase()))
    dispatch(setEvaluatedRequests(data))
  }
  const handleFilter = async (value) => {
    if (value != 'all') {
      const {payload} = await dispatch(RequestsThatEvaluatorReview());
      const data = payload.filter((request) => request.state == value)
      dispatch(setEvaluatedRequests(data))
    }
    else{
      dispatch(RequestsThatEvaluatorReview())
    }
    if (totalPages <= currentPage) {
      setCurrentPage(1)
    }
  }

  const [ModalShow, setModalShow] = useState(false);
  const [SpRequestData, setSpRequestData] = useState(false);

  const handleShowModel = (data) => {
    setSpRequestData(data);
    setModalShow(!ModalShow);
  };


  useEffect(() => {
    dispatch(RequestsThatEvaluatorReview());
  }, []);

  /* -------------------------------- Pagination-------------------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setnumberOfPages] = useState(5);
  const totalPages = Math.ceil(evaluatorRequests?.length / parseInt(numberOfPages));
  
  const handleClick = (page) => {
    setCurrentPage(page);
  };
  const start = (currentPage - 1) * parseInt(numberOfPages);
  const end = start + parseInt(numberOfPages);
  
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li className={`btn ${ currentPage == i ? 'btn-warning ' : 'btn-night'} px-3 mx-1`} key={i} onClick={() => handleClick(i)}>
          {i}
        </li>
      );
    }
    return <ul className={`${styles.paginationStyles} m-0 p-0 list-unstyled d-flex`}>
      <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == 1 || evaluatorRequests?.length == 0} onClick={() => setCurrentPage(currentPage - 1)}>
        <i className="fa-solid fa-angles-left"></i>
        </button></li>
      {pageNumbers}
      <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == totalPages || evaluatorRequests?.length == 0} onClick={() => setCurrentPage(currentPage + 1)}>
        <i className="fa-solid fa-angles-right"></i></button>
        </li>
      </ul>;
  };
  /* ---------------------------------------------------------------- */
  

  return (
    <div className="min-vh-100">
      <div className="container">
        <div className="h4 p-md-4 pb-4 mt-1">The Evaluated Requests</div>
        <div className="row row-cols-md-2 px-md-4">
          <div className='d-flex flex-lg-row flex-column-reverse gap-3 align-items-lg-center'>
            <select onChange={(e)=> handleFilter(e.target.value)} className='form-select shadow-none mt-1' name='role' style={{width:'fit-content'}}>
              <option value="all">All</option>
              <option value="refused">Refused</option>
              <option value="interviewing">Interviewing</option>
              <option value="waiting">Waiting</option>
            </select>
            <input onKeyUp={(e)=> handleSearch(e.target.value)} type="text" placeholder='Search By Name' className='form-control shadow-none'/>
          </div>
        </div>
        <div className="tableContainer px-md-4 overflow-x-auto">
          <table className="table mt-4 w-100" style={{ minWidth: "1070px" }}>
            <thead>
              <tr>
                <td className="bg-night2 text-white fw-semibold ps-4">
                  Parent Name
                </td>
                <td className="bg-night2 text-white fw-semibold">
                  Email Address
                </td>
                <td className="bg-night2 text-white fw-semibold">Location</td>
                <td className="bg-night2 text-white fw-semibold">Phone</td>
                <td className="bg-night2 text-white fw-semibold">State</td>
                <td className="bg-night2 text-white fw-semibold">View</td>
              </tr>
            </thead>
            <tbody>
              {evaluatorRequests?.length > 0 ? (
                <>
                  {evaluatorRequests.slice(start, end).map((user) => (
                    <tr key={user.id}>
                      <td className="text-capitalize ps-3">
                        {user.profilePicture ? (
                          <img
                            src={user.profilePicture.secure_url}
                            alt="profile image"
                            width={30}
                            height={30}
                            className="rounded-circle me-2"
                          />
                        ) : (
                          <i className="fa-solid fa-user fs-14 p-2 bg-secondary bg-opacity-10 rounded-circle me-2"></i>
                        )}
                        {user.parentName}
                      </td>
                      <td>{user.email}</td>
                      <td className="text-capitalize">{user.location}</td>
                      <td>{user.phone}</td>
                      <td className="text-capitalize fs-14 fw-semibold">
                        {user.state == "interviewing" && (
                          <span className="greenStyle pb-1 rounded px-2">
                            {user.state}
                          </span>
                        )}
                        {user.state == "waiting" && (
                          <span className="blueStyle pb-1 rounded px-2">
                            {user.state}
                          </span>
                        )}
                        {user.state == "refused" && (
                          <span className="dangerStyle pb-1 rounded px-2">
                            {user.state}
                          </span>
                        )}
                      </td>
                      <td
                        className="cursor-pointer"
                        onClick={() => handleShowModel(user)}
                      >
                        <i className="fa-solid fa-eye px-2"></i>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-3 fw-semibold">
                    There Are No Evaluated Requests !!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-md-4 mt-3 d-flex align-items-center justify-content-between position-relative w-100">
          <div className="d-flex align-items-center">
            <span className="fs-13 fw-medium  me-1">Show:</span>
            <select onChange={(e)=> setnumberOfPages(e.target.value)} className='form-select shadow-none fs-14' style={{width:'100px'}}>
              <option value="5">5 rows</option>
              <option value="10">10 rows</option>
              <option value="20">20 rows</option>
              <option value="50">50 rows</option>
            </select>
          </div>
          {renderPagination()}
        </div>
        <Modal
          show={ModalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="text-capitalize"
            >
              Request - {SpRequestData.parentName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex gap-5 border-bottom pb-3">
              {SpRequestData.profilePicture ? (
                <figure className=" mb-0 ">
                  <img
                    className="border rounded "
                    width={160}
                    height={160}
                    src={SpRequestData?.profilePicture?.secure_url?.replace(
                      /.*https:\/\//,
                      "https://"
                    )}
                    alt="user image"
                  />
                </figure>
              ) : (
                <div className="">
                  <i
                    className="fa-solid fa-user fs-1 p-2 bg-secondary bg-opacity-10 rounded me-1 d-flex justify-content-center align-items-center "
                    style={{ width: "160px", height: "160px" }}
                  ></i>
                </div>
              )}
              <div>
                <p className="my-2 fw-medium py-1 text-capitalize">
                  Parent Name : {SpRequestData.parentName}
                </p>
                <p className="my-2 fw-medium py-1 text-capitalize">
                  Child Name : {SpRequestData.childName}
                </p>
                <p className="my-2 fw-medium py-1">
                  Email : {SpRequestData.email}
                </p>
                <p className="my-2 fw-medium py-1 text-capitalize">
                  State :
                  {SpRequestData.state == "interviewing" && (
                    <span className="greenStyle pb-1 rounded px-2 ms-2">
                      {SpRequestData.state}
                    </span>
                  )}
                  {SpRequestData.state == "waiting" && (
                    <span className="blueStyle pb-1 rounded px-2 ms-2">
                      {SpRequestData.state}
                    </span>
                  )}
                  {SpRequestData.state == "refused" && (
                    <span className="dangerStyle pb-1 rounded px-2 ms-2">
                      {SpRequestData.state}
                    </span>
                  )}
                </p>
              </div>
            </div>
            {SpRequestData && (
              <div className={`mt-3 pb-4`}>
                <div>
                  <div className="row row-cols-2 my-3">
                    <div>
                      <label className="mb-1 fs-14 fw-medium pb-1">
                        Address:
                      </label>
                      <input
                        type="text"
                        className="form-control bg-opacity-50  bg-body-secondary fs-15 mb-2"
                        disabled
                        defaultValue={SpRequestData.location}
                      />
                    </div>
                    <div>
                      <label className="mb-1 fs-14 fw-medium pb-1">
                        Region:
                      </label>
                      <input
                        type="text"
                        className="form-control bg-opacity-50  bg-body-secondary fs-15"
                        disabled
                        defaultValue={SpRequestData.region}
                      />
                    </div>
                    <div>
                      <label className="mb-1 fs-14 fw-medium pb-1">
                        Phone:
                      </label>
                      <input
                        type="text"
                        className="form-control bg-opacity-50  bg-body-secondary fs-15"
                        disabled
                        defaultValue={SpRequestData.phone}
                      />
                    </div>
                    <div>
                      <label className="mb-1 fs-14 fw-medium pb-1">Job:</label>
                      <input
                        type="text"
                        className="form-control bg-opacity-50  bg-body-secondary fs-15"
                        disabled
                        defaultValue={SpRequestData.job}
                      />
                    </div>
                  </div>
                  <div className="row row-cols-2 my-3">
                    <div>
                      <label className="mb-1 fs-14 fw-medium pb-1">
                        Parent NationalId:
                      </label>
                      <input
                        type="text"
                        className="form-control bg-opacity-50  bg-body-secondary fs-15"
                        disabled
                        defaultValue={SpRequestData.parentNationalId}
                      />
                    </div>
                    <div>
                      <label className="mb-1 fs-14 fw-medium pb-1">
                        Child NationalId:
                      </label>
                      <input
                        type="text"
                        className="form-control bg-opacity-50  bg-body-secondary fs-15"
                        disabled
                        defaultValue={SpRequestData.childNationalId.slice(
                          0,
                          10
                        )}
                      />
                    </div>
                  </div>
                  <div className="row row-cols-2 my-3">
                    <div>
                      <label className="mb-1 fs-14 fw-medium pb-1">
                        BirthDate:
                      </label>
                      <input
                        type="text"
                        className="form-control bg-opacity-50  bg-body-secondary fs-15"
                        disabled
                        defaultValue={SpRequestData.birthDate.slice(0, 10)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row row-cols-2">
                  <div>
                    <h4 className="h6 my-4">NationalId Images:</h4>
                    <div className="d-flex gap-3">
                      <figure className="mb-0">
                        <img
                          onClick={() =>
                            window.open(
                              SpRequestData.nationalIdFile[0].secure_url,
                              "_blank"
                            )
                          }
                          src={imagePlaceHolder}
                          className="mb-2 rounded cursor-pointer"
                          height={70}
                          width={70}
                          alt="nationalIdFile"
                        />
                      </figure>
                      <figure className="mb-0">
                        <img
                          onClick={() =>
                            window.open(
                              SpRequestData.nationalIdFile[1].secure_url,
                              "_blank"
                            )
                          }
                          src={imagePlaceHolder}
                          className="mb-2 rounded cursor-pointer"
                          height={70}
                          width={70}
                          alt="nationalIdFile"
                        />
                      </figure>
                    </div>
                  </div>
                  <div>
                    <h4 className="h6 my-4">Birth Certificate Image:</h4>
                    <figure className="mb-0">
                      <img
                        onClick={() =>
                          window.open(
                            SpRequestData.birthCertificateFile.secure_url,
                            "_blank"
                          )
                        }
                        src={imagePlaceHolder}
                        className="mb-2 rounded cursor-pointer"
                        height={70}
                        width={70}
                        alt="birthCertificateFile"
                      />
                    </figure>
                  </div>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn-night border-0 px-3"
              onClick={() => setModalShow(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}