import { createSlice } from '@reduxjs/toolkit'

export const StatusFilters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
}

const initialState = {
  status: StatusFilters.All,
  goals: [],
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    statusFilterChanged(state, action) {
      state.status = action.payload
    },
    GoalFilterChanged: {
      reducer(state, action) {
        let { goal, changeType } = action.payload
        const { goals } = state
        switch (changeType) {
          case 'added': {
            if (!goals.includes(goal)) {
              goals.push(goal)
            }
            break
          }
          case 'removed': {
            state.goals = goals.filter(
              (existingColor) => existingColor !== goal
            )
          }
          default:
            return
        }
      },
      prepare(goal, changeType) {
        return {
          payload: { goal, changeType },
        }
      },
    },
  },
})

export const { colorFilterChanged, statusFilterChanged } = filtersSlice.actions

export default filtersSlice.reducer
