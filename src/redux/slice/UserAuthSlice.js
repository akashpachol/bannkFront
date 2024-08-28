import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || ""):null,
  token:localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') || ""):null,
  userId:localStorage.getItem('userId') ? JSON.parse(localStorage.getItem('userId') || ""):null,
 
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log(action,'fff');
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.userId = action.payload.data.userId;

      localStorage.setItem('user', JSON.stringify(action.payload.data.user))
      localStorage.setItem('token', JSON.stringify(action.payload.data.token))
      localStorage.setItem('userId', JSON.stringify(action.payload.data.userId))


    },
    logout: (state) => {

      state.user = null;
      state.token = null;
      state.userId = null;
  
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    },
  },
});

export const { logout, loginSuccess } = authSlice.actions;
export default authSlice.reducer;