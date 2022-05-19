import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import utils from "../utils";
const authTokenKeyLocalStorage = "TREKGRAM_AUTH_TOKEN";
const initialState = {
  counter: 0,
  status: "idle",
  error: null,
  posts: [],
  errorMessage: null,
  imageUploadStatus: "idle",
  imageUploadError: null,
  imageUploadErrorMessage: null,
  postCreatedStatus: "idle",
  postCreatedError: null,
  postCreatedMessage: "",
  isEditingPost: false,
  updatingPost: {}, //post that is being updated
};

// export const loadPosts = createAsyncThunk("counter/loadPosts", () => {
//   return fetch("https://trekgram-backend.herokuapp.com/api/post/627eac55a1519e35c261aa30")
//     .then((res) => res.json())
//     .then((data) => data);
// });

export const loadPosts = createAsyncThunk(
  "counter/loadPosts",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.request({
        method: "get",
        url: `https://trekgram-backend.herokuapp.com/api/post/timeline/all`,
        headers: {
          authorization: `Bearer ${utils.getLocalStorage(
            authTokenKeyLocalStorage
          )}`,
        },
      });
      console.log("result", result);
      return result.data;
    } catch (err) {
      console.log("counter/loadPosts", err);
      return rejectWithValue("Failed to load post");
    }
  }
);

export const uploadPostImage = createAsyncThunk(
  "counter/uploadPostImage",
  async ({ data, fileName }, { rejectWithValue }) => {
    try {
      console.log("data image upload", data);
      const result = await axios.request({
        method: "post",
        url: `https://trekgram-backend.herokuapp.com/api/upload`,
        // headers:{authorization:`Bearer ${utils.getLocalStorage(authTokenKeyLocalStorage)}`},'
        headers: { uploadfilename: fileName },
        data,
      });
      console.log("uploadPostImage", result);
    } catch (err) {
      console.log("counter/loadPosts", err);
      return rejectWithValue("Failed to load post");
    }
  }
);

export const createNewPost = createAsyncThunk(
  "counter/createNewPost",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.request({
        method: "post",
        url: `https://trekgram-backend.herokuapp.com/api/post`,
        headers: {
          authorization: `Bearer ${utils.getLocalStorage(
            authTokenKeyLocalStorage
          )}`,
        },
        data,
      });
      console.log("createNewPost result", result);
      return result.data;
    } catch (err) {
      console.log("counter/loadPosts", err);
      return rejectWithValue("Failed to create post");
    }
  }
);

export const updatePost = createAsyncThunk(
  "counter/updatePost",
  async ({ postId, data }, { rejectWithValue }) => {
    try {
      const result = await axios.request({
        method: "put",
        url: `http://localhost:8800/api/post/${postId}`,
        headers: {
          authorization: `Bearer ${utils.getLocalStorage(
            authTokenKeyLocalStorage
          )}`,
        },
        data,
      });
      console.log("updatepost result", result);
      return { postId: postId, data: data };
    } catch (err) {
      console.log("counter/updatePost", err);
      return rejectWithValue("Failed to update post");
    }
  }
);

export const likePost = createAsyncThunk(
  "counter/likePost",
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      console.log("data like Post", { id, userId });
      const result = await axios.request({
        method: "put",
        url: `https://trekgram-backend.herokuapp.com/api/post/${id}/like`,
        headers: {
          authorization: `Bearer ${utils.getLocalStorage(
            authTokenKeyLocalStorage
          )}`,
        },
        data: { userId: userId },
      });
      console.log("likePost result", result);
      return result.data;
    } catch (err) {
      console.log("counter/likePost", err);
      return rejectWithValue("Failed to like/unlike post");
    }
  }
);

export const deletePost = createAsyncThunk(
  "counter/deletePost",
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      console.log("data like Post", { postId, userId });
      const result = await axios.request({
        method: "delete",
        url: `https://trekgram-backend.herokuapp.com/api/post/${postId}`,
        headers: {
          authorization: `Bearer ${utils.getLocalStorage(
            authTokenKeyLocalStorage
          )}`,
        },
        data: { userId: userId },
      });
      console.log("likePost result", result);
      return postId;
    } catch (err) {
      console.log("counter/likePost", err);
      return rejectWithValue("Failed to like/unlike post");
    }
  }
);

export const bookmarkPost = createAsyncThunk(
  "counter/bookmarkPost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      console.log("data like Post", { postId });
      const result = await axios.request({
        method: "put",
        url: `https://trekgram-backend.herokuapp.com/api/post/${postId}/bookmark`,
        headers: {
          authorization: `Bearer ${utils.getLocalStorage(
            authTokenKeyLocalStorage
          )}`,
        },
        // data: {userId:userId}result.data
      });
      console.log("likePost result", result);
      return postId;
    } catch (err) {
      console.log("counter/likePost", err);
      return rejectWithValue("Failed to like/unlike post");
    }
  }
);

export const addComment = createAsyncThunk(
  "counter/addComment",
  async (
    { postId, comment, profilePicture, userId, username },
    { rejectWithValue }
  ) => {
    try {
      console.log("data like Post", { postId });
      const result = await axios.request({
        method: "put",
        url: `https://trekgram-backend.herokuapp.com/api/post/${postId}/comment`,
        headers: {
          authorization: `Bearer ${utils.getLocalStorage(
            authTokenKeyLocalStorage
          )}`,
        },
        data: { comment: comment },
      });
      console.log("likePost result", result);
      return { postId, comment, profilePicture, userId, username };
    } catch (err) {
      console.log("counter/likePost", err);
      return rejectWithValue("Failed to like/unlike post");
    }
  }
);

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
    startPostEdit: (state, action) => {
      console.log("Action startPostEdit", action.payload);
      state.isEditingPost = true;
      state.updatingPost = action.payload;
    },
    finishPostEdit: (state) => {
      state.isEditingPost = false;
      state.updatingPost = {};
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
    [loadPosts.rejected]: (state, action) => {
      state.error = true;
      state.errorMessage = action.payload;
    },
    // upload image
    [uploadPostImage.pending]: (state) => {
      state.status = "loading";
    },
    [uploadPostImage.fulfilled]: (state, action) => {
      console.log("action posts", action);
      state.status = "fulfilled";
    },
    [uploadPostImage.rejected]: (state, action) => {
      state.imageUploadError = true;
      state.imageUploadErrorMessage = action.payload;
    },
    // createNew post
    [createNewPost.pending]: (state) => {
      state.postCreatedStatus = "loading";
    },
    [createNewPost.fulfilled]: (state, action) => {
      console.log("action posts", action);
      state.postCreatedStatus = "fulfilled";
      state.posts = [action.payload.post, ...state.posts];
      // state.posts = action.payload;
    },
    [createNewPost.rejected]: (state, action) => {
      state.postCreatedStatus = true;
      state.postCreatedMessage = action.payload;
    },
    // delete post
    [deletePost.pending]: (state) => {
      state.postCreatedStatus = "loading";
    },
    [deletePost.fulfilled]: (state, action) => {
      console.log("delete post", action);
      // state.postCreatedStatus = "fulfilled"
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      // state.posts = action.payload;
    },
    [deletePost.rejected]: (state, action) => {
      // state.postCreatedStatus = true;
      // state.postCreatedMessage=action.payload
    },
    [addComment.pending]: (state) => {
      // state.postCreatedStatus = "loading";
    },
    [addComment.fulfilled]: (state, action) => {
      console.log("delete post", action);
      // state.postCreatedStatus = "fulfilled"
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.posts = state.posts.map((post) =>
        post._id === action.payload.postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  userId: action.payload.userId,
                  comment: action.payload.comment,
                  profilePicture: action.payload.profilePicture,
                  username: action.payload.username,
                },
              ],
            }
          : post
      );
      // state.posts = action.payload;
    },
    [addComment.rejected]: (state, action) => {
      // state.postCreatedStatus = true;
      // state.postCreatedMessage=action.payload
    },
    [updatePost.pending]: (state) => {
      state.postCreatedStatus = "loading";
    },
    [updatePost.fulfilled]: (state, action) => {
      console.log("action posts update post", action);
      state.postCreatedStatus = "fulfilled";
      state.posts = state.posts.map((post) =>
        post._id === action.payload.postId
          ? { ...post, desc: action.payload.data.desc }
          : post
      );
      state.isEditingPost = false;
      state.updatingPost = {}
      // state.posts = action.payload;
    },
    [updatePost.rejected]: (state, action) => {
      state.postCreatedStatus = true;
      state.postCreatedError = true;
      state.postCreatedMessage = action.payload;
    },
  },
});

export const { increment, decrement, startPostEdit, finishPostEdit } =
  counterSlice.actions;

export default counterSlice.reducer;
