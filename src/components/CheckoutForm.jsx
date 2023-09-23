import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import CheckoutSummary from './CheckoutSummary'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUserEmail, selectUserID } from '../redux/slices/authSlice'
import { CLEAR_CART, selectCartItems, selectTotalAmount } from '../redux/slices/cartSlice'
import { selectShippingAddress } from '../redux/slices/checkoutSlice'
import { toast } from 'react-toastify'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase/config'
import emailjs from '@emailjs/browser';
const CheckoutForm = () => {
    let [message,setMessage]=useState(null)
    let [isLoading,setIsLoading]=useState(false)
    const stripe=useStripe()
    const elements=useElements()
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const userID=useSelector(selectUserID)
    const userEmail=useSelector(selectUserEmail)
    const cartItems=useSelector(selectCartItems)
    const shippingAddress=useSelector(selectShippingAddress)
    const totalAmount=useSelector(selectTotalAmount)

    useEffect(()=>{
        const clientSecret=new URLSearchParams(window.location.search).get('payment_intent_client_secret')
    },[stripe])

    let handleSubmit=async(e)=>{
        e.preventDefault()
        setMessage(null)
        setIsLoading(true)
        const confirmPayment=await stripe.confirmPayment({
            elements,
            confirmParams:{
                return_url:"http://localhost:3000/checkout-success"
            },
            redirect:"if_required"
        }).then((result)=>{
            if(result.error){
                toast.error(result.error.message)
                setMessage(result.error.message)
                return;
            }
            if(result.paymentIntent){
                if(result.paymentIntent.status=="succeeded"){
                    setIsLoading(false)
                    toast.success('payment done')
                    saveorder()
                }
            }
        })
        setIsLoading(false)
    }

    let saveorder=()=>{
        let today=new Date()
        let date=today.toDateString()
        let time=today.toLocaleTimeString()

        let orderConfig={
            userID:userID,userEmail:userEmail,orderDate:date,orderTime:time,orderAmount:totalAmount,cartItems:cartItems,shippingAddress:shippingAddress, orderStatus:"Order Placed",
            createdAt:Timestamp.now().toDate()
        }
        try{
            addDoc(collection(db,"orders"),orderConfig)
            dispatch(CLEAR_CART())
            

            
        emailjs.send('service_eak0ecs', 'template_8pvqaie', {user_email:orderConfig.userEmail,order_status:orderConfig.orderStatus,
        order_amount:orderConfig.orderAmount,order_date:orderConfig.orderDate}, 'ouyyULNr1Fl9QYxiJ')
        .then((result) => {
            toast.success("order placed")
            navigate('/checkout-success')
        }, (error) => {
            console.log(error.text);
        });
           
        }
        catch(error){
            toast.error(error.message)
        }
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='row mt-3'>
        <div className='card col-5 me-2'>
                <h4>Checkout Summary</h4>
                <CheckoutSummary/>
            </div>
            <div className='card col-5 me-2'>
                <h4>Stripe Checkout</h4>
                <PaymentElement id="payment_element"></PaymentElement>
                <div class="d-grid gap-2 mt-2">
                  <button type="submit" name="" id="" class="btn btn-primary">
                    {isLoading ? 
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                    </div>
                    :
                    <>(Pay Now)</> }</button>
                </div>
                        {message && <h3>{message}</h3>}
            </div>
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm
