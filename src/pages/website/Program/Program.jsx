import React from 'react'
import style from './Program.module.css'
import TitleWebsite from '../../../components/TitleStaticWeb/TitleWebsite'
import horse1 from "../../../assets/horse1.png"
import horse2 from "../../../assets/horse2.png"
import horse3 from "../../../assets/horse3.png"
export default function Program() {
  return (
    <div className={`${style.program} py-5`}>
        <TitleWebsite title="Educational Programs" secondParg="services for working families to ensure every child." firstParg="Kidzo mission is to provide affordable, high-quality early education and childcare"/>
        <div className='container py-5'>
            <div className="row g-3">
                <div className="col-md-4" data-aos="zoom-in" >
                    <div className={`h-100 ${style.programBgNile} shadow rounded-4 p-4 ${style.CardTranslate}`}>
                        <div className='d-flex justify-content-center align-items-center p-4'>
                            <img src={horse1}  alt="horse1" />
                        </div>
                        <div className='text-center text-white'>
                            <h3 className='fw-bold'>Pre School Sport</h3>
                            <p className='p-4'>Excepteur sint occaecat cupidatat officia non proident, sunt in culpa qui deserunt mollit anim</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4" data-aos="zoom-in-up">
                    <div className={`h-100 ${style.programBgBlue} shadow rounded-4 p-4 ${style.CardTranslate}`}>
                        <div className='d-flex justify-content-center align-items-center p-4'>
                            <img src={horse2}  alt="horse1" />
                        </div>
                        <div className='text-center text-white' >
                            <h3 className='fw-bold'>Area For Bebies</h3>
                            <p className='p-4'>Excepteur sint occaecat cupidatat officia non proident, sunt in culpa qui deserunt mollit anim</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4" data-aos="zoom-in" >
                    <div className={`h-100 ${style.programBgRed} shadow rounded-4 p-4 ${style.CardTranslate}`}>
                        <div className='d-flex justify-content-center align-items-center p-4'>
                            <img src={horse3}  alt="horse1" />
                        </div>
                        <div className='text-center text-white mt-4'>
                            <h3 className='fw-bold'>Children Cafe</h3>
                            <p className='p-4'>Excepteur sint occaecat cupidatat officia non proident, sunt in culpa qui deserunt mollit anim</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
