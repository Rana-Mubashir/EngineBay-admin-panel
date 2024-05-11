import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    flag: false,
    product: ''
}
const showListSlice = createSlice({
    name: 'ShowList',
    initialState,
    reducers: {
        toggleFlag: (state) => {
            state.flag = !state.flag;
        },
        productToUpdate: (state,action)=>{
           state.product= action.payload
        }
    }
})
export const { toggleFlag,productToUpdate } = showListSlice.actions
export default showListSlice.reducer