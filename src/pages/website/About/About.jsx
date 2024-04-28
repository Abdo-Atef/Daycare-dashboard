import React, { useEffect } from 'react'
import NavBarWebsite from '../../../components/NavbarWebsite/NavBarWebsite'
import FooterWebsite from '../../../components/FooterWebsite/FooterWebsite'
import style from "./About.module.css"
import { Link } from 'react-router-dom/dist'
import aboutImage from '../../../assets/about_img_1.png'
import aboutImage2 from '../../../assets/about_img_2.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function About() {
    useEffect(()=>{
        AOS.init();
    },[])
  return (
    <>
        <NavBarWebsite/>
        <div className={`${style.aboutSection}`} style={{paddingTop:80}} >
            <div className={`${style.About}`}>
                <div className='d-flex flex-column  justify-content-center align-items-center text-white  h-100 '>
                    <h3 className='h1 fw-bold'>About Us</h3>
                    <div >
                    <Link to="/" className={`${style.colorPink} text-white`} >Home </Link>
                        |
                    About Us
                    </div>
                </div>
            </div>
            <div className='py-5'>
                    <div className="container p-5">
                    <div className="row ">
                        <div className="col-md-6" data-aos="fade-up-right">
                            <div className='px-5'>
                                <h4 className={`${style.textColorAbout} fw-bold`}>Who We Are</h4>
                                <h3 className='h1 fw-bold '>We Create New</h3>
                                <p className='px-3 text-secondary text-opacity-75  fw-bold'>
                                    The amazing way to olor sit amet, consectetur adipisicing elit, sed do eiusmod incididunt ut labore inventore The amazing way to olor sit amet, consectetur. consectetur adipisicing elit, sed do eiusmod incididunt ut labore inventore.
                                </p>
                            </div>
                            <ul className='text-secondary text-opacity-75 fw-bold ms-5'>
                                <li className='ms-4 '>Best Learning School for Kids</li>
                                <li className='ms-4'>Indoor/Outdoor Games for Little Kids</li>
                                <li className='ms-4'>Professional & Qualified Teacher</li>
                                <li className='ms-4'>Indoor/Outdoor Games for Little Kids</li>
                            </ul>
                        </div>
                        <div className="col-md-6" data-aos="zoom-in">
                            <div>
                                <img src={aboutImage} className='w-100 rounded-4 shadow  ' alt="about" />
                            </div>
                        </div>
                    </div>
                    </div>
            </div>
            <div className={`${style.bgGrayAbout} p-5`}>
                    <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-md-6" data-aos="flip-left">
                            <div >
                                <img src={aboutImage2} className='w-100 rounded-4 shadow ' alt="about2" />
                            </div>
                        </div>
                        <div className="col-md-6" data-aos="fade-up-left">
                            <div >
                                <h3 className='h1 fw-bold '>With Efficiency to More Opportunities</h3>
                                <p className='text-secondary text-opacity-75  fw-bold mt-4'>
                                    Why I say old chap that is spiffing bodge, blag pardon me mufty Oxford butty bubble and squeak wind up, brown bread the full monty bloke ruddy cras tickety-boo squiffy.                                
                                </p>
                                <p className='text-secondary text-opacity-75  fw-bold '>
                                    Why I say old chap that is spiffing bodge, blag pardon me mufty Oxford butty bubble and squeak wind up, brown bread the full monty bloke ruddy cras tickety-boo squiffy.
                                </p>
                            </div>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
        <FooterWebsite/>
    </>
  )
}
