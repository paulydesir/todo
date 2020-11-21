import {configureStore} from '@reduxjs/toolkit'
import goalsReducer from '../features/goal/goalsSlice'
import tasksReducer from '../features/task/tasksSlice'
// import timeblocksReducer from '../features/timeblock/timeblockSlice'



export const store = configureStore({
    reducer: {
        goals:goalsReducer,
        tasks:tasksReducer,
    }
})