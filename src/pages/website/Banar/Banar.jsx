import React from 'react'
import style from "./Banar.module.css"
export default function Banar() {
return (
        <div style={{paddingTop:100}}>
            <div id="carouselExampleInterval" className="carousel slide " data-bs-ride="carousel">
                <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="1500">
                                <div className={style.BanarOne}>
                                    <div className='bg-black vh-100 bg-opacity-75 position-relative'>
                                        <div className='vh-100 d-flex justify-content-center align-items-center'>
                                            <div className='text-center'>
                                                <h2 className="text-white" style={{fontSize:60}}>
                                                    Your
                                                    <span className={`${style.textBanarOrange}`}> Child  </span> 
                                                    Our  
                                                    <span className={`${style.textBanarNile}`}>  Responsibility   </span>
                                                </h2>
                                                <p className='text-white fs-5'>At Droit Childcare, we provide a learning experience that empowers children to be the very best they can be</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="1500">
                                <div className={style.BanarTwo}>
                                    <div className='bg-black vh-100 bg-opacity-75'>
                                        <div className='vh-100 d-flex justify-content-center align-items-center'>
                                            <div className='text-center'>
                                                <h2 className="text-white " style={{fontSize:60}}>
                                                    <span className={`${style.textBanarOrange}`}>Preschool </span> 
                                                        for Your   
                                                    <span className={`${style.textBanarNile}`}> Kids  </span>
                                                </h2>
                                                <p className='text-white fs-5'>Ensure quality education and lasting learning experience for your children with Droit Chicare.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className="carousel-item " data-bs-interval="1500">
                                <div className={style.BanarThree}>
                                    <div className='bg-black vh-100 bg-opacity-75'>
                                        <div className='vh-100 d-flex justify-content-center align-items-center'>
                                            <div className='text-center'>
                                                <h2 className="text-white " style={{fontSize:60}}>
                                                    <span className={`${style.textBanarOrange}`}>Where </span> 
                                                        Learning Is Child’s 
                                                    <span className={`${style.textBanarNile}`}> Play  </span>
                                                </h2>
                                                <p className='text-white fs-5'>Our experienced staff dedicate themselves to helping children discover their full potential academically, socially and interpersonally.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
