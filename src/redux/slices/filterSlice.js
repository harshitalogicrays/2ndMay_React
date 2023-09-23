const { createSlice } = require("@reduxjs/toolkit");
const filterSlice=createSlice({
    name:'filter',
    initialState:{filterProducts:[]},
    reducers:{
        FILTER_BY_SEARCH(state,action){
            let {products,search}=action.payload
            let tempproducts=products.filter((product)=>product.name.includes(search) || product.category.includes(search)
            )
            state.filterProducts=tempproducts
        }
        
    }
})
export const {FILTER_BY_SEARCH}=filterSlice.actions
export default filterSlice.reducer
export const selectfilters=state=>state.filter.filterProducts