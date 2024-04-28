import React, { useEffect } from 'react'
import style from "./Offer.module.css"
import offer1 from "../../../assets/OBJECTS.png"
import offer2 from "../../../assets/Graphic.png"
import TitleWebsite from '../../../components/TitleStaticWeb/TitleWebsite'
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function Offer() {

    useEffect(()=>{
        AOS.init();
    },[])
  return (
    <div className='container pt-5 '>
        <TitleWebsite title="What We Offer" secondParg="services for working families to ensure every child." firstParg="Kidzo mission is to provide affordable, high-quality early education and childcare"/>
        <div className='d-flex justify-content-center align-items-center p-5'>
            <div className="row g-4">
                <div className="col-md-6" data-aos="flip-right">
                    <div className={`${style.offerBgNile} rounded-4 shadow ${style.OfferTranslate}`} >
                        <div className='p-4'>
                            <img src={offer1} className='w-100' alt="" />
                        </div>
                        <div className={`text-center text-white  ${style.offerBgNileDark} p-3 rounded-top-0  rounded-4`}>
                            <h4 className='fs-2 fw-bold'>Infant Care</h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-6"  data-aos="flip-left" >
                    <div className={`${style.offerBgLightBlue} rounded-4 shadow ${style.OfferTranslate} `} >
                        <div className='p-4'>
                            <img src={offer2} className='w-100' alt="" />
                        </div>
                        <div className={`text-center text-white  ${style.offerBgDarkBlue} p-3 rounded-top-0  rounded-4`}>
                            <h4 className='fs-2 fw-bold'>Pre-School Sports</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
