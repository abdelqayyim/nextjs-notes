import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const URL = "http://localhost:8000/languages/";
// const URL = "https://fair-teal-gharial-coat.cyclic.app/languages/";
export const LOADING_STATE = { IDLE: "idle", LOADING: "laoding", SUCCEEDED: "succeeded", FAILED: "failed" };

//NOTE: with normal redux, unable to make async calls so will use middledware reduc-thunk


export const appSlice = createSlice({
  name: 'counter',
    initialState: {
        value: [],
        currentLanguageID: "",
        currentNote: {noteID: null, noteTitle: null, noteDescription: null,noteDetail: null},
        loading: LOADING_STATE.IDLE,
        errorMessage: "",
        errorSign: "",
        inputPopup: false, // this is for add/delete language,
        takingNote: false, //this is for the add, delete button to show when the user is taking notes on a particular note,
        viewingNotes: true,
  },
    reducers: {
        setCurrentLanguage: (state, action) => {
            state.currentLanguageID = action.payload
        }, 
        setCurrentNote: (state, action) => {
            state.currentNote = action.payload
        },
        togglePopup: (state, action) => {
            state.inputPopup = !state.inputPopup
        },
        resetError: (state, action) => { 
            state.errorMessage = "";
            state.errorSign = "";
        },
        takingNote: (state, action)=>{
            state.takingNote = action.payload; 
            state.viewingNotes = false; 
        },
        viewingNotes: (state, action) => {
            state.takingNote = false;  
            state.viewingNotes = action.payload;  
        },
        addText: (state, _) => { //adding text to notes
            state.currentNote.noteDetail = [...state.currentNote.noteDetail, { text: "Edit" }];
        },
        addImage: (state, action) => {
            state.currentNote.noteDetail = [...state.currentNote.noteDetail, { img: action.payload }];
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
          state.error = "Failed to Fetch Languages";
          state.errorSign = "positive";
          state.loading = LOADING_STATE.IDLE;
      })
        .addCase(addLanguage.pending,(state)=> {
                state.loading = LOADING_STATE.LOADING;
            })
            .addCase(addLanguage.fulfilled, (state, action) => {
                state.loading = LOADING_STATE.SUCCEEDED;
                state.value = [...state.value, {_id:"",name:action.meta.arg, note:[]}];
                console.log(state.value);
                state.errorMessage = "Language Successfully Added";
                state.errorSign = "positive";
                state.loading = LOADING_STATE.IDLE;
            })
            .addCase(addLanguage.rejected, (state, action) => {
                state.loading = LOADING_STATE.FAILED;
                state.errorMessage = action.error.message;
                state.errorSign = "negative";
                state.loading = LOADING_STATE.IDLE;
            })
        .addCase(deleteLanguage.pending,(state)=> {
                state.loading = LOADING_STATE.LOADING;
            })
            .addCase(deleteLanguage.fulfilled, (state, action) => {
                state.loading = LOADING_STATE.SUCCEEDED;
                state.value = state.value.filter(lang => lang.name !== action.meta.arg);
                state.errorMessage = "Language Successfully Deleted";
                state.errorSign = "positive";
                state.loading = LOADING_STATE.IDLE;
            })
            .addCase(deleteLanguage.rejected, (state, action) => {
                state.loading = LOADING_STATE.FAILED;
                state.errorMessage = action.error.message;
                state.errorSign = "negative";
                state.loading = LOADING_STATE.IDLE;
            })
        .addCase(addNote.pending,(state)=> {
                state.loading = LOADING_STATE.LOADING;
            })
            .addCase(addNote.fulfilled, (state, action) => {
                state.loading = LOADING_STATE.SUCCEEDED;
                state.value = state.value.filter(lang => lang.name !== action.meta.arg);
                state.errorMessage = "Note Successfully Added";
                state.errorSign = "positive";
                state.loading = LOADING_STATE.IDLE;
            })
            .addCase(addNote.rejected, (state, action) => {
                state.loading = LOADING_STATE.FAILED;
                state.errorMessage = action.error.message;
                state.errorSign = "negative";
                state.loading = LOADING_STATE.IDLE;
            })
        .addCase(deleteNote.pending,(state)=> {
                state.loading = LOADING_STATE.LOADING;
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.loading = LOADING_STATE.SUCCEEDED;
                state.errorMessage = "Note Successfully Deleted";
                state.errorSign = "positive";
                state.loading = LOADING_STATE.IDLE;
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.loading = LOADING_STATE.FAILED;
                state.errorMessage = action.error.message;
                state.errorSign = "negative";
                state.loading = LOADING_STATE.IDLE;
            })
        .addCase(getNotes.pending,(state)=> {
                state.loading = LOADING_STATE.LOADING;
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.loading = LOADING_STATE.SUCCEEDED;
                setTimeout(()=>{state.loading = LOADING_STATE.IDLE;},500)
            })
            .addCase(getNotes.rejected, (state, action) => {
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
            const response = await fetch(URL, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);
const languageExists = (language, currentLanguages) => {
    for (const lang of currentLanguages) {
        if (lang.name.toLowerCase() === language.trim().toLowerCase()) {
            return true;
        }
    }
    return false;
}
const addLanguage = createAsyncThunk(
    'languages/addLanguage',
    async (language_id, { getState }) => {
        const state = getState();
        const languages = state.languages.value;
        try {
            if (languageExists(language_id, languages)) {
                throw new Error("Language Already exists"); 
            }
            const response = await fetch(URL + `${language_id}`, {
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
const addNote = createAsyncThunk( //receives only the note
    'languages/addNote',
    async (note, { getState, dispatch }) => {
        const state = getState();
        const currentLanguageID = state.languages.currentLanguageID;
        try {
            //check to see if title already exists
            const response = await fetch(URL + `${currentLanguageID}/newNote`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(note),
            })
            dispatch(fetchLanguages());
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
)
const deleteNote = createAsyncThunk( //receives only the note
    'languages/deleteNote',
    async (note, { getState, dispatch }) => {
        const state = getState();
        const currentLanguageID = state.languages.currentLanguageID;
        try {
            //check to see if title already exists
            const response = await fetch(URL +`${currentLanguageID}/deleteNote`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(note),
            })
            console.log(response);
            dispatch(fetchLanguages());
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
)
const getNotes = createAsyncThunk( //receives only the note
    'languages/getNotes',
    async (_, { getState }) => {
        const currentLanguageID = state.languages.currentLanguageID;
        try {
            //check to see if title already exists
            const response = await fetch(URL +`${currentLanguageID}/getNotes`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            console.log(response);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
)

const deleteLanguage = createAsyncThunk(
    'languages/deleteLanguage',
    async (language, { getState }) => {
        const state = getState();
        const languages = state.languages.value;
        try {
            if (!languageExists(language, languages)) {
                throw new Error("Language Does not Exists"); 
            }
            const response = await fetch(URL + `${language.toLowerCase()}`, {
                method: 'DELETE',
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
export { fetchLanguages, addLanguage,deleteLanguage, addNote,deleteNote, getNotes };
export const { setCurrentLanguage, togglePopup, resetError, setCurrentNote,takingNote, addText,viewingNotes,addImage } = appSlice.actions;
export default appSlice.reducer;