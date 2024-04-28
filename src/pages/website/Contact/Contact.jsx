import React from 'react'
import NavBarWebsite from '../../../components/NavbarWebsite/NavBarWebsite'
import FooterWebsite from '../../../components/FooterWebsite/FooterWebsite'
import style from "./Contact.module.css"
import { Link } from 'react-router-dom/dist'
import aboutImage from '../../../assets/about_img_1.png'
import aboutImage2 from '../../../assets/about_img_2.png'
export default function Contact() {
  return (
    <div>
        <NavBarWebsite/>
        <div className={`${style.contactSection}`} style={{paddingTop:80}} >
            <div className={`${style.Contact}`}>
                <div className='d-flex flex-column  justify-content-center align-items-center text-white  h-100 '>
                    <h3 className='h1 fw-bold'>Contact Us</h3>
                    <div >
                    <Link to="/" className={`${style.colorPink} text-white`} >Home </Link>
                        |
                    Contact Us
                    </div>
                </div>
            </div>
            <div className='py-5'>
                    <div className="container p-5">
                      <div className="row g-4">
                        <div className="col-md-8">
                            <h2 className='fw-bold h1'>We`re here to Help You</h2>
                            <form action="">
                              <div className='d-flex'>
                                  <input type="text" className={`${style.InputContact}  rounded-2 mt-3 me-3`} placeholder="Your Name"  />
                                  <input type="email" className={`${style.InputContact}  rounded-2 mt-3`} placeholder="Your Email" />
                              </div>
                              <textarea className={`${style.InputContact}  rounded-2 mt-3`} placeholder="Content">
                                
                              </textarea>
                              <button className='btn bg-pink text-white mt-3 p-4 '> Send Message</button>
                            </form>
                        </div>
                        <div className="col-md-4">
                          <h2 className='fw-bold h1'>Office Info</h2>
                          <div>
                              <ul className='list-unstyled p-3'>
                                <li className='d-flex align-items-baseline '>
                                  <div className='me-3'>
                                      <i className="fa-solid fa-location-arrow text-pink fs-3"></i>
                                  </div>
                                  <div>
                                    <h3>Location</h3>
                                    <p className='text-secondary text-opacity-50'>9 Road, Mirpur Dohs,New York</p>
                                  </div>
                                </li>
                                <li className='d-flex align-items-baseline '>
                                  <div className='me-3'>
                                      <i className="fa-solid fa-phone text-pink fs-3"></i>
                                  </div>
                                  <div>
                                    <h3>Phone</h3>
                                    <p className='text-secondary text-opacity-50'>+642 205 745 695</p>
                                  </div>
                                </li>
                                <li className='d-flex align-items-baseline '>
                                  <div className='me-3'>
                                      <i className="fa-solid fa-envelopes-bulk text-pink fs-3"></i>
                                  </div>
                                  <div>
                                    <h3>Email</h3>
                                    <p className='text-secondary text-opacity-50'>info@droitthemes.com</p>
                                  </div>
                                </li>
                              </ul>
                          </div>
                        </div>
                      </div>
                    </div>
            </div>
        </div>
        <FooterWebsite/>
    </div>
  )
}
