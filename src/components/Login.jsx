import React, { useState } from 'react'
import loginImg from '../assets/login.png'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, db } from '../firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import Loader from './Loader'
import { useSelector } from 'react-redux'
import { selectpreviousURL } from '../redux/slices/cartSlice'
const Login = () => {
    let [email,setEmail]=useState('')
    let [pwd,setPwd]=useState('')
    const [isLoading,setIsLoading]=useState(false)
    let navigate=useNavigate()

    let saveurl=useSelector(selectpreviousURL)
    let redirectURL=()=>{
        if(saveurl.includes('cart'))
          navigate('/cart')
        else 
          navigate('/')
    }

    let handleSubmit=(e)=>{
        e.preventDefault()
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, pwd)
        .then(async(userCredential) => {
            const user = userCredential.user;
            const docRef=doc(db,"users",user.uid)
            const docSnap=await getDoc(docRef)
            let role=docSnap.data().role
            if(role=="admin"){
              navigate('/admin')
            }
            else if(role=="user"){
              redirectURL()
              // navigate('/')
            }
            toast.success("loggedin successfully")
            setIsLoading(false)
        })
        .catch((error) => {
          setIsLoading(false)
          toast.error(error.message)
        });
    }
    const provider = new GoogleAuthProvider();
    let googlelogin=()=>{
        signInWithPopup(auth, provider)
        .then((result) => {
        //   const user = result.user;
        toast.success("loggedin successfully")
        redirectURL()
        // navigate('/')
        }).catch((error) => {
            toast.error(error.message)
        });
    }
  return (
    <div className='container mt-5 col-8 shadow'>
          {isLoading && <Loader/>}
        <h3>Login </h3> <hr/>
        <div className='row'>
            <div className='col-4'>
                <img src={loginImg} style={{height:'300px'}}/>
            </div>
            <div className='col-6'>
                <form onSubmit={handleSubmit}>
                 <div class="mb-3">
                      <label for="" class="form-label">Email</label>
                      <input type="text" name="email" id="" class="form-control" placeholder="" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                      <label for="" class="form-label">password</label>
                      <input type="password" name="pwd" id="" class="form-control" placeholder="" value={pwd} onChange={(e)=>setPwd(e.target.value)}/>
                    </div>
                  <div class="d-grid gap-2">
                    <button type="submit" name="" id="" class="btn btn-primary">Login</button>   </div> </form>
                    <p class="d-grid gap-2">
                        ---------------------or---------------------</p>
                    <div class="d-grid gap-2">
                    <button type="button" name="" id="" class="btn btn-danger" onClick={googlelogin}>Login with google</button>   </div>
               
               
                <p>Create Account?? <Link to='/register'>SignUp</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Login
