import { createAsyncThunk, createSlice,reject } from "@reduxjs/toolkit";
import axios from "axios";
import utils from '../utils'
const authTokenKeyLocalStorage = "TREKGRAM_AUTH_TOKEN";
const BASE_API_URL = 'https://trekgram-backend.herokuapp.com'
const initialState = {
  user: null,
  authToken: null,
  status:"idle"
};

export const login = createAsyncThunk("user/login", async (data) => {
  try {
    const result = await axios.request({
      method: "post",
      url: `${BASE_API_URL}/api/auth/login`,
      data
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
      url: `${BASE_API_URL}/api/auth/verify`,
      headers:{authorization:`Bearer ${utils.getLocalStorage(authTokenKeyLocalStorage)}`}
    });
    console.log("verify user result", result);
    return result.data;
  } catch (err) {
    console.log("user/verify user", err);
    // to reject
    // return rejectWithValue, call this fn
  }
})

export const register = createAsyncThunk("user/register",async (data)=>{
  try {
    console.log("register data",data);
    const result = await axios.request({
      method: "post",
      url: `${BASE_API_URL}/api/auth/register`,
      data
    });
    console.log("register user result", result);
    return result.data;
  } catch (err) {
    console.log("user/register", err);
    // to reject
    // return rejectWithValue, call this fn
  }
}) 

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout:(state)=>{
      state.user = null;
      state.authToken=null;
      utils.removeLocalStorage(authTokenKeyLocalStorage)
    },
  },
  extraReducers: {
    [login.pending]:(state)=>{
      state.status = "pending"
    },
    [login.fulfilled]:(state,action)=>{
      state.status = "fulfulled"
      state.user = action.payload.user
      state.authToken = action.payload.token
      utils.setLocalStorage(authTokenKeyLocalStorage,action.payload.token)
    },
    // verify user
    [verifyUser.pending]:(state)=>{
      state.status = "pending"
    },
    [verifyUser.fulfilled]:(state,action)=>{
      state.status = "fulfulled"
      state.user = action.payload.user
      state.authToken = action.payload.token
      utils.setLocalStorage(authTokenKeyLocalStorage,action.payload.token)

    },
    [register.pending]:(state)=>{
      state.status = "pending"
    },
    [register.fulfilled]:(state,action)=>{
      state.status = "fulfulled"
      state.user = action.payload.user
      state.authToken = action.payload.token
      utils.setLocalStorage(authTokenKeyLocalStorage,action.payload.token)

      
    },
  },
});

export const {logout} = userSlice.actions;

export default userSlice.reducer;