import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  jwt: "",
  error: "",
  success: "",
}

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    checkCredentialSuccess: (state, action) => {
      state.jwt = action.payload;
      state.error = "";
    },
    getErrorMessage: (state, action) => {
      state.error = action.payload;
    },
    getSuccessMessage: (state, action) => {
      state.success = action.payload;
    },
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
    updateUserInfo: (state, action) => {
      if (action.payload.firstName !== undefined) {
        state.user.firstName = action.payload.firstName;
      }
      if (action.payload.lastName !== undefined) {
        state.user.lastName = action.payload.lastName;
      }
    },
    removeState: (state, action) => {
      state = initialState;
      return state;
    },

  },
})

// Action creators are generated for each case reducer function
export const { checkCredentialSuccess, checkCredentialFailed, setUserInfo, getErrorMessage, updateUserInfo, getSuccessMessage, removeState } = userReducer.actions

export default userReducer.reducer