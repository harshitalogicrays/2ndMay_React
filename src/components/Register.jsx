import React, { useState } from 'react'
import registerImg from '../assets/register.png'
import { Link, useNavigate } from 'react-router-dom'
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../firebase/config'
import { toast } from 'react-toastify';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import Loader from './Loader';
let initial ={username:'',email:'',pwd:'',cpwd:''}
const Register = () => {
  const [isLoading,setIsLoading]=useState(false)
    const [user,setuser]=useState({...initial})
    const navigate=useNavigate()
    let handleSubmit=(e)=>{
        e.preventDefault()
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, user.email, user.pwd)
        .then(async(userCredential) => {
             const user1 = userCredential.user;
            const docRef=doc(db,"users",user1.uid)
            let {username,email,pwd,cpwd}=user
            await setDoc(docRef,{username,email,pwd,cpwd,role:"user",createdAt:Timestamp.now().toDate()})
            setIsLoading(false)
            toast.success("registered")
            navigate('/')
        })
        .catch((error) => {
          setIsLoading(false)
            toast.error(error.message)
        });

    }
  return (
    <div className='container  mt-5 col-10 shadow'>
      {isLoading && <Loader/>}
        <h3>Register </h3> <hr/>
        <div className='row'>
            <div className='col-4'>
                <img src={registerImg} style={{height:'300px'}}/>
            </div>
            <div className='col-6'>
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                      <label for="" class="form-label">Username</label>
                      <input type="text" name="username" id="" class="form-control" placeholder="" value={user.username}
                      onChange={(e)=>setuser({...user,username:e.target.value})}/>
                    </div>
                    <div class="mb-3">
                      <label for="" class="form-label">Email</label>
                      <input type="text" name="email" id="" class="form-control" placeholder=""  value={user.email}
                      onChange={(e)=>setuser({...user,email:e.target.value})}/>
                    </div>
                    <div class="mb-3">
                      <label for="" class="form-label">password</label>
                      <input type="password" name="pwd" id="" class="form-control" placeholder=""  value={user.pwd}
                      onChange={(e)=>setuser({...user,pwd:e.target.value})}/>
                    </div>
                    <div class="mb-3">
                      <label for="" class="form-label">Confirm Password</label>
                      <input type="password" name="cpwd" id="" class="form-control" placeholder=""  value={user.cpwd}
                      onChange={(e)=>setuser({...user,cpwd:e.target.value})}/>
                    </div>
                    <button type="submit" class="btn btn-dark">Save</button>
                </form>
                <p>Already having Account ?? <Link to='/login'>SignIn</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Register
