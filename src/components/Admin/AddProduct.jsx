import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {db, storage} from '../../firebase/config'
import Loader from '../Loader'
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../redux/slices/productSlice'
const initialState={id:'',name:'',price:'',brand:'',category:'', imageURL:'', countInStock:'',desc:''}

let categories=["Men","Women","Kids","Electronics","Grocery"]
const AddProduct = () => {

  let [product,setProduct]=useState({...initialState})
  let navigate=useNavigate()
  let [isLoading,setIsLoading]=useState(false)
  let [uploadProgress,setUploadProgress]=useState(0)

  const {id}=useParams()
  const products=useSelector(selectProducts)
  const productEdit=products.find((item)=>item.id==id)
 
  useEffect(()=>{
    if(id){setProduct({...productEdit})}
    else setProduct({...initialState})
  },[id])


    let handleImage=(e)=>{
        let file=e.target.files[0]
        const storageRef=ref(storage,`2ndmayecommerce/${Date.now()}${file.name}`)
        const uploadTask=uploadBytesResumable(storageRef,file)
        uploadTask.on("state_changed",(snapshot)=>{
             const progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100
             setUploadProgress(progress)
        },(error)=>toast.error(error.message),
        ()=>{
         getDownloadURL(uploadTask.snapshot.ref).then((url)=> {
         setProduct({...product,imageURL:url}) }).catch(error=>console.log(error.message))
        }     
        )
     }
  let addproduct=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    if(!id){
    try{
        addDoc(collection(db,"products"),{
            name:product.name,
            price:product.price,
            imageURL:product.imageURL,
            category:product.category,
            desc:product.desc,
            brand:product.brand,
            countInStock:product.countInStock,
            createdAt:Timestamp.now().toDate()
        })
        setIsLoading(false)
        toast.success("product added")
        navigate('/admin/viewproducts')
    }
    catch(error){
        setIsLoading(false)
        toast.error(error.message)
    }
  }
  else {
    if(product.imageURL != productEdit.imageURL){
      let imgref=ref(storage,productEdit.imageURL)
      deleteObject(imgref)
    }
    try{
      setDoc(doc(db,"products",id),{
          name:product.name,
          price:product.price,
          imageURL:product.imageURL,
          category:product.category,
          desc:product.desc,
          brand:product.brand,
          countInStock:product.countInStock,
          createdAt:product.createdAt,
          updatedAt:Timestamp.now().toDate()
      })
      setIsLoading(false)
      toast.success("product updated")
      navigate('/admin/viewproducts')
  }
  catch(error){
      setIsLoading(false)
      toast.error(error.message)
  }
  }
  }
  return (
    <div className='ms-5 shadow p-3'>
        {isLoading && <Loader/>}
    <h1>{id?"Edit":"Add"} Product</h1> <hr/>
    <form onSubmit={addproduct}>
      <div className='row'>
      <div class="form-floating mb-3 col-6">
        <input
          type="text"
          class="form-control" name="name"
          value={product.name} onChange={(e)=>setProduct({...product,name:e.target.value})} id="formId1" />
        <label for="formId1">Name</label>
      </div>
      <div class="form-floating mb-3 col-6">
        <input
          type="number"
          class="form-control" name="price" id="formId1"  value={product.price} onChange={(e)=>setProduct({...product,price:e.target.value})}/>
        <label for="formId1">Price</label>
      </div></div>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control" name="brand" id="formId1"   value={product.brand} onChange={(e)=>setProduct({...product,brand:e.target.value})}/>
        <label for="formId1">brand</label>
      </div>
      {uploadProgress == 0 ?
        null :
        <div class="progress" role="progressbar">
        <div class="progress-bar" style={{width:`${uploadProgress}%`}}>
            {uploadProgress < 100 ? `Uploading ${uploadProgress}`:
            `Upload Completed ${uploadProgress}`}
        </div>
        </div>
      } 
      <div class="mb-3">
        <label for="" class="form-label">Choose file</label>
        <input type="file" class="form-control" name="imageURL" onChange={handleImage}/>
      </div>
      {id && <img src={product.imageURL} style={{width:'50px',height:'50px'}}/>}
      <div class="mb-3">
        <label for="" class="form-label">Select Category</label>
        <select class="form-select" name="category"  value={product.category} onChange={(e)=>setProduct({...product,category:e.target.value})}>
          <option selected>Select one</option>  
          {categories.map((c,index)=><option key={index}>{c}</option>)}      
        </select>
      </div>
      <div class="form-floating mb-3">
        <input
          type="number"
          class="form-control" name="CountInStock" id="formId1"   value={product.countInStock} onChange={(e)=>setProduct({...product,countInStock:e.target.value})}/>
        <label for="formId1">CountInStock</label>
      </div>
     <div class="mb-3">
       <label for="" class="form-label">Description</label>
       <textarea class="form-control" name="desc" id="" rows="3"  value={product.desc} onChange={(e)=>setProduct({...product,desc:e.target.value})}>{product.desc}</textarea>
     </div>
     <div class="d-grid gap-2">
       <button type="submit" name="" id="" class="btn btn-primary">{id?"Update":"Add"} Product</button>
     </div>
    </form>
  </div>
  )
}

export default AddProduct
