import React from 'react'
import style from './CardDetails.module.css'
export default function CardDetails({hide,interview}) {
  return (
    <div className='bg-dark bg-opacity-25 position-absolute w-100 top-50 vh-100 p-0 m-0 start-50 translate-middle d-flex justify-content-center z-3 '>
        <div className=' d-flex justify-content-center align-items-center'>
            <div className='bg-white rounded-3 position-relative '>
                <div className='position-absolute bottom-0 end-0 p-2 cursor-pointer' onClick={hide}>
                    <i className="fa-solid fa-eye-slash greenStyle fs-5 p-3 rounded-3 "></i>
                </div>
                <div className={`d-flex align-items-center flex-wrap ${style.widthCard}`}>
                    <div className={`p-3 ${style.widthInner}`} style={{width:400}}>
                            {interview?.profilePicture?.secure_url == undefined ? (<div className='text-center p-2 bg-secondary bg-opacity-10  w-100 d-flex align-items-center justify-content-center' style={{height:400}}><i className="fa-solid fa-user fs-1"></i></div>) : (<img src={interview?.profilePicture.secure_url} className='w-100 rounded-3' style={{height:350}}   alt={interview?.parentName} />)}                              
                    </div>
                    <div className='p-3'>
                        <div className='p-2'>
                            <i className="fa-solid fa-user text-night"></i>
                            <span className={`ms-3 ${style.Fsize}`}><span>Evaluator:</span> {interview?.evaluatedBy.name}</span>
                        </div>
                        <div className='p-2'>
                            <i className="fa-solid fa-person text-night"></i>
                            <span className={`ms-3 ${style.Fsize}`}><span>Parent Name:</span> {interview?.parentName}</span>
                        </div>
                        <div className='p-2'>
                            <i className="fa-solid fa-person-breastfeeding text-night"></i>
                            <span className={`ms-3 ${style.Fsize}`}><span>Child Name:</span> {interview?.childName}</span>
                        </div>
                        <div className='p-2'>
                            <i className="fa-solid fa-envelope"></i>
                            <span className={`ms-3 ${style.Fsize}`}><span>Email:</span> {interview?.email}</span>
                        </div>
                        <div className='p-2'>
                            <i className="fa-solid fa-square-phone-flip"></i>
                            <span className={`ms-3 ${style.Fsize}`}><span>Phone:</span> {interview?.phone}</span>
                        </div>
                        <div className='p-2'>
                            <i className="fa-solid fa-location-dot"></i>
                            <span className={`ms-3 ${style.Fsize}`}><span>Location:</span> {interview?.location}</span>
                        </div>
                        <div className='p-2'>
                            <i className="fa-solid fa-city text-night"></i>
                            <span className={`ms-3 ${style.Fsize}`}><span>Region:</span> {interview?.region}</span>
                        </div>
                        <div className='p-2'>
                            <i className="fa-solid fa-cake-candles text-night"></i>
                            <span className={`ms-3 ${style.Fsize}`}><span>Birth Date:</span> {interview?.birthDate.slice(0,10)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
