import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{isLoggedIn:false,userName:null,userEmail:null,userRole:null,userID:null},
    reducers:{
        LoginUser(state,action){
            let {userName,userEmail,userRole,userID}=action.payload
            state.isLoggedIn=true
            state.userName=userName
            state.userEmail=userEmail
            state.userRole=userRole
            state.userID=userID
        },
        LogoutUser(state,action){
            state.isLoggedIn=false
            state.userName=null
            state.userEmail=null
            state.userRole=null
            state.userID=null
        }
    }
})

export const {LoginUser,LogoutUser}=authSlice.actions

export const selectIsLoggedIn=state=>state.auth.isLoggedIn
export const selectUserName=state=>state.auth.userName
export const selectUserEmail=state=>state.auth.userEmail
export const selectUserID=state=>state.auth.userID
export const selectUserRole=state=>state.auth.userRole

export default authSlice.reducer;