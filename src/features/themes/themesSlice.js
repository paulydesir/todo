import {createSlice,createAsyncThunk,createEntityAdapter} from '@reduxjs/toolkit'
import axios from 'axios'

const ThemeAdapter = createEntityAdapter()

const initialState = ThemeAdapter.getInitialState({
  status: 'idle'
})


export const fetchThemes = createAsyncThunk('themes/fetchThemes',async () => {
    const response  = await axios.get('http://127.0.0.1:8000/api/themes/')
    return response.data
})

export const themesSlice = createSlice({
    name:'themes',
    initialState,
    reducers: {
        ThemeAdded:{
          reducer(state,action){
            state.ids.push(action.payload.id) 
            state.entities[action.payload.id] = action.payload.entity 
          }
        },
        themeDeleted: ThemeAdapter.removeOne, 
        },
        extraReducers: builder => {
          builder
          .addCase(fetchThemes.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchThemes.fulfilled, (state, action) => {
            ThemeAdapter.setAll(state, action.payload)
            state.status = 'succeeded'
          })
          
                      
      }
  }    
)

export default themesSlice.reducer

export const selectAllThemes = state => state.tasks.ids


