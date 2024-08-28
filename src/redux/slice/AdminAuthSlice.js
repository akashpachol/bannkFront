import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  user: localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin') || ""):null,
  token:localStorage.getItem('admintoken') ? JSON.parse(localStorage.getItem('admintoken') || ""):null,
  userId:localStorage.getItem('adminId') ? JSON.parse(localStorage.getItem('adminId') || ""):null,
 
};

const adminAuthSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log(action,'fff');
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.userId = action.payload.data.userId;

      localStorage.setItem('admin', JSON.stringify(action.payload.data.user))
      localStorage.setItem('admintoken', JSON.stringify(action.payload.data.token))
      localStorage.setItem('adminId', JSON.stringify(action.payload.data.userId))


    },
    logout: (state) => {

      state.user = null;
      state.token = null;
      state.userId = null;
  
      localStorage.removeItem('admin')
      localStorage.removeItem('admintoken')
      localStorage.removeItem('adminId')
    },
  },
});

export const { logout, loginSuccess } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;