import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RequestsThatEvaluatorReview } from '../../../redux/employees_Slices/evaluatorSlice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import imagePlaceHolder from '../../../assets/imagePlaceHolder.svg'

export default function EvaluatedRequests() {

  let dispatch = useDispatch();
  const { evaluatorRequests}=useSelector((state)=>state.evaluator)
  const [ModalShow, setModalShow] = useState(false);
  const [SpRequestData, setSpRequestData] = useState(false);

  const handleShowModel = (data) => {
    setSpRequestData(data)
    setModalShow(!ModalShow)
  }
  
  
  useEffect(() => {
    dispatch(RequestsThatEvaluatorReview());
  }, [])
  
  return (
    <div className='min-vh-100 pb-5'>
      <div className="container">
        <div className="h4 p-4 mt-5">The Evaluated Requests</div>
        <div className="tableContainer px-4 overflow-x-auto">
          <table className='table mt-4 w-100' style={{minWidth:'1070px'}}>
            <thead>
              <tr>
              <td className='bg-night text-white fw-semibold ps-4'>Parent Name</td>
              <td className='bg-night text-white fw-semibold'>Email Address</td>
              <td className='bg-night text-white fw-semibold'>Location</td>
              <td className='bg-night text-white fw-semibold'>Phone</td>
              <td className='bg-night text-white fw-semibold'>State</td>
              <td className='bg-night text-white fw-semibold'>View</td>
              </tr>
            </thead>
            <tbody>
            {evaluatorRequests?.requests.length > 0 ? <>
              {evaluatorRequests?.requests.map((user)=> 
                <tr key={user.id}>
                  <td className='text-capitalize ps-3'> 
                  {user.profilePicture ?
                    <img src={user.profilePicture.secure_url} alt="profile image" width={30} height={30} className='rounded-circle me-2' />
                  :
                    <i className="fa-solid fa-user fs-14 p-2 bg-secondary bg-opacity-10 rounded-circle me-2"></i> 
                  }
                  {user.parentName}</td>
                  <td>{user.email}</td>
                  <td className='text-capitalize'>{user.location}</td>
                  <td>{user.phone}</td>
                  <td className='text-capitalize fs-14 fw-semibold'>
                    {user.state == 'interviewing' && <span className='greenStyle pb-1 rounded px-2'>{user.state}</span> }
                    {user.state == 'waiting' && <span className='blueStyle pb-1 rounded px-2'>{user.state}</span> }
                    {user.state == 'refused' && <span className='dangerStyle pb-1 rounded px-2'>{user.state}</span> }
                  </td>
                  <td className='cursor-pointer' onClick={()=> handleShowModel(user)}><i className='fa-solid fa-eye px-2'></i></td>
                </tr>
              )}
            </> 
            : 
            <tr>
              <td colSpan={6} className='text-center py-3 fw-semibold'>There Are No Evaluated Requests !!</td>
            </tr>}
            </tbody>
          </table>
        </div>
        <Modal
          show={ModalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className='text-capitalize'>
              Request - {SpRequestData.parentName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className='d-flex gap-5 border-bottom pb-3'>
            {SpRequestData.profilePicture ?
              <figure className=' mb-0 '>
                <img className='border rounded ' width={160} height={160} src={SpRequestData?.profilePicture?.secure_url?.replace(/.*https:\/\//, 'https://')} alt="user image" />
              </figure>
            :
            <div className=''>
              <i className="fa-solid fa-user fs-1 p-2 bg-secondary bg-opacity-10 rounded me-1 d-flex justify-content-center align-items-center " style={{width:'160px',height:'160px'}}></i> 
            </div>
            }
            <div>
              <p className='my-2 fw-medium py-1 text-capitalize'>Parent Name : {SpRequestData.parentName}</p>
              <p className='my-2 fw-medium py-1 text-capitalize'>Child Name : {SpRequestData.childName}</p>
              <p className='my-2 fw-medium py-1'>Email : {SpRequestData.email}</p>
              <p className='my-2 fw-medium py-1 text-capitalize'>State : 
              {SpRequestData.state == 'interviewing' && <span className='greenStyle pb-1 rounded px-2 ms-2'>{SpRequestData.state}</span> }
              {SpRequestData.state == 'waiting' && <span className='blueStyle pb-1 rounded px-2 ms-2'>{SpRequestData.state}</span> }
              {SpRequestData.state == 'refused' && <span className='dangerStyle pb-1 rounded px-2 ms-2'>{SpRequestData.state}</span> }
              </p>
            </div>
          </div>
          {SpRequestData && <div className={`mt-3 pb-4`}>
          <div>
            <div className='row row-cols-2 my-3'>
            <div>
              <label className='mb-1 fs-14 fw-medium pb-1'>Address:</label>
              <input type="text" className='form-control bg-opacity-50  bg-body-secondary fs-15 mb-2' disabled defaultValue={SpRequestData.location}/>
            </div>
            <div>
              <label className='mb-1 fs-14 fw-medium pb-1'>Region:</label>
              <input type="text" className='form-control bg-opacity-50  bg-body-secondary fs-15' disabled defaultValue={SpRequestData.region}/>
            </div>
              <div>
                <label className='mb-1 fs-14 fw-medium pb-1'>Phone:</label>
                <input type="text" className='form-control bg-opacity-50  bg-body-secondary fs-15' disabled defaultValue={SpRequestData.phone}/>
              </div>
              <div>
                <label className='mb-1 fs-14 fw-medium pb-1'>Job:</label>
                <input type="text" className='form-control bg-opacity-50  bg-body-secondary fs-15' disabled defaultValue={SpRequestData.job}/>
              </div>
            </div>
            <div className='row row-cols-2 my-3'>
              <div>
                <label className='mb-1 fs-14 fw-medium pb-1'>Parent NationalId:</label>
                <input type="text" className='form-control bg-opacity-50  bg-body-secondary fs-15' disabled defaultValue={SpRequestData.parentNationalId}/>
              </div>
              <div>
                <label className='mb-1 fs-14 fw-medium pb-1'>Child NationalId:</label>
                <input type="text" className='form-control bg-opacity-50  bg-body-secondary fs-15' disabled defaultValue={SpRequestData.childNationalId.slice(0,10)}/>
              </div>
            </div>
            <div className='row row-cols-2 my-3'>
              <div>
                <label className='mb-1 fs-14 fw-medium pb-1'>BirthDate:</label>
                <input type="text" className='form-control bg-opacity-50  bg-body-secondary fs-15' disabled defaultValue={SpRequestData.birthDate.slice(0,10)}/>
              </div>
            </div>
          </div>
          <div className='row row-cols-2'>
            <div>
              <h4 className='h6 my-4'>NationalId Images:</h4>
              <div className='d-flex gap-3'>
                <figure className='mb-0'>
                  <img onClick={()=> window.open(SpRequestData.nationalIdFile[0].secure_url,'_blank')} src={imagePlaceHolder} className='mb-2 rounded cursor-pointer' height={70} width={70} alt="nationalIdFile" />
                </figure>
                  <figure className='mb-0'>
                    <img onClick={()=> window.open(SpRequestData.nationalIdFile[1].secure_url,'_blank')} src={imagePlaceHolder} className='mb-2 rounded cursor-pointer' height={70} width={70} alt="nationalIdFile" />
                  </figure>
              </div>
            </div>
            <div>
              <h4 className='h6 my-4'>Birth Certificate Image:</h4>
              <figure className='mb-0'>
                <img onClick={()=> window.open(SpRequestData.birthCertificateFile.secure_url,'_blank')} src={imagePlaceHolder} className='mb-2 rounded cursor-pointer' height={70} width={70} alt="birthCertificateFile" />
              </figure>
            </div>
          </div>
        </div>}
          
          </Modal.Body>
          <Modal.Footer>
            <Button className='btn-night border-0 px-3' onClick={() => setModalShow(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}
