import {configureStore } from '@reduxjs/toolkit'
import showListSliceReducer from './showListSlice'
const store =configureStore({
    reducer:{
       showList:showListSliceReducer
    }
})
export default store