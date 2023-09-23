import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Products from "./components/Products";
import Register from "./components/Register";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from "./components/Admin/Admin";
import AddProduct from "./components/Admin/AddProduct";
import ViewProducts from "./components/Admin/ViewProducts";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import CheckoutDetails from "./components/CheckoutDetails";
import Checkout from "./components/Checkout";
import CheckoutSucces from "./components/CheckoutSuccess"
import CheckoutSuccess from "./components/CheckoutSuccess";
import OrderHistory from "./components/OrderHistory";
import Orders from "./components/Admin/Orders";
import OrderDetails from "./components/Admin/OrderDetails";
function App() {
  return (
    <>
    <ToastContainer position="top-left" autoClose={1000}/>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin' element={<Admin/>}>
            <Route path='addproduct' element={<AddProduct/>}/>
            <Route path='viewproducts' element={<ViewProducts/>}/>
            <Route path='edit/:id' element={<AddProduct/>}/>
            <Route path='orders' element={<Orders/>}/>
            <Route path='order-details/:id/:status' element={<OrderDetails/>}/>
        </Route>

        <Route path='productdetails/:id' element={<ProductDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout-details' element={<CheckoutDetails/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/checkout-success' element={<CheckoutSuccess/>}/>
        <Route path='/order-history' element={<OrderHistory/>}/>
        <Route path='*' element={<PageNotFound/>}/>

      </Routes>
    </>
    );
}

export default App;
