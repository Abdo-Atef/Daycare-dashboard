import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import EmployeeDetails from './EmployeeDetails';
import DeleteEmployeeModel from './DeleteEmployeeModel';

export default function EmployeeRow_Table({employee}) {

    const [EditToggle, setEditToggle] = useState(false)
    const ulRef = useRef(null);
    const [EmployeeModalShow, setEmployeeModalShow] = useState(false)
    const [DeleteEmployeeModalShow, setDeleteEmployeeModalShow] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => { 
      !event.target.closest(`${'.editEmToggle'+employee.id}`) && setEditToggle(false);
    };
    document.addEventListener("click", handleClickOutside);

  }, [])
    
  return (
    <tr>
      <td className='ps-4'>
        <img src={employee.profilePicture.secure_url.replace(/.*https:\/\//, 'https://')} alt="user image" className='rounded-full me-3 border' width={30} height={30} />
        <span className='text-capitalize'>{employee.name}</span>
      </td>
      <td>{employee.email}</td>
      <td className='text-capitalize'><i className="fa-solid fa-location-dot me-2 textGray"></i>{employee.address}</td>
      <td>{employee.salary} EGP</td>
      <td  className='text-capitalize'><span>{employee.role}</span></td>
      <td className={`position-relative ${'editEmToggle'+employee.id}`}>
        <button onClick={()=> setEditToggle(!EditToggle)} className='btn py-0'><i className="fa-solid fa-ellipsis-vertical"></i></button>
        {EditToggle && <ul ref={ulRef} className={`${styles.toggleUl} position-absolute bg-white shadow border rounded`}>
        <li className="border-bottom ">
          <button onClick={()=> setEmployeeModalShow(!EmployeeModalShow)} className='btn w-100 text-start fs-14'><i className="fa-solid fa-eye fs-13 me-2"></i>View</button>
        </li>
        <li>
          <button onClick={()=> setDeleteEmployeeModalShow(!DeleteEmployeeModalShow)} className="btn w-100 text-start fs-14"><i className="fa-solid fa-trash fs-13 me-2"></i> Delete</button>
        </li>
      </ul>}
      </td>
      {EmployeeModalShow && <EmployeeDetails employee={employee} setModalShow={setEmployeeModalShow} /> }
      {DeleteEmployeeModalShow && <DeleteEmployeeModel employee={employee} setModalShow={setDeleteEmployeeModalShow} /> }
    </tr>
  )
}
