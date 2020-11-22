import {configureStore} from '@reduxjs/toolkit'
import goalsReducer from '../features/goal/goalsSlice'
import tasksReducer from '../features/task/tasksSlice'
import themesReducer from '../features/themes/themesSlice'



export const store = configureStore({
    reducer: {
        goals:goalsReducer,
        tasks:tasksReducer,
        themes:themesReducer
    }
})