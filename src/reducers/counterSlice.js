import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
  counter:0,
  status:"idle"
}

export const loadPosts = createAsyncThunk("counter/loadPosts", () => {
  return fetch("https://trekgram-backend.herokuapp.com/api/post/627eac55a1519e35c261aa30")
    .then((res) => res.json())
    .then((data) => data);
});

export const counterSlice = createSlice({
  name:"counter",
  initialState,
  reducers:{
    increment:(state)=>{
      state.counter = state.counter + 1
    },
    decrement:(state)=>{
      state.counter = state.counter - 1 
    }
  },
  extraReducers:{
    [loadPosts.pending]:(state)=>{
      state.status = 'loading'
    },
    [loadPosts.fulfilled]:(state,action) => {
      console.log("action posts",action);
      state.status = "fulfilled"
    }
  }
})

export const {increment,decrement} = counterSlice.actions;

export default counterSlice.reducer;