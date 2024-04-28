import React from 'react'
import style from "./TitleWebsite.module.css"
export default function TitleWebsite({title,firstParg,secondParg}) {
  return (
    <div className={`text-center pt-5 `} data-aos="zoom-in">
            <h3 className={`fs-1 ${style.TextColorBlue} fw-bold `}>{title}</h3>
            <p className='fs-5 text-secondary'>{firstParg}</p>
            <p className='fs-5 text-secondary'>{secondParg}</p>
    </div>
  )
}
