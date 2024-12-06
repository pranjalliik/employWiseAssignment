import { createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { signinvalidation } from "../utils";
const initialState =  {
 email : '' , 
 loginstatus : '' , 
 loginerror : '' , 
 logoutstatus : '',
 logouterror : ''
}


export const signin = createAsyncThunk("signin/auth" , async({email , password})=>{
    let validate = signinvalidation(email,password)
    if(validate){
       throw new Error(validate)
    }

    try{

       let response = await axios.post('https://reqres.in/api/login',{ email , password} , {
        headers: { 'Content-Type': 'application/json' },
        credentials: true
      })
        return response.data
    }catch(err){
        
     
        if(err.response.data.error === 'user not found'){
            throw new Error('user not found')
        }
        throw new Error('login failed')
    }

} )


const authSlice = createSlice({
    name : 'auth' ,
    initialState , 
    reducers : {
        resetstate : (state , action)=>{
            state.loginstatus = ''
            state.loginerror = ''
            state.logoutstatus = ''
            state.logouterror = ''
        },
        logout : (state, action)=>{
            localStorage.removeItem("token");
        }
    },
    extraReducers(builder){
     builder
        .addCase(signin.pending , (state , action)=>{
            state.loginerror = ''
             state.loginstatus = 'loading'
        })
        .addCase(signin.fulfilled , (state, action)=>{
            localStorage.setItem("token", action.payload.token);
            state.loginstatus = 'success'

        })
        .addCase(signin.rejected, (state , action)=>{
            state.loginstatus = ''
            state.loginerror = action.error.message
        })
    
    }
})

export const {resetstate , logout} = authSlice.actions

export default authSlice.reducer