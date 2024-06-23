import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { spMeal } from '../../redux/employees_Slices/mealSlice';
import { useParams } from 'react-router-dom';

export default function SpicificMeal() {
    const {spicificMeal}=useSelector((state)=>state.meals);
    const {id}=useParams();
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(spMeal(id))
    },[])
  return (
    <div className='container p-5 d-flex align-items-center flex-wrap'>
        <div className='bg-white w-100 rounded-3 shadow'>
                <div className='row'>
                    <div className="col-lg-6">
                    {
                        spicificMeal?.data.meal.mealImages.map((img)=><div className='p-3 rounded-3'><img className='rounded-2 w-100' src={img.secure_url} key={img.public_id}/></div>)
                    }
                    </div>
                    <div className="col-md-6">
                    <div className='py-5'>
                        <div>
                            <h5>Meal Details</h5>
                            <h6 className='mt-4'>Meal Name : <span className='orangeStyle h6 px-5 py-2 rounded-3'>{spicificMeal?.data.meal.mealName}</span></h6>
                            <div className='mt-4'>
                                <h6>Meals Ingredients:</h6>
                                {spicificMeal?.data.meal.mealsIngredients.map((ing,index)=><span className='dangerStyle rounded-2  d-inline-flex flex-wrap m-1 px-4 p-2' key={index}>
                                    {ing}
                                </span>)}
                            </div>
                            <div className='mt-4 d-flex gap-4 flex-wrap'>
                                <p className='blueStyle px-4 py-2 rounded-2 '><span > price</span> :  {spicificMeal?.data.meal.price}</p>
                                <p className='greenStyle px-4 py-2 rounded-2'><span > weight</span> : {spicificMeal?.data.meal.weight}</p>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <h5>Cooker Details</h5>
                            <h6 className='mt-4'>Cooker Name: <span className='orangeStyle px-5 py-1 rounded-3'>{spicificMeal?.data.meal.addedBy.name}</span></h6>
                            <h6 className='mt-4'>Cooker Email: <span className='blueStyle px-5 py-1 rounded-3'>{spicificMeal?.data.meal.addedBy.email}</span></h6>
                            <h6 className='mt-4'>Cooker phone: <span className='dangerStyle px-5 py-1 rounded-3'>{spicificMeal?.data.meal.addedBy.phone}</span></h6>
                            <h6 className='mt-4'>Cooker address: <span className='greenStyle px-5 py-1 rounded-3'>{spicificMeal?.data.meal.addedBy.address}</span></h6>

                        </div>
                    </div>
                    </div>
                    
                </div>
        </div>
    </div>
  )
}
