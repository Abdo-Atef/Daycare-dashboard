import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBus } from '../../../redux/BusSupervisor_slice/SupervisorSlice';
import { getChildren } from '../../../redux/employees_Slices/childrenSlice';
import { getAllGroups } from '../../../redux/employees_Slices/groupSlice';
import { getAllemployees } from '../../../redux/employees_Slices/employeeSlice';
import { getAllRequest } from '../../../redux/admin_slice/adminSlice';
import {Bar, Line, Pie,Radar} from "react-chartjs-2"
import {Chart as ChartJs} from "chart.js/auto"
export default function Dashboard() {
  const {Busses}=useSelector((state)=>state.supervisor);
  const {children}=useSelector((state)=>state.children);
  const {allGroups}=useSelector((state)=>state.group);
  const {employees}=useSelector((state)=>state.employee);
  const {requests}=useSelector((state)=>state.admin);
  const [employeeSalary,setemployeeSalary]=useState({
    labels:employees&&employees?.map((data)=>data.name),
    datasets:[{
        label:"Salary",
        data:employees&&employees?.map((data)=>data.salary),
        backgroundColor: [
            'hsla(360, 69%, 43%, 0.38)',
            'hsla(62, 55%, 49%, 0.47)',
            'hsla(111, 79%, 31%, 0.47)',
            'hsla(242, 49%, 50%, 0.47)',
          ],
        borderColor: [
            'hsla(360, 79%, 43%, 0.47)',
            'hsla(56, 68%, 46%, 0.55)',
            'hsla(111, 79%, 31%, 0.55)',
            'hsla(255, 62%, 40%, 0.55)',
          ],
          borderWidth: 3,

    }]
})
const [busCapacity,setBusCapacity]=useState({
  labels:Busses&&Busses?.allbuses?.map((data)=>data.busName),
  datasets:[{
      label:"capacity",
      data:Busses&&Busses?.allbuses?.map((data)=>data.capacity),
      backgroundColor: [
          'hsla(360, 69%, 43%, 0.38)',
          'hsla(62, 55%, 49%, 0.47)',
          'hsla(111, 79%, 31%, 0.47)',
          'hsla(242, 49%, 50%, 0.47)',
        ],
      borderColor: [
          'hsla(360, 79%, 43%, 0.47)',
          'hsla(56, 68%, 46%, 0.55)',
          'hsla(111, 79%, 31%, 0.55)',
          'hsla(255, 62%, 40%, 0.55)',
        ],
        borderWidth: 3,

  }]
})
const [groupCapacity,setgroupCapacity]=useState({
  labels:allGroups&&allGroups?.groups?.map((data)=>data.groupName),
  datasets:[{
      label:"capacity",
      data:allGroups&&allGroups?.groups?.map((data)=>data.capacity),
      backgroundColor: [
          'hsla(360, 69%, 43%, 0.38)',
          'hsla(62, 55%, 49%, 0.47)',
          'hsla(111, 79%, 31%, 0.47)',
          'hsla(242, 49%, 50%, 0.47)',
        ],
      borderColor: [
          'hsla(360, 79%, 43%, 0.47)',
          'hsla(56, 68%, 46%, 0.55)',
          'hsla(111, 79%, 31%, 0.55)',
          'hsla(255, 62%, 40%, 0.55)',
        ],
        borderWidth: 3,

  }]
})
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getAllBus())
    dispatch(getAllGroups())
    dispatch(getAllemployees())
    dispatch(getChildren())
    dispatch(getAllRequest())
  },[])
  return (
    <div className=''>
          <div className="container py-5">
              <div className="row g-4 ">
                  <div className="col-lg-3">
                      <div className='text-center bg-dash-green p-5 rounded-3 shadow'>
                        <h3 className='h1'>{Busses?.allbuses.length}</h3>
                        <p>Busses</p>
                      </div>
                  </div>
                  <div className="col-lg-3">
                      <div className='text-center bg-dash-yellow p-5 rounded-3 shadow'>
                        <h3 className='h1'>{children?.length}</h3>
                        <p>Child without group</p>
                      </div>
                  </div>
                  <div className="col-lg-3">
                      <div className='text-center bg-dash-red p-5 rounded-3 shadow'>
                        <h3 className='h1'>{allGroups?.groups.length}</h3>
                        <p>Groups</p>
                      </div>
                  </div>
                  <div className="col-lg-3">
                      <div className='text-center bg-dash-purpel p-5 rounded-3 shadow'>
                        <h3 className='h1'>{employees?.length}</h3>
                        <p>Employees</p>
                      </div>
                  </div>
                  <div className="col-lg-3">
                      <div className='text-center bg-dash-blue p-5 rounded-3 shadow'>
                        <h3 className='h1'>{requests?.length}</h3>
                        <p>Requests</p>
                      </div>
                  </div>
              </div>
              <hr/>
              <div className="row g-4 p-5">
                <div className="col-md-6 ">
                    <div className="row g-4">
                      <div className="col-lg-12">
                        <div className='bg-dash-purpul2 shadow rounded p-3'>
                          <h3 className='text-center'>Salary of Employees</h3>
                          <Bar data={employeeSalary} />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className='bg-dash-purpul2 shadow rounded p-3'>
                          <h3 className='text-center'>Group Capacity</h3>
                          <Line data={groupCapacity} />
                        </div>
                      </div>
                      
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className='bg-dash-purpul2 shadow rounded p-3'>
                      <h3 className='text-center'>bus capacity</h3>
                      <Pie data={busCapacity} />
                    </div>
                </div>
              </div>
        </div>
    </div>
  )
}
