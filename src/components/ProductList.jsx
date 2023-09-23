import React from 'react'
import ProductItem from './ProductItem'

const ProductList = ({products}) => {
  return (
    <div>
      {products.length==0 && <h1>No Product Found</h1>}
      <div className='row'>
      {products.map((product,index)=><ProductItem key={index} product={product} {...product}/>)}
      </div>
    </div>
  )
}

export default ProductList
