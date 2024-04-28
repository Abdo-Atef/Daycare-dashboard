import React from 'react'
import TitleWebsite from '../../../components/TitleStaticWeb/TitleWebsite'
import image from "../../../assets/event_img.png"
import style from "./EventStatic.module.css"
export default function EventStaticWeb() {
  return (
    <div className={`p-5 ${style.EventBg}`}>
        <TitleWebsite title="Upcoming Events" secondParg="services for working families to ensure every child." firstParg="Kidzo mission is to provide affordable, high-quality early education and childcare"/>
        <div className='container '>
            <div className='my-5 '>
                <div className="row g-5">
                    <div className="col-md-5" data-aos="flip-left" >
                        <div>
                            <img src={image} className='w-100' alt="event" />
                        </div>
                    </div>
                    <div className="col-md-7">
                                <div className={` ${style.EventBgOrange} p-3 rounded-4 d-flex align-items-center`} data-aos="zoom-in-up">
                                    <div className={`p-3  ${style.EventCircle} ${style.EventCircleBgOrange} text-center text-white`}>
                                        <h4>11</h4>
                                        <h4>Dec</h4>
                                    </div>
                                    <div className='text-white ms-4 mt-3'>
                                        <h5 className='h4'>Kids Days Drawing Event</h5>
                                        <p>14:30 - 17:00</p>
                                    </div>
                                </div>
                                <div className={` ${style.EventBgGreen} p-3 rounded-4 d-flex align-items-center mt-4`} data-aos="zoom-in-up">
                                        <div className={`p-3  ${style.EventCircle} ${style.EventCircleBgGreen} text-center text-white`}>
                                            <h4>13</h4>
                                            <h4>Nov</h4>
                                        </div>
                                        <div className='text-white ms-4 mt-3'>
                                            <h5 className='h4'>Father’s Day Event</h5>
                                            <p>12:30 - 15:00</p>
                                        </div>
                                </div>
                                <div className={` ${style.EventBgNile} p-3 rounded-4 d-flex align-items-center mt-4`} data-aos="zoom-in-up">
                                        <div className={`p-3  ${style.EventCircle} ${style.EventCircleBgNile} text-center text-white`}>
                                            <h4>26</h4>
                                            <h4>Sep</h4>
                                        </div>
                                        <div className='text-white ms-4 mt-3'>
                                            <h5 className='h4'>Mother’s Day Event</h5>
                                            <p>14:30 - 17:00</p>
                                        </div>
                                </div>
                                <div className={` ${style.EventBgYellow} p-3 rounded-4 d-flex align-items-center mt-4`} data-aos="zoom-in-up">
                                        <div className={`p-3  ${style.EventCircle} ${style.EventCircleBgYellow} text-center text-white`}>
                                            <h4>17</h4>
                                            <h4>Dec</h4>
                                        </div>
                                        <div className='text-white ms-4 mt-3'>
                                            <h5 className='h4'>Independent Day Events</h5>
                                            <p>14:30 - 17:00</p>
                                        </div>
                                </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
