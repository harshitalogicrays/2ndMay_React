import React, { useEffect, useState } from 'react'
import { CountryDropdown } from 'react-country-region-selector'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectShippingAddress, store_shipping_Address } from '../redux/slices/checkoutSlice'
import CheckoutSummary from './CheckoutSummary'
let intialState={name:"", line1:"", line2:"",mobile:"",city:"",state:"",postal_code:"",country:""}

const CheckoutDetails = () => {
    let [address,setAddress]=useState({...intialState})
    let shipping=useSelector(selectShippingAddress)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    let handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(store_shipping_Address(address))
        navigate('/checkout')
      }

      useEffect(()=>{
         if(shipping){
          setAddress({...shipping})
         }
         else {
          setAddress({...intialState})
         }
      })
  return (
    <div className='container mt-3'>
        <div className='row shadow p-3'>
            <div className='col-6'>
                    <h1>Checkout Details</h1>
                    <hr/>
                    <form onSubmit={handleSubmit}>
      <div className='row'>
    <div class="form-floating mb-3 col-6">
      <input
        type="text"
        class="form-control" name="name" id="formId1"  value={address.name}
        onChange={(e)=>setAddress({...address,name:e.target.value})}/>
      <label for="formId1">Receipient Name</label>
    </div>  
    <div class="form-floating mb-3 col-6">
      <input
        type="text"
        class="form-control" name="line1" id="formId1"  value={address.line1}
        onChange={(e)=>setAddress({...address,line1:e.target.value})}/>
      <label for="formId1">Address Line 1 </label>
    </div>      
    </div>
    <div className='row'>
      <div class="form-floating mb-3 col-6">
      <input
        type="text"
        class="form-control" name="line2" id="formId1" value={address.line2}
        onChange={(e)=>setAddress({...address,line2:e.target.value})}/>
      <label for="formId1">Address Line 2</label>
    </div>      
    <div class="form-floating mb-3 col-6">
      <input
        type="text"
        class="form-control" name="mobile" id="formId1" value={address.mobile}
        onChange={(e)=>setAddress({...address,mobile:e.target.value})}/>
      <label for="formId1">Mobile </label>
    </div>     
    </div>
    <div class='row'>
      <div class="form-floating mb-3 col-6">
      <input
        type="text"
        class="form-control" name="city" id="formId1"  value={address.city}
        onChange={(e)=>setAddress({...address,city:e.target.value})}/>
      <label for="formId1">City</label>
    </div>      

      <div class="form-floating mb-3 col-6">
      <input

        type="text"
        class="form-control" name="state" id="formId1"  value={address.state}
        onChange={(e)=>setAddress({...address,state:e.target.value})}/>
      <label for="formId1">State</label>
    </div>      
    </div>
      <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control" name="pincode" id="formId1"  value={address.postal_code}
        onChange={(e)=>setAddress({...address,postal_code:e.target.value})}/>
      <label for="formId1">PinCode</label>
    </div>  
    <div className='mb-3'>
        <CountryDropdown value={address.country} onChange={(val)=>setAddress({...address,country:val})} valueType='short' classes='form-control'/>
     
    </div>
    
    <div class="d-grid gap-2">
      <button type="submit" name="" id="" class="btn btn-primary">Procced to checkout </button>
    </div>   
        
    </form>
            </div>
            <div className='col-6'>
                <h1>Checkout Summary</h1> <hr/>
                <CheckoutSummary/>
                </div>
        </div>
    </div>
  )
}

export default CheckoutDetails
