import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectTotalAmount } from '../redux/slices/cartSlice'
import { selectShippingAddress } from '../redux/slices/checkoutSlice'
import { selectUserEmail, selectUserID } from '../redux/slices/authSlice'
import { toast } from 'react-toastify'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
const stripePromise=loadStripe('pk_test_51NOvqGSAvExKFAjaCl4fAxmf3CFJlq54guOtblHh0nEuB7XGZ9KXvKSgHgjjiIc0kexx4SUn67Z4iXDBB9q3fevA0096oZR8bw')

const Checkout = () => {
    const [message,setMessage]=useState("Initializing Checkout")
    const [clientSecret,setClientSecret]=useState('')

    const cartItems=useSelector(selectCartItems)
    const totalAmount=useSelector(selectTotalAmount)
    const shippingAddress=useSelector(selectShippingAddress)
    const userEmail=useSelector(selectUserEmail)
    const userID=useSelector(selectUserID)
    const description="ecommerce app"

    useEffect(()=>{
        fetch("http://localhost:1000/payment",{
            method:'POST',
            headers:{"content-type":"application/json"},
            body:JSON.stringify({
                items:cartItems,userEmail:userEmail,userID:userID,amount:totalAmount,shippingAddress:shippingAddress,description:description
            })
        }).then((res)=>res.json())
        .then((data)=>{
            console.log(data.clientSecret)
            setClientSecret(data.clientSecret)
        })
        .catch((error)=>{
            setMessage("Failed to initialize checkout")
            toast.error("something went wrong")
        })
    },[])

    const appearance={theme:'stripe'}
    const options={clientSecret,appearance}
  return (
    <div className='container'>
        {!clientSecret && <h3>{message}</h3>}
        {clientSecret && 
        <Elements key={clientSecret} options={options} stripe={stripePromise}>
            <CheckoutForm/>
        </Elements>
        }
    </div>
  )
}

export default Checkout
