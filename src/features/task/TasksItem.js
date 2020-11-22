import React from 'react'
import {Grid,Button,FormControlLabel,Checkbox,Dialog,DialogContent,DialogContentText,DialogTitle,Typography} from '@material-ui/core'
import {useSelector,useDispatch} from 'react-redux'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import {selectTaskById,taskToggled,taskDeleted,deleteTask} from './tasksSlice'
import CheckCircleOutlineSharpIcon from '@material-ui/icons/CheckCircleOutlineSharp';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { FaEdit } from 'react-icons/fa';
import {AddTaskForm} from './AddTaskForm'
import {TasksChildList} from './TasksChildList'


export const TasksItem = ({ id }) => {
    const dispatch = useDispatch();
    const task = useSelector((state) => selectTaskById(state, id))

    const handleDelete = () => {
        dispatch(deleteTask(task.id))
        dispatch(taskDeleted(task.id))
    }

    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [Form,setForm] = React.useState(false)

    const handleForm = () => {
        console.log('tasks clicked')
        setForm(!Form)
    }
    
    return (
        <Grid 
            container spacing = {1} 
            item xs = {12} 
            key = {task.id} 
            alignItems="center" 
            justify="center" 
            style = {{'borderTop' : '0.5px solid'}}
            className = 'task-item'>
        <Grid item xs = {1} ><Button onClick = {handleDelete}><DragIndicatorIcon color = 'primary'/></Button></Grid>
            <Grid item xs = {1}>
                <FormControlLabel
                    control={<Checkbox icon = {<CheckCircleOutlineSharpIcon fontSize="large"/>}  
                                checkedIcon={<CheckCircleIcon fontSize="large"/>}
                                checked={task.completed} 
                                onChange={() => dispatch(taskToggled(id))} 
                                name="checkedA"  />}
                    label= ''
                />
            </Grid>
            <Grid item xs = {9} >                            
                {task.completed ? 
                <strike>
                    <div 
                        className = 'editTask' 
                        style = {{'color':'#858585'}} 
                        onClick = {handleForm}>{task.title}
                    </div>
                </strike> 
                : 
                    <div >{Form === false 
                    ? <div onClick = {handleForm} >{task.title}</div> 
                    : <div><AddTaskForm id = {task.id} visible = {handleForm} /></div> }
                    </div> }  
            </Grid>
            {/* <Grid item xs> {task.goal ? task.goal : 'null'}</Grid> */}
            <Grid item xs = {1}> <Button onClick = {handleClickOpen}><FaEdit/></Button>  </Grid>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                {Form ? <AddTaskForm id = {task.id} visible = {handleForm}/> : task.title}  
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`#${task.tags}`} 
                    </DialogContentText>
                        <Typography variant="body1">
                            Sub Tasks
                        </Typography>
                    <TasksChildList IdList = {task.get_children}/>
                </DialogContent>
            </Dialog>        
        </Grid>
        
        
    )
}
