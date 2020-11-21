import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'; 
import {selectAllGoals,fetchGoals} from '../goal/goalsSlice'
import {Grid} from '@material-ui/core'
import {GoalCardItem} from './GoalCardItem'
import {GoalsItem} from './GoalsItem'

export const GoalsList = () => {
    const goalsStatus = useSelector(state => state.goals.status)
    const goals = useSelector(selectAllGoals)
    const error = useSelector(state =>state.goals.error)
    const dispatch = useDispatch()

    useEffect(() => {
        if (goalsStatus === 'idle') {
            dispatch(fetchGoals())
        }
      }, [goalsStatus,dispatch])

    let goalContent;

    if(goalsStatus ==='loading'){
        goalContent =  <div className={'loading'}>
                         Loading...
                    </div>
    }else if(goalsStatus === 'succeeded'){
            goalContent = <Grid container spacing = {3}>
                 {goals.map(goal=> (
                <Grid item xs = {12} key = {goal.id} >
                    {/* <GoalCardItem data = {goal} /> */}
                    <GoalsItem data = {goal} />
                </Grid>
            ))}
            </Grid>
        }else if(goalsStatus === 'failed') {
            goalContent = <div variant='danger'>
                        {`${error}... Could not connect with servers`} 
                    </div>
        } 
    return (
        <>
            Search Bar
            <br/>

            Filters
            <br/>
            {goalContent}
        </>
    )
}
