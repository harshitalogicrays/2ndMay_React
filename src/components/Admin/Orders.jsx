import React, { useEffect } from 'react'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectorders, store_orders } from '../../redux/slices/orderSlice'
import Loader from '../Loader'
import { useNavigate } from 'react-router-dom'

const Orders = () => {
    const {data,isLoading}=useFetchCollection("orders")
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        dispatch(store_orders(data))
    },[data])

    const orders=useSelector(selectorders)

    let handleClick=(id,orderStatus)=>{
        if(orderStatus=='Delivered')
            navigate('/admin/orders')
        else
            navigate(`/admin/order-details/${id}/${orderStatus}`)
    }
  return (
    <div className='mt-4 container shadow'>
    <h1>Orders</h1> <hr/>
    {isLoading && <Loader/>}
    {orders.length==0 ? 
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
                   {orders.map((order,index)=>
                       <tr class="" key={index} onClick={()=>handleClick(order.id,order.orderStatus)}>
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

export default Orders
