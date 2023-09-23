import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice=createSlice({
    name:'checkout',
    initialState:{shippingAddress:localStorage.getItem("shipping")?
    JSON.parse(localStorage.getItem("shipping")):{}},
    reducers:{
        store_shipping_Address(state,action){
            state.shippingAddress=action.payload
            localStorage.setItem("shipping",JSON.stringify(state.shippingAddress))
        }
    }
})
export const {store_shipping_Address} =checkoutSlice.actions
export default checkoutSlice.reducer
export const selectShippingAddress=state=>state.checkout.shippingAddress