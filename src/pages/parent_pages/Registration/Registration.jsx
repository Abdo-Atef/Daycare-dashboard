import React from 'react'
import style from './style.module.css'
import child from '../../../assets/form-child.jpg'
export default function Registration() {
  return (
    <div className={style.registeration}>
      <div className="container">
        <div className=' d-flex align-items-center p-5 '>
            <div className={`${style.formRegester} rounded-3`}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className='p-4'>
                        <h1 className={style.heading}>Registration</h1>
                        <div className='p-3'>
                          <p className={`${style.textColor} fs-4`}>Want to see your child better?</p>
                          <p className={`${style.textColor} fs-4`}>Apply with us now at <span className={`${style.spiecialText} fw-bold `}>Kinderlink</span></p>
                        </div>
                    </div>
                    <div>
                      <img src={child} alt="child" className={`${style.childImage} w-100  rounded-end-3 `} style={{height:630}}/>
                    </div>
                  </div>
                  <div className="col-md-6">
                      <form action="" className='p-4'>
                        <label htmlFor="parentName">Parent Name</label>
                        <input type="text" id='parentName' className={`${style.input} mt-1`}  />
                        <label htmlFor="email" className='mt-2'>Email</label>
                        <input type="email" id='email' className={`${style.input} mt-1`}   />
                        <label htmlFor="password" className='mt-2'>Password</label>
                        <input type="password" id='password' className={`${style.input} mt-1`}  />
                        <label htmlFor="rePassword" className='mt-2'>Confirm Password</label>
                        <input type="password" id='rePassword' className={`${style.input} mt-1`}  />
                        <label htmlFor="phone" className='mt-2'>Phone</label>
                        <input type="text" id='phone' className={`${style.input} mt-1`}   />
                        <label htmlFor="job" className='mt-2'>Job</label>
                        <input type="text" id='job' className={`${style.input} mt-1`}  />
                        <label htmlFor="ChildName" className='mt-2'>Child Name</label>
                        <input type="text" id='ChildName' className={`${style.input} mt-1`}  />
                        <label htmlFor="ParentNationalId" className='mt-2'>Parent National Id</label>
                        <input type="text" id='ParentNationalId' className={`${style.input} mt-1`}  />
                        <label htmlFor="birthDate" className='mt-2'>Birth Date</label>
                        <input type="date" id='birthDate' className={`${style.input} mt-1`} />
                        <label htmlFor="ChildNationalId" className='mt-2'>Child National Id</label>
                        <input type="text" id='ChildNationalId' className={`${style.input} mt-1`}  />
                        <label htmlFor="city" className='mt-2'>location</label>
                        <input type="text" id='city' className={`${style.input} mt-1`}/>
                        <div className={`${style.file} d-flex align-items-center`}>
                            <label htmlFor="uploadFile" className={`${style.cursor} mt-2 ${style.upload} d-flex`}>upload image</label>
                            <p className= {`${style.textWarring} m-3`}><i className='fa-solid fa-circle-exclamation fs-5 text-danger'></i> A front and back photo of the parent's card and the child's birth certificate are required</p>
                        </div>
                        <input type="file" id='uploadFile' className='d-none'/>
                        <div className='d-flex justify-content-center'>
                          <button className={`btn ${style.btnRegister}`}> Apply</button>
                        </div>
                      </form>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}