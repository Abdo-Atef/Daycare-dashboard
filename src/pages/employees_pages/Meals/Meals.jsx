import axios from 'axios';
import { useFormik } from 'formik';
import React, { Fragment, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { BASE_URL } from '../../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { FilterMeal, getAllMeals, setIngrediantFilter, setMealFilter } from '../../../redux/employees_Slices/mealSlice';
import { Link } from 'react-router-dom';
import * as yup from 'Yup';
import styles from './Meals.module.css'
import { toast } from 'react-toastify';
import UpdateMeal from '../../../components/updateMeal/UpdateMeal';
import maleImage from '../../../assets/meal.png'
export default function Meals() {
    const [showMealModal, setShowMealModal] = useState(false);
    const [showUpdateMealModal, setShowUpdateMealModal] = useState(false);
    const [mealData,setMealData]=useState(null)
    const {employeeToken}=useSelector((state)=>state.employee)
    const {meals,mealFilter}=useSelector((state)=>state.meals);
    const dispatch=useDispatch();
    function handleUpdateMeal(data){
        setShowUpdateMealModal(true)
        setMealData(data)
    }
    async function searchMeal(value){
        const {payload}=await dispatch(getAllMeals());
        const data=payload?.filter((meal)=>meal?.mealName.toLowerCase().includes(value.toLowerCase()))
        
        dispatch(setMealFilter(data))
    }
    async function FilterBuyMealsIngredients(value){
        const {payload}=await dispatch(getAllMeals());
        const data = payload?.filter((meal) => 
            meal?.mealsIngredients.some((ing) => ing.toLowerCase().includes(value.toLowerCase()))
        );       
         console.log(data);
        dispatch(setIngrediantFilter(data))

    }
    async function addMeal(value) {
        const formData = new FormData();
        for (const key in value) {
            formData.append(key, value[key]);
          }
        const result=await axios.post(`${BASE_URL}/employees/meals/addMeal`,formData,{headers:{token:employeeToken}});
                dispatch(getAllMeals())
                if(result?.data.success===true){
                    toast.success(result.data.message)
                }else{
                    toast.error("The meal is available")
                }
                console.log(result);
    }
    async function deleteMeal(id){
        const result =await axios.delete(`${BASE_URL}/employees/meals/deleteMeal/${id}`,{headers:{token:employeeToken}})
        console.log(result);
        if(result.data.success == true){
            toast.success(result.data.message)
        }else{
            toast.error(result.data.error)
        }
        dispatch(getAllMeals())
    }
   
    const validationSchema=yup.object({
        mealName:yup.string().required(),
        mealsIngredients:yup.string().required(),
        price:yup.number().required(),
        weight:yup.string().required(),
    })
    const formik = useFormik({
        initialValues: {
            mealName: '',
            mealsIngredients: '',
            price: '',
            weight: '',
            mealImage: null,
        },
        onSubmit: addMeal,
        validationSchema
    });
    const handleChangeFile = (event) => {
        const { name, files } = event.currentTarget;
        formik.setFieldValue(name, files[0]);
    };
    // =============> Pagination <==================
  const [currentPage,setCurrentPage]=useState(1);
  const [numberPage,setnumberOfPages]=useState(5);
  const totalPages=Math.ceil(meals?.length/parseInt(numberPage))
  const handleClick=(page)=>{
      setCurrentPage(page)
  }
  const start =(currentPage - 1) * parseInt(numberPage);
  const end=start + parseInt(numberPage)

  const renderPagination=()=>{
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(
              <li className={`btn ${ currentPage == i ? 'btn-warning  ' : 'btn-night'} px-3 mx-1`} key={i} onClick={() => handleClick(i)}>
                  {i}
              </li>
          );
      }
      return <ul className={`${styles.paginationStyles} m-0 p-0 list-unstyled d-flex`}>
      <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == 1 || meals?.length == 0} onClick={() => setCurrentPage(currentPage - 1)}>
          <i className="fa-solid fa-angles-left"></i>
          </button></li>
      {pageNumbers}
      <li><button className="btn btn-night mx-1 text-white" disabled={currentPage == totalPages || meals?.length == 0} onClick={() => setCurrentPage(currentPage + 1)}>
          <i className="fa-solid fa-angles-right"></i></button>
          </li>
      </ul>;
  }
    useEffect(()=>{
        dispatch(getAllMeals());
        dispatch(FilterMeal())

    },[])
    return (
        <div>
            <div className="container">
                <div className="py-5">
                    <h3>Meals Management</h3>
                </div>
                <div className="d-flex justify-content-between align-items-center gap-5">
                    <div style={{ width: '500px' }}>
                        <input type="text" className="form-control" onChange={(e)=>searchMeal(e.target.value)} placeholder="Search About Meals"/>
                    </div>
                    <div className='' style={{ width: '300px' }}>
                        <select name="" id="" className='form-control' onChange={(e)=>FilterBuyMealsIngredients(e.target.value)}>
                            { mealFilter&&mealFilter?.map((meal)=><Fragment key={meal.id}>
                                {meal?.mealsIngredients.map((ing,index)=><option className='dangerStyle rounded-2 shadow d-inline-flex m-1 px-4 p-2' key={index}>
                                            {ing}
                                        </option>)}
                            </Fragment>)}
                        </select>
                    </div>
                    <div>
                        <button className="btn btn-night" onClick={() => setShowMealModal(true)}>Add Meal</button>
                    </div>
                    
                </div>
                <div className='row py-5 g-3'>
                    {meals?.length==0?<div className='d-flex justify-content-center'>
                        <img src={maleImage} alt="maleImage" />
                    </div>: meals&&meals?.slice(start,end).map((meal)=><div className='col-lg-4 col-md-3  p-4' key={meal._id}>
                            <div className='bg-white rounded-3 shadow overflow-auto '>
                                <Link to={`/employees.panal/meals/${meal.id}`} >
                                {meal.mealImages.map((img,index)=><div className='p-3' key={index}>
                                    <img className='w-100 rounded-2' src={img.secure_url} key={img.public_id} height={'200px'}/>
                                </div>)}
                                </Link>
                                <div className='p-3'>
                                    <h4 className='text-center text-black'>{meal.mealName}</h4>
                                    <div className='text-center '>
                                        {meal.mealsIngredients.map((ing,index)=><span className='dangerStyle rounded-2  d-inline-flex m-1 px-4 p-2' key={index}>
                                            {ing}
                                        </span>)}
                                    </div>
                                    <div className='my-3 greenStyle d-flex justify-content-between p-3  rounded-2 '>
                                        <span > price :  {meal.price}$</span>
                                        <span >weight: {meal.weight}</span>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between px-5 mb-3'>
                                    <div className='text-center dangerStyle cursor-pointer rounded-2 shadow' onClick={()=>deleteMeal(meal?.id)}>
                                        <i className="fa-regular fa-square-minus align-self-end h3 p-3"></i>
                                    </div>
                                    <div className='text-center orangeStyle cursor-pointer rounded-2 shadow' onClick={()=>handleUpdateMeal(meal?.id)}>
                                        <i className="fa-regular fa-pen-to-square h3 p-3"></i>
                                    </div>
                                </div>
                            </div>
                    </div>)                    
                    }
                    <div className="d-flex align-items-center my-5  justify-content-between position-relative w-100 ">
                    <div className="d-flex align-items-center">
                        <span className="fs-13 fw-medium  me-1">Show:</span>
                        <select onChange={(e)=> setnumberOfPages(e.target.value)} className='form-select shadow-none fs-14' style={{width:'130px'}}>
                                <option value="5">5 Rows</option>
                                <option value="10">10 Rows</option>
                                <option value="20">20 Rows</option>
                                <option value="50">50 Rows</option>
                        </select>
                    </div>
                    {renderPagination()
                    
                    }
            </div>
                </div>
            </div>
            {showMealModal && (
                <Modal
                    size="lg"
                    show={showMealModal}
                    onHide={() => setShowMealModal(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                    centered
                >
                    <Modal.Header
                        className="border-0"
                        closeButton
                        style={{ backgroundColor: '#1b1b1d', color: '#fff' }}
                    >
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Add Meals
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: '#1b1b1d' }}>
                        <form className="text-white" onSubmit={formik.handleSubmit}>
                            <label htmlFor="mealName" className="fs-5 my-2">Meal Name</label>
                            <input type="text" name="mealName" value={formik.values.mealName} onBlur={formik.handleBlur} onChange={formik.handleChange} id="mealName" placeholder="Meal name" className="w-100 border-0 text-white rounded-2" style={{outline: 0,padding: 10,backgroundColor:'hsla(227, 25%, 25%,.35)',}}/>
                            {formik.errors.mealName &&formik.touched.mealName ? <p className="text-danger">{formik.errors.mealName}</p>:''}
                            <label htmlFor="mealsIngredients" className="fs-5 my-2">Meals Ingredients</label>
                            <div className="d-flex">
                                <input type="text" value={formik.values.mealsIngredients} name='mealsIngredients' onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder="Add an ingredient" className="form-control"/>
                            </div>
                            
                            {formik.errors.mealsIngredients &&formik.touched.mealsIngredients ? <p className="text-danger">{formik.errors.mealsIngredients}</p>: ''}
                            <label htmlFor="price" className="fs-5 my-2">Price</label>
                            <input type="number" name="price" value={formik.values.price} onBlur={formik.handleBlur} onChange={formik.handleChange} id="price" placeholder="price" className="w-100 border-0 text-white rounded-2" style={{outline: 0, padding: 10,backgroundColor:'hsla(227, 25%, 25%,.35)',}}
                            />
                            {formik.errors.price && formik.touched.price ?<p className="text-danger">{formik.errors.price}</p>: ''}
                            <label htmlFor="weight" className="fs-5 my-2">Weight</label>
                            <input type="text" name="weight" value={formik.values.weight} onBlur={formik.handleBlur} onChange={formik.handleChange} id="weight" placeholder="weight" className="w-100 border-0 text-white rounded-2"style={{outline: 0,padding: 10,backgroundColor:'hsla(227, 25%, 25%,.35)',}}/>
                            {formik.errors.weight && formik.touched.weight ? (
                                <p className="text-danger">
                                    {formik.errors.weight}
                                </p>
                            ) : (
                                ''
                            )}
                            <label htmlFor="image1" className="fs-5 my-2">
                                Image Meal
                            </label>
                            <input
                                type="file"
                                name="mealImage"
                                onChange={handleChangeFile}
                                id="image1"
                                placeholder="Image Meal"
                                className="w-100 border-0 text-white rounded-2"
                                style={{
                                    outline: 0,
                                    padding: 10,
                                    backgroundColor:
                                        'hsla(227, 25%, 25%,.35)',
                                }}
                            />
                            <button
                                type="submit"
                                className="btn float-end text-white mt-2 px-5"
                                style={{
                                    backgroundColor:
                                        'hsla(178, 79%, 39%,.45)',
                                }}
                            >
                                Add Meal
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
            )}
             {showUpdateMealModal && (
                <UpdateMeal show={showUpdateMealModal} hide={()=>setShowUpdateMealModal(false)} mealData={mealData}/>
            )}
        </div>
    );
}
