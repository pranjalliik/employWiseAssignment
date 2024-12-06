import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Features/Authentication/userSlice'
import usersReducer from './Features/Dashboard/usersSlice'
const store = configureStore({
    reducer : {
user : userReducer,
users : usersReducer
    }
 })

export default store