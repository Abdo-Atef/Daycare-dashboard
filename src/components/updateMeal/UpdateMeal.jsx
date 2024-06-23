import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'Yup';
import { getAllMeals } from '../../redux/employees_Slices/mealSlice';
import { BASE_URL } from '../../utils/api';

export default function UpdateMeal({mealData,show,hide}) {
    const {employeeToken}=useSelector((state)=>state.employee)
    const dispatch=useDispatch();

    async function updateMealData(value){
        const formData = new FormData();
        for (const key in value) {
            formData.append(key, value[key]);
        }
        const result=await axios.patch(`${BASE_URL}/employees/meals/updateMeal/${mealData}`,formData,{headers:{token:employeeToken}});
        console.log(result);
        if(result.data.success==true){
            toast.success(result.data.message)
        }else{
            toast.error(result.data.error)
        }
        dispatch(getAllMeals())
    }
    const validationUpdateSchema=yup.object({
        mealName:yup.string(),
        price:yup.number(),
    })
    const updateFormik = useFormik({
        initialValues: {
            mealName: '',
            price: '',
            mealImage: null,
        },
        onSubmit: (value)=>{
            const updatedValues = {};
            if(value.mealName){
                updatedValues.mealName=value.mealName
            }
            if(value.price){
                updatedValues.price=value.price
            }
            if (Object.keys(updatedValues).length > 0) {
                updateMealData(updatedValues);
            } else {
                updateMealData(value);
            }
        },
        validationSchema:validationUpdateSchema,
    });
 
  return (
    <div>
        <Modal
                    size="lg"
                    show={show}
                    onHide={hide}
                    aria-labelledby="example-modal-sizes-title-lg"
                    centered
                >
                    <Modal.Header
                        className="border-0"
                        closeButton
                        style={{ backgroundColor: '#1b1b1d', color: '#fff' }}
                    >
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Edit Meals
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: '#1b1b1d' }}>
                        <form className="text-white" onSubmit={updateFormik.handleSubmit}>
                            <label htmlFor="mealName" className="fs-5 my-2">Meal Name</label>
                            <input type="text" name="mealName" value={updateFormik.values.mealName} onBlur={updateFormik.handleBlur} onChange={updateFormik.handleChange} id="mealName" placeholder="Meal name" className="w-100 border-0 text-white rounded-2" style={{outline: 0,padding: 10,backgroundColor:'hsla(227, 25%, 25%,.35)',}}/>
                            {updateFormik.errors.mealName &&updateFormik.touched.mealName ? <p className="text-danger">{updateFormik.errors.mealName}</p>:''}
                            <label htmlFor="price" className="fs-5 my-2">Price</label>
                            <input type="number" name="price" value={updateFormik.values.price} onBlur={updateFormik.handleBlur} onChange={updateFormik.handleChange} id="price" placeholder="price" className="w-100 border-0 text-white rounded-2" style={{outline: 0, padding: 10,backgroundColor:'hsla(227, 25%, 25%,.35)',}}/>
                            {updateFormik.errors.price && updateFormik.touched.price ?<p className="text-danger">{updateFormik.errors.price}</p>: ''}
                            
                            <button
                                type="submit"
                                className="btn float-end text-white mt-2 px-5"
                                style={{
                                    backgroundColor:
                                        'hsla(178, 79%, 39%,.45)',
                                }}
                            >
                                Edit Meal
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
    </div>
  )
}
