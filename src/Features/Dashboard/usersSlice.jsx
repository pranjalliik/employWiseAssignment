import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users : [] , 
    status : '' , 
    error : '' ,
    filteredUsers :  [] ,
    updateStatus : '' ,
    updateError : '' ,
    delStatus : '' ,
    delError : '' ,
}

export const getUsers = createAsyncThunk("users/get" , async({pageno})=>{
    try{
        let response = await axios.get(`https://reqres.in/api/users?page=${pageno}`)
        return response.data ; 
    }catch(err){
    }
})


export const updateUser = createAsyncThunk("user/update" , async({id , body})=>{

    try{
        let response = await axios.put(`https://reqres.in/api/users/${id}` , 
                     body ,{  headers: { 'Content-Type': 'application/json' },
                     credentials: true  } )

                     return {data : response.data , id}

            }catch(err){
            }
})

export const delUser = createAsyncThunk("user/delete" , async({id})=>{
try{
    let response = await axios.delete(`https://reqres.in/api/users/${id}`)
    return {id}
}catch(err){
   
}
}
)



const usersSlice = createSlice({
    name : 'users' , 
    initialState ,
    reducers : {
        resetusers : (state , action)=>{
            state.users = [],
            state.status = ''
            state.error = ''
            state.filteredUsers = ''
        } ,
        sortUsers(state, action) {
            const { order, sortBy } = action.payload; // order: 'A-Z' or 'Z-A', sortBy: 'first_name' or 'id'
            
            if (sortBy === 'first_name') {
              state.users.sort((a, b) =>
                order === 'A-Z'
                  ? a.first_name.localeCompare(b.first_name)
                  : b.first_name.localeCompare(a.first_name)
              );
            } else if (sortBy === 'id') {
              state.users.sort((a, b) =>
                a.id - b.id
              );
            }
          },
          searchUsers(state, action) {

            const query = action.payload.toLowerCase(); // Convert to lowercase for case-insensitive search
            state.filteredUsers = state.users.filter(
              (user) =>
                user.first_name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query)
            );
          },
          resetUpdate(state,action){
            state.updateStatus = ''
            state.updateError = ''
          },      resetDel(state,action){
            state.delStatus = ''
            state.delError = ''
          }
          
    },

    extraReducers(builder){
        builder
        .addCase(getUsers.pending , (state , action)=>{
            state.status = 'loading'
            state.error = ''
        })
        .addCase(getUsers.fulfilled , (state , action)=>{
            state.status = 'success'
           state.users = action.payload.data
           state.filteredUsers = action.payload.data
        })
        .addCase(getUsers.rejected, (state,action)=>{
         
        })
        .addCase(updateUser.pending , (state , action)=>{
           state.updateStatus = 'loading'
        })
        .addCase(updateUser.fulfilled , (state , action)=>{

            const { id, data } = action.payload;

            // Update user in `users` array
            state.users = state.users.map(user => 
              user.id === id ? { ...user, ...data } : user
            );
          
            // Update user in `filteredUsers` array
            state.filteredUsers = state.filteredUsers.map(user => 
              user.id === id ? { ...user, ...data } : user
            );
          
           state.updateStatus = 'success'
        })
        .addCase(updateUser.rejected, (state,action)=>{
            state.updateStatus= ''
            state.updateError = 'user cannot be updated'
        })
        .addCase(delUser.pending , (state , action)=>{
            state.delStatus = 'loading'
         })
         .addCase(delUser.fulfilled , (state , action)=>{
            state.delStatus = 'success'
            const userId = action.payload.id;

          state.users = state.users.filter(user => user.id !== userId);

 
         state.filteredUsers = state.filteredUsers.filter(user => user.id !== userId);
        })
         .addCase(delUser.rejected, (state,action)=>{
             state.delStatus= ''
             state.delError = 'user cannot be deleted'
         })
    }
})

export const {resetusers , sortUsers , searchUsers , resetUpdate , resetDel} = usersSlice.actions

export default usersSlice.reducer