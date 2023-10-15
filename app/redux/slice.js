import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const URL = "https://fair-teal-gharial-coat.cyclic.app/languages/";
export const LOADING_STATE = { IDLE: "idle", LOADING: "laoding", SUCCEEDED: "succeeded", FAILED: "failed" };

//NOTE: with normal redux, unable to make async calls so will use middledware reduc-thunk


export const appSlice = createSlice({
  name: 'counter',
    initialState: {
        value: [],
        currentLanguageID: "",
        loading: LOADING_STATE.IDLE,
        errorMessage: "",
        errorSign: "",
        inputPopup: false, // this is for add/delete language
  },
    reducers: {
        setCurrentLanguage: (state, action) => {
            state.currentLanguageID = action.payload
        }, 
        togglePopup: (state, action) => {
            state.inputPopup = !state.inputPopup
        },
        resetError: (state, action) => {
            state.errorMessage = "";
            state.errorSign = "";
        }
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
          console.log(state.error);
          state.loading = LOADING_STATE.IDLE;
      })
        .addCase(addLanguage.pending,(state)=> {
                state.loading = LOADING_STATE.LOADING;
            })
            .addCase(addLanguage.fulfilled, (state, action) => {
                state.loading = LOADING_STATE.SUCCEEDED;
                console.log(action);
                state.value = action.payload;
                state.loading = LOADING_STATE.IDLE;
            })
            .addCase(addLanguage.rejected, (state, action) => {
                state.loading = LOADING_STATE.FAILED;
                state.errorMessage = action.error.message;
                state.errorSign = "negative";
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
            console.log("ERRROR__________");
            console.log(error);
            throw error;
        }
    }
);
const addLanguage = createAsyncThunk(
    'languages/addLanguage',
    async (language, { getState }) => {
        const state = getState();
        const languages = state.languages.value;
        try {
            for (const lang of languages) {
                if (lang.name.toLowerCase() === language.trim().toLowerCase()) {
                    throw new Error("Language Already exists"); 
                }
            }
            const response = await fetch(URL + `${language}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
)





// Action creators are generated for each case reducer function
export { fetchLanguages, addLanguage };
export const { setCurrentLanguage, togglePopup, resetError } = appSlice.actions;
export default appSlice.reducer;