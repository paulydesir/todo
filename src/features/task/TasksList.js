import React,{useEffect} from 'react';
import {fetchTasks, selectAllTasks} from './tasksSlice';
import {useSelector,useDispatch} from 'react-redux'; 
import {Grid,Paper,Box} from '@material-ui/core'
import {AddTaskForm} from './AddTaskForm'
// import {RiDragMoveLine} from 'react-icons/ri'
import {TasksItem} from './TasksItem'

export const TasksList = () => {
    const dispatch = useDispatch();
    
    const tasks = useSelector(selectAllTasks);
    const tasksStatus = useSelector(state => state.tasks.status);
    const error = useSelector(state => state.tasks.error);

    let taskContent;
    useEffect(() => {
        if (tasksStatus === 'idle') {
            dispatch(fetchTasks())
        }
      }, [tasksStatus,dispatch])

    if(tasksStatus ==='loading'){
        taskContent =  <div className={'loading'}>
                         Loading...
                    </div>
    }else if(tasksStatus === 'succeeded'){
        taskContent = <Grid container spacing = {3} item xs = {12}>
                        {tasks.map(task=> (
                            <TasksItem key={task} id={task}/>
                        ))}
                    </Grid>
        }else if(tasksStatus === 'failed') {
            taskContent = <div variant='danger'>
                        {`${error}... Could not connect with servers`} 
                    </div>
        } 
    return (
        <Grid container spacing = {2}> 
            <AddTaskForm /> 
            {taskContent}       
        </Grid>
    )
}
