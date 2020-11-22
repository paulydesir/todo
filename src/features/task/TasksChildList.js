import React from 'react'
import {Grid} from '@material-ui/core'

import {TasksItem} from './TasksItem'
import {AddTaskForm} from './AddTaskForm'


export const TasksChildList = ({IdList}) => {

    let taskContent;
    //Remove the first element in id
    [,...IdList] = IdList ;
    
    if (IdList){
        taskContent = <Grid container spacing = {3} item xs = {12}>
                        {IdList.map(id=> (
                            <TasksItem key={id} id={id}/>
                        ))}
                    </Grid>
    };
    
    return (
        <Grid container spacing = {2}> 
            <AddTaskForm /> 
            {taskContent}       
        </Grid>
    )
}
