import React from 'react'
import { Link } from 'react-router-dom'

export default function Website() {
  return <>
    <div className='d-flex justify-content-center gap-4 m-3'>
        <Link className='btn btn-outline-dark px-5' to={'/parent.login'}>Login</Link>
        <Link className='btn btn-warning  px-4' to={'/Registration'}>Apply Now</Link>
    </div>
  </>
}
