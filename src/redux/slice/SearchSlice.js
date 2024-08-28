import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,

 data:''
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchData: (state, action) => {
      console.log(action,'fffdssd');
      state.data = action.payload.data;
 

  


    },
  
  },
});

export const {  searchData } = searchSlice.actions;
export default searchSlice.reducer;