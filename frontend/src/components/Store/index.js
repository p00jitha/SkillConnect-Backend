import {createSlice,configureStore} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name:"auth",
    initialState:{isLoggedIn:false,
            email: null 
    },
    reducers:{
        register(state, action) {
            state.email = action.payload;
          },
        login(state){
            state.isLoggedIn=true
        },
        logout(state){
            localStorage.removeItem("userId");
            state.isLoggedIn=false
        },
    },
})

export const authActions=authSlice.actions

const store = configureStore({reducer:authSlice.reducer})
export default store;