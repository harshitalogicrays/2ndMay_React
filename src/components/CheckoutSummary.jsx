import React from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectTotalAmount } from '../redux/slices/cartSlice'
import { Link } from 'react-router-dom'
import {FaArrowLeft} from 'react-icons/fa'
const CheckoutSummary = () => {
    const cartItems=useSelector(selectCartItems)
    const cartTotalAmount=useSelector(selectTotalAmount)
  return (
    <>
        {cartItems.length==0 ? <>
        <h1>No Item in Your Cart</h1>
        <Link to='/' className='btn btn-primary'><FaArrowLeft/> Back to Home</Link>
        </>
        :
        <>
            <h4>{`Cart Items : ${cartItems.length}`}</h4>
            <h5>{`Subtotal: ${cartTotalAmount}`}</h5>
            {cartItems.map((item,index)=>
                <div class="card mb-2">
                  <div class="card-body">
                        <h4 class="card-title">Product:{item.name}</h4>
                        <p class="card-text">Quantity:{item.cartQuantity}</p>
                        <p class="card-text">Unit Price:{item.price}</p>
                        <p class="card-text">Total:{item.cartQuantity * item.price}</p>
                    </div>
                </div>
            )}
        </>    
    }
    </>
  )
}

export default CheckoutSummary
