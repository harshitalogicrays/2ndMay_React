import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ADD_CART } from '../redux/slices/cartSlice'

const ProductItem = ({product,id,imageURL,name,price,desc,category,brand}) => {
  let dispatch=useDispatch()
  return (
<div class="card col-3 m-2 shadow">
    <Link to={`/productdetails/${id}`}>
    <img class="card-img-top" src={imageURL} alt="Title" style={{height:'200px'}}/>
    </Link>
    <div class="card-body">
        <h4 class="card-title">{name}</h4>
        <p class="card-text">{brand}</p>
        <p class="card-text">{category}</p>
        <p class="card-text">{price}</p>
        <button type="button" class="btn btn-danger" onClick={()=>dispatch(ADD_CART(product))}>Add to cart</button>
    </div>
</div>
  )
}

export default ProductItem
