import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Features/Authentication/authSlice'
import usersReducer from './Features/Dashboard/usersSlice'
const store = configureStore({
    reducer : {
auth : authReducer,
users : usersReducer
    }
 })

export default store