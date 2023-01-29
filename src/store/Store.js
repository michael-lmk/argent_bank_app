import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../reducers/UserReducer'

export const store = configureStore({
  reducer: {
    login : loginReducer
  },
})
