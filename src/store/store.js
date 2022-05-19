import {configureStore} from '@reduxjs/toolkit'
<<<<<<< HEAD
=======
import postReducer from '../reducers/postSlice'
>>>>>>> home-page-functionalities
import userReducer from '../reducers/userSlice'


export const store = configureStore({
  reducer :{
<<<<<<< HEAD
=======
    counter:postReducer,
>>>>>>> home-page-functionalities
    user:userReducer
  }
})