import React from 'react'
import {Grid,Paper} from '@material-ui/core'
import {selectTasksByGoal} from '../task/tasksSlice.js'
import {useSelector} from 'react-redux'

export const RelatedTasks = (props) => {
    const tasks = useSelector(state => selectTasksByGoal(state,props.data)).map(task =>(
        <Grid item xs = {12} key = {task.id}>
            {task.title}
        </Grid>
    ))
    return (
        <Paper>
            <Grid container spacing = {3}>
                {tasks}  
            </Grid>
        </Paper>
        
    )
}
