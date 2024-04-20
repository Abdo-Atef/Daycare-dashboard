import React from 'react'
import TitleWebsite from '../../../components/TitleStaticWeb/TitleWebsite'
import Gallary1 from "../../../assets/Gallary1.jpg"
import Gallary2 from "../../../assets/Gallary2.jpg"
import Gallary3 from "../../../assets/Gallary3.jpg"
import Gallary5 from "../../../assets/Gallary5.jpg"
import Gallary6 from "../../../assets/Gallary6.jpg"

export default function GalleryWebsite() {
  return (
    <div className='py-4'>
        <TitleWebsite title="Our Photo Gallery" secondParg="services for working families to ensure every child." firstParg="Kidzo mission is to provide affordable, high-quality early education and childcare "/>
            <div className=''>
                <div className="row g-0">
                            <div className="col-md-3">
                                <div>
                                    <img src={Gallary1} className='w-100' alt="gallary1" />
                                </div>
                                <div>
                                    <img src={Gallary2} className='w-100' alt="Gallary4" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div>
                                    <img src={Gallary3} className='w-100' alt="Gallary3" />
                                </div>
                                <div>
                                    <img src={Gallary5} className='w-100' alt="Gallary3" />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div>
                                    <img src={Gallary6} className='w-100'  alt="gallary8" />
                                </div>
                                
                            </div>
                </div>
            </div>
    </div>
  )
}
