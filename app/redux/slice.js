import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const URL = "https://fair-teal-gharial-coat.cyclic.app/languages/";
export const LOADING_STATE = { IDLE: "idle", LOADING: "laoding", SUCCEEDED: "succeeded", FAILED: "failed" };

//NOTE: with normal redux, unable to make async calls so will use middledware reduc-thunk


export const appSlice = createSlice({
  name: 'counter',
    initialState: {
        value: [],
        loading: LOADING_STATE.IDLE,
        error: null
  },
  reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchLanguages.pending, (state) => {
                state.loading = LOADING_STATE.LOADING;
      })
        .addCase(fetchLanguages.fulfilled, (state, action) => {
            state.loading = LOADING_STATE.SUCCEEDED;
            state.value = action.payload;
            state.loading = LOADING_STATE.IDLE;
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
            state.loading = LOADING_STATE.FAILED;
          state.error = action.error.message;
          state.loading = LOADING_STATE.IDLE;
      });
    }
})
const fetchLanguages = createAsyncThunk(
    'languages/fetchLanguages',
    async (_, { dispatch }) => {
        try {
            const response = await fetch(URL);
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
)




// Action creators are generated for each case reducer function
export { fetchLanguages };
export default appSlice.reducer;