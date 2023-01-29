import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  example: 0,
}

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    exempleReducer: (state, action) => {
      
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { exempleReducer } = userReducer.actions

export default userReducer.reducer