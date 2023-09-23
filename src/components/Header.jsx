import React, { useEffect, useState } from "react";
import {
  FaArrowCircleLeft,
  FaArrowLeft,
  FaHouseUser,
  FaPen,
  FaShoppingBag,
  FaShoppingCart,
  FaThList,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, LogoutUser, selectUserName, selectUserRole } from "../redux/slices/authSlice";
import { ShowOnLogin, ShowOnLogout } from "./Hiddenlinks";
import { selectCartItems } from "../redux/slices/cartSlice";
import useFetchCollection from "../customHooks/useFetchCollection";
import { selectProducts, store_products } from "../redux/slices/productSlice";
import { FILTER_BY_SEARCH } from "../redux/slices/filterSlice";
const Header = () => {
  const [search,setSearch]=useState(null)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const username=useSelector(selectUserName)
  const userRole=useSelector(selectUserRole)
  const cartItems=useSelector(selectCartItems)
  useEffect(()=>{
    onAuthStateChanged(auth, async(user) => {
      if (user) {
        const docRef=doc(db,"users",user.uid)
        const docSnap=await getDoc(docRef)
            dispatch(LoginUser({userName:docSnap.data().username,userEmail:docSnap.data().email,userRole:docSnap.data().role,userID:user.uid}))
          } else {
            dispatch(LogoutUser())
        }
    });
  })


  let handleLogout=()=>{
    signOut(auth).then(() => {
      toast.success("Logout Successfully")
      navigate('/')
    }).catch((error) => {
      toast.error(error.message)
    });
  }

  const {data,isLoading}=useFetchCollection("products")
  useEffect(()=>{
      dispatch(store_products(data))
  },[data,dispatch])

  let products=useSelector(selectProducts)

  useEffect(()=>{
    dispatch(FILTER_BY_SEARCH({products,search}))
  },[search])

  return (
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          myshop
        </a>
        <button
          class="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
          <ul class="navbar-nav me-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <Link class="nav-link active" to='/' aria-current="page">
                <FaHouseUser />
                Home <span class="visually-hidden">(current)</span>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to='/products'>
                <FaShoppingBag /> Products
              </Link>
            </li>
          </ul>
          <form class="d-flex my-2 my-lg-0">
            <input
              class="form-control me-sm-2"
              type="text"
              placeholder="Search by name or category"
              style={{ width: "260px" }} value={search} onChange={(e)=>setSearch(e.target.value)}
            />
          </form>
          <ul class="navbar-nav mt-2 mt-lg-0">
            {userRole !="admin" &&
            <li class="nav-item">
              <Link class="nav-link" to='/cart'>
                Cart <FaShoppingCart size={30} />
                <span class="badge rounded-pill text-bg-danger" style={{position:'relative',top:'-10px'}}>{cartItems.length}</span>
              </Link>
            </li> }
            <ShowOnLogin>
            {userRole =="user" &&
            <li class="nav-item">
              <Link class="nav-link" to='/order-history'>
               <FaThList/> My Orders
              </Link>
            </li>
        }
            <li class="nav-item">
              <a class="nav-link" href="#">
                Welcome {username}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" onClick={handleLogout}>
                <FaArrowCircleLeft /> Logout
              </a>
            </li>
            </ShowOnLogin>

    <ShowOnLogout>            
      <li class="nav-item">
              <Link class="nav-link" to='/register'>
                <FaPen /> Register{" "}
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to='/login'>
                <FaUser /> Login
              </Link>
            </li>
            </ShowOnLogout>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
