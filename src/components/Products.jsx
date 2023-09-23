import React, { useEffect } from 'react'
import useFetchCollection from '../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, store_products } from '../redux/slices/productSlice'
import ProductList from './ProductList'
import { selectfilters } from '../redux/slices/filterSlice'

const Products = () => {
  const {data,isLoading}=useFetchCollection("products")
  const dispatch=useDispatch()
  useEffect(()=>{
      dispatch(store_products(data))
  },[data,dispatch])

  let products=useSelector(selectProducts)
  let filterProducts=useSelector(selectfilters)
  return (
    <div className='container mt-2'>
      {filterProducts.length==0 ?
        <ProductList products={products}/>
        :
        <ProductList products={filterProducts}/>
      }
      
      
    </div>
  )
}

export default Products
