import React from 'react'
import style from "./FooterWebsite.module.css"
import image from "../../assets/footer_img.png"
export default function FooterWebsite() {
  return (
    <div className={`${style.FooterWebsite} py-5 `}>
        <div className='container'>
            <div>
                <div className="row g-0">
                    <div className="col-md-3">
                        <div className='text-center '>
                            <div>
                                <h4 className={`fw-bold h2 ${style.FooterTextColorBlue} `}>KinderLink</h4>
                            </div>
                            <p className='p-0 m-0 text-secondary'>Lorem ipsum dolor sit consectetur</p>
                            <p className='p-0 m-0  text-secondary'>sicing elit, sed do eitempor idunt ut</p>
                            <p className='p-0 m-0  text-secondary'>labor omagn aliqua sed do.</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <ul className='list-unstyled px-3'>
                            <li><h3 className={`fw-bold h4 ${style.FooterTextColorBlue}`}>Programs</h3></li>
                            <li className='mt-3'>Pre School</li>
                            <li className='mt-3'>Junior Lambs</li>
                            <li className='mt-3'>Junior Lambs</li>
                            <li className='mt-3'>Master Mind</li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <ul className='list-unstyled'>
                            <li><h3 className={`${style.FooterTextColorBlue} fw-bold h4`}>Useful Links</h3></li>
                            <li className='mt-3'>Home</li>
                            <li className='mt-3'>About</li>
                            <li className='mt-3'>Contact</li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <div className='text-center '>
                            <h3 className={`fw-bold h4 ${style.FooterTextColorBlue}`}>Newsletter</h3>
                            <p >Subscribe to our newsletter. We will not disclose your email to anyone.</p>
                        </div>
                        <div className='d-flex align-items-center '>
                            <div>
                                <input type="text" className={`${style.FooterInput} shadow p-3 `} />
                            </div>
                            <div className='bg-white p-3 px-4 border border-top-0 border-bottom-0 border-end-0 shadow '>
                                <i className="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`d-flex justify-content-center position-relative   ${style.footerTranslate} `}>
            <img src={image} className='position-absolute d-none d-xl-block'  alt="" />
        </div>
        </div>
    </div>
  )
}
