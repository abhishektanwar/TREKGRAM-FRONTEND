import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Toast } from "../helpers/toast";
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
  filterType: null,
  userPosts:[],
  explorePosts:null,
};

const {customToast} = Toast();
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
      return result.data;
    } catch (err) {
      return rejectWithValue("Failed to load post");
    }
  }
);

export const getExplorePosts = createAsyncThunk(
  "counter/getExplorePosts",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.request({
        method: "get",
        url: `https://trekgram-backend.herokuapp.com/api/post/posts/getAllPosts`,
      });
      return result.data;
    } catch (err) {
      return rejectWithValue("Failed to load post");
    }
  }
);

export const loadUserPosts = createAsyncThunk(
  "posts/loadUserPosts",
  async ({userId}, { rejectWithValue }) => {
    try {
      const result = await axios.request({
        method: "get",
        url: `https://trekgram-backend.herokuapp.com/api/post/${userId}/user`,
        headers: {
          authorization: `Bearer ${utils.getLocalStorage(
            authTokenKeyLocalStorage
          )}`,
        },
      });
      return result.data;
    } catch (err) {
      return rejectWithValue("Failed to load post of current logged in user");
    }
  }
);

export const uploadPostImage = createAsyncThunk(
  "counter/uploadPostImage",
  async ({ data, fileName }, { rejectWithValue }) => {
    try {
      const result = await axios.request({
        method: "post",
        url: `https://trekgram-backend.herokuapp.com/api/upload`,
        // headers:{authorization:`Bearer ${utils.getLocalStorage(authTokenKeyLocalStorage)}`},'
        headers: { uploadfilename: fileName },
        data,
      });
    } catch (err) {
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
      return result.data;
    } catch (err) {
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
        url: `https://trekgram-backend.herokuapp.com/api/post/${postId}`,
        headers: {
          authorization: `Bearer ${utils.getLocalStorage(
            authTokenKeyLocalStorage
          )}`,
        },
        data,
      });
      return { postId: postId, data: data };
    } catch (err) {
      return rejectWithValue("Failed to update post");
    }
  }
);

export const likePost = createAsyncThunk(
  "counter/likePost",
  async ({ id, userId }, { rejectWithValue }) => {
    try {
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
      return result.data;
    } catch (err) {
      return rejectWithValue("Failed to like/unlike post");
    }
  }
);

export const deletePost = createAsyncThunk(
  "counter/deletePost",
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
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
      return postId;
    } catch (err) {
      return rejectWithValue("Failed to like/unlike post");
    }
  }
);

export const bookmarkPost = createAsyncThunk(
  "counter/bookmarkPost",
  async ({ postId }, { rejectWithValue }) => {
    try {
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
      return postId;
    } catch (err) {
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
      return { postId, comment, profilePicture, userId, username };
    } catch (err) {
      return rejectWithValue("Failed to like/unlike post");
    }
  }
);

export const postSlice = createSlice({
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
      state.isEditingPost = true;
      state.updatingPost = action.payload;
    },
    finishPostEdit: (state) => {
      state.isEditingPost = false;
      state.updatingPost = {};
    },
    filterPosts: (state, action) => {
      state.filterType = action.payload;
    },
  },
  extraReducers: {
    [loadPosts.pending]: (state) => {
      state.status = "loading";
    },
    [loadPosts.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.posts = action.payload;
    },
    [loadPosts.rejected]: (state, action) => {
      state.error = true;
      state.status = "idle";
      state.errorMessage = action.payload;
    },
    // upload image
    [uploadPostImage.pending]: (state) => {
      state.status = "loading";
    },
    [uploadPostImage.fulfilled]: (state, action) => {
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
      state.postCreatedStatus = "fulfilled";
      state.posts = [action.payload.post, ...state.posts];
      // update user posts
      state.userPosts = [action.payload.post, ...state.userPosts];
      customToast("Post created successfully","success");
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
      state.postCreatedStatus = "fulfilled"
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      // delete userPost if found
      state.userPosts = state.userPosts.filter((post) => post._id !== action.payload);
      // state.posts = action.payload;
      customToast("Post deleted successfully","success");
    },
    [deletePost.rejected]: (state, action) => {
      // state.postCreatedStatus = true;
      // state.postCreatedMessage=action.payload
    },
    [addComment.pending]: (state) => {
      // state.postCreatedStatus = "loading";
    },
    [addComment.fulfilled]: (state, action) => {
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
      // update user posts if found
      state.userPosts = state.userPosts.map((post) =>
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
      state.explorePosts = state.explorePosts.map((post) =>
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
      customToast("Comment added successfully","success");

    },
    [addComment.rejected]: (state, action) => {
      // state.postCreatedStatus = true;
      // state.postCreatedMessage=action.payload
    },
    [updatePost.pending]: (state) => {
      state.postCreatedStatus = "loading";
    },
    [updatePost.fulfilled]: (state, action) => {
      state.postCreatedStatus = "fulfilled";
      state.posts = state.posts.map((post) =>
        post._id === action.payload.postId
          ? { ...post, desc: action.payload.data.desc }
          : post
      );
      // udpate user post if found
      state.userPosts = state.userPosts.map((post) =>
        post._id === action.payload.postId
          ? { ...post, desc: action.payload.data.desc }
          : post
      );
      state.explorePosts = state.explorePosts.map((post) =>
        post._id === action.payload.postId
          ? { ...post, desc: action.payload.data.desc }
          : post
      );
      state.isEditingPost = false;
      state.updatingPost = {};
      // state.posts = action.payload;
      customToast("Post updated successfully","success");

    },
    [updatePost.rejected]: (state, action) => {
      state.postCreatedStatus = true;
      state.postCreatedError = true;
      state.postCreatedMessage = action.payload;
    },
    [loadUserPosts.pending]: (state) => {
      state.status = "loading";
    },
    [loadUserPosts.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.userPosts = action.payload;
    },
    [loadUserPosts.rejected]: (state, action) => {
      state.error = true;
      state.status = "idle";
      state.errorMessage = action.payload;
    },
    [getExplorePosts.pending]: (state) => {
      state.status = "loading";
    },
    [getExplorePosts.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.explorePosts = action.payload;
    },
    [getExplorePosts.rejected]: (state, action) => {
      state.error = true;
      state.status = "idle";
      state.errorMessage = action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  startPostEdit,
  finishPostEdit,
  filterPosts,
} = postSlice.actions;

export default postSlice.reducer;
