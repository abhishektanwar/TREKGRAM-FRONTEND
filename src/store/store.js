import {configureStore} from '@reduxjs/toolkit'
import postReducer from '../reducers/postSlice'
import userReducer from '../reducers/userSlice'


export const store = configureStore({
  reducer :{
    counter:postReducer,
    user:userReducer
  }
})






// customerservice.in@hm.com