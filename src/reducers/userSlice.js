import { createAsyncThunk, createSlice,reject } from "@reduxjs/toolkit";
import axios from "axios";
import utils from '../utils'
const authTokenKeyLocalStorage = "TREKGRAM_AUTH_TOKEN";
const BASE_API_URL = 'https://trekgram-backend.herokuapp.com'
const initialState = {
  user: null,
  authToken: null,
  status:"idle",
  visitingUser:null,
  error:null,
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

export const getUser = createAsyncThunk("user/getUser",async({userId},{rejectWithValue})=>{
  try {
    const result = await axios.request({
      method: "get",
      url: `${BASE_API_URL}/api/user/${userId}`,
      headers:{authorization:`Bearer ${utils.getLocalStorage(authTokenKeyLocalStorage)}`}
    });
    console.log("get user result", result);
    return result.data;
  } catch (err) {
    console.log("user/verify user", err);
    // to reject
    return rejectWithValue("failed to get user")
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

export const followUser = createAsyncThunk("user/followUser",async ({targetUserId,userId},{rejectWithValue})=>{
  try {
    console.log("follow data",targetUserId,userId);
    const result = await axios.request({
      method: "put",
      url: `${BASE_API_URL}/api/user/${targetUserId}/follow`,
      headers: {
        authorization: `Bearer ${utils.getLocalStorage(
          authTokenKeyLocalStorage
        )}`,
      },
      data:{"userId":userId}

    });
    console.log("follow user result", result);
    return {userId,targetUserId};
  } catch (err) {
    console.log("user/register", err);
    // to reject
    return rejectWithValue("Failed to follow user")
  }
}) 

export const unFollowUser = createAsyncThunk("user/unFollowUser",async ({targetUserId,userId},{rejectWithValue})=>{
  try {
    console.log("unfollow data",targetUserId,userId);
    const result = await axios.request({
      method: "put",
      url: `${BASE_API_URL}/api/user/${targetUserId}/unfollow`,
      headers: {
        authorization: `Bearer ${utils.getLocalStorage(
          authTokenKeyLocalStorage
        )}`,
      },
      data:{"userId":userId}
    });
    console.log("unfollow user result", result);
    return {userId,targetUserId};
  } catch (err) {
    console.log("user/register", err);
    // to reject
    return rejectWithValue("Failed to follow user")
  }
});

export const updateUser = createAsyncThunk("user/updateUser",async ({userId,data},{rejectWithValue})=>{
  try {
    console.log("update data",userId,data);
    const result = await axios.request({
      method: "put",
      url: `${BASE_API_URL}/api/user/${userId}`,
      headers: {
        authorization: `Bearer ${utils.getLocalStorage(
          authTokenKeyLocalStorage
        )}`,
      },
      data
    });
    console.log("update user result", result);
    return data;
  } catch (err) {
    console.log("user/updateUser", err);
    // to reject
    return rejectWithValue("Failed to update user")
  }
});

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
    [getUser.pending]:(state)=>{
      state.status = "pending"
    },
    [getUser.fulfilled]:(state,action)=>{
      state.status = "fulfulled"
      state.visitingUser = action.payload
    },
    [getUser.rejected]:(state,action)=>{
      state.status = "idle";
      state.error = action.payload
    },
    [followUser.pending]:(state)=>{
      state.status = "pending"
    },
    [followUser.fulfilled]:(state,action)=>{
      state.status = "fulfulled"
      state.user = {...state.user,following:[...state.user.following,state.visitingUser]}
      state.visitingUser = {...state.visitingUser,followers:[...state.visitingUser.followers,state.user]}
    },
    [followUser.rejected]:(state,action)=>{
      state.status = "idle";
      state.error = action.payload
    },
    [unFollowUser.pending]:(state)=>{
      state.status = "pending"
    },
    [unFollowUser.fulfilled]:(state,action)=>{
      state.status = "fulfulled"
      state.user = {...state.user,following:[...state.user.following.filter((foll)=>foll._id !== action.payload.targetUserId)]}
      state.visitingUser = {...state.visitingUser,followers:[...state.visitingUser.followers.filter((foll)=>foll._id !== action.payload.userId)]}
    },
    [unFollowUser.rejected]:(state,action)=>{
      state.status = "idle";
      state.error = action.payload
    },
    [updateUser.pending]:(state)=>{
      state.status = "pending"
    },
    [updateUser.fulfilled]:(state,action)=>{
      state.status = "fulfulled"
      // state.user = {...state.user,following:[...state.user.following.filter((foll)=>foll._id !== action.payload.targetUserId)]}
      // state.visitingUser = {...state.visitingUser,followers:[...state.visitingUser.followers.filter((foll)=>foll._id !== action.payload.userId)]}
      state.user = {...state.user,...action.payload}
    },
    [updateUser.rejected]:(state,action)=>{
      state.status = "idle";
      state.error = action.payload
    }
  },
});

export const {logout} = userSlice.actions;

export default userSlice.reducer;