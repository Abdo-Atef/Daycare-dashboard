import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './styles.module.css'
import axios from 'axios';
import { BASE_URL } from '../../../utils/api';
import { toast } from 'react-toastify';

export default function SpRequestToEvaluator() {
  let {email} = useParams()
  const [SpRequestDetails, setSpRequestDetails] = useState(null)
  
  const getSpRequestToEvaluator = async(email)=>{
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      const data = await axios.get(`${BASE_URL}/employees/reviewRequest/getSpRequestToEvaluator?email=${email}`, {headers});
      console.log(data.data);
      setSpRequestDetails(data.data)
    } catch (error) {
      console.log(error);
      return error
    }
  }
  
  /* -------------------------------------------------------------------- */
  
  const [causeInput, setcauseInput] = useState(false)
  let selectRef = useRef();
  let causeRef = useRef();

  function handleSelectChange(e) {
    if (e.target.value == 'interviewing') {
      setcauseInput(false)
    }
    else{
      setcauseInput(true)
    }
  }
  
  
  const [Isloading, setIsloading] = useState(false)
  const [SubmitResult, setSubmitResult] = useState(null)
  const navigate = useNavigate();

  const reviewSpRequestByEvaluator = async(values)=>{
        setIsloading(true)
        const headers = {
          token : localStorage.getItem('employeeToken')
        }
        const data = await axios.patch(`${BASE_URL}/employees/reviewRequest/reviewByEvalauator/${SpRequestDetails.request.id}`, values, {headers});
        console.log(data.data);
        if (data.data.error) {
          setSubmitResult(data.data.error)
        }
        else if(data.data.sucess){
          setSubmitResult(false)
          toast.success(data.data.messsage, {
            position:'bottom-right',
            className:'text-capitalize'
          })
          setTimeout(() => {
            navigate('/employees.panal/EvaluatorRequests')
          }, 2000);
        }
        setIsloading(false)
    } 
  
  function handleSubmit() {
    if (selectRef.current.value == 'interviewing') {
      let values = {
        state:selectRef.current.value,
      }
      reviewSpRequestByEvaluator(values)
    }
    else{
      let values = {
        state:selectRef.current.value,
        condition:causeRef.current.value
      }
      reviewSpRequestByEvaluator(values)
    }
  }


  useEffect(() => {
    getSpRequestToEvaluator(email)
  }, [])
  
  
  return (
    <div className='container py-3'>
      <div className='bg-white p-4 rounded-1'>
        <div>
          <Link to={'/employees.panal/EvaluatorRequests'} className='fw-semibold text-secondary fs-14'>Requests</Link>
          <i className='fa-solid fa-angle-right text-secondary mx-2 fs-13'></i>
          <span className='fw-semibold fs-14'>Requset Details</span>
        </div>
        {SpRequestDetails && <div className={`${styles.requestDetailsCo} mt-5 pt-2 row row-cols-lg-2 position-relative border-bottom pb-4`}>
          <div>
            <h3 className='h5 mb-4'>Basic Information</h3>
            <div>
              <label className='mb-1 fs-14 fw-medium pb-1'>Email:</label>
              <input type="text" className='form-control bg-opacity-50  bg-body-secondary fs-15 ' disabled defaultValue={SpRequestDetails.request.email}/>
            </div>
            <div className='row row-cols-2 my-3'>
              <div>
                <label className='mb-1 fs-14 fw-medium pb-1'>Phone:</label>
                <input type="text" className='form-control bg-opacity-50  bg-body-secondary fs-15' disabled defaultValue={SpRequestDetails.request.phone}/>
              </div>
              <div>
                <label className='mb-1 fs-14 fw-medium pb-1'>Job:</label>
                <input type="text" className='form-control bg-opacity-50  bg-body-secondary fs-15' disabled defaultValue={SpRequestDetails.request.job}/>
              </div>
            </div>
            <div>
              <label className='mb-1 fs-14 fw-medium pb-1'>Full Name:</label>
              <input type="text" className='form-control bg-opacity-50  bg-body-secondary fs-15 ' disabled defaultValue={SpRequestDetails.request.parentName}/>
            </div>
            <div className='row row-cols-2 my-3'>
              <div>
                <label className='mb-1 fs-14 fw-medium pb-1'>ChildName:</label>
                <input type="text" className='form-control bg-opacity-50  bg-body-secondary fs-15' disabled defaultValue={SpRequestDetails.request.childName}/>
              </div>
              <div>
                <label className='mb-1 fs-14 fw-medium pb-1'>BirthDate:</label>
                <input type="text" className='form-control bg-opacity-50  bg-body-secondary fs-15' disabled defaultValue={SpRequestDetails.request.birthDate.slice(0,10)}/>
              </div>
            </div>
            <div className='row row-cols-2 my-3'>
              <div>
                <label className='mb-1 fs-14 fw-medium pb-1'>Parent NationalId:</label>
                <input type="text" className='form-control bg-opacity-50  bg-body-secondary fs-15' disabled defaultValue={SpRequestDetails.request.parentNationalId}/>
              </div>
              <div>
                <label className='mb-1 fs-14 fw-medium pb-1'>Child NationalId:</label>
                <input type="text" className='form-control bg-opacity-50  bg-body-secondary fs-15' disabled defaultValue={SpRequestDetails.request.childNationalId.slice(0,10)}/>
              </div>
            </div>
            <h3 className='h5 my-4'>Address Information</h3>
            <div>
              <label className='mb-1 fs-14 fw-medium pb-1'>Address:</label>
              <input type="text" className='form-control bg-opacity-50  bg-body-secondary fs-15 mb-2' disabled defaultValue={SpRequestDetails.request.location}/>
            </div>
            <div>
              <label className='mb-1 fs-14 fw-medium pb-1'>Region:</label>
              <input type="text" className='form-control bg-opacity-50  bg-body-secondary fs-15' disabled defaultValue={SpRequestDetails.request.region}/>
            </div>
          </div>
          <div>
            <h3 className='h5 my-4'>Assets Information</h3>
            <h4 className='h6 my-4'>NationalId Images:</h4>
            <div className='d-flex gap-2 flex-md-row flex-column '>
              <figure className='mb-0'>
                <img onClick={()=> window.open(SpRequestDetails.request.nationalIdFile[0].secure_url,'_blank')} src={SpRequestDetails.request.nationalIdFile[0].secure_url} className='mb-2 rounded cursor-pointer' height={250} width={250} alt="nationalIdFile" />
              </figure>
                <figure className='mb-0'>
                  <img onClick={()=> window.open(SpRequestDetails.request.nationalIdFile[1].secure_url,'_blank')} src={SpRequestDetails.request.nationalIdFile[1].secure_url} className='mb-2 rounded cursor-pointer' height={250} width={250} alt="nationalIdFile" />
                </figure>
            </div>
            <h4 className='h6 my-4'>Birth Certificate Image:</h4>
            <div>
              <figure className='mb-0'>
                <img onClick={()=> window.open(SpRequestDetails.request.birthCertificateFile.secure_url,'_blank')} src={SpRequestDetails.request.birthCertificateFile.secure_url} className='mb-2 rounded cursor-pointer' height={250} width={250} alt="birthCertificateFile" />
              </figure>
            </div>
          </div>
        </div>}
        <div className='my-3 pt-3 row row-cols-2'>
          <div>
            <h4 className='h5 mb-4'>The Result of Request</h4>
              <div>
                <label htmlFor="result">The Result</label>
                <select ref={selectRef} onChange={handleSelectChange} className='form-select mt-2' name="state" id="result">
                  <option value="interviewing">Interviewing</option>
                  <option value="waiting">Waiting</option>
                  <option value="refused">Refused</option>
                </select>
              </div>
              {causeInput && <div className='mt-4'>
                <label htmlFor="condition" className='mb-2'>The Cause</label>
                <textarea  ref={causeRef} className='form-control' name="condition" id="condition" rows="5"></textarea>
              </div>}
              
              {SubmitResult && <p className='text-danger text-center mt-3'>{SubmitResult}</p>}
              {Isloading? 
                <button className='btn btn-night w-100 mt-4'><i className='fa-solid fa-spinner fa-spin me-1'></i> Submit</button>
                : 
                <button onClick={handleSubmit} className='btn btn-night w-100 mt-4'> Submit</button>
              }
          </div>
        </div>
      </div>
    </div>
  )
}
