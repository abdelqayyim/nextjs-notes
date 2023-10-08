import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  languages: ["python", "Java", "C++", "C#"],
}

export const appSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
      deleteOne: (state)=>{
        const newLanguages = state.languages.slice(0, -1);
          state.languages = newLanguages;
    }
  },
})

// Action creators are generated for each case reducer function
export const { deleteOne } = appSlice.actions

export default appSlice.reducer