import React,{useRef} from 'react';
import {Grid,Select,FormControlLabel,Box} from '@material-ui/core';
import { Formik, Form, Field,FieldArray } from 'formik';
import {selectAllGoals} from '../goal/goalsSlice';
import {postBulkTasks,taskAdded} from './tasksSlice'
import {useSelector,useDispatch} from 'react-redux';
import MuiTextField from '@material-ui/core/TextField';
import { TextField,Checkbox } from 'formik-material-ui'
import {nanoid} from '@reduxjs/toolkit'
import {Debug} from '../forms/Debug'
import {selectTaskById} from './tasksSlice'

import {
    Autocomplete,
  } from 'formik-material-ui-lab';

export const AddTaskForm = ({id}) => {  
    // const today = new Date()
    let task = useSelector((state) => selectTaskById(state, id))
    const dispatch = useDispatch();

    const formRef = useRef();
    const handleKeyDown = async (e) => {
        // If the user pressed the Enter key:
        if (e.which === 13) {
          // Create and dispatch the thunk function itself
        //   setStatus('loading')
        await dispatch(postBulkTasks(formRef.current.values.tasks))
        const taskId = nanoid();
        let task = formRef.current.values.tasks[0];
        task.id = taskId;
            dispatch(taskAdded({
                id:taskId,
                entity: task
            }))
          // And clear out the text input
        }
      }
    
      let initialTask = {};

      const tasks  = Object.assign(initialTask, task ? 
        {
            title: task.title,
            completed: task.completed,
            goal: task.goal,
            parent: task.parent,
            tags: task.tags
        } 
        : 
        {
            title: '',
            completed: false,
            goal: '',
            parent: '',
            tags: []
        })


      
        
    return (
        <Grid item xs = {12}>
        <Formik initialValues = {
            {
                tasks:[
                    tasks
                ]
            }
         }
        onSubmit = {(values,{setSubmitting})=> {
                setTimeout(()=>{
                    setSubmitting(false);
                },600)
            }}
            innerRef={formRef}
            >
        {({submitForm,isSubmitting,values,handleBlur,handleChange,errors,touched}) =>(
            <Form >
                <Box border = {0} display="flex" justifyContent="center">
                    <Grid container spacing = {3} item xs = {12} style =  {{marginTop: "10px"}}>
                        {/* <Grid item xs = {12} >
                            <Field component =  {Autocomplete} 
                                name = {`tasks[${0}].goal`}
                                options={goals}
                                getOptionLabel={(goal) => goal.title}
                                fullWidth
                                renderInput={(params) => (
                                    <MuiTextField
                                        {...params}
                                        error={touched[`tasks[${0}].goal`] && !!errors[`tasks[${0}].goal`]}
                                        helperText={touched[`tasks[${0}].goal`] && errors[`tasks[${0}].goal`]}
                                        label="Goal"
                                        variant="outlined"  
                                    />
                                )}
                            >
                            </Field>
                        </Grid> */}
                            <FieldArray name = 'tasks'>
                            {({push, remove}) =>(  
                            <>
                                {values.tasks && values.tasks.length > 0 && values.tasks.map( (tasks,index) =>   
                                <Grid container spacing = {2} key = {`${index}`}>   
                                    <Grid item xs = {12} style={{marginLeft: '15px',marginRight: '15px'}}>
                                        <Field component = {TextField}
                                            placeholder = 'Add new tasks'
                                            type = 'text'
                                            name = {`tasks[${index}].title`}
                                            fullWidth
                                            variant = 'outlined'
                                            onKeyDown={handleKeyDown}
                                            >  
                                        </Field>
                                    </Grid>
                                </Grid> 
                                )}
                                <Grid container spacing = {1} item xs = {12} style={{marginDown: '30px'}}>
                                   
                                </Grid>
                                {/* <Grid item xs = {12}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        disabled={isSubmitting}
                                        onClick={() =>push(
                                            {
                                                title: "",
                                                repeats: false,
                                                goal: '',
                                                parent: ''
                                                tags: []
                                            }
                                        )}
                                            >
                                        Add task
                                    </Button>
                                </Grid> */}     
                                </>
                                )}
                            </FieldArray>
                        {/* <Grid item xs = {12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                        >
                                    Submit
                            </Button>
                        </Grid> */}
                     </Grid>
                </Box>
                <Debug/>
            </Form>
        )}
        </Formik>
    </Grid>             
      
    )
}
