import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    goals: [],
    status: 'idle',
    error: null,
    
  }
export const fetchGoals = createAsyncThunk('goals/fetchGoals', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/goals/')
    return response.data
})

export const goalsSlice = createSlice({
    name:'goals',
    initialState,
    reducers:{
        goalAdded: {
            reducer(state, action) {
              state.goals.push(action.payload)
            },
        },  
      },
        extraReducers: {
            [fetchGoals.pending]: (state, action) => {
              state.status = 'loading'
            },
            [fetchGoals.fulfilled]: (state, action) => {
              state.status = 'succeeded'
              // Add any fetched Goals to the array
              state.goals = state.goals.concat(action.payload)
            },
            [fetchGoals.rejected]: (state, action) => {
              state.status = 'failed'
              state.error = action.error.message
            },
        }
  }    
)
export default goalsSlice.reducer
export const { goalAdded } = goalsSlice.actions

export const selectAllGoals = state => state.goals.goals
export const selectPinnedGoals = state => state.goals.goals.filter(goal => goal.pinned)

export const selectGoalById = (state,goalId) => state.goals.goals.find(goal=> String(goal.id)=== String(goalId))
