import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_CART, CALCULATE_TOTAL, CLEAR_CART, DECREASE, REMOVE_FROM_CART, SAVE_URL, selectCartItems, selectTotalAmount } from '../redux/slices/cartSlice'
import { FaArrowLeft, FaTrash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../redux/slices/authSlice'

const Cart = () => {
  let cartItems=useSelector(selectCartItems)
  let totalAmount=useSelector(selectTotalAmount)
  let dispatch=useDispatch()
  useEffect(()=>{
    dispatch(CALCULATE_TOTAL())
  })

  let isLoggedIn=useSelector(selectIsLoggedIn)
  const navigate=useNavigate()
  let url=window.location.href
  let handleCheckout=()=>{
    if(isLoggedIn){
      navigate('/checkout-details')
    }
    else {
      dispatch(SAVE_URL(url))
      navigate('/login')
    }
  }
  return (
    <div className='container  mt-5'>
    <Link type="button" class="btn btn-primary mb-4" to='/'><FaArrowLeft/> Back to Shopping</Link>
    <div class="card shadow">
      <div class="card-header">
      <h1>My Cart</h1>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered table-striped ">
            <thead>
              <tr>
                <th scope="col">Sr.No</th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length==0 && <tr><td colSpan={7}>No Item in Cart</td></tr>}
             {cartItems.map((item,index)=>
              <tr class="" key={index}>
                <td scope="row">{index+1}</td>
                <td>{item.name}</td>
                <td><img src={item.imageURL}  style={{width:'50px'}}/></td>
                <td>{item.price}</td>
                <td scope="row">
                  <button onClick={()=>dispatch(DECREASE(item))}>-</button>
                  <input type="text" value={item.cartQuantity} style={{width:'40px'}} class="text-center" readOnly/>
                  <button onClick={()=>dispatch(ADD_CART(item))}>+</button>
                  </td>
                <td>{item.cartQuantity * item.price}</td>
                <td><button type="button" class="btn btn-danger" onClick={()=>dispatch(REMOVE_FROM_CART(index))}><FaTrash/></button></td>
              </tr>)}
            </tbody>
          </table>
        </div>
        
      
     
    <div className="row">
      <div className='col-4'>
        <button type="button" class="btn btn-danger" onClick={()=>dispatch(CLEAR_CART())}>Clear Cart</button>
      </div>
      <div className='col-3 offset-5'>
       <h4>Total: <span class="float-end">${totalAmount}</span></h4>
       <hr/>
       <div class="d-grid gap-2">
         <button type="button" name="" id="" class="btn btn-warning" onClick={handleCheckout}>Checkout</button>
       </div>
      </div>
    </div>
    </div>
  </div>
  </div>
  )
}

export default Cart
