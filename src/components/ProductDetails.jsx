import React, { useEffect, useState } from 'react'
import useFecthDocument from '../customHooks/useFecthDocument'
import { useParams } from 'react-router-dom'
import ReactImageMagnify from 'react-image-magnify'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_CART, DECREASE, selectCartItems } from '../redux/slices/cartSlice'

const ProductDetails = () => {
    const {id}=useParams()
    const {document}=useFecthDocument("products",id)
    const [product,setProduct]=useState(null)
    const cartItems=useSelector(selectCartItems)
    const isCartAdded=cartItems.findIndex((item)=>item.id==id)
    const cart=cartItems.find((item)=>item.id==id)

    const dispatch=useDispatch()
    useEffect(()=>{
        setProduct(document)
    },[document])
  return (
    <div className='container shadow mt-5'>
        <h1>Product Details</h1><hr/>
        {product !=null &&
    <div className='row  p-3'>
        <div className='col-5'>
            {/* <img src={product.imageURL} style={{height:'300px',width:'300px'}}/> */}
       
            <ReactImageMagnify {...{
    smallImage: {
        alt: product.name,
        // isFluidWidth: true,
        src: product.imageURL,
        width: 400,
        height: 400
    },
    largeImage: {
        src: product.imageURL,
        width: 1200,
        height: 1200
    }
}} />
        </div>
        <div className='col-6'>
        <h4 class="card-title">{product.name}</h4>
        <p class="card-text">{product.brand}</p>
        <p class="card-text">{product.category}</p>
        <p class="card-text">{product.price}</p>
        {isCartAdded == -1 ?
        <button type="button" class="btn btn-danger" onClick={()=>dispatch(ADD_CART(product))}>Add to cart</button>:
            <><button onClick={()=>dispatch(DECREASE(product))}>-</button>
            <input type="text" value={cart.cartQuantity} style={{width:'40px'}} class="text-center" readOnly/>
            <button onClick={()=>dispatch(ADD_CART(product))}>+</button>
                 
            </>
        }
        </div>
    </div>
}
    </div>
  )
}

export default ProductDetails
