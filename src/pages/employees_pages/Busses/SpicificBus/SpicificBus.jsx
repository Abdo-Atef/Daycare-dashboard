import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../../../utils/api'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Bus from '../../../../assets/BusDetails.png'
export default function SpicificBus() {
    const {id}=useParams();
    const {employeeToken}=useSelector((state)=>state.employee)
    const [BusData,setBusData]=useState(null)
    async function BusDetails(){
        const result=await axios.get(`${BASE_URL}/bus/getSpBusForAdmin/${id}`,{headers:{token:employeeToken}})
        setBusData(result.data)
        console.log(result.data);
    }
    useEffect(()=>{
        BusDetails()
    },[])
  return (
    <>
        <div className="container">
            <div className='py-5 '>
                <div className="row bg-white p-5 rounded-3 shadow-sm">
                    <div className="col-lg-6">
                        <div>
                            <img src={Bus} alt="Bus" className='w-100' />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div >
                            <Link className='text-black d-flex align-items-center gap-2' to={`/employees.panal/busses`}><span><i className="fa-solid fa-arrow-left " ></i></span><span className='text-pink'>Back To Busses</span></Link>
                        </div>
                        <div>
                            <h5 className='mt-5'>Bus Information</h5>
                            <div className='d-flex flex-column p-3'>
                                <span>Bus Name: <span className='orangeStyle p-2 rounded-2'>{BusData?.bus.busName}</span></span>
                                <span className='mt-4'>Bus Number: <span className='greenStyle p-2 rounded-2'>{BusData?.bus.busNumber}</span></span>
                                <span className='mt-4'>Number of seats: <span className='blueStyle p-2 rounded-2'>{BusData?.bus.capacity} seats</span></span>
                                <span className='mt-4'>Remaining seats: <span className='orangeStyle p-2 rounded-2'>{BusData?.theRestInbuses} seats</span></span>
                                <span className='mt-4'>Full seats: <span className='dangerStyle p-2 rounded-2'>{BusData?.bus.capacity - BusData?.theRestInbuses} seats</span></span>

                            </div>
                        </div>
                        <div>
                            <h5 className='mt-2'>Bus Supervisor Information</h5>
                            <div className='d-flex flex-column p-3'>
                                <span className=''>Bus Supervisor name : <span className='dangerStyle p-2 rounded-2'>{BusData?.bus.busSupervisor.name}</span></span>
                                <span className='mt-4'>Email : <span className='greenStyle p-2 rounded-2' >{BusData?.bus.busSupervisor.email} </span></span>
                                <span className='mt-4'>Phone : <span className='blueStyle p-2 rounded-2'>{BusData?.bus.busSupervisor.phone}</span></span>
                                <span className='mt-4'>Address : <span className='orangeStyle p-2 rounded-2'>{BusData?.bus.busSupervisor.address}</span></span>
                                <span className='mt-4'>Salary : <span className='dangerStyle p-2 rounded-2'>{BusData?.bus.busSupervisor.salary} $</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
