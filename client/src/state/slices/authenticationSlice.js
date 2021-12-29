import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'authentication',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated  = true
    },
    logout: (state) => {
      state.isAuthenticated = false
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { login , logout  } = counterSlice.actions

export default counterSlice.reducer