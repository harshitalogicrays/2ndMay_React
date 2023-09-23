import { act } from "react-dom/test-utils";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit");

const cartSlice=createSlice({
    name:'cart',
    initialState:{cartItems:sessionStorage.getItem('cartItems')?JSON.parse(sessionStorage.getItem('cartItems'))
    :[],totalAmount:0,previousURL:""},
    reducers:{
        ADD_CART(state,action){
            let productIndex=state.cartItems.findIndex((item)=>item.id==action.payload.id)
            if(productIndex == -1){
                // add
                state.cartItems.push({...action.payload,cartQuantity:1})
                toast.success(`${action.payload.name} added to cart`)
            }
            else {
                //increase 
                if(state.cartItems[productIndex].cartQuantity< action.payload.countInStock){
                    state.cartItems[productIndex].cartQuantity +=1
                    toast.info(`${action.payload.name} qty increased by 1`)
                }
                else 
                    toast.error(`only ${action.payload.countInStock} available`)
            }
            window.scrollTo(0,0)
            sessionStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        DECREASE(state,action){
            let productIndex=state.cartItems.findIndex((item)=>item.id==action.payload.id)
            if(state.cartItems[productIndex].cartQuantity > 1){
                state.cartItems[productIndex].cartQuantity -=1
                toast.info(`${action.payload.name} qty decreased by 1`)
            }
            else 
            state.cartItems[productIndex].cartQuantity =1
            sessionStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        REMOVE_FROM_CART(state,action){
            state.cartItems.splice(action.payload,1)
            sessionStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        CLEAR_CART(state,action){
            state.cartItems=[]
            state.totalAmount=0
            sessionStorage.removeItem("cartItems")
        },
        CALCULATE_TOTAL(state,action){
            let carttotal=state.cartItems.reduce((prev,item)=>prev += (item.price * item.cartQuantity),0)
            state.totalAmount=carttotal
        },
        SAVE_URL(state,action){
            state.previousURL=action.payload
        }

    }
})

export const {ADD_CART,DECREASE,REMOVE_FROM_CART,CLEAR_CART,SAVE_URL,CALCULATE_TOTAL}=cartSlice.actions
export default cartSlice.reducer

export const selectCartItems=state=>state.cart.cartItems
export const selectTotalAmount=state=>state.cart.totalAmount
export const selectpreviousURL=state=>state.cart.previousURL