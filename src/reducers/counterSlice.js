import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import utils from "../utils";
const authTokenKeyLocalStorage = "TREKGRAM_AUTH_TOKEN"
const initialState = {
  counter: 0,
  status: "idle",
  error:null,
  posts:[],
  errorMessage:null,
  imageUploadStatus:"idle",
  imageUploadError:null,
  imageUploadErrorMessage:null,
  postCreatedStatus:"idle",
  postCreatedError:null,
  postCreatedMessage:"",

};

// export const loadPosts = createAsyncThunk("counter/loadPosts", () => {
//   return fetch("https://trekgram-backend.herokuapp.com/api/post/627eac55a1519e35c261aa30")
//     .then((res) => res.json())
//     .then((data) => data);
// });

export const loadPosts = createAsyncThunk("counter/loadPosts", async (_,{rejectWithValue}) => {
  try{
    const result = await axios.request({
      method:'get',
      url:`https://trekgram-backend.herokuapp.com/api/post/timeline/all`,
      headers:{authorization:`Bearer ${utils.getLocalStorage(authTokenKeyLocalStorage)}`}

    })
    console.log("result" ,result);
    return result.data;
  }
  catch(err){
    console.log("counter/loadPosts",err)
    return rejectWithValue("Failed to load post")
  }
});

export const uploadPostImage = createAsyncThunk("counter/uploadPostImage",async ({data,fileName},{rejectWithValue}) =>{
  try{
    console.log("data image upload",data);
    const result = await axios.request({
      method:'post',
      url:`https://trekgram-backend.herokuapp.com/api/upload`,
      // headers:{authorization:`Bearer ${utils.getLocalStorage(authTokenKeyLocalStorage)}`},'
      headers:{ "uploadfilename": fileName },
      data
    })
    console.log("uploadPostImage" ,result);
    
  }
  catch(err){
    console.log("counter/loadPosts",err)
    return rejectWithValue("Failed to load post")
  }
});

export const createNewPost = createAsyncThunk("counter/createNewPost", async (data,{rejectWithValue}) => {
  try{
    const result = await axios.request({
      method:'post',
      url:`https://trekgram-backend.herokuapp.com/api/post`,
      headers:{authorization:`Bearer ${utils.getLocalStorage(authTokenKeyLocalStorage)}`},
      data
    })
    console.log("createNewPost result" ,result);
    return result.data;
  }
  catch(err){
    console.log("counter/loadPosts",err)
    return rejectWithValue("Failed to create post")
  }
});


export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.counter = state.counter + 1;
    },
    decrement: (state) => {
      state.counter = state.counter - 1;
    },
  },
  extraReducers: {
    [loadPosts.pending]: (state) => {
      state.status = "loading";
    },
    [loadPosts.fulfilled]: (state, action) => {
      console.log("action posts", action);
      state.status = "fulfilled";
      state.posts = action.payload;
    },
    [loadPosts.rejected]:(state,action)=>{
      state.error = true;
      state.errorMessage=action.payload
    },
    // upload image
    [uploadPostImage.pending]: (state) => {
      state.status = "loading";
    },
    [uploadPostImage.fulfilled]: (state, action) => {
      console.log("action posts", action);
      state.status = "fulfilled";
    },
    [uploadPostImage.rejected]:(state,action)=>{
      state.imageUploadError = true;
      state.imageUploadErrorMessage=action.payload
    },
    // createNew post
    [createNewPost.pending]: (state) => {
      state.postCreatedStatus = "loading";
    },
    [createNewPost.fulfilled]: (state, action) => {
      console.log("action posts", action);
      state.postCreatedStatus = "fulfilled"
      state.posts = [action.payload.post,...state.posts];
      // state.posts = action.payload;
    },
    [createNewPost.rejected]:(state,action)=>{
      state.postCreatedStatus = true;
      state.postCreatedMessage=action.payload
    }
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
