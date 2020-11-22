import {createSlice,createAsyncThunk,createEntityAdapter} from '@reduxjs/toolkit'
import axios from 'axios'

const todosAdapter = createEntityAdapter()

const initialState = todosAdapter.getInitialState({
  status: 'idle'
})


// const initialState = {
//     tasks: [],
//     status: 'idle',
//     error: null,
//   }

export const fetchTasks = createAsyncThunk('tasks/fetchTasks',async () => {
    const response  = await axios.get('http://127.0.0.1:8000/api/tasks/')
    return response.data
})

export const postBulkTasks = createAsyncThunk('tasks/postTask', async (addedTasks) => {
  const response =await axios({
    method:'post',
    url:'http://127.0.0.1:8000/api/tasks/',
    data:addedTasks
  })
  return response.data
})

export const updateTask = createAsyncThunk('task/TaskUpdated', async (updatedTask) => {
  const response = await axios({
    method:'put',
    url: `http://127.0.0.1:8000/api/tasks/${updatedTask.id}/`,
    data: updatedTask.data
  })
})

export const deleteTask = createAsyncThunk('tasks/deleteTasks', async (deleteTaskId) => {
  const response = await axios({
    method: 'delete',
    url: `http://127.0.0.1:8000/api/tasks/${deleteTaskId}/`
  })
  return response.data
})

export const tasksSlice = createSlice({
    name:'tasks',
    initialState,
    reducers: {
      taskToggled(state, action) {
        const taskId = action.payload
        const task = state.entities[taskId]
        task.completed = !task.completed
      },
        taskAdded:{
          reducer(state,action){
            state.ids.push(action.payload.id) 
            state.entities[action.payload.id] = action.payload.entity 
          }
        },
        taskDeleted: todosAdapter.removeOne, 
        },
        extraReducers: builder => {
          builder
          .addCase(fetchTasks.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchTasks.fulfilled, (state, action) => {
            todosAdapter.setAll(state, action.payload)
            state.status = 'succeeded'
          })
          // Use another adapter function as a reducer to add a todo
          // .addCase(postBulkTasks.fulfilled)
          
          .addCase(deleteTask.fulfilled, todosAdapter.removeOne)
            
      }
  }    
)

export default tasksSlice.reducer

export const selectAllTasks = state => state.tasks.ids
export const {taskToggled,taskAdded,taskDeleted} = tasksSlice.actions

export const {
  selectAll: selectTodos,
  selectById: selectTaskById,
} = todosAdapter.getSelectors((state) => state.tasks)

export const selectTasksByGoal = (state, goalId) =>
  state.tasks.tasks.filter(task => String(task.goal) === String(goalId))