import React, { useEffect } from 'react'
import useFetchCollection from '../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectorders, store_orders } from '../redux/slices/orderSlice'
import { selectUserID } from '../redux/slices/authSlice'
import Loader from './Loader'

const OrderHistory = () => {
    const {data,isLoading}=useFetchCollection("orders")
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(store_orders(data))
    },[data])

    const orders=useSelector(selectorders)
    const userId=useSelector(selectUserID)
    const filterOrders=orders.filter((order)=>order.userID==userId)
  return (
    <div className='mt-4 col-8 container shadow'>
        <h1>Your Order History</h1> <hr/>
        {isLoading && <Loader/>}
        {filterOrders.length==0 ? 
            <h3>No Order Found</h3>      
        :
        <>
                   <div class="table-responsive">
                   <table class="table table-bordered table-striped table-hover">
                       <thead>
                           <tr>
                               <th scope="col">Order ID</th>
                               <th scope="col">Date and Time</th>
                               <th scope="col">Order Amount</th>
                               <th scope="col">Order Status</th>
                           </tr>
                       </thead>
                       <tbody>
                       {filterOrders.map((order,index)=>
                           <tr class="" key={index}>
                               <td scope="row">{order.id}</td>
                               <td>{order.orderDate} at {order.orderTime}</td>
                               <td>{order.orderAmount}</td>
                               <td>
                                <span className={
                                    order.orderStatus !=='Delivered'?'text-danger':'text-success'
                                }>
                                {order.orderStatus}</span>
                                </td>
                           </tr>)}
                       </tbody>
                   </table>
               </div>
            
        </>       
        }
     </div>
  )
}

export default OrderHistory
