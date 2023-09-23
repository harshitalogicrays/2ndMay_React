import React, { useEffect } from 'react'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, store_products } from '../../redux/slices/productSlice'
import { Link } from 'react-router-dom'
import {FaPenNib, FaTrashAlt} from 'react-icons/fa'
import Loader from '../Loader'
import { deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '../../firebase/config'
import { deleteObject, ref } from 'firebase/storage'
import { toast } from 'react-toastify'
const ViewProducts = () => {
  const {data,isLoading}=useFetchCollection("products")
  const dispatch=useDispatch()
  useEffect(()=>{
      dispatch(store_products(data))
  },[data,dispatch])

  let products=useSelector(selectProducts)

  let handleDelete=async(id,imageURL)=>{
    if(window.confirm("are you sure to delete this product")){
        await deleteDoc(doc(db,"products",id))
        let imgref=ref(storage,imageURL)
        deleteObject(imgref)
        toast.success("product deleted")
    }
  }
  return (
    <div>
      {isLoading && <Loader/>}
      <h1>All Products</h1><hr/>
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Brand</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length==0 && <tr><td colSpan={7}>No product Found</td></tr>}
            {products.map((product,index)=>
            <tr key={index}>
              <td scope="row">{index+1}</td>
              <td>{product.name}</td>
              <td><img src={product.imageURL} style={{width:'50px',height:'50px'}} alt={product.name}/></td>
              <td scope="row">{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <Link type="button" to={`/admin/edit/${product.id}`} class="btn btn-success me-2"><FaPenNib/></Link>
                <button type="button" class="btn btn-danger" onClick={()=>handleDelete(product.id,product.imageURL)}><FaTrashAlt/></button>
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default ViewProducts
