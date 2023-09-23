import React, { useState } from 'react'
import useFecthDocument from '../../customHooks/useFecthDocument'
import Loader from '../Loader'
import { Timestamp, doc, setDoc } from 'firebase/firestore'
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
const ChangeOrderStatus = ({id,orderStatus,order}) => {
    let [status,setStatus]=useState(orderStatus)
    const [isLoading,setIsLoading]= useState(false)
    const {document} =useFecthDocument("orders",id)
    const navigate=useNavigate()
    let handleSubmit=(e)=>{
        e.preventDefault()
        setIsLoading(true)
        let orderConfig={
            userID:order.userID,
            userEmail:order.userEmail,
            orderDate:order.orderDate,
            orderTime:order.orderTime,
            orderAmount:order.orderAmount,
            cartItems:order.cartItems,
            shippingAddress:order.shippingAddress, 
            orderStatus:status,
            createdAt:order.createdAt,
            editedAt:Timestamp.now().toDate()
        }
        try{
            setDoc(doc(db,"orders",id),orderConfig)       
        emailjs.send('service_eak0ecs', 'template_8pvqaie', {user_email:orderConfig.userEmail,order_status:orderConfig.orderStatus,
        order_amount:orderConfig.orderAmount,order_date:orderConfig.orderDate}, 'ouyyULNr1Fl9QYxiJ')
        .then((result) => {
            setIsLoading(false)
            toast.success("order updated")
            navigate('/admin/orders')
        }, (error) => {
            setIsLoading(false)
            console.log(error.text);
        });
           
        }
        catch(error){
            setIsLoading(false)
            toast.error(error.message)
        }
    }
  return (
    <div className='mt-3'>
        {isLoading &&   
        <div class="spinner-border" style={{width:'3rem',height: '3rem'}} role="status">
        <span class="visually-hidden">Loading...</span>
        </div>}
        <h4>Update Order Status</h4>
        <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <label for="" class="form-label">City</label>
                <select class="form-select" name="status" value={status}
                onChange={(e)=>setStatus(e.target.value)}>
                    <option>Order Placed</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Cancelled</option>
                    <option>Delivered</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
        </form>
    </div>
  )
}

export default ChangeOrderStatus
