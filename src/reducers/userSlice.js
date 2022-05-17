import { createAsyncThunk, createSlice,reject } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  authToken: null,
  status:"idle"
};

export const login = createAsyncThunk("user/login", async () => {
  try {
    const result = await axios.request({
      method: "post",
      url: `https://trekgram-backend.herokuapp.com/api/auth/login`,
      data: {
        email: "user14@test.com",
        password: "123456",
      },
    });
    console.log("user login result", result);
    return result.data;
  } catch (err) {
    console.log("counter/loadPosts", err);
    // to reject
    // return rejectWithValue, call this fn
  }
});

export const verifyUser = createAsyncThunk("user/verifyUser",async()=>{
  try {
    const result = await axios.request({
      method: "get",
      url: `https://trekgram-backend.herokuapp.com/api/auth/verify`,
      headers:{authorization:`Bearer ${localStorage.getItem("trekgram-auth-token")}`}
    });
    console.log("verify user result", result);
    return result.data;
  } catch (err) {
    console.log("user/verify user", err);
    // to reject
    // return rejectWithValue, call this fn
  }
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]:(state)=>{
      state.status = "pending"
    },
    [login.fulfilled]:(state,action)=>{
      state.status = "fulfulled"
      state.user = action.payload.user
      state.authToken = action.payload.token
      localStorage.setItem("trekgram-auth-token",action.payload.token)
    },
    // verify user
    [verifyUser.pending]:(state)=>{
      state.status = "pending"
    },
    [verifyUser.fulfilled]:(state,action)=>{
      state.status = "fulfulled"
      state.user = action.payload.user
      state.authToken = action.payload.token
      localStorage.setItem("trekgram-auth-token",action.payload.token)
    },
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;